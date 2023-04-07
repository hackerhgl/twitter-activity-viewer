<script lang="ts">
interface Props {
  value?: string;
}
</script>

<script setup lang="ts">
import { useTwitterStore } from '@/stores/twitter';
import VueDatePicker from '@vuepic/vue-datepicker';
import { getButtonStyle } from '@/utils'
import '@vuepic/vue-datepicker/dist/main.css'
import InputToggle from './InputToggle.vue';

defineProps<Props>();

const twitterStore = useTwitterStore();

function toggleIncludedUsers(target: HTMLInputElement) {
  twitterStore.includeMentionedUsers = target.checked;
}

</script>

<template>
    <div class="flex flex-col">
      <div class="flex flex-row flex-start items-center">
        <h2 class="text-xl">Tweets filter:</h2>
        <div class="mx-2" />
        <div>
          <label for="showAfter">Show after</label>
          <div class="my-2" />
          <VueDatePicker v-model="twitterStore.showAfter" :onCleared="twitterStore.updateShowAfter" :clearable="false" class="w-40" />
        </div>
        <div class="mx-4" />
        <div>
          <label for="showAfter">Show before</label>
          <div class="my-2" />
          <VueDatePicker v-model="twitterStore.showBefore" :onCleared="twitterStore.updateShowBefore" :clearable="false" class="w-40" />
        </div>
        <div class="mx-4 text-4xl">|</div>
        <div
          :class="getButtonStyle(twitterStore.reverseByDate)"
          @click="twitterStore.toggleReversedByDate">
            Reverse by date
        </div>
        <div class="mx-4 text-4xl">|</div>
        <div>
          <InputToggle
            :checked="twitterStore.includeMentionedUsers"
            label="include mentioned users"
            :onChange="toggleIncludedUsers" />
        </div>
        <div class="mx-4 text-4xl">|</div>
        <input
            type="text"
            placeholder="Tweet by text"
            v-model="twitterStore.tweetTextSearch"
            class="p-3 my-1 focus:outline-none focus:border-0 focus:ring-zinc-700 border-0 bg-zinc-800 rounded text-xs"
        />
        <div class="mx-1" />
        <div
          :class="getButtonStyle(!!twitterStore.tweetTextSearch.length)"
          @click="twitterStore.tweetTextSearch = ''">
            Clear
        </div>
        <div class="mx-4 text-4xl">|</div>
        <input
            type="text"
            placeholder="Tweet by user mentions"
            v-model="twitterStore.tweetUserMentionsSearch"
            class="p-3 my-1 focus:outline-none focus:border-0 focus:ring-zinc-700 border-0 bg-zinc-800 rounded text-xs"
        />
        <div class="mx-1" />
        <div
          :class="getButtonStyle(!!twitterStore.tweetUserMentionsSearch.length)"
          @click="twitterStore.tweetUserMentionsSearch = ''">
            Clear
        </div>
      </div>
  </div>
</template>
