<template>
  <div>
    <p v-for="(detail, prop) of person" :key="prop">{{ prop + ": " + detail}}</p>
    {{ printDataPerson() }}
    {{ printDataPerson() }}
    {{ printDataPersonComputed }}
    {{ printDataPersonComputed }}
    <p>fullName: {{ getFullNameComputed }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: { firstName: "Rui", lastName: "Silva", age: 23 }
    }
  }, created () {
    console.log("Evento: Criação");
  }, mounted () {
    console.log("Evento: Montagem");
  }, updated () {
    console.log("Evento: Atualização");
  }, methods: {
    printDataPerson() {
      console.log("METHOD--> NOME: " + this.person.firstName + " e IDADE: " + this.person.age);  
    }
  }, computed: {
    printDataPersonComputed() {
      console.log("COMPUTED--> NOME: " + this.person.firstName + " e IDADE: " + this.person.age);
      return null;
    }, getFullNameComputed() {
      return this.person.firstName + " " + this.person.lastName;
    }
  }, watch: {
    'person.age'(newValue, oldValue) {
      console.log("Idade alterada de " + oldValue + " para " + newValue);
    }
  }
}
</script>

<style>

</style>