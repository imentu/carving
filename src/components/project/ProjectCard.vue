<script setup lang="ts">
import { Project, ProjectStatus } from '../../lib/core'
import CircularProgressBar from './CircularProgressBar.vue'

interface Props {
  project: Project
}

const props = defineProps<Props>()
</script>

<template>
  <div class="container flex w-11/12 flex-col rounded-md shadow-xl border m-auto">
    <div class="flex flex-row justify-between border-b-2 px-4 py-2">
      <span class="text-lg font-bold leading-10">{{ props.project.title }}</span>
      <span class="text-sm leading-10 text-neutral-400">{{ props.project.days }} days</span>
    </div>
    <div class="flex flex-row content-center justify-between py-4 px-4">
      <div class="w-3/12 flex flex-col justify-center">
        <CircularProgressBar
          :expected="props.project.expectedProgress"
          :actual="props.project.currentProgress"
        />
      </div>
      <div class="w-7/12 flex flex-col justify-center">
        <ul class="text-base text-right">
          <li>start: {{ props.project.start }} </li>
          <li v-if="(project.status == ProjectStatus.Doing) || (project.status == ProjectStatus.Todo) ">
            estimated : {{ props.project.estimated }}
          </li>
          <li v-if="(project.status == ProjectStatus.Done)">
            end : {{ props.project.doneDate }}
          </li>
          <li>&nbsp;</li>
          <li>current / expected : {{ props.project.current }} / {{ props.project.expected }} </li>
          <li>progress : {{ props.project.current }} / {{ props.project.total }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
}
</style>
