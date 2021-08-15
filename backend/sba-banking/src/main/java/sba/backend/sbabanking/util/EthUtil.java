package sba.backend.sbabanking.util;

import org.web3j.crypto.Bip32ECKeyPair;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.MnemonicUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.utils.Convert;
import sba.backend.sbabanking.config.AppProperties;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ExecutionException;

import static org.web3j.crypto.Bip32ECKeyPair.HARDENED_BIT;

public class EthUtil {

    private EthUtil() {
        //private constructor
    }

    public static BigInteger getTransactionCount(Web3j web3j, String address) throws ExecutionException, InterruptedException {
        return  web3j.ethGetTransactionCount(
                address,
                DefaultBlockParameter.valueOf("latest"))
                .sendAsync()
                .get()
                .getTransactionCount();
    }

    public static Transaction createTransactionCall(BigInteger nonce, AppProperties appProperties, String encodedFunction) {
        return Transaction.createFunctionCallTransaction(
                appProperties.getAuthorityWallet(),
                nonce,
                appProperties.getGasPrice(),
                appProperties.getGasLimit(),
                appProperties.getContractAddress(),
                encodedFunction
        );
    }

    public static String parseTimestamp(BigInteger timestamp) {
        long timestampAsLong = timestamp.longValue() * 1000;

        var instant = Instant.ofEpochMilli(timestampAsLong);
        var localDateTime = LocalDateTime.ofInstant(instant, ZoneId.of("UTC"));

        return parseTime(localDateTime);
    }

    public static String parseTime(LocalDateTime time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm");

        return time.format(formatter);
    }

    public static String parseAmount(BigInteger amount) {
        String amountAsString = amount.toString();

        return Convert.fromWei(amountAsString, Convert.Unit.ETHER).toPlainString();
    }


    public static Credentials generateCredentialsFromMnemonic(String mnemonic) {
        byte[] seed = MnemonicUtils.generateSeed(mnemonic, "");

        Bip32ECKeyPair masterKeypair = Bip32ECKeyPair.generateKeyPair(seed);

        var path = new int[] {44 | HARDENED_BIT, 60 | HARDENED_BIT, 0 | HARDENED_BIT, 0, 0};
        Bip32ECKeyPair  x = Bip32ECKeyPair.deriveKeyPair(masterKeypair, path);

        return Credentials.create(x);
    }
}
