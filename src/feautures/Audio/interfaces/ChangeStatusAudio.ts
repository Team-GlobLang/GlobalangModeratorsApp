export interface ChangeStatusAudio {
  reviewShortId: string;
  reviewedId: string;
  reviewedBy: string;
  reviewComment?: string;
  approved: boolean;
}
