export interface Loans {
  loanId: number;
  loanDate: string;
  dueDate: string;
  returnDate: string;
  status: string;
  bookId: number;
  title?: string;
  author?: string;
  coverImageUrl?: string;
}
