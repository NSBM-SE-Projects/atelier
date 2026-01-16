package com.shoppingcart.atelier.repositories;

import com.shoppingcart.atelier.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
