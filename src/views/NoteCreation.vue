<template>
  
  <div id="new-note">
    
    <label class="first-label" for="note-text">Descrição</label>
    <textarea id="note-text" name="note-text" v-model="noteText" />
    <label for="potential">Potencial do negócio (R$)</label>
    <input id="potential" name="potential" type="number" v-model="potential" />
    <label for="category">Categoria</label>
    <select id="category" name="category" v-model="category">
      <option value="work">Trabalho</option>
      <option value="leisure">Lazer</option>
      <option value="bills">Contas</option>
      <option value="shopping">Compras</option>
    </select>
    <label for="reminder">Lembrete</label>
    <input id="reminder" name="reminder" type="date" v-model="reminder" />
    
    <div id="new-note-buttons">
      <CustomButton
        class="new-note-button"
        text="Cancelar"
        type="1"
        @click="cancelNote"
      />
      <CustomButton
        class="new-note-button"
        text="Salvar"
        type="0"
        @click="salvarAnotacao"
      />
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue"; 
import db from "../../../Backend/db.js"; 

export default {
  name: "NoteCreation", 
  components: { CustomButton }, 
  data() {
    return {
      note: null, 
      noteText: null, 
      potential: null, 
      category: null, 
      reminder: null, 
    };
  },
  methods: {
    
    async salvarAnotacao() {
      let anotacao = {
        text: this.noteText,
        potential: this.potential,
        category: this.category,
        reminder: this.reminder,
      };

      
      if (this.$route.params.id) {
        try {
          await db.editarAnotacao(parseInt(this.$route.params.id), anotacao);
          console.log("Anotação editada com sucesso!");
          this.$router.push("/");
        } catch (error) {
          console.error("Erro ao editar anotação:", error);
          this.$router.push("/");
        }
      } else {
        
        try {
          await db.adicionarAnotacao(anotacao);
          console.log("Anotação salva com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar anotação:", error);
        }

        
        this.$router.push("/");
      }
    },
    
    cancelNote() {
      this.$router.push("/");
    },
  },
 
  async mounted() {
    
    if (this.$route.params.id) {
      let noteId = parseInt(this.$route.params.id);

      try {
        
        const fetchedNote = await db.consultarAnotacaoPorId(noteId);
        if (fetchedNote) {
          this.note = fetchedNote;
          this.noteText = this.note.text;
          this.potential = this.note.potential;
          this.category = this.note.category;
          this.reminder = this.note.reminder;
        } else {
          console.error("Nenhuma anotação encontrada para o ID fornecido.");
        }
      } catch (error) {
        console.error("Erro ao carregar anotação:", error);
      }
    }
  },
};
</script>

<style>

#new-note {
  width: 90%;
  justify-self: center;
  display: flex;
  flex-direction: column;
}


#note-text, #potential, #category, #reminder {
  height: 50px;
  border: none;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 50px;
}

#note-text {
  height: 200px;
}


#new-note-buttons {
  height: 5%;
  display: flex;
  justify-content: center;
}

#new-note .new-note-button {
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0;
}


#new-note .first-label {
  margin-top: 20px;
}


@media screen and (max-width: 430px) and (max-height: 932px) {
  #new-note {
    justify-content: center;
  }

  #new-note-buttons {
    height: 5%;
  }

  .new-note-button {
    width: 100%;
    height: 100%;
  }
}
</style>
