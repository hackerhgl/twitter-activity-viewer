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
  // const data = ref(rawTweets as Tweet[]);
  const users = ref<number[]>([]);
  const userFilter = ref<UserFilterType>(null);

  function toggleUser(userId: number) {
    if (users.value.includes(userId)) {
      users.value = users.value.filter((user) => user !== userId);
    } else {
      users.value.push(userId);
    }
  }

  function updateUserFilter(filter: UserFilterType) {
    userFilter.value = filter;
  }
  

  return { data, users, userFilter, toggleUser, updateUserFilter };
})
