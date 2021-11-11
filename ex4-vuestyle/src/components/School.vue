<template>
  <div>
    <div>
      <p v-show="visible" :style="{ color: color, fontSize: size + 'px', backgroundColor: background }">{{ msg }}</p>
      <button @click="changeColor('red')">RED</button>
      <button @click="changeSize(30)">BIG</button>
      <button @click="changeBackground('yellow')">YELLOW</button>
      <button @click="visible = !visible">SHOW/HIDE</button>
    </div>
    <hr>
    <div>
      <div v-if="schools.length > 0">
        <h2>{{ schools.length }} ESCOLAS DO IPP</h2>
        <ul>
          <li v-for="school in filteredList" :key="school">{{ school }}</li>
        </ul>
      </div>
      <p v-else>SEM ESCOLAS</p>
      {{ addSchool("ESMAE") }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "A ESMAD é uma escola do IPP",
      color: "",
      size: 16,
      background: "",
      visible: true,
      schools: ["ESMAD", "ISEP", "ESE", "ISCAP", "ESTG", "ESS", "ESHT"]
    }
  }, methods: {
    changeColor(color) {
      this.color = this.color != "" ? "" : color;
    },
    changeSize(size) {
      this.size = this.size != 16 ? 16 : size;
    },
    changeBackground(color) {
      this.background = this.background != "" ? "" : color;
    },
    addSchool(name) {
      if (!this.schools.some(school => school.toLowerCase() == name.toLowerCase())) {
        this.schools.push(name);
      }
    }
  }, computed: {
    filteredList() {
      return this.schools.filter(school => school.toLowerCase().startsWith("e"));
    }
  }
}
</script>

<style>

</style>