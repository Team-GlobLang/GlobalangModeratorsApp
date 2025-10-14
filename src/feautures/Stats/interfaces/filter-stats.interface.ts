import type { PaginationDto } from "../../../common/dto/pagination.dto";

export interface StatsFilterDto extends PaginationDto {
  country?: string;
}
