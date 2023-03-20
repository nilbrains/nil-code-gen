import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSpaceStore = defineStore('space', () => {
  const sqls = []
  return { sqls }
})
