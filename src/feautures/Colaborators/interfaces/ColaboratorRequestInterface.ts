export const Categories = {
  MASTER: "MASTER",
  COLABORATOR: "COLABORATOR",
};

export const Status = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
};

export type Categories = (typeof Categories)[keyof typeof Categories]; // "MASTER" | "COLABORATOR"
export type Status = (typeof Status)[keyof typeof Status]; // "ACCEPTED" | "REJECTED" | "PENDING"

export interface ColaboratorRequestForm {
  User_Id: string;
  Languages: string;
  Academic_Title: string;
  Category: Categories;
  Info_Extra: string;
  File: string;
}
