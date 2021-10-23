import axios from "axios";
import jwt from "jsonwebtoken";
import {
  IAuthCredential,
  ICompanyData,
  IProfileWrite,
  ISignupData,
  IUser
} from "../interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token: string;

  static async request(endpoint: string, data = {}, method = "get"): Promise<any> {
    console.info("+ API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      // @ts-ignore
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("+ API Error:", err);
      const msg = err.response ? err.response.data.error.message : err.message;
      throw Array.isArray(msg) ? msg : [msg];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username: string): Promise<IUser> {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getCompanies(name: string | undefined): Promise<ICompanyData[]> {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle: string): Promise<ICompanyData> {
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

  static async login({username, password }: IAuthCredential): Promise<string> {
    let res = await this.request(`auth/token`, {username, password}, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(userData: ISignupData): Promise<string> {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username: string, userData: IProfileWrite): Promise<IUser> {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  /** Given a token, retrieve user and update currUser state. */
  static async fetchUser(token: string): Promise<IUser> {
    console.log("+ API.fetchUser", "token=", token);
    // @ts-ignore
    const username = jwt.decode(token)!.username;
    this.token = token;
    return await this.getCurrentUser(username);
  }
}


export default JoblyApi;
