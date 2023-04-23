export type Root = Tweet[]

export interface Tweet {
  bookmark_count?: number
  bookmarked?: boolean
  conversation_id_str: string
  display_text_range: number[]
  entities: Entities
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
  edit_control?: EditControl
  edit_perspective?: EditPerspective
  is_translatable?: boolean
  has_super_follower: boolean
  source: string
  user: string
  in_reply_to_user?: string
  views?: Views
  extended_entities?: ExtendedEntities
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
  place?: Place
  contributors: any
  conversation_id?: number
  conversation_muted?: boolean
  self_thread?: SelfThread
  quoted_status_id?: number
  quoted_status?: string
  retweeted_status?: string
  conversation_control?: ConversationControl
  limited_actions?: string
  card?: string
  unified_card?: UnifiedCard
  birdwatch_pivot?: BirdwatchPivot
  quoted_status_permalink?: QuotedStatusPermalink
  note_tweet?: NoteTweet
  previous_counts?: PreviousCounts
  isEdited?: boolean
  unmentioned_user_ids?: string[]
  scopes?: Scopes
  vibe?: Vibe
  voiceInfo?: VoiceInfo
  has_birdwatch_notes?: boolean
}

export interface Entities {
  media?: Medum[]
  user_mentions: UserMention[]
  urls: Url[]
  hashtags: Hashtag[]
  symbols: Symbol[]
}

export interface Medum {
  display_url: string
  expanded_url: string
  id_str: string
  indices: number[]
  media_url_https: string
  type: string
  url: string
  sizes: Sizes
  original_info: OriginalInfo
  source_status_id_str?: string
  source_user_id_str?: string
  id?: number
  media_url?: string
  features?: Features
  source_status_id?: number
  source_user_id?: number
}

export interface Sizes {
  large: Large
  medium: Medium
  small: Small
  thumb: Thumb
}

export interface Large {
  h: number
  w: number
  resize: string
}

export interface Medium {
  h: number
  w: number
  resize: string
}

export interface Small {
  h: number
  w: number
  resize: string
}

export interface Thumb {
  h: number
  w: number
  resize: string
}

export interface OriginalInfo {
  height: number
  width: number
  focus_rects?: FocusRect[]
}

export interface FocusRect {
  x: number
  y: number
  w: number
  h: number
}

export interface Features {
  small?: Small2
  medium?: Medium2
  orig?: Orig
  large?: Large2
}

export interface Small2 {
  faces: Face[]
}

export interface Face {
  x: number
  y: number
  h: number
  w: number
}

export interface Medium2 {
  faces: Face2[]
}

export interface Face2 {
  x: number
  y: number
  h: number
  w: number
}

export interface Orig {
  faces: Face3[]
}

export interface Face3 {
  x: number
  y: number
  h: number
  w: number
}

export interface Large2 {
  faces: Face4[]
}

export interface Face4 {
  x: number
  y: number
  h: number
  w: number
}

export interface UserMention {
  id_str: string
  name: string
  screen_name: string
  indices: number[]
  id?: number
}

export interface Url {
  display_url: string
  expanded_url: string
  url: string
  indices: number[]
}

export interface Hashtag {
  text: string
  indices: number[]
}

export interface Symbol {
  indices: number[]
  text: string
}

export interface EditControl {
  edit_tweet_ids: string[]
  editable_until_msecs: string
  is_edit_eligible: boolean
  edits_remaining: string
  initial_tweet_id?: string
}

export interface EditPerspective {
  favorited: boolean
  retweeted: boolean
}

export interface Views {
  state: string
  count?: number
}

export interface ExtendedEntities {
  media: Medum2[]
}

export interface Medum2 {
  display_url: string
  expanded_url: string
  id_str: string
  indices: number[]
  media_key?: string
  media_url_https: string
  type: string
  url: string
  ext_media_availability: ExtMediaAvailability
  sizes: Sizes2
  original_info: OriginalInfo2
  video_info?: VideoInfo
  additional_media_info?: AdditionalMediaInfo
  mediaStats?: MediaStats
  source_status_id_str?: string
  source_user_id_str?: string
  ext_alt_text?: string
  sensitive_media_warning?: SensitiveMediaWarning
  id?: number
  media_url?: string
  features?: Features2
  ext_sensitive_media_warning: any
  ext_media_color?: ExtMediaColor
  ext?: Ext
  source_status_id?: number
  source_user_id?: number
}

export interface ExtMediaAvailability {
  status: string
  reason?: string
}

export interface Sizes2 {
  large: Large3
  medium: Medium3
  small: Small3
  thumb: Thumb2
}

export interface Large3 {
  h: number
  w: number
  resize: string
}

export interface Medium3 {
  h: number
  w: number
  resize: string
}

export interface Small3 {
  h: number
  w: number
  resize: string
}

export interface Thumb2 {
  h: number
  w: number
  resize: string
}

export interface OriginalInfo2 {
  height: number
  width: number
  focus_rects?: FocusRect2[]
}

export interface FocusRect2 {
  x: number
  y: number
  w: number
  h: number
}

export interface VideoInfo {
  aspect_ratio: number[]
  variants: Variant[]
  duration_millis?: number
}

export interface Variant {
  bitrate?: number
  content_type: string
  url: string
}

export interface AdditionalMediaInfo {
  monetizable: boolean
  source_user?: string
  title?: string
  description?: string
  embeddable?: boolean
  call_to_actions?: CallToActions
}

export interface CallToActions {
  watch_now?: WatchNow
  visit_site?: VisitSite
}

export interface WatchNow {
  url: string
}

export interface VisitSite {
  url: string
}

export interface MediaStats {
  viewCount: any
}

export interface SensitiveMediaWarning {
  other: boolean
}

export interface Features2 {
  small?: Small4
  medium?: Medium4
  orig?: Orig2
  large?: Large4
}

export interface Small4 {
  faces: Face5[]
}

export interface Face5 {
  x: number
  y: number
  h: number
  w: number
}

export interface Medium4 {
  faces: Face6[]
}

export interface Face6 {
  x: number
  y: number
  h: number
  w: number
}

export interface Orig2 {
  faces: Face7[]
}

export interface Face7 {
  x: number
  y: number
  h: number
  w: number
}

export interface Large4 {
  faces: Face8[]
}

export interface Face8 {
  x: number
  y: number
  h: number
  w: number
}

export interface ExtMediaColor {
  palette: Palette[]
}

export interface Palette {
  rgb: Rgb
  percentage: number
}

export interface Rgb {
  red: number
  green: number
  blue: number
}

export interface Ext {
  mediaStats: MediaStats2
}

export interface MediaStats2 {
  r: any
  ttl: number
}

export interface Place {
  attributes: Attributes
  bounding_box: BoundingBox
  contained_within: any[]
  country: string
  country_code: string
  full_name: string
  name: string
  id: string
  place_type: string
  url: string
}

export interface Attributes {}

export interface BoundingBox {
  coordinates: number[][][]
  type: string
}

export interface SelfThread {
  id_str: string
  id?: number
}

export interface ConversationControl {
  conversation_owner: ConversationOwner
  policy: string
}

export interface ConversationOwner {
  screen_name: string
}

export interface UnifiedCard {
  card_fetch_state: string
}

export interface BirdwatchPivot {
  callToAction: CallToAction
  destinationUrl: string
  footer: Footer
  note: Note
  subtitle: Subtitle
  title: string
  iconType: string
}

export interface CallToAction {
  prompt: string
  title: string
  destinationUrl: string
}

export interface Footer {
  text: string
  entities: Entity[]
}

export interface Entity {
  fromIndex: number
  toIndex: number
  ref: Ref
}

export interface Ref {
  url: Url2
}

export interface Url2 {
  type: string
  url: string
  urlType: string
}

export interface Note {
  rest_id: string
  data_v1: DataV1
  decided_by: string
  rating_status: string
  rating_survey: RatingSurvey
  helpful_tags: string[]
  tweet_results: TweetResults
  birdwatch_profile: BirdwatchProfile
  created_at: number
  can_appeal: boolean
  appeal_status: string
}

export interface DataV1 {
  classification: string
  summary: Summary
  misleading_tags: string[]
  trustworthy_sources: boolean
}

export interface Summary {
  text: string
  entities: Entity2[]
}

export interface Entity2 {
  fromIndex: number
  toIndex: number
  ref: Ref2
}

export interface Ref2 {
  type: string
  url: string
  urlType: string
}

export interface RatingSurvey {
  url: string
  urlType: string
}

export interface TweetResults {
  result: Result
}

export interface Result {
  rest_id: string
}

export interface BirdwatchProfile {
  alias: string
  ratings_count: RatingsCount
  notes_count: NotesCount
}

export interface RatingsCount {
  successful: Successful
  unsuccessful: Unsuccessful
  last_updated_at: number
  rated_after_decision: number
  awaiting_more_ratings: number
}

export interface Successful {
  helpful_count: number
  not_helpful_count: number
  total: number
}

export interface Unsuccessful {
  helpful_count: number
  not_helpful_count: number
  total: number
}

export interface NotesCount {
  currently_rated_helpful: number
  currently_rated_not_helpful: number
  awaiting_more_ratings: number
  last_updated_at: number
}

export interface Subtitle {
  text: string
  entities: Entity3[]
}

export interface Entity3 {
  fromIndex: number
  toIndex: number
  ref: Ref3
}

export interface Ref3 {
  url: Url3
}

export interface Url3 {
  type: string
  url: string
  urlType: string
}

export interface QuotedStatusPermalink {
  url: string
  expanded: string
  display: string
}

export interface NoteTweet {
  id: string
  text: string
  entity_set: EntitySet
  richtext_tags: any[]
}

export interface EntitySet {
  user_mentions: UserMention2[]
  urls: any[]
  hashtags: any[]
  symbols: any[]
}

export interface UserMention2 {
  id_str: string
  name: string
  screen_name: string
  indices: number[]
}

export interface PreviousCounts {
  bookmark_count: number
  favorite_count: number
  quote_count: number
  reply_count: number
  retweet_count: number
}

export interface Scopes {
  followers: boolean
}

export interface Vibe {
  annotation: Annotation
  discoveryQueryText: string
  imgUrl: string
  imgDescription: string
  text: string
}

export interface Annotation {
  domain_id: string
  entity_id: string
  group_id: string
}

export interface VoiceInfo {}
