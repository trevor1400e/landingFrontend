import Vue from 'vue'
import Router from 'vue-router'
import PageSpring from '../components/PageSpring'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import NewLogin from '../components/login/NewLogin'
import Coins from '../components/Coins'
import EditPage from '../components/EditPage'
import PageBeach from '../components/PageBeach'
import PagePara from '../components/PagePara'
import PageDrawing from '../components/PageDrawing'
import PageForest from '../components/PageForest'
import PageLegal from '../components/legal'
import PagePrivacy from '../components/privacy'
import themes from '../themes'

Vue.use(Router);

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
      component: Dashboard,
      children: [
        {
          path: '/edit/:themeName',
          name: 'edit pages',
          component: EditPage
        }
      ]
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
      path: '/legal',
      name: 'PageLegal',
      component: PageLegal
    },
    {
      path: '/privacy',
      name: 'privacyOG',
      component: PagePrivacy
    },
    ...Object.keys(themes).map(themeName => ({
        path: `/${themeName}/:id`,
        name: themeName,
        component: themes[themeName]
    })),
    ...Object.keys(themes).map(themeName => {
      return {
        path: `/${themeName}`,
        name: `${themeName}-demo`,
        component: themes[themeName]
      }
    })
  ]
})
