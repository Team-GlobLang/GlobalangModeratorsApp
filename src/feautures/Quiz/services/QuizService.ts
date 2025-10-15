import axios from "axios";
import type { QuizChangeStatus, QuizzesFilters } from "../interfaces/QuizType";
import axiosInstance from "@core/AxiosConfig";

const GetQuizzesList = async (data: QuizzesFilters) => {
  try {
    const params: Record<string, any> = {};
    if (data.country) params.country = data.country;
    if (typeof data.isApproved !== "undefined")
      params.isApproved = data.isApproved;
    if (data.page) params.page = data.page;
    if (data.limit) params.limit = data.limit;

    const response = await axiosInstance.get("/Full-Quiz", { params });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const ApprovalQuiz = async (Data: QuizChangeStatus) => {
  try {
    const { id, isApproved } = Data;
    const response = await axiosInstance.put(`/Full-Quiz/${id}/approval`, {
      isApproved,
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw error;
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

const getQuizQuestions = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/Full-Quiz/question/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export { GetQuizzesList, ApprovalQuiz, getQuizQuestions };
