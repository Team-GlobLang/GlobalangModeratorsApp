import type { PaginationDto } from "@ComonDto";
import type { Categories, Status } from "./ColaboratorRequestInterface";

export interface ColaboratorRequestFilters extends PaginationDto {
  status?: Status;
  languages?: string;
  category?: Categories;
}
