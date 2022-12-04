<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  expected: number;
  actual: number;
}

const props = defineProps<Props>()

const showExpected = ref(false)
function show () {
  showExpected.value = true
}
function hidden () {
  showExpected.value = false
}
</script>

<template>
  <div
    class="wrapper"
    @pointerenter="show"
    @pointerleave="hidden"
  >
    <svg
      viewBox="0 0 100 100"
    >
      <circle
        r="45"
        cx="50"
        cy="50"
        fill="transparent"
        class="background"
      />
      <template v-if="actual >= 100">
        <circle
          r="45"
          cx="50"
          cy="50"
          fill="transparent"
          class="bar done"
          stroke-dasharray="284"
          stroke-linecap="round"
        />
      </template>
      <template v-else>
        <template v-if="props.actual > props.expected">
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            class="bar actual"
            stroke-dasharray="284"
            :stroke-dashoffset="284 - (284 * props.actual) / 100"
            stroke-linecap="round"
          />
          <circle
            v-if="showExpected"
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            class="bar expected"
            stroke-dasharray="284"
            :stroke-dashoffset="284 - (284 * props.expected) / 100"
            stroke-linecap="round"
          />
        </template>
        <template v-else>
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            class="bar expected"
            stroke-dasharray="284"
            :stroke-dashoffset="284 - (284 * props.expected) / 100"
            stroke-linecap="round"
          />
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            class="bar actual"
            stroke-dasharray="284"
            :stroke-dashoffset="284 - (284 * props.actual) / 100"
            stroke-linecap="round"
          />
        </template>
      </template>
    </svg>
    <div class="content">
      <span>{{ showExpected ? props.expected : props.actual }}%</span>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.content {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  transform: translate(0, -50%);
}

circle {
  stroke-width: 4.8px;
}

.background {
  stroke: var(--el-fill-color-light, #e5e9f2);
}

.bar {
  transform: rotate(-90deg);
  transform-origin: center;
}

.expected {
  stroke: #e6a23c;
}

.actual {
  stroke: #409eff;
}

.done {
  stroke: #67c23a;
}
</style>
