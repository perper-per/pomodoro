import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', {
  state: () => ({
    items: [],
    id: 1,
    // 倒數剩餘時間
    timeleft: time,
    // 是否在休息時間
    break: false,
    // 已完成事項
    finishedItems: [],
    // 目前倒數事項
    current: '',
    /* items裡第一個放到current，再放到完成的陣列裡 */
  }),
  actions: {
    addItem(value) {
      this.items.push({
        id: this.id++,
        text: value,
        edit: false,
        model: value,
      })
    },
    findIndexById(id) {
      return this.items.findIndex((item) => item.id === id)
    },
    delItem(id) {
      const i = this.findIndexById(id)
      this.items.splice(i, 1)
    },
    editItem(id) {
      const i = this.findIndexById(id)
      this.items[i].edit = true
    },
    confirmEditItem(id) {
      const i = this.findIndexById(id)
      this.items[i].text = this.items[i].model
      this.items[i].edit = false
    },
    cancelEditItem(id) {
      const i = this.findIndexById(id)
      this.items[i].model = this.items[i].text
      this.items[i].edit = false
    },
    setCurrentItem() {
      // 如果是暫停狀況的話 把 this.current 設為顯示 '休息一下' , 否則取出 this.items 的第一個項目的.text 並顯示
      this.current = this.break ? '休息一下' : this.items.shift().text
    },
    countdown() {
      this.timeleft--
    },
    setFinishItem() {
      if (!this.break) {
        this.finishedItems.push({
          id: this.id++,
          text: this.current,
        })
      }
      this.current = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timeBreak : time
    },
    
    delFinishedItem(id) {
      const i = this.finishedItems.findIndex((item) => item.id === id)
      this.finishedItems.splice(i, 1)
    },
  },
  persist: {
    key: 'pomodoro-list',
  },
})

/* 所有要對 store 的 state 做的事 都要寫成 action */
