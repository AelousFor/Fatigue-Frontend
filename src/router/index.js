import Vue from 'vue'
import Router from 'vue-router'
import TestResult from '../views/single/TestResult'
import FatigueMonitor from "../views/single/FatigueMonitor";
import MultiMonitor from "../views/multi/MultiMonitor";
import MultiResult from "../views/multi/MultiResult";
import GeneralPage from "../views/GeneralPage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/single',
    },
    {
      path: '/single',
      redirect: '/single/monitor',
      component: GeneralPage,
      children: [
        {
          path: 'monitor',
          name: 'FatigueMonitor',
          component: FatigueMonitor,
        },
        {
          path: 'result',
          name: 'TestResult',
          component: TestResult,
        },
      ]
    },
    {
      path: '/multi',
      redirect: '/multi/monitor',
      component: GeneralPage,
      children: [
        {
          path: 'monitor',
          name: 'MultiMonitor',
          component: MultiMonitor,
        },
        {
          path: 'result',
          name: 'MultiResult',
          component: MultiResult,
        },
      ]
    },
  ]
})

