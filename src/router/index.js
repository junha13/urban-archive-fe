import { createRouter, createWebHistory } from 'vue-router'

// 레이아웃 및 메인 뷰
import MainLayout from '../components/layout/MainLayout.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// 학과정보 (About)
import IntroView from '../views/about/IntroView.vue'
import LabsView from '../views/about/LabsView.vue'
import historyView from '../views/about/HistoryView.vue' 

// 아카이브 (Archive)
import UrbanView from '../views/archive/UrbanView.vue'
import MajorView from '../views/archive/MajorView.vue'
import ExtraView from '../views/archive/ExtraView.vue'

// 자료공유 (Share)
import NewsView from '../views/share/NewsView.vue'
import JobsView from '../views/share/JobsView.vue'
import CertsView from '../views/share/CertsView.vue'

// 자유활동 (Activity)
import AgoraView from '../views/activity/AgoraView.vue'
import BoardView from '../views/activity/BoardView.vue'

// 공간분석 (Map)
import Map_2DView from '../views/map/Map_2DView.vue'
import Map_3DView from '../views/map/Map_3DView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Main',
          component: MainView,
        },
        // 학과정보
        {
          path: 'about',
          redirect: '/about/intro',
          children: [
            { path: 'intro', name: 'about-intro', component: IntroView },
            { path: 'labs', name: 'about-labs', component: LabsView },
            { path: 'history', name: 'about-history', component: historyView },
          ]
        },
        // 아카이브
        {
          path: 'archive',
          redirect: '/archive/urban',
          children: [
            { path: 'urban', name: 'archive-urban', component: UrbanView },
            { path: 'major', name: 'archive-major', component: MajorView },
            { path: 'extra', name: 'archive-extra', component: ExtraView },
          ]
        },
        // 자료공유
        {
          path: 'share',
          redirect: '/share/news',
          children: [
            { path: 'news', name: 'share-news', component: NewsView },
            { path: 'jobs', name: 'share-jobs', component: JobsView },
            { path: 'certs', name: 'share-certs', component: CertsView },
          ]
        },
        // 자유활동
        {
          path: 'activity',
          redirect: '/activity/agora',
          children: [
            { path: 'agora', name: 'activity-agora', component: AgoraView },
            { path: 'board', name: 'activity-board', component: BoardView },
          ]
        },
        // 공간분석
        {
          path: 'map',
          redirect: '/map/2d',
          children: [
            { path: '2d', name: 'map-2d', component: Map_2DView },
            { path: '3d', name: 'map-3d', component: Map_3DView },
          ]
        },
    ]
    },
    // 로그인 (레이아웃 제외)
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/Register',
      name: 'Register',
      component: RegisterView,
    },
  ],
  scrollBehavior() {
    return { top:0 }
  }
})

export default router
