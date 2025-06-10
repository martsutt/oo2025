package ee.martin.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data //--> tema sees on @Getter, @Setter ja @NoArgsConstructor
public class errorMessage {
    private String message;
    private Date timestamp;
    private int status;
}