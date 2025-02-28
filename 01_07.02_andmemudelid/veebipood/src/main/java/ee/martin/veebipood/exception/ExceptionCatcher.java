package ee.martin.veebipood.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice // läheb automaatikaga üle kõikide Controllerite(by default) ja Handleb veateateid
public class ExceptionCatcher {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleException(RuntimeException e) {
        ErrorMessage error = new ErrorMessage();
        error.setMessage(e.getMessage());
        error.setTimestamp(new Date());
        error.setStatus(400);
        return ResponseEntity.badRequest().body(error);
    } // funktsiooni nimetus on ükskõik mis see on (handleException)
}
