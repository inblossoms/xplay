<script setup>
import { count } from "./states";
import { addBtnEv, logBtnEv } from "./handler";

const { title } = defineProps({
  title: String,
});
</script>

<template>
  <h3>{{ title }}</h3>
  <h5>{{ count }}</h5>
  <button @click="addBtnEv">+ Add</button>
  <button @click="logBtnEv">Log</button>
</template>

<style lang="scss"></style>
