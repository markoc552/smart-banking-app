package sba.backend.sbabanking.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TxDetails {
    private String sender;
    private String recipient;
    private String time;
    private String amount;
}
