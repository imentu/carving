<script setup lang="ts">
import projects from '../../model/Project'
import ProjectCard from '../project/ProjectCard.vue'
</script>

<template>
  <div v-if="projects.data.doing.length > 0">
    <h2>Doing</h2>
    <div
      v-for="project in projects.data.doing"
      :key="project.title"
    >
      <ProjectCard :project="project" />
    </div>
  </div>
  <div v-if="projects.data.todo.length > 0">
    <h2>Todo</h2>
    <div
      v-for="project in projects.data.todo"
      :key="project.title"
    >
      <ProjectCard :project="project" />
    </div>
  </div>
  <div v-if="projects.data.done.length > 0">
    <h2>Done</h2>
    <div
      v-for="project in projects.data.done"
      :key="project.title"
    >
      <ProjectCard :project="project" />
    </div>
  </div>
</template>

<style scoped>
div {
  @apply my-8
}
</style>
