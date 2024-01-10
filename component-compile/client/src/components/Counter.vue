<script setup>
import { ref, defineProps } from "vue";

const { title } = defineProps({
  title: String,
});
</script>

<template>
  <div>{{ title }}</div>
</template>

<style lang="scss"></style>
