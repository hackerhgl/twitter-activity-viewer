<script lang="ts">
interface Props {
  value?: string;
}
</script>

<script setup lang="ts">
import { useTwitterStore } from '@/stores/twitter';
import VueDatePicker from '@vuepic/vue-datepicker';
import { getBorderToggleStyle } from '@/utils';
import '@vuepic/vue-datepicker/dist/main.css'

defineProps<Props>();

const twitterStore = useTwitterStore();



</script>

<template>
    <div class="flex flex-col">
      <h2 class="text-xl">Dates: sort & filters</h2>
      <div class="flex flex-row flex-start">
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
        <div class="mx-4" />
        <div
          class="flex self-start my-4 p-4 border-2 cursor-pointer transition-all rounded-lg select-none"
          :class="getBorderToggleStyle(twitterStore.reverseByDate)"
          @click="twitterStore.toggleReversedByDate">
            Reverse by date
        </div>
      </div>

  </div>
</template>
