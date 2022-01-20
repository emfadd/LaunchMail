<template>
  <div class="container mb-6">
    <span class="">
      <input
        type="checkbox"
        :checked="store.allEmailsSelected"
        class="mr-4 h-6 w-6 cursor-pointer"
        :class="[store.someEmailsSelected ? 'partial-check' : '']"
        @click="store.bulkSelect"
      />
    </span>
    <span class="">
      <!--   TODO: fix styling so hovered button has no color change   -->
      <button
        class="mx-2 mt-4 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400 disabled:opacity-50"
        :disabled="[...store.emailSet].every((e) => e.read)"
        @click="store.markRead()"
      >
        Mark Read
      </button>
      <button
        class="mx-2 mt-4 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400 disabled:opacity-50"
        :disabled="[...store.emailSet].every((e) => !e.read)"
        @click="store.markUnread()"
      >
        Mark Unread
      </button>
      <button
        class="mx-2 my-2 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400 disabled:opacity-50"
        :disabled="store.numberSelected === 0"
        @click="store.archive()"
      >
        Archive
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import useEmailStore from "../store/handleEmail.ts";

const store = useEmailStore();
</script>

<style scoped></style>
