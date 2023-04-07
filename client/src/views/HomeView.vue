<script setup lang="ts">
import TweetCard  from '@/components/TweetCard.vue';
import TweetsSortFilter  from '@/components/TweetsSortFilter.vue';
import UsersSortFilter  from '@/components/UsersSortFilter.vue';
import users from '@/assets/users.json';
import type { TwitterUser } from '@/types/user';
import { useTwitterStore } from '../stores/twitter';


function getUser(userId: string) {
    const user = (users as any)[userId];
    return user as TwitterUser;
}

const twitterStore = useTwitterStore();

</script>

<template>
    <div class="px-6">
    <!-- <div class="mx-auto md:max-w-3xl px-4 sm:px-6 lg:px-0"> -->
        <div>
            <div id="header" class="py-4">
                <h1 class="text-3xl text-blue-500">Twitter data dashboard</h1>
            </div>
        </div>
        <UsersSortFilter />
        <div class="my-4" />
        <TweetsSortFilter />
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
