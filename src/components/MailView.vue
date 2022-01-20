<template>
  <div class="text-left">
    <div>
      <button class="mx-2 mt-2 mb-6 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400" @click="toggleArchive">{{email.archived ? 'Move to Inbox(e)' : 'Archive(e)'}}</button>
      <button class="mx-2 mt-2 mb-6 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400" @click="toggleRead">{{email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
      <button class="mx-2 mt-2 mb-6 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400" @click="goNewer">Newer Email (k)</button>
      <button class="mx-2 mt-2 mb-6 border px-2 bg-gray-300 text-black drop-shadow-lg border-black hover:bg-blue-400" @click="goOlder">Older Email (j)</button>
    </div>
    <h2 class="mb-2">Subject: <strong>{{email.subject}}</strong></h2>
    <div class="mb-2"><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import { format } from 'date-fns'
import {marked} from "marked";
import useEmailStore from '../store/handleEmail.ts'

defineProps<{
  email: {
    id: number;
    from: string;
    subject: string;
    body: string;
    sentAt: string;
    archived: boolean;
    read: boolean;
    favorite: boolean;
  }
}>();
const store = useEmailStore();
const emit = defineEmits(['changeEmail']);

let toggleRead = () => {emit('changeEmail', {toggleRead: true, save: true})};
let toggleArchive = () => {emit('changeEmail', {toggleArchive: true, save: true, closeModal: true})};
let goNewer = () => {console.log('pressed'); emit('changeEmail', {changeIndex: -1})};
let goOlder = () => {emit('changeEmail', {changeIndex: 1})};
let goNewerAndArchive = () => {emit('changeEmail', {changeIndex: -1, toggleArchive: true, save: true})};
let goOlderAndArchive = () => {emit('changeEmail', {changeIndex: 1, toggleArchive: true, save: true})};

store.handleKeyboardInput([
  {key: 'r', fn: toggleRead},
  {key: 'e', fn: toggleArchive},
  {key: 'k', fn: goNewer},
  {key: 'j', fn: goOlder},
  {key: '[', fn: goNewerAndArchive},
  {key: ']', fn: goOlderAndArchive},
])
</script>

<style scoped>

</style>
