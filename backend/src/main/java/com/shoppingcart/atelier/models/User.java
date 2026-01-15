package com.shoppingcart.atelier.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "u_type", discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id")
    private Long uId;

    @Column(name = "u_email", nullable = false, unique = true)
    private String uEmail;

    @Column(name = "u_username", nullable = false, unique = true)
    private String uUsername;

    @Column(name = "u_password", nullable = false)
    private String uPassword;

    @Column(name = "u_fullname", nullable = false)
    private String uFullName;

    @Column(name = "u_phone")
    private String uPhone;

    @Column(name = "u_address")
    private String uAddress;

    @Column(name = "u_city")
    private String uCity;

    @Column(name = "u_postal_code")
    private String uPostalCode;

    @Column(name = "u_country")
    private String uCountry;

    @Column(name = "u_type", insertable = false, updatable = false)
    private String uType;

    @Column(name = "u_is_active", nullable = false)
    private Boolean uIsActive = true;

    @Column(name = "u_last_login")
    private LocalDateTime uLastLogin;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Abstract method for polymorphism
    public abstract String getUserType();

    // Getters and Setters
    public Long getUId() {
        return uId;
    }

    public void setUId(Long uId) {
        this.uId = uId;
    }

    public String getUEmail() {
        return uEmail;
    }

    public void setUEmail(String uEmail) {
        this.uEmail = uEmail;
    }

    public String getUUsername() {
        return uUsername;
    }

    public void setUUsername(String uUsername) {
        this.uUsername = uUsername;
    }

    public String getUPassword() {
        return uPassword;
    }

    public void setUPassword(String uPassword) {
        this.uPassword = uPassword;
    }

    public String getUFullName() {
        return uFullName;
    }

    public void setUFullName(String uFullName) {
        this.uFullName = uFullName;
    }

    public String getUPhone() {
        return uPhone;
    }

    public void setUPhone(String uPhone) {
        this.uPhone = uPhone;
    }

    public String getUAddress() {
        return uAddress;
    }

    public void setUAddress(String uAddress) {
        this.uAddress = uAddress;
    }

    public String getUCity() {
        return uCity;
    }

    public void setUCity(String uCity) {
        this.uCity = uCity;
    }

    public String getUPostalCode() {
        return uPostalCode;
    }

    public void setUPostalCode(String uPostalCode) {
        this.uPostalCode = uPostalCode;
    }

    public String getUCountry() {
        return uCountry;
    }

    public void setUCountry(String uCountry) {
        this.uCountry = uCountry;
    }

    public String getUType() {
        return uType;
    }

    public void setUType(String uType) {
        this.uType = uType;
    }

    public Boolean getUIsActive() {
        return uIsActive;
    }

    public void setUIsActive(Boolean uIsActive) {
        this.uIsActive = uIsActive;
    }

    public LocalDateTime getULastLogin() {
        return uLastLogin;
    }

    public void setULastLogin(LocalDateTime uLastLogin) {
        this.uLastLogin = uLastLogin;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
