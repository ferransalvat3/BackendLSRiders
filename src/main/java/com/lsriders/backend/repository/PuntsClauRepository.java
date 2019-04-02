package com.lsriders.backend.repository;

import com.lsriders.backend.domain.PuntsClau;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PuntsClau entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PuntsClauRepository extends JpaRepository<PuntsClau, Long> {

}
