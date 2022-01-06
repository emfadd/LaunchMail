<script setup lang="ts">
  import { format } from 'date-fns';
  import axios from 'axios';
  import MailView from '../components/MailView.vue';
  import ModalView from '../components/ModalView.vue';
  import BulkActionBar from '../components/BulkActionBar.vue';
  import {reactive, ref, defineProps, defineComponent, computed} from 'vue';
  import useEmailSelection from '../composables/use-email-selection'

  let {data: emails}  = await axios.get('http://localhost:3000/emails')

  const emailSelection = useEmailSelection()
  const openedEmail = ref(null)
  let selectedScreen = ref('inbox')


  const sortedEmails = computed(() => {
    return emails.sort((e1, e2) => {
      return e1.sentAt < e2.sentAt ? 1 : -1
    })
  })
  const filteredEmails = computed(() => {
    if(selectedScreen.value == 'inbox') {
      return sortedEmails.value.filter(e => !e.archived)
    } else {
      return sortedEmails.value.filter(e => e.archived)
    }
  })

  let selectScreen = function(newScreen) {
    selectedScreen = newScreen
    emailSelection.clear()
  }
  let updateEmail = function(email) {
    axios.put(`http://localhost:3000/emails/${email.id}`, email)
  }
  let openEmail = function(email) {
    this.openedEmail = email
    if(email) {
      email.read = true
      updateEmail(email)
    }
  }
  let archiveEmail = function(email) {
    email.archived = true
    updateEmail(email)
  }
  let changeEmail = function({toggleRead, toggleArchive, save, closeModal, changeIndex}) {
    let email = this.openedEmail
    if(toggleRead) { email.read = !email.read }
    if(toggleArchive) { email.archived = !email.archived }
    if(save) { updateEmail(email) }
    if(closeModal) { this.openedEmail = null }
    if(changeIndex) {
      let emails = filteredEmails
      let currentIndex = this.emails.indexOf(this.openedEmail)
      let newEmail = emails[currentIndex + changeIndex]
      openEmail(newEmail)
    }
  }

</script>


<template>
  <button
:disabled="selectedScreen == 'inbox'"
          @click="selectedScreen = 'inbox'">Inbox</button>
  <button
:disabled="selectedScreen == 'archive'"
          @click="selectedScreen = 'archive'">Archived</button>

  <BulkActionBar :emails="filteredEmails" />

  <table class="mail-table">
    <tbody>
    <tr
v-for="email in filteredEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']">
      <td>
        <input
type="checkbox"
               :checked="emailSelection.emails.has(email)"
               @click="emailSelection.toggle(email)" />
      </td>
      <td @click="openEmail(email)">{{email.from}}</td>
      <td @click="openEmail(email)">
        <p><strong>{{email.subject}}</strong> - {{email.body}}</p>
      </td>
      <td class="date" @click="openEmail(email)">
        {{format(new Date(email.sentAt), 'MMM do yyyy')}}
      </td>
      <td><button @click="archiveEmail(email)">Archive</button></td>
    </tr>
    </tbody>
  </table>

  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<style scoped>
</style>
