import type { PaginationDto } from "../../../common/dto/pagination.dto";

export interface UserFilter extends PaginationDto {
  userId?: string;
  role?: string;
  isActived?: boolean;
  email?: string;
  country?: string;
}
