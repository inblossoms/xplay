<script setup>
import { addBtnEv } from "./handler.js";
import { count } from "./states.js";
import { computed } from "vue";
const { title } = defineProps({
  title: String,
});
const logBtnEv = computed(() => {
  console.log(count.value);
});
</script>
<template>
  <div class="app">
    <h3>{{ title }}</h3>
    <h5>{{ count }}</h5>
    <button @click="addBtnEv">+ Add</button>
    <button @click="logBtnEv">Log</button>
  </div>
</template>
