package sba.backend.sbabanking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EthTxRequest {
    private String mnemonic;
    private String to;
    private String value;
}
