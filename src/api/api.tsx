import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

interface AuthCredential {
  username: string;
  password: string;
}

interface CompanyData {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl?: string;
}

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: number[];
}


class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token: string;

  static async request(endpoint: string, data = {}, method = "get"): Promise<any> {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      // @ts-ignore
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err);
      const msg = err.response ? err.response.data.error.message : err.message;
      throw Array.isArray(msg) ? msg : [msg];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getCompanies(name: string | undefined): Promise<CompanyData[]> {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle: string): Promise<CompanyData> {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */

  static async getJobs(title: string | undefined) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username: string, id: number) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get token for login from username, password. */

  static async login({username, password }: AuthCredential) {
    let res = await this.request(`auth/token`, {username, password}, "post");
    return res.token;
  }

  /** Signup for site. */

  // static async signup(userData) {
  //   let res = await this.request(`auth/register`, userData, "post");
  //   return res.token;
  // }

  /** Save user profile page. */

  static async saveProfile(username: string, userData: object) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }
}


export default JoblyApi;
export type { CompanyData, AuthCredential, IUser }
