package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.loan.GetLoanDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.GetReviewDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.ReviewEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public GetReviewDto getOne(long id){
        var reviewEntity = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
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

    public CreateReviewResponseDto create(CreateReviewDto review){
        var reviewEntity = new ReviewEntity();
        reviewEntity.setRating(review.getRating());
        reviewEntity.setComment(review.getComment());
        reviewEntity.setReviewDate(review.getReviewDate());

        var newReview = reviewRepository.save(reviewEntity);
        return new CreateReviewResponseDto(
                newReview.getReviewId(),
                newReview.getRating(),
                newReview.getComment(),
                newReview.getReviewDate()
        );
    }

    public void delete(long id){
        if(reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
        } else {
            throw new RuntimeException("Review not found");
        }
    }
}
