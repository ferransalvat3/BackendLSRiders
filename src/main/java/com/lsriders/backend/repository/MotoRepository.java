package com.lsriders.backend.repository;

import com.lsriders.backend.domain.Moto;
import com.lsriders.backend.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Moto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotoRepository extends JpaRepository<Moto, Long> {

    @Query("select moto from Moto moto where moto.user.login = ?#{principal.username}")
    List<Moto> findByUserIsCurrentUser();

    List<Moto> findByBrandAndUserLogin(String brand, String login);

}
