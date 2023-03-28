<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import indexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import tweets from '@/assets/data.json';
import type { TwitterUser } from '@/types/user';
import type { Tweet } from '@/types/tweet';

function getUser(userId: string) {
    const user = (users as any)[userId];
    return user as TwitterUser;
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
            <div class="mt-2" />
            <div class="flex flex-row flex-nowrap overflow-auto w-full">
                <template v-for="index in indexes" :key="index.user">
                    <UserItem :user="getUser(index.user)" :count="index.count" />
                </template>
            </div>
        </div>
        <template v-for="tweet in tweets" :key="tweet.id_str">
            <div>
                {{ tweet.text }}
            </div>
        </template>
    </div>
</template>
