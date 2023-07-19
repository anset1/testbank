import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Personal',
    //   component: () => import('../views/Personal.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     desc: 'Business Profile'
    //   }
    // },
    {
      path: "/",
      name: "MyCompanies",
      component: () => import("../views/MyCompanies.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/company-brief",
      name: "CompanyBrief",
      component: () => import("../views/CompanyBrief.vue"),
      meta: {
        layout: 'DefaultLayout',
      }
    },
    {
      path: "/business-request",
      name: "BusinessRequestPage",
      component: () => import("../views/BusinessRequestPage.vue"),
      meta: {
        layout: 'DefaultLayout',
      }
    },
    {
      path: "/proposals",
      name: "Proposals",
      component: () => import("../views/Proposals.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/page-2",
      name: "CabinetPage2",
      component: () => import("../views/CabinetPage2.vue"),
      meta: {
        layout: "DefaultLayout",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/auth/:provider/callback",
      component: {
        template: '<div class="auth-component"></div>',
      },
    },
    {
      path: '/users-clients',
      name: 'UsersClients',
      component: () => import('@/views/UsersClients.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/clients-details',
      name: 'ClientsDetails',
      component: () => import('@/views/ClientsDetails.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/payment',
      name: 'PagePayment',
      component: () => import('@/views/Payment.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/page-enrollment',
      name: 'EnrollmentPage',
      component: () => import('@/views/EnrollmentPage.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/subscriptions',
      name: 'Subscriptions',
      component: () => import('@/views/Subscriptions.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/buy-sellnetlicense',
      name: 'BuySellNetLicense',
      component: () => import('@/views/BuySellNetLicense.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/bank-accounts',
      name: 'BankAccounts',
      component: () => import('@/views/BankAccounts.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/company-profile',
      name: 'CompanyProfile',
      component: () => import('@/views/CompanyProfile.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/company',
      name: 'Company',
      component: () => import('@/views/Company.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/account-status',
      name: 'AccountStatus',
      component: () => import('@/views/AccountStatus.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/banks-sugestions',
      name: 'BanksSugestions',
      component: () => import('@/views/BanksSugestions.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
    {
      path: '/main-page',
      name: 'MainPage',
      component: () => import('@/views/MainPage.vue'),
      meta: {
        layout: 'DefaultLayout'
      }
    },
  ]
})
/* MainPage.vue */
export default router;
