<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import TweetCard  from '@/components/TweetCard.vue';
import DatesSortFilter  from '@/components/DatesSortFilter.vue';
import rawIndexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import type { TwitterUser, TwitterUserIndex } from '@/types/user';
import { useTwitterStore } from '../stores/twitter';
import type { UserFilterType } from '../stores/twitter';
import { getBorderToggleStyle } from '@/utils'

const indexes = rawIndexes as TwitterUserIndex[];

function getUser(userId: string) {
    const user = (users as any)[userId];
    return user as TwitterUser;
}

const twitterStore = useTwitterStore();

type UserFilterObject = {
    value: UserFilterType;
    label: string;
}

function getSelectedUser(userId: string) {
    return twitterStore.users.includes(userId);
}

const userFilters: UserFilterObject[] = [
    {
        value: 'include',
        label: 'Include',
    },
    {
        value: 'exclude',
        label: 'Exclude',
    },
    {
        value: null,
        label: 'Disable',
    }
];


</script>

<template>
    <div class="px-10">
    <!-- <div class="mx-auto md:max-w-3xl px-4 sm:px-6 lg:px-0"> -->
        <div>
            <div id="header" class="py-8">
                <h1 class="text-3xl text-blue-500">Twitter data dashboard</h1>
            </div>
        </div>
        <div id="filters">
            <h2 class="text-xl">Users filters</h2>
            <div class="my-4" />
            <div class="flex flex-row flex-nowrap overflow-auto w-full">
                <template v-for="filter in userFilters" :key="filter.value">
                    <div
                        class="py-3 px-8 border-2 rounded-lg mx-2 cursor-pointer select-none transition-all"
                        :class="getBorderToggleStyle(twitterStore.userFilter === filter.value)"
                        @click="() => twitterStore.updateUserFilter(filter.value)">
                        {{ filter.label }}
                    </div>
                </template>
            </div>
            <div class="my-6" />
            <div class="flex flex-row flex-nowrap overflow-auto w-full">
                <template v-for="index in indexes" :key="index.user">
                    <UserItem
                        :toggle="() => twitterStore.toggleUser(index.user)"
                        :selected="getSelectedUser(index.user)"
                        :user="getUser(index.user)"
                        :count="index.count ?? -99"
                        :userId="index.user" />
                </template>
            </div>
        </div>
        <div class="my-4" />
            <DatesSortFilter />
        <div class="my-4" />
        <div>
            Total tweets: {{ twitterStore.filtered.length }}
        </div>
        <div class="flex flex-row flex-wrap">
            <template v-for="tweet in twitterStore.filtered" :key="tweet.id_str">
                <TweetCard :tweet="tweet" :user="getUser(tweet.user)" />
            </template>
        </div>
    </div>
</template>
