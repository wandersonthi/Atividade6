<template>
 
  <div id="home-main">
   
    <div id="home-menu">
      <NotesMenu @editNote="editNote" />
    </div>
    
    <div id="notes-list">
      <NoteResume
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :text="note.text"
        :potential="note.potential"
        :category="note.category"
        :reminder="note.reminder"
        @editNote="editNote"
      />
    </div>
    
    <div id="content">
      <font-awesome-icon icon="fa-solid fa-paperclip" class="primary-icon" />
      <div class="primary-text">Anotações</div>
      <div class="secondary-text">by Wanderson Rosa</div>
      
      <button class="new-note-button" @click="newNote">+ Criar Anotação</button>
    </div>
  </div>
</template>

<script>
import db from "../../../Backend/db.js";
import NotesMenu from "../components/NotesMenu.vue";
import NoteResume from "../components/NoteResume.vue";

export default {
  components: { NotesMenu, NoteResume },
  name: "HomePage",
  data() {
    return {
      notes: null, 
    };
  },
  methods: {
    
    newNote() {
      this.$router.push("/new-note");
    },
    
    editNote(noteId) {
      this.$router.push(`/edit-note/${noteId}`);
    },
  },
  
  async mounted() {
    
    this.notes = await db.consultarAnotacoes();

    
    const larguraDaTela =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const alturaDaTela =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    
    if (this.notes.length > 0 && larguraDaTela >= 430 && alturaDaTela >= 932) {
      
      document.getElementsByClassName("primary-text")[0].style.display = 'none';
      document.getElementsByClassName("secondary-text")[0].style.display = 'none';
      document.getElementsByClassName("primary-icon")[0].style.display = 'none';
      
      document.getElementById("home-main").style.gridTemplateRows = '90% 10%';
      
      document.getElementById("notes-list").style.display = 'flex';
      
      document.querySelector('#home-main .new-note-button').style.height = '70%';
      document.querySelector('#home-main .new-note-button').style.width = '70%';
      document.querySelector('#home-main .new-note-button').style.marginTop = '0';
    }
  }
};
</script>

<style>

#home-main {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
}

#home-main #content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#notes-list {
  display: none; 
}

.new-note-button {
  margin-top: 50px;
  border: none;
  border-radius: 20px;
  height: 5%;
  width: 10%;
  font-size: 16px;
  color: white;
  background-color: rgb(18, 149, 253);
}

.new-note-button:hover {
  background-color: rgb(16, 127, 218);
}

#home-menu {
  overflow: auto; 
}

@media screen and (max-width: 430px) and (max-height: 932px) {
  
  #home-main {
    width: 100vw;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-content: center;
  }

  #home-menu {
    display: none; 
  }

  #notes-list {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    overflow: scroll; 
  }

  #home-main .new-note-button {
    height: 8%;
    width: 50%;
  }
}
</style>
