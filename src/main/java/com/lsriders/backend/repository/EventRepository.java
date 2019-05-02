package com.lsriders.backend.repository;

import com.lsriders.backend.domain.Event;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedQuery;
import java.util.List;

/**
 * Spring Data  repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select event from Event event where event.creador.login = ?#{principal.username}") //Query que retorna tots els camps de una ruta
    List<Event> findByCreadorIsCurrentUser();

    @Query("select event from Event event order by event.kmRoute desc ") //Query que retorna les rutes pordenades per KM
    List<Event> getEventsOrderByKm();

    @Query("select event from Event event order by event.timeRoute desc")  //Query que retorna les rutes ordenades per temps
    List<Event> getEventsOrderByTime();

    //@Query("select event from Event event where event.name LIKE :name")  //Query que retorna les rutes per nom de ruta
    //List<Event> getEventsOrderByName();


}
