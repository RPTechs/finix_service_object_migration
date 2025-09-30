import { PROP_MAPPINGS } from './mappings.js'
import { Client } from '@hubspot/api-client'
import type { T_MAPPING } from './types.js'
import { PIPELINE_STAGE_MAPPINGS } from './consts.js'

function createApiBillingRequestObjectProperties(ticket: any) {
	const mapped: Record<string, any> = {}

	for (const [ticketProp, billingProp] of PROP_MAPPINGS) {
		if (ticket.properties?.[ticketProp] !== undefined) {
			mapped[billingProp] = ticket.properties[ticketProp]
		}
	}

	// handle unnamed
	if (mapped['request_name'] == undefined) {
		mapped['request_name'] = 'No Name'
	}
	// Billing Requst Pipeline = "Billing Requests"
	mapped['hs_pipeline'] = '768306582'

	// source ticket id
	mapped['source_ticket_id'] = ticket.id

	// hs_pipeline_stage
	mapped['hs_pipeline_stage'] = PIPELINE_STAGE_MAPPINGS.get(
		mapped['hs_pipeline_stage']
	)

	// package
	const pkg = mapped['package2'] ?? ''
	let correctedPkg = pkg
	switch (pkg) {
		case 'p2c':
			correctedPkg = 'P2C'
			break
		case 'pathward':
			correctedPkg = 'Pathward'
			break
		case 'pull/push_to_card':
			correctedPkg = 'Pull/Push To Card'
			break
		case 'reporting':
			correctedPkg = 'Reporting'
			break
		case 'settlements':
			correctedPkg = 'Settlements'
			break
		case 'settlementss':
			correctedPkg = 'Settlementss'
			break
		case 'worldpay':
			correctedPkg = 'Worldpay'
			break
	}
	mapped['package2'] = correctedPkg

	return mapped
}

export const createApiBillingRequestObjectsFromFetchedTickets = (
	tickets: any[]
) =>
	tickets.map((t) => {
		return { properties: createApiBillingRequestObjectProperties(t) }
	})

export async function batchCreateBillingRequests(
	client: Client,
	reqObjects: any[],
	internalName: string,
	sendBatchMax: number
) {
	const results: T_MAPPING[] = []

	for (let i = 0; i < reqObjects.length; i += sendBatchMax) {
		const chunk = reqObjects.slice(i, i + sendBatchMax)
		const response = await client.crm.objects.batchApi.create(
			internalName,
			{
				inputs: chunk,
			}
		)

		results.push(
			...response.results.map((r) => ({
				source: r.properties['source_ticket_id']!,
				dest: r.id,
			}))
		)
	}

	return results
}
