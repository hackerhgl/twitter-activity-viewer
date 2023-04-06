<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import rawIndexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import type { TwitterUser, TwitterUserIndex } from '@/types/user';
import { useTwitterStore } from '../stores/twitter';
import type { UserFilterType } from '../stores/twitter';
import { getBorderToggleStyle } from '@/utils'
import orderBy from 'lodash/orderBy';

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

const buttonStyle = "py-2 px-3 border rounded-lg mx-1 cursor-pointer select-none transition-all text-sm";
const objButtonStyle = buttonStyle.split(' ').reduce((obj, key) => ({...obj, [key]: true}), {});

function getButtonStyle(flag: boolean) {
    return {...objButtonStyle, ...getBorderToggleStyle(flag)}
}

function getParsedUserData() {
    const users = indexes.map((v) => ({...v, ...getUser(v.user)})).filter((v) => {
        if (!twitterStore.userFilterByName.length) {
            return true;
        }
        const value = twitterStore.userFilterByName.toLowerCase();
        return (v?.name ?? '').toLowerCase().includes(value) || v.screen_name.toLowerCase().includes(value);
    });
    return orderBy(users, (v) => v.count, [twitterStore.reverseUsersByActions ? 'asc' : 'desc']);
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
        </div>
        <div class="my-6" />
        <div class="flex flex-row flex-nowrap overflow-auto w-full">
            <template
                :key="index.user"
                v-for="index in getParsedUserData()"
                >
                <UserItem
                    :toggle="() => twitterStore.toggleUser(index.user)"
                    :selected="getSelectedUser(index.user)"
                    :user="index"
                    :count="index.count ?? -99"
                    :userId="index.user" />
            </template>
        </div>
    </div>
</template>