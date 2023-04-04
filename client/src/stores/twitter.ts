import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import rawTweets from '@/assets/data.json';
import type { Tweet } from '@/types/tweet';

// A typescript custom filter type for 'include' or 'exclude
// 'include' means that the filter will only show tweets from the users in the filter
// 'exclude' means that the filter will only show tweets from users not in the filter
export type UserFilterType = 'include' | 'exclude' | null;


export const useTwitterStore = defineStore('twitterStore', () => {
  const data = rawTweets as Tweet[];
  const users = ref<string[]>([]);
  const userFilter = ref<UserFilterType>('include');
  // const userFilter = ref<UserFilterType>(null);

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
      const entitiesMentionCheck = tweet.entities?.user_mentions?.some((mention) => mention.id_str === user);
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

    return included || excluded;
}

  const filtered = computed(() => {
      console.log('filtered', users.value, userFilter.value);    
      return data.filter((tweet) => {
        const userCheck = checkUserFilter(tweet);
        return userCheck;
    });
  });

  

  return { data, filtered, users, userFilter, toggleUser, updateUserFilter };
})
