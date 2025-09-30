import type { Client } from '@hubspot/api-client'
import type { PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/deals/models/all.js'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/exports/models/all.js'
import { PROP_MAPPINGS } from './mappings.js'

export async function fetchOneTicketPage(client: Client, pageSize: number) {
	const objectSearchRequest: PublicObjectSearchRequest = {
		filterGroups: [
			{
				filters: [
					{
						propertyName: 'hs_pipeline',
						operator: FilterOperatorEnum.Eq,
						value: '94158235',
					},
					// {
					// 	propertyName: 'hs_pipeline_stage',
					// 	operator: FilterOperatorEnum.In,
					// 	values: [
					// 		'172972345',
					// 		'192344246',
					// 		'203065970',
					// 		'203041335',
					// 		'203041336',
					// 		'172972347',
					// 		'173020599',
					// 		'173020600',
					// 		'173020601',
					// 	],
					// },
				],
			},
		],
		properties: PROP_MAPPINGS.map(([m, _]) => m),
		limit: pageSize,
	}

	const res = await client.crm.tickets.searchApi.doSearch(objectSearchRequest)

	return res.results
}

export async function fetchTickets(client: Client, pageSize: number) {
	const tickets: any[] = []
	let after: string | undefined = undefined

	do {
		const objectSearchRequest: PublicObjectSearchRequest = {
			filterGroups: [
				{
					filters: [
						{
							propertyName: 'hs_pipeline',
							operator: FilterOperatorEnum.Eq,
							value: '94158235',
						},
						// {
						// 	propertyName: 'hs_pipeline_stage',
						// 	operator: FilterOperatorEnum.In,
						// 	values: ['173020599', '173020600', '173020601'],
						// },
					],
				},
			],
			properties: PROP_MAPPINGS.map(([m, _]) => m),
			limit: pageSize,
			after,
		}

		const res =
			await client.crm.tickets.searchApi.doSearch(objectSearchRequest)

		tickets.push(...res.results)

		after = res.paging?.next?.after
	} while (after)

	return tickets
}

export async function getMigratedBillingRequests(
	client: Client,
	pageSize: number
) {
	const records = []
	let after: string | undefined = undefined

	do {
		const objectSearchRequest: PublicObjectSearchRequest = {
			filterGroups: [
				{
					filters: [
						{
							propertyName: 'source_ticket_id',
							operator: FilterOperatorEnum.HasProperty,
						},
					],
				},
			],
			properties: ['source_ticket_id'],
			limit: pageSize,
			after,
		}

		const res = await client.crm.objects.searchApi.doSearch(
			'2-49298689',
			objectSearchRequest
		)

		records.push(
			...res.results.map((r) => [r.id, r.properties['source_ticket_id']!])
		)

		after = res.paging?.next?.after
	} while (after)

	return records
}
