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

</script>

<template>
    <div class="px-4 py-4 mx-3 border-2 min-w-max rounded-lg cursor-pointer" :class="getBorderToggleStyle(selected, {text: false, bg: false})" @click="toggle">
        <div class="flex flex-row" v-if="!!user?.name">
            <div class="w-20 h-20">
                <img :src="user.profile_image_url_https" :alt="user.name" class="object-contain w-16 h-16 rounded-full" />
            </div>
            <div class="min-w-0">
                <div class="text-sm text-zinc-500">{{ user.name }}</div>
                <div class="text-sm text-zinc-500">@{{ user.screen_name }}</div>
                <div class="text-sm text-zinc-500">
                    <span>Actions:</span>
                    {{ count }}
                </div>
            </div>
        </div>
        <div flex flex-row>
            <div class="">
                Visit profile
            </div>
        </div>
    </div>
</template>