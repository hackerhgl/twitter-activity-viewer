export interface Tweet {
	bookmark_count?: number
	bookmarked?: boolean
	conversation_id_str: string
	display_text_range: number[]
	entities: TweetEntities
	favorite_count: number
	favorited: boolean
	full_text: string
	in_reply_to_status_id_str?: string
	is_quote_status: boolean
	lang: string
	possibly_sensitive?: boolean
	possibly_sensitive_editable?: boolean
	quote_count: number
	reply_count: number
	retweet_count: number
	retweeted: boolean
	id_str: string
	edit_control?: TweetEditControl
	edit_perspective?: TweetEditPerspective
	is_translatable?: boolean
	has_super_follower: boolean
	source: string
	user: string
	in_reply_to_user?: string
	views?: TweetViews
	extended_entities?: TweetExtendedEntities
	text: string
	created_at: string
	source_name: string
	source_url: string
	in_reply_to_user_id_str?: string
	in_reply_to_screen_name?: string
	id?: number
	truncated?: boolean
	in_reply_to_status_id: any
	in_reply_to_user_id: any
	user_id?: number
	geo: any
	coordinates: any
	place?: TweetPlace
	contributors: any
	conversation_id?: number
	conversation_muted?: boolean
	self_thread?: TweetSelfThread
	quoted_status_id?: number
	quoted_status?: string
	retweeted_status?: string
	conversation_control?: TweetConversationControl
	limited_actions?: string
	card?: string
	unified_card?: UnifiedCard
	birdwatch_pivot?: TweetBirdwatchPivot
	quoted_status_permalink?: TweetQuotedStatusPermalink
	note_tweet?: TweetNoteTweet
	previous_counts?: TweetPreviousCounts
	isEdited?: boolean
	unmentioned_user_ids?: string[]
	scopes?: TweetScopes
	vibe?: TweetVibe
	voiceInfo?: TweetVoiceInfo
	has_birdwatch_notes?: boolean
}

export interface TweetEntities {
	media?: TweetEntitiesMedia[]
	user_mentions: TweetEntitiesUserMention[]
	urls: TweetEntitiesUrl[]
	hashtags: TweetEntitiesHashtag[]
	symbols: TweetEntitiesSymbol[]
}

export interface TweetEntitiesMedia {
	display_url: string
	expanded_url: string
	id_str: string
	indices: number[]
	media_url_https: string
	type: string
	url: string
	sizes: TweetEntitiesMediaSizes
	original_info: TweetEntitiesMediaOriginalInfo
	source_status_id_str?: string
	source_user_id_str?: string
	id?: number
	media_url?: string
	features?: TweetEntitiesMediaFeatures
	source_status_id?: number
	source_user_id?: number
}

export interface TweetEntitiesMediaSizes {
	large: TweetEntitiesMediaSizesLarge
	medium: TweetEntitiesMediaSizesMedium
	small: TweetEntitiesMediaSizesSmall
	thumb: TweetEntitiesMediaSizesThumb
}

export interface TweetEntitiesMediaSizesLarge {
	h: number
	w: number
	resize: string
}

export interface TweetEntitiesMediaSizesMedium {
	h: number
	w: number
	resize: string
}

export interface TweetEntitiesMediaSizesSmall {
	h: number
	w: number
	resize: string
}

export interface TweetEntitiesMediaSizesThumb {
	h: number
	w: number
	resize: string
}

export interface TweetEntitiesMediaOriginalInfo {
	height: number
	width: number
	focus_rects?: TweetEntitiesMediaOriginalInfoFocusRect[]
}

export interface TweetEntitiesMediaOriginalInfoFocusRect {
	x: number
	y: number
	w: number
	h: number
}

export interface TweetEntitiesMediaFeatures {
	small?: TweetEntitiesMediaFeaturesSmall
	medium?: TweetEntitiesMediaFeaturesMedium
	orig?: TweetEntitiesMediaFeaturesOrig
	large?: TweetEntitiesMediaFeaturesLarge
}

export interface TweetEntitiesMediaFeaturesSmall {
	faces: TweetEntitiesMediaFeaturesSmallFace[]
}

export interface TweetEntitiesMediaFeaturesSmallFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetEntitiesMediaFeaturesMedium {
	faces: TweetEntitiesMediaFeaturesMediumFace[]
}

export interface TweetEntitiesMediaFeaturesMediumFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetEntitiesMediaFeaturesOrig {
	faces: TweetEntitiesMediaFeaturesOrigFace[]
}

export interface TweetEntitiesMediaFeaturesOrigFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetEntitiesMediaFeaturesLarge {
	faces: TweetEntitiesMediaFeaturesLargeFace[]
}

export interface TweetEntitiesMediaFeaturesLargeFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetEntitiesUserMention {
	id_str: string
	name: string
	screen_name: string
	indices: number[]
	id?: number
}

export interface TweetEntitiesUrl {
	display_url: string
	expanded_url: string
	url: string
	indices: number[]
}

export interface TweetEntitiesHashtag {
	text: string
	indices: number[]
}

export interface TweetEntitiesSymbol {
	indices: number[]
	text: string
}

export interface TweetEditControl {
	edit_tweet_ids: string[]
	editable_until_msecs: string
	is_edit_eligible: boolean
	edits_remaining: string
	initial_tweet_id?: string
}

export interface TweetEditPerspective {
	favorited: boolean
	retweeted: boolean
}

export interface TweetViews {
	state: string
	count?: number
}

export interface TweetExtendedEntities {
	media: TweetExtendedEntitiesMedia[]
}

export interface TweetExtendedEntitiesMedia {
	display_url: string
	expanded_url: string
	id_str: string
	indices: number[]
	media_key?: string
	media_url_https: string
	type: string
	url: string
	ext_media_availability: TweetExtendedEntitiesMediaExtMediaAvailability
	sizes: TweetExtendedEntitiesMediaSizes
	original_info: TweetExtendedEntitiesMediaOriginalInfo
	video_info?: TweetExtendedEntitiesMediaVideoInfo
	additional_media_info?: TweetExtendedEntitiesMediaAdditionalMediaInfo
	mediaStats?: TweetExtendedEntitiesMediaMediaStats
	source_status_id_str?: string
	source_user_id_str?: string
	ext_alt_text?: string
	sensitive_media_warning?: TweetExtendedEntitiesMediaSensitiveMediaWarning
	id?: number
	media_url?: string
	features?: TweetExtendedEntitiesMediaFeatures
	ext_sensitive_media_warning: any
	ext_media_color?: TweetExtendedEntitiesMediaExtMediaColor
	ext?: TweetExtendedEntitiesMediaExt
	source_status_id?: number
	source_user_id?: number
}

export interface TweetExtendedEntitiesMediaExtMediaAvailability {
	status: string
	reason?: string
}

export interface TweetExtendedEntitiesMediaSizes {
	large: TweetExtendedEntitiesMediaSizesLarge
	medium: TweetExtendedEntitiesMediaSizesMedium
	small: TweetExtendedEntitiesMediaSizesSmall
	thumb: TweetExtendedEntitiesMediaSizesThumb
}

export interface TweetExtendedEntitiesMediaSizesLarge {
	h: number
	w: number
	resize: string
}

export interface TweetExtendedEntitiesMediaSizesMedium {
	h: number
	w: number
	resize: string
}

export interface TweetExtendedEntitiesMediaSizesSmall {
	h: number
	w: number
	resize: string
}

export interface TweetExtendedEntitiesMediaSizesThumb {
	h: number
	w: number
	resize: string
}

export interface TweetExtendedEntitiesMediaOriginalInfo {
	height: number
	width: number
	focus_rects?: TweetExtendedEntitiesMediaOriginalInfoFocusRect[]
}

export interface TweetExtendedEntitiesMediaOriginalInfoFocusRect {
	x: number
	y: number
	w: number
	h: number
}

export interface TweetExtendedEntitiesMediaVideoInfo {
	aspect_ratio: number[]
	variants: TweetExtendedEntitiesMediaVideoInfoVariant[]
	duration_millis?: number
}

export interface TweetExtendedEntitiesMediaVideoInfoVariant {
	bitrate?: number
	content_type: string
	url: string
}

export interface TweetExtendedEntitiesMediaAdditionalMediaInfo {
	monetizable: boolean
	source_user?: string
	title?: string
	description?: string
	embeddable?: boolean
	call_to_actions?: TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActions
}

export interface TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActions {
	watch_now?: TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActionsWatchNow
	visit_site?: TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActionsVisitSite
}

export interface TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActionsWatchNow {
	url: string
}

export interface TweetExtendedEntitiesMediaAdditionalMediaInfoCallToActionsVisitSite {
	url: string
}

export interface TweetExtendedEntitiesMediaMediaStats {
	viewCount: any
}

export interface TweetExtendedEntitiesMediaSensitiveMediaWarning {
	other: boolean
}

export interface TweetExtendedEntitiesMediaFeatures {
	small?: TweetExtendedEntitiesMediaFeaturesSmall
	medium?: TweetExtendedEntitiesMediaFeaturesMedium
	orig?: TweetExtendedEntitiesMediaFeaturesOrig
	large?: TweetExtendedEntitiesMediaFeaturesLarge
}

export interface TweetExtendedEntitiesMediaFeaturesSmall {
	faces: TweetExtendedEntitiesMediaFeaturesSmallFace[]
}

export interface TweetExtendedEntitiesMediaFeaturesSmallFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetExtendedEntitiesMediaFeaturesMedium {
	faces: TweetExtendedEntitiesMediaFeaturesMediumFace[]
}

export interface TweetExtendedEntitiesMediaFeaturesMediumFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetExtendedEntitiesMediaFeaturesOrig {
	faces: TweetExtendedEntitiesMediaFeaturesOrigFace[]
}

export interface TweetExtendedEntitiesMediaFeaturesOrigFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetExtendedEntitiesMediaFeaturesLarge {
	faces: TweetExtendedEntitiesMediaFeaturesLargeFace[]
}

export interface TweetExtendedEntitiesMediaFeaturesLargeFace {
	x: number
	y: number
	h: number
	w: number
}

export interface TweetExtendedEntitiesMediaExtMediaColor {
	palette: TweetExtendedEntitiesMediaExtMediaColorPalette[]
}

export interface TweetExtendedEntitiesMediaExtMediaColorPalette {
	rgb: TweetExtendedEntitiesMediaExtMediaColorPaletteRgb
	percentage: number
}

export interface TweetExtendedEntitiesMediaExtMediaColorPaletteRgb {
	red: number
	green: number
	blue: number
}

export interface TweetExtendedEntitiesMediaExt {
	mediaStats: TweetExtendedEntitiesMediaExtMediaStats
}

export interface TweetExtendedEntitiesMediaExtMediaStats {
	r: any
	ttl: number
}

export interface TweetPlace {
	attributes: TweetPlaceAttributes
	bounding_box: TweetPlaceBoundingBox
	contained_within: any[]
	country: string
	country_code: string
	full_name: string
	name: string
	id: string
	place_type: string
	url: string
}

export interface TweetPlaceAttributes {}

export interface TweetPlaceBoundingBox {
	coordinates: number[][][]
	type: string
}

export interface TweetSelfThread {
	id_str: string
	id?: number
}

export interface TweetConversationControl {
	conversation_owner: TweetConversationControlConversationOwner
	policy: string
}

export interface TweetConversationControlConversationOwner {
	screen_name: string
}

export interface UnifiedCard {
	card_fetch_state: string
}

export interface TweetBirdwatchPivot {
	callToAction: TweetBirdwatchPivotCallToAction
	destinationUrl: string
	footer: TweetBirdwatchPivotFooter
	note: TweetBirdwatchPivotNote
	subtitle: TweetBirdwatchPivotSubtitle
	title: string
	iconType: string
}

export interface TweetBirdwatchPivotCallToAction {
	prompt: string
	title: string
	destinationUrl: string
}

export interface TweetBirdwatchPivotFooter {
	text: string
	entities: TweetBirdwatchPivotFooterEntity[]
}

export interface TweetBirdwatchPivotFooterEntity {
	fromIndex: number
	toIndex: number
	ref: TweetBirdwatchPivotFooterEntityRef
}

export interface TweetBirdwatchPivotFooterEntityRef {
	url: TweetBirdwatchPivotFooterEntityRefUrl
}

export interface TweetBirdwatchPivotFooterEntityRefUrl {
	type: string
	url: string
	urlType: string
}

export interface TweetBirdwatchPivotNote {
	rest_id: string
	data_v1: TweetBirdwatchPivotNoteDataV1
	decided_by: string
	rating_status: string
	rating_survey: TweetBirdwatchPivotNoteRatingSurvey
	helpful_tags: string[]
	tweet_results: TweetBirdwatchPivotNoteTweetResults
	birdwatch_profile: TweetBirdwatchPivotNoteBirdwatchProfile
	created_at: number
	can_appeal: boolean
	appeal_status: string
}

export interface TweetBirdwatchPivotNoteDataV1 {
	classification: string
	summary: TweetBirdwatchPivotNoteDataV1Summary
	misleading_tags: string[]
	trustworthy_sources: boolean
}

export interface TweetBirdwatchPivotNoteDataV1Summary {
	text: string
	entities: TweetBirdwatchPivotNoteDataV1SummaryEntity[]
}

export interface TweetBirdwatchPivotNoteDataV1SummaryEntity {
	fromIndex: number
	toIndex: number
	ref: TweetBirdwatchPivotNoteDataV1SummaryEntityRef
}

export interface TweetBirdwatchPivotNoteDataV1SummaryEntityRef {
	type: string
	url: string
	urlType: string
}

export interface TweetBirdwatchPivotNoteRatingSurvey {
	url: string
	urlType: string
}

export interface TweetBirdwatchPivotNoteTweetResults {
	result: TweetBirdwatchPivotNoteTweetResultsResult
}

export interface TweetBirdwatchPivotNoteTweetResultsResult {
	rest_id: string
}

export interface TweetBirdwatchPivotNoteBirdwatchProfile {
	alias: string
	ratings_count: TweetBirdwatchPivotNoteBirdwatchProfileRatingsCount
	notes_count: TweetBirdwatchPivotNoteBirdwatchProfileNotesCount
}

export interface TweetBirdwatchPivotNoteBirdwatchProfileRatingsCount {
	successful: TweetBirdwatchPivotNoteBirdwatchProfileRatingsCountSuccessful
	unsuccessful: TweetBirdwatchPivotNoteBirdwatchProfileRatingsCountUnsuccessful
	last_updated_at: number
	rated_after_decision: number
	awaiting_more_ratings: number
}

export interface TweetBirdwatchPivotNoteBirdwatchProfileRatingsCountSuccessful {
	helpful_count: number
	not_helpful_count: number
	total: number
}

export interface TweetBirdwatchPivotNoteBirdwatchProfileRatingsCountUnsuccessful {
	helpful_count: number
	not_helpful_count: number
	total: number
}

export interface TweetBirdwatchPivotNoteBirdwatchProfileNotesCount {
	currently_rated_helpful: number
	currently_rated_not_helpful: number
	awaiting_more_ratings: number
	last_updated_at: number
}

export interface TweetBirdwatchPivotSubtitle {
	text: string
	entities: TweetBirdwatchPivotSubtitleEntity[]
}

export interface TweetBirdwatchPivotSubtitleEntity {
	fromIndex: number
	toIndex: number
	ref: TweetBirdwatchPivotSubtitleEntityRef
}

export interface TweetBirdwatchPivotSubtitleEntityRef {
	url: TweetBirdwatchPivotSubtitleEntityRefUrl
}

export interface TweetBirdwatchPivotSubtitleEntityRefUrl {
	type: string
	url: string
	urlType: string
}

export interface TweetQuotedStatusPermalink {
	url: string
	expanded: string
	display: string
}

export interface TweetNoteTweet {
	id: string
	text: string
	entity_set: TweetNoteTweetEntitySet
	richtext_tags: any[]
}

export interface TweetNoteTweetEntitySet {
	user_mentions: TweetNoteTweetEntitySetUserMention[]
	urls: any[]
	hashtags: any[]
	symbols: any[]
}

export interface TweetNoteTweetEntitySetUserMention {
	id_str: string
	name: string
	screen_name: string
	indices: number[]
}

export interface TweetPreviousCounts {
	bookmark_count: number
	favorite_count: number
	quote_count: number
	reply_count: number
	retweet_count: number
}

export interface TweetScopes {
	followers: boolean
}

export interface TweetVibe {
	annotation: TweetVibeAnnotation
	discoveryQueryText: string
	imgUrl: string
	imgDescription: string
	text: string
}

export interface TweetVibeAnnotation {
	domain_id: string
	entity_id: string
	group_id: string
}

export interface TweetVoiceInfo {}
