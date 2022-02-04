package sba.backend.sbabanking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import sba.backend.sbabanking.aspects.Log;
import sba.backend.sbabanking.contracts.SBAContract;
import sba.backend.sbabanking.model.AccountStatus;
import sba.backend.sbabanking.model.TxDetails;

import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static sba.backend.sbabanking.util.EthUtil.parseAmount;
import static sba.backend.sbabanking.util.EthUtil.parseTimestamp;

@Service
public class AccountService {

    @Autowired
    private Web3j web3j;

    @Autowired
    private ContractGasProvider gasProvider;

    @Autowired
    private TransactionManager txManager;

    @Log
    public AccountStatus getAccountStatus(String address) throws ExecutionException, InterruptedException {
        SBAContract contract = SBAContract.load(address, web3j, txManager, gasProvider);

        BigInteger money = contract.getMoneyStatus().sendAsync().get();
        BigInteger txCount = contract.getTransactionCount().sendAsync().get();
        List waults = contract.getWaults().sendAsync().get();

        return new AccountStatus(money, txCount, waults);
    }

    @Log
    public TxDetails getTransactionDetails(String address, BigInteger index) throws ExecutionException, InterruptedException {
        SBAContract contract = SBAContract.load(address, web3j, txManager, gasProvider);

        Tuple4<String, String, BigInteger, BigInteger> details = contract.getTransactions(index).sendAsync().get();

        return new TxDetails(
                details.component1(),
                parseRecipient(details.component2()),
                parseTimestamp(details.component3()),
                parseAmount(details.component4())
        );
    }

    @Log
    public List getWaults(String address) throws ExecutionException, InterruptedException {
        SBAContract contract = SBAContract.load(address, web3j, txManager, gasProvider);

        return contract.getWaults().sendAsync().get();
    }

    private String parseRecipient(String recipient) {
        if (recipient.equals("0x0000000000000000000000000000000000000000"))
            return "Deposit";

        return recipient.equals("0x0000000000000000000000000000000000000001")
                ? "Withdraw"
                : recipient;
    }
}
