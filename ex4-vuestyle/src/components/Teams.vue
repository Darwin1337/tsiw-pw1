<template>
  <div>
    <div>
      <ul>
        <li v-for="(team, index) in teams" :key="index">
          {{ Object.keys(team)[0] + ": " + team.name + " AND " + Object.keys(team)[1] + ": " + team.year }}
        </li>
      </ul>
    </div>
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>NAME</th>
            <th>YEAR</th>
            <th>LOCATION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in filterTeams" :key="index">
            <td>{{ team.name }}</td>
            <td>{{ team.year }}</td>
            <td>{{ team.location }}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <button @click="addTeam('braga', '1923', 'braga')">Adicionar Braga</button>
      <button @click="filterByCity = filterByCity != '' ? '' : 'lisbon'">{{ filterByCity == "" ? "Filtrar Lisboa" : "Mostrar Todos" }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [
        { name: "benfica", year: 1910, location: "lisbon" },
        { name: "porto", year: 1912, location: "porto" },
        { name: "sporting", year: 1914, location: "lisbon" }
      ],
      filterByCity: ""
    }
  }, methods: {
    addTeam(name, year, location) {
      if (!this.teams.some(team => team.name.toLowerCase() == name)) {
        this.teams.push({ name: name, year: year, location: location });
      }
    }
  }, computed: {
    filterTeams() {
      return this.filterByCity != "" ? this.teams.filter(team => team.location.toLowerCase() == this.filterByCity.toLowerCase()) : this.teams;
    }
  }
}
</script>

<style>

</style>