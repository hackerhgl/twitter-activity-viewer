export type Root = TwitterUser[]

export interface TwitterUserIndex {
	user: string
	tweets: string[]
}

export interface TwitterUser {
	can_dm?: boolean
	can_media_tag?: boolean
	default_profile?: boolean
	default_profile_image?: boolean
	description?: string
	entities?: Entities
	fast_followers_count?: number
	favourites_count?: number
	followers_count?: number
	friends_count?: number
	has_custom_timelines?: boolean
	is_translator?: boolean
	listed_count?: number
	location?: string
	media_count?: number
	name?: string
	normal_followers_count?: number
	pinned_tweet_ids_str?: string[]
	possibly_sensitive?: boolean
	profile_banner_url?: string
	profile_image_url_https?: string
	profile_interstitial_type?: string
	screen_name: string
	statuses_count?: number
	translator_type?: string
	url?: string
	verified?: boolean
	want_retweets?: boolean
	withheld_in_countries?: string[]
	id_str: string
	business_account?: BusinessAccount
	is_blue_verified?: boolean
	has_graduated_access?: boolean
	created_at?: string
	professional?: Professional
	highlightedLabel?: HighlightedLabel
	verified_type?: string
	following?: boolean
	super_follow_eligible?: boolean
	has_nft_avatar?: boolean
	id?: number
	protected?: boolean
	utc_offset: any
	time_zone: any
	geo_enabled?: boolean
	lang: any
	contributors_enabled?: boolean
	is_translation_enabled?: boolean
	profile_background_color?: string
	profile_background_image_url?: string
	profile_background_image_url_https?: string
	profile_background_tile?: boolean
	profile_image_url?: string
	profile_link_color?: string
	profile_sidebar_border_color?: string
	profile_sidebar_fill_color?: string
	profile_text_color?: string
	profile_use_background_image?: boolean
	follow_request_sent?: boolean
	notifications?: boolean
	blocking?: boolean
	blocked_by?: boolean
	followed_by?: boolean
	is_profile_translatable?: boolean
	smart_blocked_by?: boolean
	smart_blocking?: boolean
	verification_info?: VerificationInfo
	birthdate?: Birthdate
	profile_location?: ProfileLocation
	pinned_tweet_ids?: number[]
	muting?: boolean
	advertiser_account_type?: string
	advertiser_account_service_levels?: any[]
	analytics_type?: string
	business_profile_state?: string
	require_some_consent?: boolean
	needs_phone_verification?: boolean
}

export interface Entities {
	description: Description
	url?: Url2
}

export interface Description {
	urls: Url[]
	hashtags?: any[]
	symbols?: any[]
	user_mentions?: any[]
}

export interface Url {
	display_url: string
	expanded_url: string
	url: string
	indices: number[]
}

export interface Url2 {
	urls: Url3[]
}

export interface Url3 {
	display_url: string
	expanded_url: string
	url: string
	indices: number[]
}

export interface BusinessAccount {
	affiliates_count?: number
}

export interface Professional {
	rest_id: string
	professional_type: string
	category: Category[]
}

export interface Category {
	id: number
	name: string
	icon_name: string
}

export interface HighlightedLabel {
	badge: Badge
	description: string
	longDescription?: LongDescription
	userLabelType?: string
	url?: Url4
	userLabelDisplayType?: string
}

export interface Badge {
	url: string
}

export interface LongDescription {
	text: string
	entities: Entity[]
}

export interface Entity {
	fromIndex: number
	toIndex: number
	ref: Ref
}

export interface Ref {
	mention: Mention
}

export interface Mention {
	id: string
	screenName: string
}

export interface Url4 {
	url: string
	urlType: string
}

export interface VerificationInfo {}

export interface Birthdate {
	day: number
	month: number
	year: number
	visibility: string
	year_visibility: string
}

export interface ProfileLocation {
	id: string
	url: string
	place_type: string
	name: string
	full_name: string
	country_code: string
	country: string
	contained_within: any[]
	bounding_box: any
	attributes: Attributes
}

export interface Attributes {}
