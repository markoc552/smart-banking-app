package sba.backend.sbabanking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.model.CreateAccountRequest;
import sba.backend.sbabanking.services.FactoryService;

@RestController
@RequestMapping("/v1/factory")
public class FactoryController {

    @Autowired
    private FactoryService factoryService;

    @Log
    @PostMapping("/create-account")
    public ResponseEntity<Object> createAccount(@RequestBody CreateAccountRequest request) throws Exception {
        String accountAddress = factoryService.createAccount(request);

        return ResponseEntity.ok().body(accountAddress);
    }
}
