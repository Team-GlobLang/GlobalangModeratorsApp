import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import Home_Moderators from "../feautures/moderators/pages/Home_Moderators.vue";
import Quizz_request from "../feautures/moderators/pages/Quizz_request.vue";
import Request_Colaborator from "../feautures/moderators/pages/Request_Colaborator.vue";
import Colaborator_Request_View from "../feautures/moderators/pages/Colaborator_Request_View.vue";
import Audio_Request_Moderator from "../feautures/moderators/pages/Audio_Request_Moderator.vue";
import Phrase_Registered from "../feautures/moderators/pages/Phrase_Registered.vue";
import Users_Registered from "../feautures/moderators/pages/Users_Registered.vue";
import List_Quiz_Registered from "../feautures/moderators/pages/List_Quiz_Registered.vue";
import Teacher_Colaborator_Registered from "../feautures/moderators/pages/Teacher_Colaborator_Registered.vue";
import Review_Quiz from "../feautures/moderators/pages/Review_Quiz.vue";
import Quizz_Result from "../feautures/moderators/pages/Quizz_Result.vue";
import Quiz_Registered from "../feautures/moderators/pages/Quiz_Registered.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: StartPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/home",
    name: "Home_Moderator",
    component: Home_Moderators,
  },
  {
    path: "/request",
    name: "Request",
    component: Home_Moderators, //CAMBIAR POR UN URL Y COMPONENTE INTERMEDIO DE REQUES
    children: [
      {
        path: "quizz",
        name: "Request_Quizz",
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
    name: "NAME_DE_INTERMEDIA_PAGE",
    component: Audio_Request_Moderator, ///CAMBIAR POR URL Y COMPONENTE INTERMEDIO DE REGISTRADOS
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
    path: "/review-quiz",
    name: "review-quiz",
    component: Review_Quiz,
  },

  {
    path: "/quizz-result",
    name: "quizz-result",
    component: Quizz_Result,
  },

  {
    path: "/quiz-registered",
    name: "quizz-registered",
    component: Quiz_Registered,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
