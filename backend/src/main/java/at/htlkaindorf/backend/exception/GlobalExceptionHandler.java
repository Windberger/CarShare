package at.htlkaindorf.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(Res.class)
//    public ResponseEntity<ErrorResponse> handleResourceNotFound(
//            ResourceNotFoundException ex
//    ) {
//        ErrorResponse error = ErrorResponse.builder(ex, HttpStatus.NOT_FOUND, ex.getMessage()).build();
//
//        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
//    }

}

