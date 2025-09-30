export type T_MAPPING = { source: string; dest: string }
export type T_ASSOCIATION = {
	api_name: string
	property_name: string
}
export type T_ASSOCIATIONS_META_MAP = Map<string, T_ASSOCIATION>

export type T_MAPPING_WITH_ASSOCIATIONS = T_MAPPING & {
	associations: Map<string, string[]> // <key, associated_ids>
}

export type T_ASSOCIATIONS_MAP = Map<string, string[]>
export type T_ALL_ASSOCIATIONS_MAP = Map<string, T_ASSOCIATIONS_MAP>
