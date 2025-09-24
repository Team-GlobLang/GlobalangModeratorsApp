import { createRouter, createWebHistory } from "vue-router";
import Login from "../feautures/Auth/Page/Login.vue";
import Register from "../feautures/Auth/Page/Register.vue";
import ForgetPassword from "../feautures/Auth/Page/ForgetPassword.vue";
import StartPage from "../feautures/Auth/Page/StartPage.vue";
import Lyout from "../lyouts/Lyout.vue";
import Home_Moderators from "../feautures/Home/Pages/Home_Moderators.vue";
import Quizz_request from "../feautures/Quiz/pages/Quizz_request.vue";
import Request_Colaborator from "../feautures/Colaborators/pages/Request_Colaborator.vue";
import Audio_Request_Moderator from "../feautures/Audio/pages/Audio_Request_Moderator.vue";
import Phrase_Registered from "../feautures/Phrase/pages/Phrase_Registered.vue";
import Users_Registered from "../feautures/Users/pages/Users_Registered.vue";
import List_Quiz_Registered from "../feautures/Quiz/pages/List_Quiz_Registered.vue";
import Teacher_Colaborator_Registered from "../feautures/Colaborators/pages/Teacher_Colaborator_Registered.vue";
import Review_Quiz from "../feautures/Quiz/pages/Review_Quiz.vue";
import Quizz_Result from "../feautures/Quiz/pages/Quizz_Result.vue";
import Info_User from "../feautures/Home/Pages/Info_User.vue";
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
    name: "Home",
    component: Lyout,
    children: [
      {
        path: "",
        name: "Home_Moderator",
        component: Home_Moderators,
      },
      {
        path: "user-info",
        name: "User_Info",
        component: Info_User,
      },
    ],
  },

  {
    path: "/request",
    name: "Request",
    component: Lyout, //CAMBIAR POR UN URL Y COMPONENTE INTERMEDIO DE REQUES
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
    component: Lyout, ///CAMBIAR POR URL Y COMPONENTE INTERMEDIO DE REGISTRADOS
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
    component: Lyout,
    children: [
      {
        path: "quiz",
        name: "review_quiz",
        component: Review_Quiz,
      },
      {
        path: "quiz-result",
        name: "review_quiz_result",
        component: Quizz_Result,
      },
    ],
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
