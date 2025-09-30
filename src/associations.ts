import type { T_ALL_ASSOCIATIONS_MAP } from './types.js'
import * as consts from './consts.js'
import { Client } from '@hubspot/api-client'
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/companies/index.js'

export async function getAssociationsByObjectId(
	object_id: string,
	associations: string[],
	client: Client
) {
	const res = await client.crm.tickets.basicApi.getById(
		object_id,
		undefined,
		undefined,
		associations.map(
			(key) => consts.ASSOCIATIONS_META_MAP.get(key)!.api_name
		)
	)

	return res.associations
}

export async function associateRecords(
	client: Client,
	associations: T_ALL_ASSOCIATIONS_MAP
) {
	for (const [destId, childMap] of associations.entries()) {
		// handle emails
		const emails = childMap.get('emails') || []
		if (emails) {
			for (const emailId of emails) {
				try {
					await client.crm.associations.v4.basicApi.create(
						'0-49',
						emailId,
						'2-49298689',
						destId,
						[
							{
								associationCategory:
									AssociationSpecAssociationCategoryEnum.UserDefined,
								associationTypeId: 47,
							},
						]
					)
				} catch (e: any) {
					console.log(`association error: ${e}`)
				}
			}
		}

		// handle notes
		const notes = childMap.get('notes') || []
		if (notes) {
			for (const noteId of notes) {
				try {
					await client.crm.associations.v4.basicApi.create(
						'0-46',
						noteId,
						'2-49298689',
						destId,
						[
							{
								associationCategory:
									AssociationSpecAssociationCategoryEnum.UserDefined,
								associationTypeId: 43,
							},
						]
					)
				} catch (e: any) {
					console.log(`association error: ${e}`)
				}
			}
		}

		// handle companies
		const companies = childMap.get('companies') || []
		if (companies) {
			for (const companyId of companies) {
				try {
					await client.crm.associations.v4.basicApi.create(
						'2-49298689',
						destId,
						'company',
						companyId,
						[
							{
								associationCategory:
									AssociationSpecAssociationCategoryEnum.UserDefined,
								associationTypeId: 55,
							},
						]
					)
				} catch (e: any) {
					console.log(`association error: ${e}`)
				}
			}
		}

		// handle contacts
		const contacts = childMap.get('contacts') || []
		if (contacts) {
			for (const contactId of contacts) {
				try {
					await client.crm.associations.v4.basicApi.create(
						'2-49298689',
						destId,
						'contact',
						contactId,
						[
							{
								associationCategory:
									AssociationSpecAssociationCategoryEnum.UserDefined,
								associationTypeId: 57,
							},
						]
					)
				} catch (e: any) {
					console.log(`association error: ${e}`)
				}
			}

			// handle deals
			const deals = childMap.get('deals') || []
			if (deals) {
				for (const dealId of deals) {
					try {
						await client.crm.associations.v4.basicApi.create(
							'2-49298689',
							destId,
							'deal',
							dealId,
							[
								{
									associationCategory:
										AssociationSpecAssociationCategoryEnum.UserDefined,
									associationTypeId: 52,
								},
							]
						)
					} catch (e: any) {
						console.log(`association error: ${e}`)
					}
				}
			}

			// handle tickets
			const tickets = childMap.get('tickets') || []
			if (tickets) {
				for (const ticketId of tickets) {
					try {
						await client.crm.associations.v4.basicApi.create(
							'2-49298689',
							destId,
							'ticket',
							ticketId,
							[
								{
									associationCategory:
										AssociationSpecAssociationCategoryEnum.UserDefined,
									associationTypeId: 59,
								},
							]
						)
					} catch (e: any) {
						console.log(`association error: ${e}`)
					}
				}
			}
		}
	}
}
