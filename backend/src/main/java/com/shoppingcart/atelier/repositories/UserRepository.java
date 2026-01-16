package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndUserType(String username, String userType);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    long countByUserType(String userType);

    List<User> findAllByUserType(String userType);

    // Case-insensitive queries for customer type
    @Query("SELECT u FROM User u WHERE LOWER(u.userType) = LOWER(:userType)")
    List<User> findAllByUserTypeIgnoreCase(@Param("userType") String userType);

    @Query("SELECT COUNT(u) FROM User u WHERE LOWER(u.userType) = LOWER(:userType)")
    long countByUserTypeIgnoreCase(@Param("userType") String userType);

    @Query("SELECT COUNT(u) FROM User u WHERE LOWER(u.userType) = LOWER(:userType) AND u.isActive = true")
    long countActiveByUserType(@Param("userType") String userType);

    @Query("SELECT COUNT(u) FROM User u WHERE LOWER(u.userType) = LOWER(:userType) AND u.isActive = false")
    long countInactiveByUserType(@Param("userType") String userType);

    // Find customer by ID and type
    @Query("SELECT u FROM User u WHERE u.id = :id AND LOWER(u.userType) = LOWER(:userType)")
    Optional<User> findByIdAndUserTypeIgnoreCase(@Param("id") Long id, @Param("userType") String userType);

    // Native SQL query to count customers directly from database
    @Query(value = "SELECT COUNT(*) FROM users WHERE LOWER(u_type) = 'customer'", nativeQuery = true)
    long countCustomers();

    // Native SQL query to count active customers
    @Query(value = "SELECT COUNT(*) FROM users WHERE LOWER(u_type) = 'customer' AND u_is_active = true", nativeQuery = true)
    long countActiveCustomers();

    // Native SQL query to count inactive customers
    @Query(value = "SELECT COUNT(*) FROM users WHERE LOWER(u_type) = 'customer' AND u_is_active = false", nativeQuery = true)
    long countInactiveCustomers();

    // Native SQL query to get all customers
    @Query(value = "SELECT * FROM users WHERE LOWER(u_type) = 'customer' ORDER BY created_at DESC", nativeQuery = true)
    List<User> findAllCustomers();

    // Native SQL query to count all users
    @Query(value = "SELECT COUNT(*) FROM users", nativeQuery = true)
    long countAllUsers();
}
