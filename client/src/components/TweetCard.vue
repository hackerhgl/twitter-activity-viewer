<script lang="ts">
interface Props {
    user: TwitterUser;
    tweet: Tweet;
}

</script>

<script setup lang="ts">
import type { TwitterUser } from '@/types/user';
import type { Tweet } from '@/types/tweet';
import users from '@/assets/users.json';
import dayjs from 'dayjs';
const props = defineProps<Props>();

const createdAt = dayjs(props.tweet.created_at).format('DD/MM/YYYY');

// eslint-disable-next-line vue/no-setup-props-destructure
const userMentions = props.tweet.entities.user_mentions;
const renderMentions = userMentions.length > 1;

function getUser(userId: string) {
    return (users as any)[userId] as TwitterUser;
}

function visitProfile(userName: string) {
    window.open(`https://twitter.com/${userName}`, '_blank');
}

function visitTweet() {
    window.open(`https://twitter.com/${props.user.screen_name}/status/${props.tweet.id_str}`, '_blank');
}

</script>

<template>
    <div class="w-2/12 relative px-2  my-2 ">
        <div class="border-2 border-zinc-600 rounded-md px-3 pt-3 pb-2 flex flex-col h-full">
            <div class="flex flex-row">
                <img
                    alt="user.name"
                    :src="user.profile_image_url_https"
                    class="w-6 h-6 rounded-xl mr-2" />
                <span class="text-sm">
                    {{ user.name }}
                </span>
                <div class="mx-1" />
            </div>
            <span class="text-xs absolute top-2 right-2 p-1 bg-zinc-600 rounded-md opacity-40">
                {{ createdAt }}
            </span>
            <div v-if="renderMentions" class="flex flex-row flex-wrap mt-4 mb-2 ">
                <template v-for="mention in userMentions" :key="mention.id_str">
                    <div
                        @click="() => visitProfile(mention.screen_name)"
                        class="flex-row flex bg-zinc-700 mr-2 mt-2 cursor-pointer">
                            <img
                            v-if="!!getUser(mention.id_str)?.profile_image_url_https"
                            :src="getUser(mention.id_str)?.profile_image_url_https"
                            alt="mention.name"
                            class="w-6 h-6 rounded-xl mr-1 block" />
                            <span>
                                {{ mention.name }}
                            </span>
                    </div>
                </template>
            </div>
            <div>
                <span class="text-sm">
                    {{ tweet.text }}
                </span>
            </div>
            <div class="my-2" />
            <div class="flex flex-1 flex-grow" />
            <div
                @click="() => visitTweet()"
                class="bg-zinc-600 text-center p-2 rounded text-sm cursor-pointer">
                Open
            </div>
            <div class="my-1" />
        </div>
    </div>
</template>
