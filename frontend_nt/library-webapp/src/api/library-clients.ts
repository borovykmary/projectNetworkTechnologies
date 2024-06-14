import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginResponseDto } from "./login-response.dto";
import { LoginRequestDto } from "./login-request.dto";
import { Book } from "./Book";
import { BookDetails } from "./BookDetails";
import { Loans } from "./Loans";
import { RegisterUserRequestDto } from "./register-user-request.dto";
import { AddBookDetailsRequestDto } from "./add-bookdetails-request.dto";
import { CreateBookRequestDto } from "./add-book-request.dto";
import { GetReviewDto } from "./get-review.dto";
import { AddBookReviewRequestDto } from "./add-review-request.dto";

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
          id: bookId,
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
  public async getAllLoansUser(): Promise<ClientResponse> {
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
  public async registerUser(data: RegisterUserRequestDto): Promise<number> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/auth/register",
        data,
        axiosConfig,
      );

      this.client.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token} `;
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return axiosError.response?.status || 0;
    }
  }
  public async addBook(data: CreateBookRequestDto): Promise<number> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      console.log(axiosConfig.headers.Authorization);
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/books/create",
        data,
        axiosConfig,
      );

      this.client.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return axiosError.response?.status || 0;
    }
  }

  public async addBookDetails(data: AddBookDetailsRequestDto): Promise<number> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      console.log(axiosConfig.headers.Authorization);
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        "/book-details/create",
        data,
        axiosConfig,
      );

      this.client.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return axiosError.response?.status || 0;
    }
  }

  public async deleteUser(id: number): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.delete(
        `/users/${id}`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async deleteBook(id: number): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.delete(
        `/books/${id}`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async borrowBook(bookId: number): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      // Get today's date and format it as YYYY-MM-DD
      const today = new Date();
      const loanDate = today.toISOString().split("T")[0];

      // Calculate due date (one month from today) and format it as YYYY-MM-DD
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + 1);
      const dueDateString = dueDate.toISOString().split("T")[0];

      const loanDetails = {
        loanDate: loanDate,
        returnDate: "",
        dueDate: dueDateString,
      };

      const response: AxiosResponse = await this.client.post(
        `/loans/${bookId}/borrow`,
        loanDetails,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async returnBook(loanId: number): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const today = new Date();

      const returnDate = today.toISOString().split("T")[0];

      const loanDetails = {
        returnDate: returnDate,
      };

      const response: AxiosResponse = await this.client.post(
        `/loans/${loanId}/return`,
        loanDetails,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async getBookReviews(bookId: number): Promise<ClientResponse> {
    try {
      const response: AxiosResponse<GetReviewDto[]> = await this.client.get(
        `/reviews/${bookId}`,
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
  public async processLoan(loanId: string): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.post(
        `/loans/${loanId}/process`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }

  public async processReturn(loanId: string): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.post(
        `/loans/${loanId}/return/process`,
        {},
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

      const response: AxiosResponse = await this.client.get(
        `/loans`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }

  public async getOneLoan(loanId: string): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.get(
        `/loans/${loanId}`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async getAllUsers(): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.get(
        `/users`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }

  public async addReview(
    data: AddBookReviewRequestDto,
    bookId: number,
  ): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.post(
        `/reviews/${bookId}/create`,
        data,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
  public async getAllReviews(): Promise<ClientResponse> {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response: AxiosResponse = await this.client.get(
        `/api/reviews`,
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
        status: axiosError.response?.status || 500,
      };
    }
  }
}
