package sba.backend.sbabanking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.model.AccountStatus;
import sba.backend.sbabanking.model.TxDetails;
import sba.backend.sbabanking.services.AccountService;

import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/v1/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Log
    @GetMapping("/status/{address}")
    public ResponseEntity<Object> getAccountStatus(@PathVariable String address) throws ExecutionException, InterruptedException {
        AccountStatus status = accountService.getAccountStatus(address);

        return ResponseEntity.ok().body(status);
    }

    @Log
    @GetMapping("/status/{address}/transaction/{transactionIndex}")
    public ResponseEntity<Object> getTransactionDetails(@PathVariable String address, @PathVariable BigInteger transactionIndex) throws ExecutionException, InterruptedException {
        TxDetails details = accountService.getTransactionDetails(address, transactionIndex);

        return ResponseEntity.ok().body(details);
    }

    @Log
    @GetMapping("/status/{address}/waults")
    public ResponseEntity<Object> getWaults(@PathVariable String address) throws ExecutionException, InterruptedException {
        List waults = accountService.getWaults(address);

        return ResponseEntity.ok().body(waults);
    }
}
