<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 style="color: cornflowerblue;">目前事項： {{ currentText }}</h1>
      </v-col>
      <v-col cols="12">
         <digit v-for="(data, i) in currentTime" :key="i" :data="data" color="white"></digit>
      </v-col>
      <v-col cols="12">
        <!-- 如果 status 是計時中 (COUNTING)，禁用播放按鈕，防止重複啟動
        如果目前的播放清單 (current) 和總事項清單 (items) 都是空的，按鈕也會被禁用-->
        <v-btn
          icon="mdi-play"
          :disabled="status === STATUS.COUNTING || (current.length === 0 && items.length === 0)"
          @click="startTimer"
          ></v-btn>
        <!-- 目前沒有在倒數狀態，就不能按暫停 -->
        <v-btn icon="mdi-pause" :disabled="status !== STATUS.COUNTING" @click="pauseTimer"></v-btn>
        <!-- 目前待做事項為空，就不能跳過 -->
        <v-btn icon="mdi-skip-next" :disabled="current.length === 0" @click="finishTimer"></v-btn>
      </v-col>
    </v-row>
  </v-container>
<three></three>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2,
}
const status = ref(STATUS.STOP)

const list = useListStore()
const { current, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishItem } = list

const settings = useSettingsStore()
const { selectedFile } = storeToRefs(settings)

const currentText = computed(() => {
  if (current.value.length > 0) {
    return current.value
  } else if (items.value.length > 0) {
    return '點擊開始'
  } else {
    return '沒有事項'
  }
})

// items.value.length > 0 = 還有待做事項
// timer 的 if 等於是按完跳過的按鈕就會直接執行下面 finishTimer()
let timer = 0
const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedFile.value
  audio.play()

  setFinishItem()

  // 自動執行下一個事項
  if (items.value.length > 0) {
    startTimer()
  }
}

const pauseTimer = () => {
  clearInterval(timer)
  status.value = STATUS.PAUSE
}

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60)
    .toString()
    .padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>

<route lang="yaml">
meta:
  title: 倒數
</route>
