package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.GetReviewDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.ReviewEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.ReviewRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewsController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<GetReviewDto> getAllReviews(){
        return reviewService.getAll();
    }

    @GetMapping("/{id}")
    public GetReviewDto getOne(@PathVariable long id){
        return reviewService.getOne(id);
    }

    @PostMapping
    public ResponseEntity<CreateReviewResponseDto> create(@RequestBody CreateReviewDto review){
        var newReview = reviewService.create(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
