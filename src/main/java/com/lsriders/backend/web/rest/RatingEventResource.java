package com.lsriders.backend.web.rest;
import com.lsriders.backend.domain.RatingEvent;
import com.lsriders.backend.repository.RatingEventRepository;
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
 * REST controller for managing RatingEvent.
 */
@RestController
@RequestMapping("/api")
public class RatingEventResource {

    private final Logger log = LoggerFactory.getLogger(RatingEventResource.class);

    private static final String ENTITY_NAME = "ratingEvent";

    private final RatingEventRepository ratingEventRepository;

    public RatingEventResource(RatingEventRepository ratingEventRepository) {
        this.ratingEventRepository = ratingEventRepository;
    }

    /**
     * POST  /rating-events : Create a new ratingEvent.
     *
     * @param ratingEvent the ratingEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ratingEvent, or with status 400 (Bad Request) if the ratingEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rating-events")
    public ResponseEntity<RatingEvent> createRatingEvent(@RequestBody RatingEvent ratingEvent) throws URISyntaxException {
        log.debug("REST request to save RatingEvent : {}", ratingEvent);
        if (ratingEvent.getId() != null) {
            throw new BadRequestAlertException("A new ratingEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RatingEvent result = ratingEventRepository.save(ratingEvent);
        return ResponseEntity.created(new URI("/api/rating-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rating-events : Updates an existing ratingEvent.
     *
     * @param ratingEvent the ratingEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ratingEvent,
     * or with status 400 (Bad Request) if the ratingEvent is not valid,
     * or with status 500 (Internal Server Error) if the ratingEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rating-events")
    public ResponseEntity<RatingEvent> updateRatingEvent(@RequestBody RatingEvent ratingEvent) throws URISyntaxException {
        log.debug("REST request to update RatingEvent : {}", ratingEvent);
        if (ratingEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RatingEvent result = ratingEventRepository.save(ratingEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ratingEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rating-events : get all the ratingEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ratingEvents in body
     */
    @GetMapping("/rating-events")
    public List<RatingEvent> getAllRatingEvents() {
        log.debug("REST request to get all RatingEvents");
        return ratingEventRepository.findAll();
    }

    /**
     * GET  /rating-events/:id : get the "id" ratingEvent.
     *
     * @param id the id of the ratingEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ratingEvent, or with status 404 (Not Found)
     */
    @GetMapping("/rating-events/{id}")
    public ResponseEntity<RatingEvent> getRatingEvent(@PathVariable Long id) {
        log.debug("REST request to get RatingEvent : {}", id);
        Optional<RatingEvent> ratingEvent = ratingEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ratingEvent);
    }

    /**
     * DELETE  /rating-events/:id : delete the "id" ratingEvent.
     *
     * @param id the id of the ratingEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rating-events/{id}")
    public ResponseEntity<Void> deleteRatingEvent(@PathVariable Long id) {
        log.debug("REST request to delete RatingEvent : {}", id);
        ratingEventRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
