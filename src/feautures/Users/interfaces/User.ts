export interface User {
  id: string;
  fullName: string;
  country: string;
  birthDate: string;
  email: string;
  registerDate: Date;
  membership?: string;
  updatedAt: Date;
  role: string;
  membershipExpiration: string;
  membershipStartDate: string;
  membershipRenewDate: string;
  isActived: boolean;
}
