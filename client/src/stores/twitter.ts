import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import rawTweets from '@/assets/data.json';
import type { Tweet } from '@/types/tweet';
import {orderBy} from 'lodash';
import dayjs from 'dayjs';

// A typescript custom filter type for 'include' or 'exclude
// 'include' means that the filter will only show tweets from the users in the filter
// 'exclude' means that the filter will only show tweets from users not in the filter
export type UserFilterType = 'include' | 'exclude' | null;


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
        const userMentionsCheck = tweet.entities?.user_mentions?.some((mention) => {
          const value = tweetUserMentionsSearch.value.toLowerCase();
          return mention.screen_name.toLowerCase().includes(value) || mention.name.toLowerCase().includes(value);
        }) || false;
        const checksArray = [
          userCheck,
          dateCheck,
          textCheck,
          userMentionsCheck,
        ];
        const checks = checksArray.every((check) => check);
        return checks;
    });

    return orderBy(cleaned, (tweet) => dayjs(tweet.created_at).toDate().getTime(), reverseByDate.value ? 'asc': 'desc');
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
  };
})
