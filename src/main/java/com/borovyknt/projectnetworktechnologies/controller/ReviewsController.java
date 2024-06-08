package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.GetReviewDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.JwtService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.ReviewService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {
    private final ReviewService reviewService;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final JwtService jwtService;

    @Autowired
    public ReviewsController(ReviewService reviewService, UserRepository userRepository, BookRepository bookRepository, JwtService jwtService) {
        this.reviewService = reviewService;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<GetReviewDto> getAllReviews(){
        return reviewService.getAll();
    }

    @GetMapping("/{bookId}")
    public List<GetReviewDto> getForOne(@PathVariable String bookId){
        var bookIdInt = Integer.parseInt(bookId);
        return reviewService.getForOne(bookIdInt);
    }

    @PostMapping("/{bookId}/review")
    public ResponseEntity<CreateReviewResponseDto> create(@RequestBody CreateReviewDto review, HttpServletRequest request, @PathVariable String bookId){
        var bookIdLong = Long.parseLong(bookId.substring(1, bookId.length() - 1));

        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Integer userId = jwtService.extractUserId(token);
        var userEntity = userRepository.findByuserId(userId)
                .orElseThrow(() -> NotFoundException.create("User", userId));

        var book = bookRepository.findById(bookIdLong).orElseThrow(() -> NotFoundException.create("Book", bookIdLong));
        var newReview = reviewService.create(review, userEntity, book);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id){
        var idlong = Long.parseLong(id);
        reviewService.deleteReview(idlong);
        return ResponseEntity.noContent().build();
    }
}
