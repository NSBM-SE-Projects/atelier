package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByuUsername(String username);

    Optional<User> findByuEmail(String email);

    boolean existsByuUsername(String username);

    boolean existsByuEmail(String email);

    @Query("SELECT u FROM User u WHERE u.uUsername = ?1 AND u.uIsActive = true")
    Optional<User> findByuUsernameAnduIsActiveTrue(String username);
}
