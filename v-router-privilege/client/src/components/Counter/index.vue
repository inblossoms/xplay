<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";

const useUserStore = useStore();
const { routeTree } = storeToRefs(useUserStore);
await useUserStore.setRouteTree();

console.log(routeTree);
const count = ref(0);
</script>

<template>
  <h5>{{ count }}</h5>
  <button @click="count++">+ ADD</button>
</template>

<style lang="scss"></style>
