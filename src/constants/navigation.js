export const NAV_ITEMS = [
  { 
    name: '학과정보', 
    path: '/about',
    id: 'about',
    children: [
      { name: '학과소개', path: '/about/intro' },
      { name: '연구실소개', path: '/about/labs' },
      { name: '연혁', path: '/about/history' },
    ]
  },
  { 
    name: '아카이브', 
    path: '/archive', 
    id: 'archive',
    children: [
      { name: '도시설계', path: '/archive/urban' },
      { name: '전공과제', path: '/archive/major' },
      { name: '교외활동', path: '/archive/extra' }
    ]
  },
  { 
    name: '자료공유', 
    path: '/share', 
    id: 'share',
    children: [
      { name: '관련뉴스', path: '/share/news' },
      { name: '취업정보', path: '/share/jobs' },
      { name: '자격증자료', path: '/share/certs' }
    ]
  },
  { 
    name: '자유활동', 
    path: '/activity',
    id: 'activity',
    children: [
      { name: '주간 아고라', path: '/activity/agora' },
      { name: '자유 게시판', path: '/activity/board' }
    ]
  },
  { 
    name: '공간분석', 
    path: '/map',
    id: 'map',
    children: [
      { name: '2D 분석', path: '/map/2d' },
      { name: '3D 분석', path: '/map/3d' }
    ]
  },
]