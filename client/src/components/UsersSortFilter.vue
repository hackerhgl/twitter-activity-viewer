<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import rawIndexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import type { TwitterUser, TwitterUserIndex } from '@/types/user';
import { useTwitterStore } from '../stores/twitter';
import type { UserFilterType } from '../stores/twitter';
import { getButtonStyle } from '@/utils'
import orderBy from 'lodash/orderBy';
import { DynamicScroller } from 'vue-virtual-scroller';

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

function getParsedUserData() {

    console.log('function getParsedUserData() {', twitterStore.userFilterByName.length);
    
    const mappedUsers = indexes.map((index) => ({...index, ...getUser(index.user)}));

    const users = mappedUsers.filter((user) => { 
        const value = twitterStore.userFilterByName.toLowerCase();
        const nameFilter = (user?.name ?? '').toLowerCase().includes(value) || user.screen_name.toLowerCase().includes(value);
        const nameCheck = twitterStore.userFilterByName.length ? nameFilter : true;

        if (!twitterStore.includeNoActionUsers) {
            const visited = twitterStore.visitedTweets;
            const everyTweetVisited = user.tweets.every((userTweetId) => visited.find((visitedTweetId) => visitedTweetId.id === userTweetId));

            return !everyTweetVisited && nameCheck;
        }
        
        return nameCheck;
    });
    
    return orderBy(users, (v) => v.tweets.length, [twitterStore.reverseUsersByActions ? 'asc' : 'desc']);
}
</script>

<template>
    <div id="filters" class="">
        <div class="flex flex-row flex-nowrap overflow-auto w-full items-center">
            <h2 class="text-xl">Users filters :</h2>
            <template v-for="filter in userFilters" :key="filter.value">
                <div
                    :class="getButtonStyle(twitterStore.userFilter === filter.value)"
                    @click="() => twitterStore.updateUserFilter(filter.value)">
                    {{ filter.label }}
                </div>
            </template>
            <div class="mx-4">
                |
            </div>
            <div
                :class="getButtonStyle(twitterStore.reverseUsersByActions)"
                @click="() => twitterStore.reverseUsersByActions = !twitterStore.reverseUsersByActions">
                Reverse by actions
            </div>
            <div class="mx-4">
                |
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search user"
                    v-model="twitterStore.userFilterByName"
                    class="p-3 my-1 focus:outline-none focus:border-0 focus:ring-zinc-700 border-0 bg-zinc-800 rounded text-xs"
                />
            </div>
            <div class="mx-1" />
            <div
                :class="getButtonStyle(!!twitterStore.userFilterByName.length)"
                @click="() => twitterStore.userFilterByName = ''">
                Clear search
            </div>
            <div class="mx-4">
                |
            </div>
            <div
                :class="getButtonStyle(true)"
                @click="() => twitterStore.users = []">
                Clear selection
            </div>
            <div class="mx-4">
                |
            </div>
            <div
                :class="getButtonStyle(twitterStore.includeNoActionUsers)"
                @click="twitterStore.toggleIncludeNoActionUsers">
                Include no actions
            </div>

        </div>
        <div class="my-6" />
        <div class="flex flex-row flex-nowrap overflow-auto w-full">
            <DynamicScroller
                direction="horizontal"
                :min-item-size="120"
                key-field="user"
                class="scroller  h-28"
                :items="getParsedUserData()"
                >
                <template v-slot="{ item, index, active }">
                    <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[
                        item.user,
                        ]"
                        :data-index="index"
                    >
                    <UserItem
                        :toggle="() => twitterStore.toggleUser(item.user)"
                        :selected="getSelectedUser(item.user)"
                        :user="item"
                        :count="item.tweets.length ?? -99"
                        :userId="item.user" />
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </div>
    </div>
</template>