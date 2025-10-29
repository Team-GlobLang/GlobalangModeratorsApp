export interface ChangeUser {
  userId: string;
  isActived?: boolean;
  membership?: string;
  membershipStartDate?: Date;
  membershipExpiration?: Date;
  membershipRenewDate?: Date;
}
