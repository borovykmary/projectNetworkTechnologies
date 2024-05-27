import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginResponseDto } from "./login-response.dto";
import { LoginRequestDto } from "./login-request.dto";

type ClientResponse = {
  success: boolean;
  data: any;
  status: number;
};

export class LibraryClient {
  private baseUrl = "http://localhost:8080/api";
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async login(data: LoginRequestDto): Promise<ClientResponse> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/auth/login",
        data,
      );

      this.client.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;

      return {
        success: true,
        data: undefined,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 500,
      };
    }
  }
}
