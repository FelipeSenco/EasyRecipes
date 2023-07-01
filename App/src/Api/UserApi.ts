import { ApplicationUser } from "../Types/User";

export class UserApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      createUser: this.apiUrl + "/api/userAuth/createUser",
    };
  }

  async createUser(user: ApplicationUser, mockBoolean = true): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBoolean);
      }, 1500);
    });
  }
}
