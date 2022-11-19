<script setup lang="ts">
import { DateTime } from 'luxon'
import json from '../../data/projects.json'
import { Project, ProjectStatus } from '../../lib/core'
import ProjectCard from '../project/ProjectCard.vue'

const projects = json.map(project => {
  const result = new Project(project.title, DateTime.fromFormat(project.startDate, 'yyyy-LL-dd'), project.total, project.step)
  for (const mileStone of project.milestones) {
    result.addMileStone(DateTime.fromFormat(mileStone.date, 'yyyy-LL-dd'), mileStone.value)
  }
  return result
})

const todo: Project[] = []
const doing : Project[] = []
const done: Project[] = []

for (const project of projects) {
  let arr: Project[]
  switch (project.status) {
    case ProjectStatus.Todo:
      arr = todo
      break
    case ProjectStatus.Doing:
      arr = doing
      break
    case ProjectStatus.Done:
      arr = done
      break
  }
  arr.push(project)
}

</script>

<template>
  <h2>Doing</h2>
  <div
    v-for="project in doing"
    :key="project.title"
    class="my-8"
  >
    <ProjectCard
      :project="project"
    />
  </div>
  <h2>Todo</h2>
  <div
    v-for="project in todo"
    :key="project.title"
    class="my-8"
  >
    <ProjectCard
      :project="project"
    />
  </div>
  <h2>Done</h2>
  <div
    v-for="project in done"
    :key="project.title"
    class="my-8"
  >
    <ProjectCard
      :project="project"
    />
  </div>
</template>

<style scoped>
</style>
