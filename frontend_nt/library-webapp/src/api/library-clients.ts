import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginResponseDto } from "./login-response.dto";
import { LoginRequestDto } from "./login-request.dto";
import { Book } from "./Book";
import { BookDetails } from "./BookDetails";
import { useCookies } from "react-cookie";
import { Loans } from "./Loans";

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
      const token = response.data.token;
      if (typeof token === "string") {
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
      }

      return {
        success: true,
        data: response.data,
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
  public async getBooks(): Promise<ClientResponse> {
    try {
      const response: AxiosResponse<Book[]> = await this.client.get("/books");

      return {
        success: true,
        data: response.data,
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
  public async getBook(bookId: number): Promise<ClientResponse> {
    try {
      const response: AxiosResponse<Book> = await this.client.get(
        `/books/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
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
  public async getBookDetails(bookId: number): Promise<ClientResponse> {
    try {
      const response: AxiosResponse<BookDetails> = await this.client.get(
        `/book-details/${bookId}`,
      );
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      if (axiosError.response?.status === 404) {
        // Return default values if details are not found
        const defaultDetails: BookDetails = {
          id: -1,
          bookId: bookId,
          genre: "No data",
          summary: "No data",
          coverImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT0xwyLstvC7wH8jYIKur3GTcSq-g6fj2EbL4wk-qaONHYjBswa3rpFsZJeEjuXcG-lw&usqp=CAU",
        };
        return {
          success: true,
          data: defaultDetails,
          status: 200,
        };
      }
      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async getAllLoans(): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse<Loans[]> = await this.client.get(
        "/loans/history",
        axiosConfig,
      );

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
