package sba.backend.sbabanking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import sba.backend.sbabanking.aspects.Log;

import java.util.concurrent.ExecutionException;

@ControllerAdvice
public class ExceptionHandler {

    @Log
    @org.springframework.web.bind.annotation.ExceptionHandler(value = {
            InterruptedException.class,
            ExecutionException.class
    })
    public ResponseEntity<Object> handleEthTxErrors(Exception ex) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
