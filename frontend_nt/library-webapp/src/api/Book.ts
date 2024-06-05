export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
  genre?: string;
  summary?: string;
  coverImageUrl?: string;
}
