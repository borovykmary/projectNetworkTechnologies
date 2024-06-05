export interface CreateBookRequestDto {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
}
