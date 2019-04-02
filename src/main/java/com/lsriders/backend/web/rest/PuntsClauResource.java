package com.lsriders.backend.web.rest;
import com.lsriders.backend.domain.PuntsClau;
import com.lsriders.backend.repository.PuntsClauRepository;
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
 * REST controller for managing PuntsClau.
 */
@RestController
@RequestMapping("/api")
public class PuntsClauResource {

    private final Logger log = LoggerFactory.getLogger(PuntsClauResource.class);

    private static final String ENTITY_NAME = "puntsClau";

    private final PuntsClauRepository puntsClauRepository;

    public PuntsClauResource(PuntsClauRepository puntsClauRepository) {
        this.puntsClauRepository = puntsClauRepository;
    }

    /**
     * POST  /punts-claus : Create a new puntsClau.
     *
     * @param puntsClau the puntsClau to create
     * @return the ResponseEntity with status 201 (Created) and with body the new puntsClau, or with status 400 (Bad Request) if the puntsClau has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/punts-claus")
    public ResponseEntity<PuntsClau> createPuntsClau(@RequestBody PuntsClau puntsClau) throws URISyntaxException {
        log.debug("REST request to save PuntsClau : {}", puntsClau);
        if (puntsClau.getId() != null) {
            throw new BadRequestAlertException("A new puntsClau cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PuntsClau result = puntsClauRepository.save(puntsClau);
        return ResponseEntity.created(new URI("/api/punts-claus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /punts-claus : Updates an existing puntsClau.
     *
     * @param puntsClau the puntsClau to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated puntsClau,
     * or with status 400 (Bad Request) if the puntsClau is not valid,
     * or with status 500 (Internal Server Error) if the puntsClau couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/punts-claus")
    public ResponseEntity<PuntsClau> updatePuntsClau(@RequestBody PuntsClau puntsClau) throws URISyntaxException {
        log.debug("REST request to update PuntsClau : {}", puntsClau);
        if (puntsClau.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PuntsClau result = puntsClauRepository.save(puntsClau);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, puntsClau.getId().toString()))
            .body(result);
    }

    /**
     * GET  /punts-claus : get all the puntsClaus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of puntsClaus in body
     */
    @GetMapping("/punts-claus")
    public List<PuntsClau> getAllPuntsClaus() {
        log.debug("REST request to get all PuntsClaus");
        return puntsClauRepository.findAll();
    }

    /**
     * GET  /punts-claus/:id : get the "id" puntsClau.
     *
     * @param id the id of the puntsClau to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the puntsClau, or with status 404 (Not Found)
     */
    @GetMapping("/punts-claus/{id}")
    public ResponseEntity<PuntsClau> getPuntsClau(@PathVariable Long id) {
        log.debug("REST request to get PuntsClau : {}", id);
        Optional<PuntsClau> puntsClau = puntsClauRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(puntsClau);
    }

    /**
     * DELETE  /punts-claus/:id : delete the "id" puntsClau.
     *
     * @param id the id of the puntsClau to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/punts-claus/{id}")
    public ResponseEntity<Void> deletePuntsClau(@PathVariable Long id) {
        log.debug("REST request to delete PuntsClau : {}", id);
        puntsClauRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
