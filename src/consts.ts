import { type T_ASSOCIATIONS_META_MAP } from './types.js'

const secondsToMilliseconds = (seconds: number) => seconds * 1000

export const BILLING_REQUEST_OBECT_TYPE_ID = '2-49298689'
export const BILLING_REQUEST_INTERNAL_NAME = 'billing_requests'
export const PAGE_SIZE = 100
export const SEND_CHUNK_SIZE = 100
const TEN_SECOND_LIMIT = 90
const SINGLE_REQUEST_MIN_TIME_MILLISECONDS = 300
export const API_LIMITER_OPTIONS = {
	id: 'hubspot-client-limiter',
	maxConcurrent: 1,
	minTime: SINGLE_REQUEST_MIN_TIME_MILLISECONDS,
	reservoir: TEN_SECOND_LIMIT,
	reservoirRefreshAmount: TEN_SECOND_LIMIT,
	reservoirRefreshInterval: secondsToMilliseconds(10),
}

export enum E_ASSOCIATION_KEY {
	emails = 'emails',
	notes = 'notes',
	companies = 'companies',
	contacts = 'contacts',
	deals = 'deals',
	tickets = 'tickets',
}
export const ASSOCIATION_KEYS: string[] = [
	E_ASSOCIATION_KEY.emails,
	E_ASSOCIATION_KEY.notes,
	E_ASSOCIATION_KEY.companies,
	E_ASSOCIATION_KEY.contacts,
	E_ASSOCIATION_KEY.deals,
	E_ASSOCIATION_KEY.tickets,
]
export const ASSOCIATIONS_META_MAP: T_ASSOCIATIONS_META_MAP = new Map([
	[E_ASSOCIATION_KEY.emails, { api_name: 'email', property_name: 'emails' }],
	[E_ASSOCIATION_KEY.notes, { api_name: 'note', property_name: 'notes' }],
	[
		E_ASSOCIATION_KEY.companies,
		{ api_name: 'company', property_name: 'companies' },
	],
	[
		E_ASSOCIATION_KEY.contacts,
		{ api_name: 'contact', property_name: 'contacts' },
	],
	[E_ASSOCIATION_KEY.deals, { api_name: 'deal', property_name: 'deals' }],
	[
		E_ASSOCIATION_KEY.tickets,
		{ api_name: 'ticket', property_name: 'tickets' },
	],
])
export const PIPELINE_STAGE_MAPPINGS = new Map<string, string>([
	['172972345', '1120559245'], // Not Submitted
	['192344246', '1120559252'], // Ready for Finance Review
	['203065970', '1120559253'], // Under Manager Review
	['203041335', '1120621909'], // Under Finance Review
	['203041336', '1120559254'], // Approved
	['172972347', '1120559255'], // In Progress
	['173020599', '1120559246'], // Completed
	['173020600', '1120559256'], // Rejected
	['173020601', '1120494401'], // Cancelled
])
