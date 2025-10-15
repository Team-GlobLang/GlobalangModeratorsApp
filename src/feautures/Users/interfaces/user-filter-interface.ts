import type { PaginationDto } from "@ComonDto";

export interface UserFilter extends PaginationDto {
  userId?: string;
  role?: string;
  isActived?: boolean;
  email?: string;
  country?: string;
}
