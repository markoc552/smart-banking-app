package sba.backend.sbabanking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Network;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jService;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
import sba.backend.sbabanking.contracts.FactorySBA;

import java.math.BigInteger;

@Component
public class Web3jConfig {

    @Autowired
    private Web3j web3j;

    private static final int CHAIN_ID = 2018;
    private static final BigInteger GAS_PRICE = BigInteger.valueOf(1200);
    private static final BigInteger GAS_LIMIT = BigInteger.valueOf(6721975);

    @Bean
    public Web3j web3j() {
        HttpService rpcService = new HttpService("http://localhost:8545");

        return Web3j.build(rpcService);
    }
    @Bean
    public Credentials getWallet(AppProperties appProperties) {
        return Credentials.create(appProperties.getPrivateKey());
    }

    @Bean
    public FactorySBA loadFactoryContract(AppProperties appProperties, TransactionManager txManager, ContractGasProvider gasProvider) {
        return FactorySBA.load(appProperties.getContractAddress(), web3j, txManager, gasProvider);
    }

    @Bean
    public ContractGasProvider gasProvider() {
        return new StaticGasProvider(GAS_PRICE ,GAS_LIMIT);
    }

    @Bean
    public TransactionManager transactionManager(Credentials credentials) {
        return new RawTransactionManager(web3j, credentials, CHAIN_ID);
    }
}
