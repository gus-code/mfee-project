import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    // redirect: "/home",
    redirect: { name: 'home' },
    redirect: { name: 'categories' },
    redirect: { name: 'login' },
    redirect: { name: 'signUp' }
  },
  {
    path: '/home',
    name: 'home',
    //component: PostView, // TODO: Carga normal
    component: () =>
      // TODO: Carga perezosa
      import(/* webpackChunkName: "PostView"*/ '../modules/posts/views/PostView.vue')
  },
  {
    path: '/post-detail/:id',
    name: 'post-detail',
    component: () =>
      // TODO: Carga perezosa
      import(/* webpackChunkName: "PostDetail"*/ '../modules/posts/views/PostDetailView.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "NotFoundView"*/ '../shared/views/NotFoundView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "CategoryView"*/ '../modules/categories/views/CategoryView.vue'),
      
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginView"*/ '../modules/auth/views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import(/* webpackChunkName: "SignUpView"*/ '../modules/auth/views/SignUpView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
