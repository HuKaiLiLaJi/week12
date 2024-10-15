import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminView from '@/views/AdminView.vue'
import SendMailView from '@/views/SendMailView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import UserAPI from '@/views/UsersAPI.vue'
import WeatherView from '@/views/WeatherView.vue'
import MapView from '@/views/MapView.vue'
import PathView from '@/views/PathView.vue'
import GenAIView from '@/views/GenAIView.vue'

import DashboardView from '@/views/DashboardView.vue'

import LogoutView from '@/views/LogoutView.vue'

const routes = [
  {
    path: '/week12/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/week12/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/week12/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/week12/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/week12/UserAPI',
    name: 'UserAPI',
    component: UserAPI
  },
  {
    path: '/week12/week12/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/sendMail',
    name: 'SendMail',
    component: SendMailView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/addBook',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/logout',
    name: 'Logout',
    component: LogoutView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/map',
    name: 'Map',
    component: MapView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/pathNav',
    name: 'PathNav',
    component: PathView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/ai',
    name: 'GenAI',
    component: GenAIView,
    meta: { requiresAuth: true } // need login
  },
  {
    path: '/week12/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, admin: true } // need admin login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = sessionStorage.getItem('user')
    const role = sessionStorage.getItem('role')
    if (user == null || user == '') {
      next('/week12/login'); // if not login
    } else {
      if (to.matched.some(record => record.meta.admin)) {
        if (role == 'admin') {
          next(); // admin user
        } else {
          next('/week12/admin');  // if not admin
        }
      } else {
        next(); // logined user
      }
      next();
    }
  } else {
    next(); // visit no auth view
  }
});

export default router