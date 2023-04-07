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
          <VueDatePicker v-model="twitterStore.showAfter" :onCleared="twitterStore.updateShowAfter" :clearable="false" />
        </div>
        <div class="mx-4" />
        <div>
          <label for="showAfter">Show before</label>
          <div class="my-2" />
          <VueDatePicker v-model="twitterStore.showBefore" :onCleared="twitterStore.updateShowBefore" :clearable="false" />
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
        <!-- <div>
          <label for="showAfter">Show only tweets with</label>
          <div class="my-2" />
          <input
            v-model="twitterStore.searchTweetText"
            type="text"
            class="border-2 border-zinc-600 rounded-md px-3 pt-3 pb-2 flex flex-col h-full"
            placeholder="Enter a word or phrase" />
        </div> -->
      </div>

  </div>
</template>
