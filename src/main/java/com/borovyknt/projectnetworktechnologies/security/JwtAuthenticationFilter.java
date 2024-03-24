package com.borovyknt.projectnetworktechnologies.security;

import com.borovyknt.projectnetworktechnologies.infrastructure.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtService jwtService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService){
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
           String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

           if(authHeader == null || !authHeader.startsWith("Bearer ")){
               filterChain.doFilter(request, response);
               return;
           }

           String jwt =authHeader.substring(7);
           String username = jwtService.extractUsername(jwt);
           String role = jwtService.extractRole(jwt).name();

           if(username != null && !username.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null && jwtService.isTokenValid(jwt)){

               SecurityContext context = SecurityContextHolder.createEmptyContext();
               UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority(role)));

               token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               context.setAuthentication(token);
               SecurityContextHolder.setContext(context);
           }
              filterChain.doFilter(request, response);


        }catch (Exception e){
            filterChain.doFilter(request, response);
        }
    }
}
