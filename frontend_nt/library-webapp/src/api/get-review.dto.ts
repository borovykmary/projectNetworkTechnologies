export interface GetReviewDto {
  reviewId: number;
  bookId: number;
  rating: number;
  comment: string;
  reviewDate: Date;
}