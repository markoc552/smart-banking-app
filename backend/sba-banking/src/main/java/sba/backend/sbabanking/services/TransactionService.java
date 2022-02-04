package sba.backend.sbabanking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.abi.datatypes.Address;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.config.AppProperties;
import sba.backend.sbabanking.contracts.SBAContract;
import sba.backend.sbabanking.util.EthUtil;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import static sba.backend.sbabanking.util.EthUtil.getTransactionCount;

@Service
public class TransactionService {

    @Autowired
    private AppProperties appProperties;

    @Autowired
    private Web3j web3j;

    @Autowired
    private RawTransactionManager txManager;

    @Autowired
    private ContractGasProvider gasProvider;

    @Autowired
    private Credentials credentials;

    @Log
    public String sendMoney(String to, String value, String mnemonic) throws TransactionException, IOException, InterruptedException, ExecutionException {
        TransactionReceipt receipt = Transfer.sendFunds (
                web3j,
                credentials,
                to,
                Convert.toWei(value, Convert.Unit.ETHER),
                Convert.Unit.WEI
        ).sendAsync().get();

        return receipt.getTransactionHash();
    }

    @Log
    public void sendMoneyOverContract(String to, String value, String address) throws ExecutionException, InterruptedException {
        SBAContract contract = SBAContract.load(address, web3j, txManager, gasProvider);

        var valueInWei = Convert.toWei(value, Convert.Unit.ETHER).toBigInteger();

        contract.sendMoney(to, valueInWei, valueInWei)
                .sendAsync()
                .get();
    }

    @Log
    public void deposit(String value, String address) throws ExecutionException, InterruptedException {
        SBAContract contract = SBAContract.load(address, web3j, txManager, gasProvider);

        var valueInWei = Convert.toWei(value, Convert.Unit.ETHER).toBigInteger();

        contract.addMoneyToAccount(valueInWei)
                .sendAsync()
                .get();
    }

    @Log
    public void withdraw(String value, String address, String mnemonic) throws ExecutionException, InterruptedException {
        Credentials userCredentials = EthUtil.generateCredentialsFromMnemonic(mnemonic);

        SBAContract contract = SBAContract.load(address, web3j, userCredentials, gasProvider);

        var valueInWei = Convert.toWei(value, Convert.Unit.ETHER).toBigInteger();

        contract.withDrawMoney(valueInWei, new Address(appProperties.getAuthorityWallet()).getValue(), valueInWei)
                .sendAsync()
                .get();

        //sendMoneyToAuthority(userCredentials, valueInWei);
    }

    private void sendMoneyToAuthority(Credentials credentials, BigInteger valueInWei) throws IOException, ExecutionException, InterruptedException {
        var nonce = EthUtil.getTransactionCount(web3j, appProperties.getAuthorityWallet());

        RawTransaction rawTransaction = RawTransaction.createEtherTransaction(
                nonce,
                BigInteger.valueOf(4200),
                BigInteger.valueOf(6721975),
                appProperties.getAuthorityWallet(),
                valueInWei
        );

        byte[] signMessage = TransactionEncoder.signMessage(rawTransaction, credentials);

        web3j.ethSendRawTransaction(Numeric.toHexString(signMessage)).sendAsync().get();
    }

    private void waitForTransaction(String txHash) throws InterruptedException, ExecutionException {
        Optional<TransactionReceipt> transactionReceipt;

        do {
            EthGetTransactionReceipt ethGetTransactionReceiptResp = web3j.ethGetTransactionReceipt(txHash)
                                                                         .sendAsync()
                                                                         .get();

            transactionReceipt = ethGetTransactionReceiptResp.getTransactionReceipt();

            Thread.sleep(3000); // Retry after 3 sec
        } while(transactionReceipt.isEmpty());
    }
}
