// internal names
// [Ticket, Billing Request]
export const PROP_MAPPINGS = [
	// working
	['hs_pipeline_stage', 'hs_pipeline_stage'],
	['amount', 'amount'],
	['finance_ticket_reason', 'billing_request_reason'],
	['original_ticket_owner', 'billing_request_submitter'],
	['billing_start_date', 'billing_start_date'],
	['billing_street_address', 'billing_street_address'],
	['content', 'description'],
	['hs_shared_team_ids', 'hs_shared_team_ids'],
	['hs_shared_user_ids', 'hs_shared_user_ids'],
	['outstanding_invoice_instructions', 'outstanding_invoice_instructions'],
	['refund_credit_channel', 'refund_credit_channel'],
	['subject', 'request_name'],
	['close_date', 'close_date'],
	['billing_type', 'billing_request_type'],
	['finance_review_status', 'billing_review_status'],
	['buyer_id', 'buyer_id'],
	['canceled_reason', 'canceled_reason'],
	['effective_date', 'effective_date'],
	[
		'finance_approval_process_initiated',
		'finance_approval_process_initiated',
	],
	['manager_review_status', 'manager_review_status'],
	['rejection_reason', 'rejection_reason'],
	['billing_city', 'billing_city'],
	['billing_country', 'billing_country'],
	['billing_email', 'billing_email'],
	['billing_first_name', 'billing_first_name'],
	['billing_last_name', 'billing_last_name'],
	['billing_state', 'billing_state'],
	['billing_note_details', 'billing_note_details'],
	['billing_zip_code', 'billing_zip_code'],
	['final_bill_date', 'final_bill_date'],
	['package', 'package2'],
	['deal_from_pipeline', 'deal_pipeline2'],
]

export const FIX_MAPPINGS = [
	['closed_date', 'close_date'],
	['hubspot_owner_id', 'hubspot_owner_id'],
]
