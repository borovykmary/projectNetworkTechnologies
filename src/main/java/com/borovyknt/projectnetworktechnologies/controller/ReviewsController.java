package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.ReviewEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.ReviewRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<ReviewEntity> getAllReviews(){
        return reviewService.getAll();
    }

    @GetMapping("/{id}")
    public ReviewEntity getOne(@PathVariable long id){
        return reviewService.getOne(id);
    }

    @PostMapping
    public ReviewEntity create(@RequestBody ReviewEntity review){
        return reviewService.create(review);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        reviewService.delete(id);
    }
}
