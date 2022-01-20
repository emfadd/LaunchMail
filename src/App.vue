<template>
  <img class="h-32 absolute top-0 left-0" src="./assets/LaunchBadgeIcon.png" />
  <div
    class="font-semibold text-cyan-700 text-3xl mx-8 my-6 absolute left-24 top-5"
  >
    LaunchMail
  </div>

  <Suspense>
    <template #default>
      <MailTable />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup>
import MailTable from "./components/MailTable.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
