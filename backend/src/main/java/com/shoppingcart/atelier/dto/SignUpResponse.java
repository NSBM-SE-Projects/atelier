package com.shoppingcart.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String message;
    private Boolean success;
}
