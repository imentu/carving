<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { Project } from './lib/core'
import ProjectCard from './components/project/ProjectCard.vue'

const startDateTime = DateTime.local(2022, 10, 16)
const projectBO = new Project('Essential Grammar In Use', startDateTime, 115, 1)
projectBO.addMileStone(DateTime.local(2022, 11, 17), 45)
projectBO.addMileStone(DateTime.local(2022, 11, 26), 56)

const project = ref(projectBO)
</script>

<template>
  <ProjectCard :project="project" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
