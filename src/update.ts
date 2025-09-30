import { Client } from '@hubspot/api-client'
import { FIX_MAPPINGS } from './mappings.js'
import { BILLING_REQUEST_OBECT_TYPE_ID } from './consts.js'

export async function updateBillingRequests(
	client: Client,
	requests: string[][]
): Promise<void> {
	for (const req of requests) {
		try {
			const ticketProperties = FIX_MAPPINGS.map((mapping) => mapping[0])

			const ticket = await client.crm.tickets.basicApi.getById(
				req[1]!,
				ticketProperties
			)

			const updateData: Record<string, string> = {}

			FIX_MAPPINGS.forEach(([ticketProp, billingRequestProp]) => {
				if (ticket.properties[ticketProp] !== undefined) {
					updateData[billingRequestProp] = ticket.properties[
						ticketProp
					] as string
				}
			})

			await client.crm.objects.basicApi.update(
				BILLING_REQUEST_OBECT_TYPE_ID,
				req[0]!,
				{ properties: updateData }
			)
		} catch (e: any) {
			console.log(`error updating mapping ${req}`)
		}
	}
}
