import type { PaginationDto } from "../../../common/dto/pagination.dto";

export interface AudiosByFilters extends PaginationDto {
  country?: string;
  approved?: boolean;
}
