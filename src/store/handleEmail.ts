import { defineStore } from "pinia";
import axios from "axios";
import { onBeforeUnmount, reactive, ref } from "vue";

interface Email {
  id: number;
  from: string;
  subject: string;
  body: string;
  sentAt: string;
  archived: boolean;
  read: boolean;
  favorite: boolean;
}

export default defineStore({
  id: "email",
  state: () => ({
    emails: [],
    selectedScreen: ref("inbox"),
    openedEmail: ref(null),
    emailSet: reactive(new Set()),
  }),
  actions: {
    async callEmails() {
      this.emails = (await axios.get("http://localhost:3000/emails")).data;
    },
    updateEmail(email: Email) {
      void axios.put(`http://localhost:3000/emails/${email.id}`, email);
    },
    handleOpenEmail(email: Email) {
      this.openedEmail = email;

      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    handleArchiveClick(email: Email) {
      email.archived = true;
      email.favorite = false;
      this.updateEmail(email);
    },
    handleFavoriteClick(email: Email) {
      email.favorite = !email.favorite
      this.updateEmail(email);
    },
    selectScreen(newScreen: string) {
      this.selectedScreen = newScreen;
      this.clear();
    },
    changeEmail({ toggleRead, toggleArchive, save, closeModal, changeIndex }) {
      const email = this.openedEmail;
      if (toggleRead) {
        email.read = !email.read;
      }
      if (toggleArchive) {
        email.archived = !email.archived;
      }
      if (save) {
        this.updateEmail(email);
      }
      if (closeModal) {
        this.openedEmail = null;
      }

      if (changeIndex) {
        console.log(changeIndex);
        const emails = this.filteredEmails;
        const currentIndex = emails.indexOf(this.openedEmail);

        console.log(currentIndex, emails);
        const newEmail = emails[currentIndex + changeIndex];
        this.handleOpenEmail(newEmail);
      }
    },
    handleKeyboardInput(keyCombos) {
      const onKeydown = (event: { key: string }) => {
        const kc = keyCombos.find((kc) => kc.key == event.key);
        if (kc) {
          kc.fn();
        }
      };

      window.addEventListener("keydown", onKeydown);
      onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeydown);
      });
    },
    bulkSelect() {
      if (this.allEmailsSelected) {
        this.clear();
      } else {
        this.addMultiple(this.emails);
      }
    },

    toggle(email) {
      if (this.emailSet.has(email)) {
        this.emailSet.delete(email);
      } else {
        this.emailSet.add(email);
      }
    },
    clear() {
      this.emailSet.clear();
    },
    addMultiple(newEmails: []) {
      newEmails.forEach((email) => {
        this.emailSet.add(email);
      });
    },
    forSelected(fn) {
      this.emailSet.forEach((email: Email) => {
        fn(email);
        axios.put(`http://localhost:3000/emails/${email.id}`, email);
      });
    },
    markRead() {
      this.forSelected((e) => (e.read = true));
    },
    markUnread() {
      this.forSelected((e) => (e.read = false));
    },
    archive() {
      this.forSelected((e) => (e.archived = true));
      this.clear();
    },
  },
  getters: {
    sortFavorites(): Email[] {
      return this.emails.sort((e1, e2) => {
        return !e1.favorite && e2.favorite ? 1 : -1;
      });
    },
    filteredEmails(state): Email[] {
      const shouldSeeArchived = !(state.selectedScreen === "inbox");
      return this.sortFavorites.filter((e) =>
        shouldSeeArchived ? e.archived : !e.archived
      );
    },
    numberSelected() {
      return this.emailSet.size;
    },
    numberEmails() {
      return this.emails.length;
    },
    allEmailsSelected() {
      return this.numberSelected === this.numberEmails;
    },
    someEmailsSelected() {
      return this.numberSelected > 0 && this.numberSelected < this.numberEmails;
    },
  },
});
