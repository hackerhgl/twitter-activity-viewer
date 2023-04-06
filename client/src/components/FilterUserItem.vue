<script lang="ts">
interface Props {
    user: TwitterUser;
    count: number;
    userId: string;
    selected: boolean;
    toggle: () => void;
}

</script>

<script setup lang="ts">
import type { TwitterUser } from '@/types/user';
import { getBorderToggleStyle } from '@/utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>();

function openProfile() {
    window.open(`https://twitter.com/${props.user.screen_name}`, '_blank');
}

</script>

<template>
    <div
        @click="toggle"
        :class="getBorderToggleStyle(selected, {text: false, bg: false})"
        class="px-3 pt-3 pb-2 mx-2 border-2 min-w-max rounded-lg cursor-pointer"
    >
        <div class="flex flex-row" v-if="!!user?.name">
            <img :src="user.profile_image_url_https" :alt="user.name" class="object-contain w-12 h-12 mr-2 rounded-full" />
            <div class="min-w-0">
                <div class="text-sm text-zinc-500">{{ user.name }}</div>
                <div class="text-xs text-zinc-500">@{{ user.screen_name }}</div>
                <div class="text-sm text-zinc-500">
                    <span>Actions:</span>
                    {{ count }}
                </div>
            </div>
        </div>
        <div class="my-2" />
        <div flex flex-row>
            <div class="" @click="openProfile">
                Visit profile
            </div>
        </div>
    </div>
</template>