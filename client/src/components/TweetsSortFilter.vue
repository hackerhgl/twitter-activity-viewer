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

function toggleIncludeVisitedTweets(target: HTMLInputElement) {
  twitterStore.includeVisitedTweets = target.checked;
  twitterStore.onlyVisitedTweets = false;
}

function toggleOnlyVisitedTweets(target: HTMLInputElement) {
  twitterStore.onlyVisitedTweets = target.checked;
  twitterStore.includeVisitedTweets = false;
}

function toggleIncludeRetweets(target: HTMLInputElement) {
  twitterStore.includeRetweets = target.checked;
  twitterStore.onlyRetweets = false;
}

function toggleOnlyRetweets(target: HTMLInputElement) {
  twitterStore.onlyRetweets = target.checked;
  twitterStore.includeRetweets = false;
}

function toggleVisitedSortTweets(target: HTMLInputElement) {
  const { checked } = target;
  twitterStore.sortVisitedTweets = checked;
  if (!checked) {
    twitterStore.reverseVisitedTweets = false;
  }
}

</script>

<template>
    <div class="flex flex-col">
      <div class="flex flex-row flex-start items-center">
        <div>
          <label for="showAfter">Show after</label>
          <div class="my-2" />
          <VueDatePicker v-model="twitterStore.showAfter" :onCleared="twitterStore.updateShowAfter" :clearable="false" class="w-40" />
        </div>
        <div class="mx-2" />
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
            :checked="twitterStore.includeRetweets"
            label="Include retweets"
            :onChange="toggleIncludeRetweets" />
        </div>
        <div class="mx-2" />
        <div>
          <InputToggle
            :checked="twitterStore.onlyRetweets"
            label="Only retweets"
            :onChange="toggleOnlyRetweets" />
        </div>
        <div class="mx-4 text-4xl">|</div>
        <div>
          <InputToggle
            :checked="twitterStore.includeMentionedUsers"
            label="Mentioned users"
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
      <div class="my-2" />
      <div class="flex flex-row flex-start items-center">
        <div>
          <InputToggle
            :checked="twitterStore.includeVisitedTweets"
            label="Include visited"
            :onChange="toggleIncludeVisitedTweets" />
        </div>
        <div class="mx-4 text-4xl" />
        <div>
          <InputToggle
            :checked="twitterStore.onlyVisitedTweets"
            label="Only visited"
            :onChange="toggleOnlyVisitedTweets" />
        </div>
        <div class="mx-4 text-4xl">|</div>
        <div class="flex flex-row items-center">
          <InputToggle
            :checked="twitterStore.sortVisitedTweets"
            label="Visited sort"
            :onChange="toggleVisitedSortTweets" />
          <div class="mx-2" />
          <div
            :class="getButtonStyle(twitterStore.reverseVisitedTweets)"
            @click="twitterStore.toggleVisitedReversedByDate">
              Reverse by visited date
          </div>
        </div>
      </div>
  </div>
</template>
