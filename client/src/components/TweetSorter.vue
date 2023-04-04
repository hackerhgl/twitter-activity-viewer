<script lang="ts">
interface Props {
  value?: string;
}
</script>

<script setup lang="ts">
import InputToggle from './InputToggle.vue';
// import type { TwitterUser } from '@/types/user';
// import type { Tweet } from '@/types/tweet';
const props = defineProps<Props>();

function onChange(e: Event) {
  console.log(Object.keys(e.target as any), '-ON');
  const target = e.target as HTMLInputElement;
  // checked = target.checked;
}


</script>

<template>
    <div>
      <InputToggle :onChange="onChange" label="" />
  </div>
</template>
