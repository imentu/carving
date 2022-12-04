<script setup lang="ts">
import projects from '../../model/Project'
import ProjectCard from '../project/ProjectCard.vue'
</script>

<template>
  <h2>Doing</h2>
  <div
    v-for="project in projects.data.doing"
    :key="project.title"
  >
    <ProjectCard
      :project="project"
    />
  </div>
  <h2>Todo</h2>
  <div
    v-for="project in projects.data.todo"
    :key="project.title"
  >
    <ProjectCard
      :project="project"
    />
  </div>
  <h2>Done</h2>
  <div
    v-for="project in projects.data.done"
    :key="project.title"
  >
    <ProjectCard
      :project="project"
    />
  </div>
</template>

<style scoped>
div{
  @apply my-8
}
</style>
