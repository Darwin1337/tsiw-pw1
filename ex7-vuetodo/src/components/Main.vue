<template>
  <div>
    <dialog :open="openDialog">
      <form @submit.prevent="adicionarTarefa()">
        <div>
          <label for="descricao">Descrição: </label>
          <input type="text" id="descricao" v-model="form.descricao" required>
        </div>
        <br>
        <div>
          <label for="categoria">Categoria: </label>
          <select id="categoria" v-model="form.categoria">
            <option value="Pessoal">Pessoal</option>
            <option value="Profissional">Profissional</option>
          </select>
        </div>
        <br>
        <div>
          <label for="prioridade">Prioridade: </label>
          <input type="number" min="1" max="5" v-model.number="form.prioridade" required>
        </div>
        <br>
        <button type="submit">Adicionar</button>
      </form>
    </dialog>
    <div>
      <button @click="openDialog = !openDialog">Adicionar</button>
      <button @click="removerTarefas()">Remover</button>
      <button @click="tipo = tipo == 'realizado' ? 'prioridade' : 'realizado'; ordernarTarefas()">Ordenar</button>
      <br>
      <br>
      <input type="text" v-model="descricao" />
      <select v-model="categoria">
        <option value=""></option>
        <option value="Pessoal">Pessoal</option>
        <option value="Profissional">Profissional</option>
      </select>
    </div>
    <br>
    <table border="1" width="500">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Prioridade</th>
          <th>Realizar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarefa, index) in listaTarefas" :key="index">
          <td :style="{ backgroundColor: tarefa.realizada ? 'green' : 'red' }">{{ tarefa.descricao }}</td>
          <td>{{ tarefa.categoria }}</td>
          <td>
            {{ tarefa.prioridade }}
            &nbsp;&nbsp;
            <img src="../assets/up.svg" width="15" v-show="tarefa.prioridade < 5" @click="tarefa.prioridade++">
            &nbsp;&nbsp;
            <img src="../assets/down.svg" width="15" v-show="tarefa.prioridade > 1" @click="tarefa.prioridade--">
          </td>
          <td><button @click="tarefa.realizada = !tarefa.realizada; tipo = 'realizado'; ordernarTarefas()">Realizar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        descricao: "",
        categoria: "Pessoal",
        prioridade: 3
      },
      tarefas: localStorage.tarefas ? JSON.parse(localStorage.tarefas) : [],
      openDialog: false,
      tipo: "",
      descricao: "",
      categoria: ""
    }
  }, watch: {
    tarefas: {
      deep: true,
      handler() {
        localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
      }
    }
  }, methods: {
    adicionarTarefa() {
      if (!this.tarefas.some(tarefa => tarefa.descricao.toLowerCase() == this.form.descricao.toLowerCase())) {
        this.tarefas.push({ descricao: this.form.descricao, categoria: this.form.categoria, prioridade: this.form.prioridade, realizada: false });
        this.openDialog = false;
      }
    }, removerTarefas() {
      if (confirm("Tem a certeza que quer eliminar esta tarefa?")) {
        this.tarefas = [];
      }
    }, ordernarTarefas() {
      console.log(this.tipo);
      if (this.tipo == "realizado") {
        this.tarefas.sort((a, b) => a.realizada < b.realizada ? -1 : 1);
      } else {
        this.tarefas.sort((a, b) => a.prioridade < b.prioridade ? -1 : 1);
      }
    }
  }, computed: {
    listaTarefas() {
      return this.tarefas.filter(tarefa => tarefa.descricao.startsWith(this.descricao) && (this.categoria == "" || tarefa.categoria == this.categoria));
    }
  }
}
</script>

<style>
</style>