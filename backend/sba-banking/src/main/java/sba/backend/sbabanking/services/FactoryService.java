package sba.backend.sbabanking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.config.AppProperties;
import sba.backend.sbabanking.contracts.FactorySBA;
import sba.backend.sbabanking.model.CreateAccountRequest;

@Service
public class FactoryService {

    @Autowired
    private FactorySBA factoryContract;

    @Log
    public String createAccount(CreateAccountRequest request) throws Exception {
        factoryContract.createAccount(request.getAddress(),
                                      request.getFirstName(),
                                      request.getLastName(),
                                      request.getEmail())
                                      .sendAsync()
                                      .get();

        return factoryContract.getAccount().sendAsync().get();
    }
}
