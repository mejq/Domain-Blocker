package com.example.demo.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@ControllerAdvice //exception içn
public class GlobalExceptionHandler {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> handleNullPointer(NullPointerException ex) {
        return new ResponseEntity<>(
                new ErrorResponse(LocalDateTime.now(), "Null Pointer Hatası", ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        return new ResponseEntity<>(
                new ErrorResponse(LocalDateTime.now(), "Bilinmeyen Hata", ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
