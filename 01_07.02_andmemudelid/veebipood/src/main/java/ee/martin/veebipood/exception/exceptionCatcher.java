package ee.martin.veebipood.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

//
@ControllerAdvice
public class exceptionCatcher {

    @ExceptionHandler
    public ResponseEntity<errorMessage> HandleException(RuntimeException e){
        errorMessage error = new errorMessage();
        error.setMessage(e.getMessage());
        error.setTimestamp(new Date());
        error.setStatus(400);
        return ResponseEntity.badRequest().body(error);
    }
}