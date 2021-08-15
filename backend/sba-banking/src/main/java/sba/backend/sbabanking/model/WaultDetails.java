package sba.backend.sbabanking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WaultDetails {

    String reason;
    String time;
    String amount;
    String saved;
}
