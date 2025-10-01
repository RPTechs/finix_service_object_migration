import 'dotenv/config'
import { Client } from '@hubspot/api-client'
import * as consts from './consts.js'
import { associateRecords, getAssociationsByObjectId } from './associations.js'
import {
	createApiServiceRequestObjectsFromFetchedTickets,
	batchCreateServiceObjects,
} from './migrate.js'
import { fetchTickets } from './queries.js'
import type { T_ALL_ASSOCIATIONS_MAP, T_ASSOCIATIONS_MAP } from './types.js'
import pprint from './pprint.js'

async function main() {
	const API_TOKEN = process.env.API_TOKEN!
	if (API_TOKEN == '') {
		throw new Error('missing API_TOKEN')
	}

	const client: Client = new Client({
		accessToken: API_TOKEN,
		limiterOptions: consts.API_LIMITER_OPTIONS,
	})

	// const schema = await client.crm.associations.schema.typesApi.getAll(
	// 	consts.BILLING_REQUEST_OBECT_TYPE_ID,
	// 	'ticket'
	// )
	// console.log(schema)

	// get Tickets in Implementation Pipeline
	const tickets = await fetchTickets(client, consts.PAGE_SIZE)
	console.log(`tickets found: ${tickets.length}`)

	// create req objects for HubSpot API
	const reqObjects = createApiServiceRequestObjectsFromFetchedTickets(tickets)

	// send req objects to create in HubSpot
	const mappings = await batchCreateServiceObjects(
		client,
		reqObjects,
		consts.SERVICE_OBECT_TYPE_ID,
		consts.SEND_CHUNK_SIZE
	)

	// get associations for source
	const allAssociationsMap: T_ALL_ASSOCIATIONS_MAP = new Map()
	for (const mapping of mappings) {
		const associations = await getAssociationsByObjectId(
			mapping.source,
			consts.ASSOCIATION_KEYS,
			client
		)

		const associationsMap: T_ASSOCIATIONS_MAP = new Map()
		for (const key of consts.ASSOCIATION_KEYS) {
			const associationsOfType = associations?.[key]?.results || []
			associationsMap.set(
				key,
				associationsOfType.map((a) => a.id)
			)
		}
		allAssociationsMap.set(mapping.dest, associationsMap)
		// console.log(allAssociationsMap)
	}

	await associateRecords(client, allAssociationsMap)
}

try {
	await main()

	console.log('program exited successfully')
} catch (e: any) {
	console.log('error in program execution:')
	pprint(e)
}
