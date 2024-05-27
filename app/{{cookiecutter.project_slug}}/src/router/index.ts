import { createRouter, createWebHistory } from 'vue-router'
import FormView from '@/views/FormView.vue'
import TableView from '@/views/TableView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'table',
      meta: { requiresAuth: false },
      component: TableView
    },
    {
      path: '/form',
      name: 'form',
      meta: { requiresAuth: false },
      component: FormView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
