package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.CreateReviewResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.review.GetReviewDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.ReviewEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.ReviewRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.JwtService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.ReviewService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/{id}")
    public GetReviewDto getOne(@PathVariable long id){
        return reviewService.getOne(id);
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
                .orElseThrow(() -> new RuntimeException("User not found"));

        var book = bookRepository.findById(bookIdLong).orElseThrow(() -> new RuntimeException("Book not found"));
        var newReview = reviewService.create(review, userEntity, book);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String id){
        var idlong = Long.parseLong(id);
        reviewService.deleteReview(idlong);
        return ResponseEntity.noContent().build();
    }
}
