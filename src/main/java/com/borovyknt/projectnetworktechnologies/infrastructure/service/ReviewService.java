package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.GetReviewDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.ReviewEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.ReviewRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.AlreadyReviewedException;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotBorrowedException;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final LoanRepository loanRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, LoanRepository loanRepository) {
        this.reviewRepository = reviewRepository;
        this.loanRepository = loanRepository;
    }

    public GetReviewDto getOne(long id){
        var reviewEntity = reviewRepository.findById(id).orElseThrow(() -> NotFoundException.create("Review", id));
        return new GetReviewDto(
                reviewEntity.getReviewId(),
                reviewEntity.getRating(),
                reviewEntity.getComment(),
                reviewEntity.getReviewDate()
        );
    }

    public List<GetReviewDto> getAll(){
        var reviews = reviewRepository.findAll();
        return reviews.stream().map((review) -> new GetReviewDto(
                review.getReviewId(),
                review.getRating(),
                review.getComment(),
                review.getReviewDate()
        )).toList();
    }

    public CreateReviewResponseDto create(CreateReviewDto review, UserEntity user, BookEntity book){
        if(reviewRepository.findByUserAndBook(user, book).isPresent()) {
            throw AlreadyReviewedException.create();
        }

        if(loanRepository.findByUserAndBook(user, book).isEmpty()) {
            throw NotBorrowedException.create();
        }

        var reviewEntity = new ReviewEntity();
        reviewEntity.setRating(review.getRating());
        reviewEntity.setComment(review.getComment());
        reviewEntity.setReviewDate(review.getReviewDate());
        reviewEntity.setUser(user);
        reviewEntity.setBook(book);

        var newReview = reviewRepository.save(reviewEntity);
        return new CreateReviewResponseDto(
                newReview.getReviewId(),
                newReview.getRating(),
                newReview.getComment(),
                newReview.getReviewDate()
        );
    }

    public void deleteReview(long reviewId) {
        var review = reviewRepository.findById(reviewId).orElseThrow(() -> NotFoundException.create("Review", reviewId));
        reviewRepository.delete(review);
    }
}
