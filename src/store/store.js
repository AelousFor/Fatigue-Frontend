import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
  //state存放状态,
  state: {
    fatigue: [0.12, 0.2, 0.15, 0.8, 0.7],
    vvalue: [0.5, 0.48, 0.52, 0.45, 0.53],
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
    }
  },
  //mutations可更改状态的逻辑，同步操作
  mutations: {
    setData(state, data) {
      state.fatigue = data.fatigue
      state.vvalue = data.vvalue
      state.table = data.table
    }
  },
  //提交mutation，异步操作
  actions: {},
  // 将store模块化
  modules: {},
})

export default store
