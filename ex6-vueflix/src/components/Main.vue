<template>
  <div>
    <form @submit.prevent="adicionarFilme()">
      <div>
        <label for="nome">Nome: </label>
        <input type="text" id="nome" v-model="form.nome" required>
      </div>
      <br>
      <div>
        <label for="categoria">Categoria: </label>
        <select id="categoria" v-model="form.categoria">
          <option value="Romance">Romance</option>
          <option value="Comédia">Comédia</option>
          <option value="Terror">Terror</option>
          <option value="Mistério">Mistério</option>
        </select>
      </div>
      <br>
      <div>
        <label for="pontuacao">Pontuação: </label>
        <input type="number" id="pontuacao" min="1" max="10" v-model.number="form.pontuacao" required>
      </div>
      <br>
      <button type="submit">Adicionar</button>
    </form>
    <br>
    <div>
      <label for="pesquisa">Pesquisar: </label>
      <input type="text" id="pesquisa" v-model="pesquisa">
    </div>
    <br>
    <table border="1" width="500">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Pontuação</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filme, index) in pesquisarFilme" :key="index">
          <td>{{ filme.nome }}</td>
          <td>{{ filme.categoria }}</td>
          <td>{{ filme.pontuacao }}</td>
          <td><button @click="removerFilme(index)">Remover</button></td>
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
        nome: "",
        categoria: "Romance",
        pontuacao: 1
      },
      filmes: localStorage.filmes ? JSON.parse(localStorage.filmes) : [],
      pesquisa: ""
    }
  }, watch: {
    filmes() {
      localStorage.setItem("filmes", JSON.stringify(this.filmes));
    }
  }, methods: {
    adicionarFilme() {
      if (!this.filmes.some(filme => filme.nome.toLowerCase() == this.form.nome.toLowerCase())) {
        this.filmes.push({ nome: this.form.nome, categoria: this.form.categoria, pontuacao: this.form.pontuacao });
        this.filmes.sort((a, b) => a.pontuacao < b.pontuacao ? -1 : 1);
      }
    }, removerFilme(idx) {
      if (confirm("Tem a certeza que quer eliminar este filme?")) {
        this.filmes.splice(idx, 1);
      }
    }
  }, computed: {
    pesquisarFilme() {
      return this.filmes.filter(filme => filme.nome.toLowerCase().startsWith(this.pesquisa));
    }
  }
}
</script>

<style>

</style>