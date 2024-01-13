<script lang="ts" setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <h5>{{ count }}</h5>
  <button @click="count++">+ ADD</button>
</template>

<style lang="scss"></style>
