import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    alarms: [
      { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
      { id: 2, name: 'yay', file: new URL('@/assets/yay.mp3', import.meta.url).href },
      { id: 3, name: 'wryyyyyyy', file: new URL('@/assets/dio-wryyy.mp3', import.meta.url).href },
    ],
    // 只需要把 seleted 的資料進 local storage, key 是 'pomodoro-settings'
    selected: 3,
  }),
  getters: {
    selectedFile() {
      const i = this.alarms.findIndex((alarm) => alarm.id === this.selected)
      return this.alarms[i].file
    },
  },
  persist: {
    key: 'pomodoro-settings',
    pick: ['selected'],
  },
})
