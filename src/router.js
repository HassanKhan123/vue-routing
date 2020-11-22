import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ],
      meta: { needsAuth: true }
      // alias: '/'
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      }
      // beforeEnter(to, from, next) {
      //   console.log('users before');
      //   console.log(to, from);
      //   next();
      // }
    },

    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) return savedPosition;
    return {
      left: 0,
      top: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  console.log('before');
  console.log(to, from);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
});

export default router;
