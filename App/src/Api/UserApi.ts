import axios from "axios";
import { ApplicationUser } from "../Types&Globals/User";

export class UserApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      createUser: this.apiUrl + "/api/users/createUser",
      login: this.apiUrl + "/users/login",
      logout: this.apiUrl + "/users/logout",
    };
  }

  async login(): Promise<ApplicationUser> {
    const response = await axios.get(this.endpoints.login);
    return response.data;
  }

  async logout(): Promise<null> {
    const response = await axios.get(this.endpoints.logout);
    return null;
  }

  async createUser(user: ApplicationUser, mockBoolean = true): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBoolean);
      }, 1500);
    });
  }
}
