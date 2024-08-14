package com.mine.socket.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;


public class CustomException extends RuntimeException{

    public CustomException(String message) {
        super(message);
    }

    public String getMessage() {
        return super.getMessage();
    }
}
