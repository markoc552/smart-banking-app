package sba.backend.sbabanking.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.math.BigInteger;


@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "web3j")
@Getter
@Setter
public class AppProperties {

    private String contractAddress;
    private String privateKey;
    private String walletPass;
    private String authorityWallet;
    private BigInteger gasPrice;
    private BigInteger gasLimit;
}
