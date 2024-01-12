<script setup>
import Counter from "./components/Counter/index.vue";
import fileJson from "./assets/fileJSON.json";
import axios from "axios";

axios.post("http://localhost:3300/compile", {
  fileName: "Counter",
  fileJSON: fileJson,
});
</script>

<template>
  <div>
    <h2>Component Compile</h2>
    <Counter title="Counter" />
  </div>
</template>

<style scoped></style>
