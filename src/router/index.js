import Vue from 'vue'
import Router from 'vue-router'
import PagePlane from '../components/PagePlane'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import NewLogin from '../components/NewLogin'
import Coins from '../components/Coins'
import EditPage from '../components/EditPage'
import PageBeach from '../components/PageBeach'
import PagePara from '../components/PagePara'
import PageDrawing from '../components/PageDrawing'
import PageLegal from '../components/legal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/oldlogin',
      name:'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name:'Dashboard',
      component: Dashboard
    },
    {
      path: '/plane/:id',
      name:'PagePlane',
      component: PagePlane
    },
    {
      path: '/plane',
      name:'PagePlaneOG',
      component: PagePlane
    },
    {
      path: '/',
      name: 'NewLogin',
      component: NewLogin
    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
    },
    {
      path: '/editplane',
      name: 'editPlane',
      component: EditPage
    },
    {
      path: '/beach',
      name: 'PageBeachOG',
      component: PageBeach
    },
    {
      path: '/beach/:id',
      name: 'PageBeach',
      component: PageBeach
    },
    {
      path: '/paralax',
      name: 'PageParaOG',
      component: PagePara
    },
    {
      path: '/paralax/:id',
      name: 'PagePara',
      component: PagePara
    },
    {
      path: '/legal',
      name: 'PageLegal',
      component: PageLegal
    },
    {
      path: '/drawing',
      name: 'PageDrawingOG',
      component: PageDrawing
    },
    {
      path: '/drawing/:id',
      name: 'PageDrawing',
      component: PageDrawing
    }
  ]
})
