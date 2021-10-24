interface IAuthCredential {
  username: string;
  password: string;
}

interface ICompanyData {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl?: string;
}

interface ICompanyDataFull extends ICompanyData {
  jobs: IJobData[];
}

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: number[];
}

interface IJobData {
  id: number;
  title: string;
  salary: number;
  equity: number;
  companyHandle: string;
  companyName: string;
}

interface IProfileWrite {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IProfileRead extends IProfileWrite {
  username: string;
}

interface ISignupData extends IProfileWrite {
  username: string;
}

interface IUserContext {
  user: IUser | null,
  updateProfile?: (username: string, profileData: IProfileWrite) => void,
  hasAppliedToJob?: (jobId: number) => boolean,
  applyToJob?: (jobId: number) => void,
  signup?: (userData: ISignupData) => void,
  login?: (arg0: IAuthCredential) => void,
  logout?: () => void,
}

export type {
  ICompanyData,
  ICompanyDataFull,
  IAuthCredential,
  IUser,
  ISignupData,
  IJobData,
  IProfileWrite,
  IProfileRead,
  IUserContext,
};
