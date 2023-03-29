<script lang="ts">
import type { TwitterUser } from '@/types/user';
import type { PropType } from 'vue';

export default {
    name: 'UserItem',
    created() {
        const { user, count, userId } = this;

        if (!user?.name) {
            console.log(userId, user);
        }
        
    },
    props: {
        user: {
            type: Object as PropType<TwitterUser>,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    },
}


</script>

<template>
    <div class="px-4 py-2 mx-1 border-zinc-800 border-2 min-w-max">
        <div class="flex flex-row" v-if="!!user?.name">
            <div class="w-20 h-20">
                <img :src="user.profile_image_url_https" :alt="user.name" class="object-contain w-16 h-16 rounded-full" />
            </div>
            <div class="min-w-0">
                <div class="text-sm text-zinc-500">{{ user.name }}</div>
                <div class="text-sm text-zinc-500">@{{ user.screen_name }}</div>
                <div class="text-sm text-zinc-500">
                    <span>Actions:</span>
                    @{{ count }}
                </div>
            </div>
        </div>
    </div>
</template>