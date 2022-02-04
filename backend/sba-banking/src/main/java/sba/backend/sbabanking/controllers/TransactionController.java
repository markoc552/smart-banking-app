package sba.backend.sbabanking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.model.EthTxRequest;
import sba.backend.sbabanking.services.FactoryService;
import sba.backend.sbabanking.services.TransactionService;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/v1/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Log
    @PostMapping("/send-money")
    public ResponseEntity<Object> sendMoney(@RequestBody EthTxRequest request) throws ExecutionException, InterruptedException, IOException, TransactionException {
        String txHash = transactionService.sendMoney(request.getTo(), request.getValue(), request.getMnemonic());

        return new ResponseEntity<>(txHash, HttpStatus.OK);
    }

    @Log
    @PostMapping("/contract/{address}/send-money")
    public ResponseEntity<Object> sendMoneyOverContract(@RequestBody EthTxRequest request, @PathVariable String address) throws ExecutionException, InterruptedException, IOException {
        transactionService.sendMoneyOverContract(request.getTo(), request.getValue(), address);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Log
    @PostMapping("/contract/{address}/deposit")
    public ResponseEntity<Object> deposit(@RequestBody EthTxRequest request, @PathVariable String address) throws ExecutionException, InterruptedException, IOException {
        transactionService.deposit(request.getValue(), address);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/contract/{address}/withdraw")
    public ResponseEntity<Object> withdraw(@RequestBody EthTxRequest request, @PathVariable String address) throws ExecutionException, InterruptedException, IOException {
        transactionService.withdraw(request.getValue(), address, request.getMnemonic());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
