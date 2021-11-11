<template>
  <div>
    <School />
    <Teams />
  </div>
</template>

<script>
import School from './components/School.vue'
import Teams from './components/Teams.vue'

export default {
  name: 'App',
  components: {
    School,
    Teams
  }
}
</script>

<style>
</style>
