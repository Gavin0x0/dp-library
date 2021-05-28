import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BookMgr from "../views/BookMgr.vue";
import BookQuery from "../views/BookQuery.vue";
import BorrowMgr from "../views/BorrowMgr.vue";
import CardMgr from "../views/CardMgr.vue";
import FineMgr from "../views/FineMgr.vue";
import RenewMgr from "../views/RenewMgr.vue";
import ReturnMgr from "../views/ReturnMgr.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/card-management",
    name: "CardMgr",
    component: CardMgr,
  },
  {
    path: "/book-management",
    name: "BookMgr",
    component: BookMgr,
  },
  {
    path: "/borrow-management",
    name: "BorrowMgr",
    component: BorrowMgr,
  },
  {
    path: "/renew-management",
    name: "RenewMgr",
    component: RenewMgr,
  },
  {
    path: "/return-management",
    name: "ReturnMgr",
    component: ReturnMgr,
  },
  {
    path: "/fine-management",
    name: "FineMgr",
    component: FineMgr,
  },
  {
    path: "/book-query",
    name: "BookQuery",
    component: BookQuery,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
