import type { PaginationDto } from "../../../common/dto/pagination.dto";
import type { Categories, Status } from "./ColaboratorRequestInterface";

export interface ColaboratorRequestFilters extends PaginationDto {
  status?: Status;
  languages?: string;
  category?: Categories;
}
