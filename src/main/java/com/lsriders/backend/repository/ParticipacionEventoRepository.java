package com.lsriders.backend.repository;

import com.lsriders.backend.domain.ParticipacionEvento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ParticipacionEvento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipacionEventoRepository extends JpaRepository<ParticipacionEvento, Long> {

    @Query("select participacion_evento from ParticipacionEvento participacion_evento where participacion_evento.user.login = ?#{principal.username}")
    List<ParticipacionEvento> findByUserIsCurrentUser();

}
