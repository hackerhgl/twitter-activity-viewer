<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import rawIndexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import type { TwitterUser, TwitterUserIndex } from '@/types/user';
import { useTwitterStore } from '../stores/twitter';
import type { UserFilterType } from '../stores/twitter';

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

function getFilterStyle(isActive: boolean) {
    return {
        'border-zinc-800': !isActive,
        'border-zinc-200': isActive,
        'text-zinc-800': !isActive,
        'text-zinc-200': isActive,
        'bg-zinc-800': isActive,
    };
}

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
                        :class="getFilterStyle(twitterStore.userFilter === filter.value)"
                        @click="() => twitterStore.updateUserFilter(filter.value)">
                        {{ filter.label }}
                    </div>
                </template>
            </div>
            <div class="my-6" />
            <div class="flex flex-row flex-nowrap overflow-auto w-full">
                <template v-for="index in indexes" :key="index.user">
                    <UserItem :user="getUser(index.user)" :count="index.count ?? -99" :userId="index.user" />
                </template>
            </div>
        </div>
        <!-- <template v-for="tweet in twitterStore.data" :key="tweet.id_str">
            <div>
                {{ tweet.text }}
            </div>
        </template> -->
    </div>
</template>
