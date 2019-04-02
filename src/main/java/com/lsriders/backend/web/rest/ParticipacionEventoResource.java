package com.lsriders.backend.web.rest;
import com.lsriders.backend.domain.ParticipacionEvento;
import com.lsriders.backend.repository.ParticipacionEventoRepository;
import com.lsriders.backend.web.rest.errors.BadRequestAlertException;
import com.lsriders.backend.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ParticipacionEvento.
 */
@RestController
@RequestMapping("/api")
public class ParticipacionEventoResource {

    private final Logger log = LoggerFactory.getLogger(ParticipacionEventoResource.class);

    private static final String ENTITY_NAME = "participacionEvento";

    private final ParticipacionEventoRepository participacionEventoRepository;

    public ParticipacionEventoResource(ParticipacionEventoRepository participacionEventoRepository) {
        this.participacionEventoRepository = participacionEventoRepository;
    }

    /**
     * POST  /participacion-eventos : Create a new participacionEvento.
     *
     * @param participacionEvento the participacionEvento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participacionEvento, or with status 400 (Bad Request) if the participacionEvento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participacion-eventos")
    public ResponseEntity<ParticipacionEvento> createParticipacionEvento(@RequestBody ParticipacionEvento participacionEvento) throws URISyntaxException {
        log.debug("REST request to save ParticipacionEvento : {}", participacionEvento);
        if (participacionEvento.getId() != null) {
            throw new BadRequestAlertException("A new participacionEvento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParticipacionEvento result = participacionEventoRepository.save(participacionEvento);
        return ResponseEntity.created(new URI("/api/participacion-eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /participacion-eventos : Updates an existing participacionEvento.
     *
     * @param participacionEvento the participacionEvento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated participacionEvento,
     * or with status 400 (Bad Request) if the participacionEvento is not valid,
     * or with status 500 (Internal Server Error) if the participacionEvento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/participacion-eventos")
    public ResponseEntity<ParticipacionEvento> updateParticipacionEvento(@RequestBody ParticipacionEvento participacionEvento) throws URISyntaxException {
        log.debug("REST request to update ParticipacionEvento : {}", participacionEvento);
        if (participacionEvento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParticipacionEvento result = participacionEventoRepository.save(participacionEvento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, participacionEvento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /participacion-eventos : get all the participacionEventos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participacionEventos in body
     */
    @GetMapping("/participacion-eventos")
    public List<ParticipacionEvento> getAllParticipacionEventos() {
        log.debug("REST request to get all ParticipacionEventos");
        return participacionEventoRepository.findAll();
    }

    /**
     * GET  /participacion-eventos/:id : get the "id" participacionEvento.
     *
     * @param id the id of the participacionEvento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participacionEvento, or with status 404 (Not Found)
     */
    @GetMapping("/participacion-eventos/{id}")
    public ResponseEntity<ParticipacionEvento> getParticipacionEvento(@PathVariable Long id) {
        log.debug("REST request to get ParticipacionEvento : {}", id);
        Optional<ParticipacionEvento> participacionEvento = participacionEventoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(participacionEvento);
    }

    /**
     * DELETE  /participacion-eventos/:id : delete the "id" participacionEvento.
     *
     * @param id the id of the participacionEvento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participacion-eventos/{id}")
    public ResponseEntity<Void> deleteParticipacionEvento(@PathVariable Long id) {
        log.debug("REST request to delete ParticipacionEvento : {}", id);
        participacionEventoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
