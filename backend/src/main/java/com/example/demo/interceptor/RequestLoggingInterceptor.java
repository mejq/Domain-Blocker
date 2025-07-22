package com.example.demo.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import java.time.LocalDateTime;
import java.util.Enumeration;

@Log4j2
@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        log.info("----- [Request Log] -----");
        log.info("[*] Zaman: {}", LocalDateTime.now());
        log.info("[*] Method: {}", request.getMethod());
        log.info("[*] URL: {}", request.getRequestURL());

        Enumeration<String> headers = request.getHeaderNames();
        while (headers.hasMoreElements()) {
            String h = headers.nextElement();
            log.info("{}: {}", h, request.getHeader(h));
        }
        log.info("[( *_ *)?------\\( * v * )/-------\\(*_ * )]");
        return true;
    }
}
