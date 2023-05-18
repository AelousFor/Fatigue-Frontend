import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
  //state存放状态,
  state: {
    fatigueWave: [0,0,0,0,0],
    fatigue: [Math.random().toFixed(2), Math.random().toFixed(2),
      Math.random().toFixed(2), Math.random().toFixed(2), Math.random().toFixed(2)],
    vvalue: [Math.random().toFixed(2), Math.random().toFixed(2),
      Math.random().toFixed(2), Math.random().toFixed(2), Math.random().toFixed(2)],
    table:  [{
      th: 1,
      reactionTime: 0,
      totalCount: 0,
      rightCount: 0,
      wrongCount: 0,
      rightRatio: 0,
      reactionTimeDiv: 0,
    }, {
      th: 2,
      reactionTime: 0,
      totalCount: 0,
      rightCount: 0,
      wrongCount: 0,
      rightRatio: 0,
      reactionTimeDiv: 0,
    }, {
      th: 3,
      reactionTime: 0,
      totalCount: 0,
      rightCount: 0,
      wrongCount: 0,
      rightRatio: 0,
      reactionTimeDiv: 0,
    }, {
      th: 4,
      reactionTime: 0,
      totalCount: 0,
      rightCount: 0,
      wrongCount: 0,
      rightRatio: 0,
      reactionTimeDiv: 0,
    }, {
      th: 5,
      reactionTime: 0,
      totalCount: 0,
      rightCount: 0,
      wrongCount: 0,
      rightRatio: 0,
      reactionTimeDiv: 0,
    }]
  },
  //getter为state的计算属性
  getters: {
    getFatigue(state) {
      return state.fatigue
    },
    getVValue(state){
      return state.vvalue
    },
    getTable(state){
      return state.table
    },
    getFatigueWave(state){
      return state.fatigueWave
    },
  },
  //mutations可更改状态的逻辑，同步操作
  mutations: {
    setData(state, data) {
      state.fatigue = data.fatigue
      state.vvalue = data.vvalue
      state.table = data.table
      state.fatigueWave=data.fatigueWave
    }
  },
  //提交mutation，异步操作
  actions: {},
  // 将store模块化
  modules: {},
})

export default store
