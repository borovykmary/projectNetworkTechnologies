export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  available: boolean;
  genre?: string;
  summary?: string;
  coverImageUrl?: string;
}
