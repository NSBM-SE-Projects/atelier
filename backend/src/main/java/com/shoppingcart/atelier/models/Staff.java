package com.shoppingcart.atelier.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("STAFF")
public class Staff extends User {

    @Override
    public String getUserType() {
        return "STAFF";
    }
}
