<template>
  
  <div class="note-resume">
    <font-awesome-icon class="font-awesome-icon fa-paperclip" icon="fa-solid fa-paperclip" @click="$emit('editNote', id)"/>
    <div class="resume-content" @click="$emit('editNote', id)">
      
      <span class="note-text">{{ text }}</span>
     
      <span class="note-reminder">{{ reminder }}</span>
    </div>
   
    <font-awesome-icon class="font-awesome-icon fa-trash" icon="fa-solid fa-trash" @click="confirmDeleteNote"/>
  </div>
</template>

<script>
import db from "../../../Backend/db.js";
import Swal from "sweetalert2";

export default {
  name: "NoteResume",
  emits: ["editNote"],
  props: {
    id: Number,         
    text: String,       
    potential: Number,  
    category: String,   
    reminder: String,   
  },
  methods: {
    
    async deleteNote() {
      try {
        await db.excluirAnotacao(this.id);
        this.$emit("noteDeleted"); 
      } catch (error) {
        console.error("Erro ao excluir anotação:", error);
      }
    },
    
    confirmDeleteNote() {
      Swal.fire({
        title: "Confirmar exclusão",
        text: "Tem certeza de que deseja excluir esta nota?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteNote(); 
          window.location.reload(); 
        }
      });
    },
  },
};
</script>
  
<style>

.note-resume {
  display: flex;
  height: 6%;
  width: 90%;
  padding: 5px;
  margin-top: 10px;
  border: none;
  border-radius: 20px;
  background-color: white;
}


.note-resume:hover {
  background-color: rgb(18, 149, 253);
  color: white;
  transition: 0.2s;
  cursor: pointer;
}


.resume-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}


.resume-content span {
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
}


.note-resume .font-awesome-icon {
  align-self: center;
  width: 10%;
}


.fa-trash {
  color: rgb(252, 96, 96);
}


@media screen and (max-width: 430px) and (max-height: 932px) {
  .note-resume {
    height: 6%;
  }
}
</style>
