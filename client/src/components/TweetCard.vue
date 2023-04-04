<script lang="ts">
interface Props {
    user: TwitterUser;
    tweet: Tweet;
}

</script>

<script setup lang="ts">
import type { TwitterUser } from '@/types/user';
import type { Tweet } from '@/types/tweet';
const props = defineProps<Props>();

</script>

<template>
    <div class="border-2 border-zinc-600 rounded-md m-4 p-6 flex-col ">
        <div>
            {{ user.name }}
        </div>
        <div>
            {{ tweet.vibe }}
            {{ tweet.text }}
        </div>
    </div>
</template>
