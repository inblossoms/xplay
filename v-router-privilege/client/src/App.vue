<script lang="ts" setup>
import Counter from "./components/Counter/index.vue";
import axios from "axios";
import qs from "qs";

axios
  .post(
    "/api/user_router_list",
    qs.stringify({
      uid: 1,
    })
  )
  .then((res) => {
    console.log(res);
  });
</script>

<template>
  <div>
    <h2>PRIVILAGE</h2>
    <Counter />
  </div>
</template>

<style lang="scss"></style>
