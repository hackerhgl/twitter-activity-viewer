import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import rawTweets from '@/assets/data.json';
import type { Tweet } from '@/types/tweet';
import {orderBy, isString} from 'lodash';
import dayjs from 'dayjs';
import rawIndexes from '@/assets/tweets_index.json';
import type {  TwitterUserIndex } from '@/types/user';
// A typescript custom filter type for 'include' or 'exclude
// 'include' means that the filter will only show tweets from the users in the filter
// 'exclude' means that the filter will only show tweets from users not in the filter
export type UserFilterType = 'include' | 'exclude' | null;

interface VisitedTweet {
  id: string;
  date: Date;
}

const indexes = rawIndexes as TwitterUserIndex[];

export const useTwitterStore = defineStore('twitterStore', () => {
  const data = rawTweets as Tweet[];
  const users = ref<string[]>([]);
  const userFilter = ref<UserFilterType>('include');
  const userFilterByName = ref('');
  const tweetTextSearch = ref('');
  const tweetUserMentionsSearch = ref('');
  const showAfterInitialDate = data.reduce((prev, current) => (prev.created_at < current.created_at) ? prev : current).created_at;
  const showBeforeInitialDate = data.reduce((prev, current) => (prev.created_at > current.created_at) ? prev : current).created_at;
  const showAfterInitial = dayjs(showAfterInitialDate).subtract(1, 'day').toDate();
  const showBeforeInitial = dayjs(showBeforeInitialDate).add(1, 'day').toDate();
  const showAfter = ref(showAfterInitial);
  const showBefore = ref(showBeforeInitial);
  const reverseByDate = ref(false);
  const reverseUsersByActions = ref(false);
  const includeMentionedUsers = ref(false);
  const includeVisitedTweets = ref(true);
  const onlyVisitedTweets = ref(false);
  const sortVisitedTweets = ref(false);
  const reverseVisitedTweets = ref(false);
  const includeRetweets = ref(true);
  const onlyRetweets = ref(false);
  const visitedTweets = ref<VisitedTweet[]>([]);
  const includeNoActionUsers = ref(false);
  const filterTweetsByUserActions = ref(false);
  const filterTweetsByUserActionsGreater = ref(true);
  const filterTweetsByUserActionsCount = ref('0');


  function toggleUser(userId: string) {
    if (users.value.includes(userId)) {
      users.value = users.value.filter((user) => user !== userId);
    } else {
      users.value.push(userId);
    }
  }

  function updateUserFilter(filter: UserFilterType) {
    userFilter.value = filter;
  }

  function filterUserExist(tweet: Tweet) {
    return users.value.filter((user) => {
      const idCheck = user === tweet.user;
      const inReplyCheck = user === tweet.in_reply_to_user_id?.toString();
      const entitiesMentionCheck = includeMentionedUsers.value ? tweet.entities?.user_mentions?.some((mention) => mention.id_str === user): false;
      const entitiesMediumCheck = tweet.entities?.media?.some((medium) => medium.source_user_id_str === user);
      const extendedEntities = tweet.extended_entities?.media?.some((medium) => medium.source_user_id_str === user);
        
      const checksArray = [
        idCheck,
        inReplyCheck,
        entitiesMentionCheck,
        entitiesMediumCheck,
        extendedEntities,
      ];

      const checks = checksArray.some((check) => check === true);

      return checks;
    });
  }

  function checkUserFilter(tweet: Tweet) {
    if (userFilter.value === null) {
      return true;
    }

    const userCheck = filterUserExist(tweet).length > 0;
    const included = userFilter.value === 'include' && userCheck;
    const excluded = userFilter.value === 'exclude' && !userCheck;
    const checksArray = [
      included,
      excluded,
    ];
    const checks = checksArray.some((check) => check === true);
    return checks;
  }

  function filterDate(tweet: Tweet) {
    const showAfterCheck = dayjs(tweet.created_at).isAfter(showAfter.value);
    const showBeforeCheck = dayjs(tweet.created_at).isBefore(showBefore.value);
    const checksArray = [
      showAfterCheck,
      showBeforeCheck
    ]
    const checks = checksArray.every((check) => check === true);
    return checks;
  }

  const filtered = computed(() => {
      const cleaned =  data.filter((tweet) => {
        const userCheck = checkUserFilter(tweet);
        const dateCheck = filterDate(tweet);
        const textCheck = tweet.text.toLowerCase().includes(tweetTextSearch.value.toLowerCase());
        const userMentionsFilter = tweet.entities?.user_mentions?.some((mention) => {
          const value = tweetUserMentionsSearch.value.toLowerCase();
          return mention.screen_name.toLowerCase().includes(value) || mention.name.toLowerCase().includes(value);
        });
        const userMentionsCheck = tweetUserMentionsSearch.value === '' || userMentionsFilter;

        const includedVisitedCheck = includeVisitedTweets.value ? true : !visitedTweets.value.some((visited) => visited.id === tweet.id_str);
        const onlyVisitedCheck = onlyVisitedTweets.value ? visitedTweets.value.some((visited) => visited.id === tweet.id_str) : true;
        const visitCheck = onlyVisitedTweets.value ? onlyVisitedCheck : includedVisitedCheck;

        const includedRetweetCheck = includeRetweets.value ? true : !tweet.retweeted_status;
        const onlyRetweetCheck = onlyRetweets.value ? tweet.retweeted_status : true;
        const retweetCheck = onlyRetweets.value ? onlyRetweetCheck : includedRetweetCheck;

        let filterCountCheck = true;
        if (filterTweetsByUserActions.value) {
          const tweetsCount = indexes.find(index => index.user === tweet.user)?.tweets?.length ?? 0;
          const count  = parseInt(filterTweetsByUserActionsCount.value, 10);
          const greater = tweetsCount > count;
          const lesser = tweetsCount < count;
          const check = filterTweetsByUserActionsGreater.value ? greater : lesser;
          filterCountCheck = check;
        }
        // console.log();
        

        const checksArray = [
          userCheck,
          dateCheck,
          textCheck,
          userMentionsCheck,
          visitCheck,
          retweetCheck,
          retweetCheck,
          filterCountCheck,
        ];
        const checks = checksArray.every((check) => check);
        return checks;
    });

    let sorted: Tweet[];

    if (sortVisitedTweets.value) {
      const direction = reverseVisitedTweets.value ? 'asc' : 'desc';
      sorted = orderBy(cleaned, (value) => {
        const visited = visitedTweets.value.find((v) => v.id === value.id_str);
        if (visited) {
          const parsedDate = isString(visited.date) ? dayjs(visited.date).toDate() : visited.date;
          return parsedDate.getTime();
        }
        return 0;
      }, direction);
    }else {
      sorted = orderBy(cleaned, (tweet) => dayjs(tweet.created_at).toDate().getTime(), reverseByDate.value ? 'asc': 'desc')
    }

    return sorted;
  });

  function updateShowAfter(date?: Date) {
    if (date) {
      showAfter.value = date;
    } else {
      date = showAfterInitial;
    }
  }

  function updateShowBefore(date?: Date) {
    if (date) {
      showBefore.value = date;
    } else {
      date = showBeforeInitial;
    }
  }
  
  function toggleReversedByDate() {
    reverseByDate.value = !reverseByDate.value;
  }

  function toggleVisitedReversedByDate() {
    reverseVisitedTweets.value = !reverseVisitedTweets.value;
  }

  function addToVisitedTweets(id: string) {
    const index = visitedTweets.value.findIndex((tweet) => tweet.id === id);
    if (index > -1) {
      visitedTweets.value[index].date = new Date();
    } else {
      visitedTweets.value.push({
        id,
        date: new Date(),
      });
    }
  }

  function toggleIncludeNoActionUsers() {
    includeNoActionUsers.value = !includeNoActionUsers.value;
  }

  function toggleFilterTweetsByUserActionsGreater() {
    filterTweetsByUserActionsGreater.value = !filterTweetsByUserActionsGreater.value;
  }

  function clearState(includeVisited = false) {
    resetFilters();
    if (includeVisited) {
      visitedTweets.value = [];
    }
  }

  function resetFilters() {
    users.value = [];
    userFilter.value = null;
    userFilterByName.value = '';
    tweetTextSearch.value = '';
    tweetUserMentionsSearch.value = '';
    showAfter.value = showAfterInitial;
    showBefore.value = showBeforeInitial;
    reverseByDate.value = false;
    reverseUsersByActions.value = false;
    includeMentionedUsers.value = false;
    includeVisitedTweets.value = true;
    onlyVisitedTweets.value = false;
    sortVisitedTweets.value = false;
    reverseVisitedTweets.value = false;
    includeRetweets.value = true;
  }

  return {
    data,
    filtered,
    users,
    userFilter,
    toggleUser,
    updateUserFilter,
    showAfter,
    showBefore,
    updateShowAfter,
    updateShowBefore,
    reverseByDate,
    toggleReversedByDate,
    reverseUsersByActions,
    userFilterByName,
    includeMentionedUsers,
    tweetTextSearch,
    tweetUserMentionsSearch,
    visitedTweets,
    onlyVisitedTweets,
    sortVisitedTweets,
    reverseVisitedTweets,
    toggleVisitedReversedByDate,
    addToVisitedTweets,
    includeVisitedTweets,
    includeRetweets,
    onlyRetweets,
    clearState,
    includeNoActionUsers,
    toggleIncludeNoActionUsers,
    filterTweetsByUserActions,
    filterTweetsByUserActionsGreater,
    filterTweetsByUserActionsCount,
    toggleFilterTweetsByUserActionsGreater,
  };
}, { persist: true })
