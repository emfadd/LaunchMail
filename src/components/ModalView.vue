<template>
  <div class="w-full h-full fixed left-0 top-0">
    <div
      class="bg-black opacity-50 w-full h-full fixed left-0 top-0"
      @click="emit('closeModal')"
    ></div>
    <div
      class="border border-4 border-dashed border-sky-700 rounded-lg bg-white relative w-10/12 h-[500px] mx-auto mb-auto mt-[30px] px-[20px] py-[20px] opacity-100"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import useEmailStore from "../store/handleEmail.ts";

const store = useEmailStore();
const emit = defineEmits(["closeModal"]);

store.handleKeyboardInput([
  {
    key: "Escape",
    fn: () => {
      emit("closeModal");
    },
  },
]);
</script>

<style scoped></style>
