<template>
  <div>
    <dialog :open="openDialog">
      <form @submit.prevent="adicionarAluno()">
        <div>
          <label for="nome">Nome: </label>
          <input type="text" id="nome" v-model="form.nome" required>
        </div>
        <br>
        <div>
          <label for="hobby">Hobbies: </label>
          <br><br>
          <div v-for="(hobby, index) in form.hobbies" :key="index">
            <select disabled>
              <option :value="hobby.desc">{{ hobby.desc }}</option>
            </select>
            <input type="number" :value="hobby.pref" disabled>
          </div>
          <select id="hobby" v-model="form.hobby">
            <option value="Fazer desporto">Fazer desporto</option>
            <option value="Viajar">Viajar</option>
            <option value="Ler">Ler</option>
            <option value="Escrever">Escrever</option>
            <option value="Ouvir música">Ouvir música</option>
            <option value="Ir ao cinema">Ir ao cinema</option>
          </select>
          <input type="number" id="preferencia" min="1" max="5" v-model.number="form.preferencia" required>
          <button type="button" @click="adicionarHobby()">+</button>
        </div>
        <br>
        <button type="submit">Adicionar</button>
      </form>
    </dialog>
    <button @click="openDialog = !openDialog">Adicionar</button>
    <br><br>
    <div>
      <label for="filtrar-hobby">Filtrar por hobby: </label>
      <select id="filtrar-hobby" v-model="filtrarHobby">
        <option value="Todos">Todos</option>
        <option value="Fazer desporto">Fazer desporto</option>
        <option value="Viajar">Viajar</option>
        <option value="Ler">Ler</option>
        <option value="Escrever">Escrever</option>
        <option value="Ouvir música">Ouvir música</option>
        <option value="Ir ao cinema">Ir ao cinema</option>
      </select>
    </div>
    <br>
    <table border="1" v-if="alunos.length > 0">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Hobbies</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aluno, index) in alunosFiltrados" :key="index">
          <td>{{ aluno.nome }}</td>
          <td>{{ mostrarHobbies(aluno.nome) }}</td>
          <td><button @click="~removerAluno(aluno.nome)">Remover</button></td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      openDialog: false,
      alunos: localStorage.alunos ? JSON.parse(localStorage.alunos) : [{"nome":"João Silva","hobbies":[{"desc":"Viajar","pref":5},{"desc":"Ler","pref":3}]},{"nome":"Maria Bastos","hobbies":[{"desc":"Viajar","pref":4},{"desc":"Ler","pref":4},{"desc":"Escrever","pref":2}]}],
      form: {
        nome: "",
        hobby: "Fazer desporto",
        hobbies: [],
        preferencia: 1
      },
      filtrarHobby: "Todos"
    }
  }, watch: {
    alunos: {
      deep: true,
      handler() {
        localStorage.setItem("alunos", JSON.stringify(this.alunos));
      }
    }
  }, methods: {
    adicionarHobby() {
      this.form.hobbies.push({ desc: this.form.hobby, pref: this.form.preferencia });
      this.form.hobby = 'Fazer desporto';
      this.form.preferencia = 1;
    },
    adicionarAluno() {
      if (this.form.hobbies.length > 0) {
        this.alunos.push({ nome: this.form.nome, hobbies: this.form.hobbies });
        this.form.nome = "";
        this.form.hobbies = [];
        this.form.preferencia = 1;
        this.openDialog = false;
      } else {
        alert("Introduza pelo menos 1 hobby!")
      }

    }, mostrarHobbies(nome) {
      let teste = "";
      const idx = this.alunos.findIndex(aluno => aluno.nome == nome);
      for (let i = 0; i < this.alunos[idx].hobbies.length; i++) {
        teste +=  this.alunos[idx].hobbies[i].desc + " " +  this.alunos[idx].hobbies[i].pref + ", ";
      }
      return teste.slice(0, teste.length - 2);
    }, removerAluno(nome) {
      const idx = this.alunos.findIndex(aluno => aluno.nome == nome);
      if (this.filtrarHobby == "Todos") {
        this.alunos.splice(idx, 1);
      } else {
        const idxHobby = this.alunos[idx].hobbies.findIndex(hobby => hobby.desc == this.filtrarHobby);
        this.alunos[idx].hobbies.splice(idxHobby, 1);
      }
    }, compararHobbies(a, b) {
      if (this.filtrarHobby != "Todos") {
        const idxA = a.hobbies.findIndex(hobby => hobby.desc == this.filtrarHobby);
        const idxB = b.hobbies.findIndex(hobby => hobby.desc == this.filtrarHobby);
        if (a.hobbies[idxA].pref < b.hobbies[idxB].pref) {
          return 1;
        } else if (a.hobbies[idxA].pref > b.hobbies[idxB].pref) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }, computed: {
    alunosFiltrados() {
      return this.alunos.filter(aluno => aluno.hobbies.some(hobby => hobby.desc == this.filtrarHobby) || this.filtrarHobby == "Todos").sort(this.compararHobbies);
    }
  }
}
</script>

<style>

</style>