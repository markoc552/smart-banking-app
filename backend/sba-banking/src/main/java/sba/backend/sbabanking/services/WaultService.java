package sba.backend.sbabanking.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Bip32ECKeyPair;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import sba.backend.sbabanking.contracts.SBAContract;
import sba.backend.sbabanking.contracts.Wault;
import sba.backend.sbabanking.model.WaultDetails;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.concurrent.ExecutionException;

import static org.web3j.crypto.Bip32ECKeyPair.HARDENED_BIT;
import static sba.backend.sbabanking.util.EthUtil.*;

@Service
public class WaultService {

    @Autowired
    private ContractGasProvider gasProvider;

    @Autowired
    private TransactionManager txManager;

    @Autowired
    private Web3j web3j;

    public WaultDetails getWaultStatus(String address) throws ExecutionException, InterruptedException {
        Wault contract = Wault.load(address, web3j, txManager, gasProvider);

        Tuple4<BigInteger, BigInteger, BigInteger, String> status = contract.getWaultStatus().sendAsync().get();

        return new WaultDetails(
                status.component4(),
                parseTimestamp(status.component3()),
                status.component1().toString(),
                parseAmount(status.component2())
        );
    }

    public void createWault(WaultDetails details, String address, String mnemonic) throws ExecutionException, InterruptedException {
        Credentials credentials = generateCredentialsFromMnemonic(mnemonic);

        SBAContract contract = SBAContract.load(address, web3j, credentials, gasProvider);

        long time = Date.from(Instant.parse(details.getTime())).getTime();
        long amount = Long.parseLong(details.getAmount());

        contract.createWault(BigInteger.valueOf(amount),
                             details.getReason(),
                             BigInteger.valueOf(time))
                .sendAsync()
                .get();
    }
}
