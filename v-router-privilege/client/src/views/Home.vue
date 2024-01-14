<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";

const useUserStore = useStore();
const { routeTree } = storeToRefs(useUserStore);
await useUserStore.setRouteTree();

console.log(routeTree);
</script>

<template>
  <h3>HOME</h3>
</template>

<style lang="scss"></style>
