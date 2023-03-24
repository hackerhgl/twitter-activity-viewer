<script setup lang="ts">
import UserItem  from '@/components/FilterUserItem.vue';
import indexes from '@/assets/tweets_index.json';
import users from '@/assets/users.json';
import type { TwitterUser } from '@/types/user';

// function getUser(userId: string) {
//     const user = (users as any)[userId] as unknown as any;
//     return user as TwitterUser;
// }

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
            <h2>Select users</h2>
            <div class="flex flex-row overflow-auto">
                <template v-for="index in indexes" :key="index.user">

                    <div class="flex flex-col">
                        <div>{{ JSON.stringify(index) }}</div>
                        <UserItem />
                        <template>
                        </template>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>
