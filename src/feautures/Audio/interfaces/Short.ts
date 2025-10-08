export interface Short {
  id: string;
  text: string;
  description: string;
  userId: string;
  createBy: string;
  fileUrl: string;
  country: string;
  reviewedId?: string | null;
  reviewedBy?: string | null;
  reviewComment?: string | null;
  approved?: boolean | null;
  createdAt: Date;
}
