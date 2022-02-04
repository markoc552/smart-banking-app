package sba.backend.sbabanking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.model.WaultDetails;
import sba.backend.sbabanking.services.WaultService;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/v1/waults")
public class WaultController {

    @Autowired
    private WaultService waultService;

    @Log
    @PostMapping("/create/{address}/{mnemonic}")
    public ResponseEntity<Object> createWault(@RequestBody WaultDetails details,
                                              @PathVariable String address,
                                              @PathVariable String mnemonic) throws ExecutionException, InterruptedException {
        waultService.createWault(details, address, mnemonic);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Log
    @GetMapping("/status/{address}")
    public ResponseEntity<Object> getWaultStatus(@PathVariable String address) throws ExecutionException, InterruptedException {
        WaultDetails status = waultService.getWaultStatus(address);

        return ResponseEntity.ok().body(status);
    }
}
