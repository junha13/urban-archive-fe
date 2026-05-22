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

import RecordListView from '@/views/archive/record/RecordListView.vue'
import RecordDetailView from '@/views/archive/record/RecordDetailView.vue'
import RecordUploadView from '@/views/archive/record/RecordUploadView.vue'

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
            {
              path: 'urban',
              name: 'archive-urban',
              component: RecordListView,
              meta: { archiveTitle: '도시설계', archiveSubtitle: '도시설계 기록물을 탐색하고 상세 정보를 확인할 수 있습니다.' },
            },
            {
              path: 'major',
              name: 'archive-major',
              component: RecordListView,
              meta: { archiveTitle: '전공과제', archiveSubtitle: '전공과제 기록물을 탐색하고 상세 정보를 확인할 수 있습니다.' },
            },
            {
              path: 'extra',
              name: 'archive-extra',
              component: RecordListView,
              meta: { archiveTitle: '교외활동', archiveSubtitle: '교외활동 기록물을 탐색하고 상세 정보를 확인할 수 있습니다.' },
            },
            { path: 'detail/:recordNumber', name: 'archive-detail', component: RecordDetailView },
            { path: 'upload', name: 'archive-upload', component: RecordUploadView }
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
      path: '/register',
      alias: '/Register',
      name: 'register',
      component: RegisterView,
    },
  ],
  scrollBehavior() {
    return { top:0 }
  }
})

export default router
