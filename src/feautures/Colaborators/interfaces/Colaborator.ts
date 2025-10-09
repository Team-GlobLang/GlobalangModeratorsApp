export interface Collab {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  languages: string;
  phoneNumber: string;
  aboutColaborator?: string;
  category: string;
  status?: string;
  reviewedId?: string;
  reviewedName?: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  filesUrls: string[];
}
