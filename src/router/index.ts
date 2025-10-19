import { createRouter, createWebHistory } from "vue-router";

import {
  Login,
  StartPage,
  Register,
  ForgetPassword,
} from "../feautures/Auth/Page";
import { Home_Moderators, Info_User } from "../feautures/Home/Pages";
import {
  Colaborator_Request_View,
  Request_Colaborator,
  Teacher_Colaborator_Registered,
} from "../feautures/Colaborators/pages";
import { CollaboratorsMP, QuizzesMP, ShortsMP } from "../feautures/MiddlePages/Pages";
import {
  List_Quiz_Registered,
  Quizz_request,
  Review_Quiz,
  Review_Quiz_Registered,
} from "../feautures/Quiz/pages";
import Audio_Request_Moderator from "../feautures/Audio/pages/Audio_Request_Moderator.vue";
import Phrase_Registered from "../feautures/Phrase/pages/Phrase_Registered.vue";
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
    path: "/collaborators",
    children: [
      {
        path: "",
        name: "Collaborators",
        component: CollaboratorsMP,
      },
      {
        path: "request",
        name: "Request_Collaborator",
        component: Request_Colaborator,
      },
      {
        path: "registered/teachers",
        name: "Teacher_Collaborator_Registered",
        component: Teacher_Colaborator_Registered,
      },
      {
        path: "review/:id",
        name: "Collaborator_Request_View",
        component: Colaborator_Request_View,
        props: true,
      },
    ],
  },
  {
    path: "/quizzes",
    children: [
      {
        path: "",
        name: "Quizzes",
        component: QuizzesMP,
      },
      {
        path: "request",
        name: "Request_Quiz",
        component: Quizz_request,
      },
      {
        path: "registered",
        name: "Quizzes_Registered",
        component: List_Quiz_Registered,
      },
      {
        path: "review/:id",
        name: "Review_Quiz",
        component: Review_Quiz,
        props: true,
      },
      {
        path: "review-registered/:id",
        name: "Review_Quiz_Registered",
        component: Review_Quiz_Registered,
        props: true,
      },
    ],
  },

  {
  path: "/shorts",
  children: [
    {
      path:"",
      name: "Shorts",
      component: ShortsMP
      
    },
    {
      path: "request",
      name: "Request_Audio",
      component: Audio_Request_Moderator,
    },
    {
      path: "registered/phrases",
      name: "Phrases_Registered",
      component: Phrase_Registered,
    },
  ],
}

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
