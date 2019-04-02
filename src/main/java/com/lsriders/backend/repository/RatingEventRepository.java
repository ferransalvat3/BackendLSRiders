package com.lsriders.backend.repository;

import com.lsriders.backend.domain.RatingEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the RatingEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatingEventRepository extends JpaRepository<RatingEvent, Long> {

    @Query("select rating_event from RatingEvent rating_event where rating_event.user.login = ?#{principal.username}")
    List<RatingEvent> findByUserIsCurrentUser();

}
