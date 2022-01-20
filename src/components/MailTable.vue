<template>
  <div class="container mt-20">
    <button
      class="px-4 py-2 mx-2 mt-20 mb-6"
      :disabled="store.selectedScreen === 'inbox'"
      @click="store.selectScreen('inbox')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 hover:stroke-cyan-500 disabled:stroke-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
        />
      </svg>
    </button>
    <button
      class="px-4 py-2 mx-2 mt-20 mb-6"
      :disabled="store.selectedScreen === 'archive'"
      @click="store.selectScreen('archive')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 hover:stroke-cyan-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    </button>
  </div>
  <BulkActionBar :emails="store.filteredEmails" />
  <table class="table-fixed mx-auto border-collapse border border-slate-500">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th class="text-center w-64">Sender</th>
        <th class="w-[600px] text-center border border-slate-500">Subject</th>
        <th class="text-center w-32">Received</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="email in store.filteredEmails"
        :key="email.id"
        class="h-12 border border-slate-500 text-left cursor-pointer hover:shadow-lg"
        :class="[email.read ? 'bg-slate-200' : '']"
      >
        <td class="px-4">
          <input
            type="checkbox"
            class="h-4 w-4 mt-2 cursor-pointer"
            :checked="store.emailSet.has(email)"
            @click="store.toggle(email)"
          />
        </td>
        <td>
          <button
            class="mr-2"
            :hidden="store.selectedScreen === 'archive'"
            @click="store.handleFavoriteClick(email)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mt-2 mr-2 hover:fill-blue-400"
              :class="[email.favorite ? 'fill-blue-500' : '']"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </td>
        <td @click="store.handleOpenEmail(email)">{{ email.from }}</td>
        <td
          :class="[email.read ? 'opacity-75' : '']"
          @click="store.handleOpenEmail(email)"
        >
          <p class="mx-6 w-[600px] truncate">
            <strong>{{ email.subject }}</strong>
          </p>
        </td>
        <td class="date pl-2" @click="store.handleOpenEmail(email)">
          {{ format(new Date(email.sentAt), "MMM do yyyy") }}
        </td>
        <td>
          <button
            class="mx-4 px-2 border bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400"
            @click="store.handleArchiveClick(email)"
          >
            Archive
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="store.openedEmail" @closeModal="store.openedEmail = null">
    <MailView :email="store.openedEmail" @changeEmail="store.changeEmail" />
  </ModalView>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { format } from "date-fns";
import axios from "axios";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";
import BulkActionBar from "./BulkActionBar.vue";
import useEmailStore from "../store/handleEmail.ts";

const store = useEmailStore();

store.callEmails();
</script>

<style scoped></style>
