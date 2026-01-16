package com.shoppingcart.atelier.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CUSTOMER")
public class Customer extends User {

    @Override
    public String getUserType() {
        return "CUSTOMER";
    }
}
