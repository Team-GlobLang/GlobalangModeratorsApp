import { createRouter, createWebHistory } from "vue-router";

import {
  List_Quiz_Registered,
  Quizz_request,
  Review_Quiz,
  Review_Quiz_Registered,
} from "../feautures/Quiz/pages";
import {
  Login,
  StartPage,
  Register,
  ForgetPassword,
} from "../feautures/Auth/Page";
import { Home_Moderators, Info_User } from "../feautures/Home/Pages";
import Audio_Request_Moderator from "../feautures/Audio/pages/Audio_Request_Moderator.vue";
import Phrase_Registered from "../feautures/Phrase/pages/Phrase_Registered.vue";
import Users_Registered from "../feautures/Users/pages/Users_Registered.vue";
import Rankin_Page from "../feautures/Stats/page/Rankin_Page.vue";
import {
  Colaborator_Request_View,
  Request_Colaborator,
  Teacher_Colaborator_Registered,
} from "../feautures/Colaborators/pages";
const routes = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
    meta: { showBottomBar: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { showBottomBar: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { showBottomBar: false },
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { showBottomBar: false },
  },
  {
    path: "/home",
    name: "Home",
    component: Home_Moderators,
    meta: { showBottomBar: true },
  },
  {
    path: "/user-info",
    name: "User_Info",
    component: Info_User,
    meta: { showBottomBar: true },
  },

  {
    path: "/request",
    name: "Request",
    children: [
      {
        path: "quiz",
        name: "Request_Quiz",
        component: Quizz_request,
      },
      {
        path: "colaborator",
        name: "Request_colaborator",
        component: Request_Colaborator,
      },
      {
        path: "audio",
        name: "Request_audio",
        component: Audio_Request_Moderator,
      },
    ],
  },

  {
    path: "/registered",
    name: "registered",
    children: [
      {
        path: "phrases",
        name: "Phrases_Registered",
        component: Phrase_Registered,
      },
      {
        path: "users",
        name: "Users_Registered",
        component: Users_Registered,
      },
      {
        path: "quizzes",
        name: "quizzes_Registered",
        component: List_Quiz_Registered,
      },
      {
        path: "teacher-colaborator",
        name: "teacher-colaborator_Registered",
        component: Teacher_Colaborator_Registered,
      },
    ],
  },

  {
    path: "/review",
    name: "review",
    children: [
      {
        path: "quiz/:id",
        name: "review_quiz",
        component: Review_Quiz,
        props: true,
      },
      {
        path: "quiz-registered/:id",
        name: "review_quiz_registered",
        component: Review_Quiz_Registered,
        props: true,
      },
      {
        path: "colaborator-request/:id",
        name: "colaborator_request_view",
        component: Colaborator_Request_View,
        props: true,
      },
    ],
  },
  {
    path: "/rankin",
    name: "rankin",
    component: Rankin_Page,
    meta: { showBottomBar: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

/* 
const publicPages = [
  "/",
  "/login",
  "/register",
  "/forgetPassword",
  "/changePassword",
];
router.beforeEach(async (to) => {
  if (publicPages.includes(to.path)) return true;

  const canAccess = await canUserAcces(to.path);
  if (!canAccess) return "/login";

  return true;
});
*/

export default router;
