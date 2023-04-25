<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { getButtonStyle } from '@/utils'
import { useTwitterStore } from '@/stores/twitter';

const twitterStore = useTwitterStore();

</script>

<template>
  <div class="px-6">
    <AppHeader />
    <div>
      <div>Clear all state including visited tweets</div>
      <div class="my-2" />
      <button :class="getButtonStyle(true)" @click="twitterStore.clearState(true)">Clear</button>
    </div>
    <div class="my-4" />
    <div>
      <div>Clear all state excluding visited tweets</div>
      <div class="my-2" />
      <button :class="getButtonStyle(true)" @click="twitterStore.clearState(false)">Clear</button>
    </div>
    <div class="my-4" />
    <div>
      <div>Export state</div>
      <div class="my-2" />
      <button :class="getButtonStyle(true)" @click="twitterStore.exportState()">Export State</button>
    </div>
  </div>
</template>
