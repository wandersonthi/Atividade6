<template>
  <div id="main-header">
    
    <div class="header-text">Anotações</div>
    
    <div id="data-buttons">
      
      <CustomButton
        class="header-button"
        text="Carregar Dados"
        type="0"
        :length="buttonWidth"
        :height="buttonHeight"
        @click="carregarDados"
      />
      
      <CustomButton
        class="header-button"
        text="Persistir Dados"
        type="0"
        :length="buttonWidth"
        :height="buttonHeight"
        @click="persistirDados"
      />
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import CustomButton from "@/components/CustomButton.vue";
import db from "../../../Backend/db.js";

export default {
  name: "AppHeader",
  components: { CustomButton },
  data() {
    return {
      buttonHeight: null,
      buttonWidth: null,
    };
  },
  methods: {
   
    carregarDados() {
      
      this.$swal({
        title: "Insira o seu token:",
        html: `
          <input type="text" id="token-input" class="swal2-input" placeholder="Digite seu token">
        `,
        showCancelButton: true,
        confirmButtonText: "Carregar Dados",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const token = document.getElementById("token-input").value;
          this.importData(token);
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      });
    },
    
    async persistirDados() {
      
      try {
        const { isConfirmed, isDenied } = await this.$swal.fire({
          title: "Selecione uma opção",
          confirmButtonText: "Gerar um novo token",
          confirmButtonColor: "#007BFF",
          denyButtonColor: "#007BFF",
          showCloseButton: true,
          showDenyButton: true,
          denyButtonText: "Já possuo um token",
        });

        if (isDenied) {
          
          const { value: existingToken } = await this.$swal.fire({
            title: "Informe seu token",
            input: "text",
            inputValidator: (value) => {
              if (!value) {
                return "Você precisa inserir um token!";
              }
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#007BFF",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#DC3545",
          });

          
          let dbNotes = await db.consultarAnotacoes();
          await axios.post("http://localhost:3000/api/persistir-dados", {
            token: existingToken,
            notes: dbNotes,
          });

          
          this.$swal({
            title: "Dados Persistidos com Sucesso",
            text: `Os dados foram persistidos no MongoDB com o token: ${existingToken}`,
            icon: "success",
          });
        } else if (isConfirmed) {
          
          const newToken = this.gerarToken();

          
          let dbNotes = await db.consultarAnotacoes();
          await axios.post("http://localhost:3000/api/persistir-dados", {
            token: newToken,
            notes: dbNotes,
          });

         
          this.$swal({
            title: "Dados Persistidos com Sucesso",
            text: `Os dados foram persistidos no MongoDB com o token: ${newToken}`,
            icon: "success",
          });
        } else {
          return;
        }
      } catch (error) {
        
        console.error("Erro ao persistir dados:", error);
        this.$swal({
          title: "Erro",
          text: "Ocorreu um erro ao persistir os dados.",
          icon: "error",
        });
      }
    },

    
    gerarToken() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    
    
    async importData(token) {
     
      let notes = await axios(
        `http://localhost:3000/api/recuperar-dados/${token}`
      ).then((res) => res.data);

      
      if (notes.length > 0) {
        db.limparAnotacoes();

        const promises = notes.map(async (note) => {
          const currentNote = {
            text: note.text,
            potential: note.potential,
            category: note.category,
            reminder: note.reminder,
          };

          await db.adicionarAnotacao(currentNote);
        });

        await Promise.all(promises);

        
        this.$swal
          .fire({
            icon: "success",
            title: "Dados carregados com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          })
          .then(() => {
            window.location.reload();
          });
      } else {
        
        console.error("Erro ao importar dados");

        this.$swal.fire({
          icon: "error",
          title: "Falha ao carregar dados",
          text: "Ocorreu um erro ao carregar os dados.",
        });
      }
    },
  },
};
</script>
  
<style>

#main-header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(211, 211, 211);
}


.header-text {
  margin-left: 20px;
}


#data-buttons {
  width: 25%;
  height: 100%;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.header-button {
  width: 40%;
  height: 50%;
}


@media screen and (max-width: 430px) and (max-height: 932px) {
  .header-button {
    width: 100px;
    height: 50px;
    margin-left: 10px;
  }

  #data-buttons {
    width: 50%;
  }

  #token-input {
    padding: 5px;
  }
}
</style>
