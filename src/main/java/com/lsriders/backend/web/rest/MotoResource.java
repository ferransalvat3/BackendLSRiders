package com.lsriders.backend.web.rest;
import com.lsriders.backend.domain.Moto;
import com.lsriders.backend.domain.User;
import com.lsriders.backend.repository.MotoRepository;
import com.lsriders.backend.repository.UserExtRepository;
import com.lsriders.backend.repository.UserRepository;
import com.lsriders.backend.security.SecurityUtils;
import com.lsriders.backend.web.rest.errors.BadRequestAlertException;
import com.lsriders.backend.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Moto.
 */
@RestController
@RequestMapping("/api")
public class MotoResource {

    private final Logger log = LoggerFactory.getLogger(MotoResource.class);

    private static final String ENTITY_NAME = "moto";

    private final MotoRepository motoRepository;
    private final UserRepository userRepository;
    private final UserExtRepository userExtRepository;


    public MotoResource(MotoRepository motoRepository, UserRepository userRepository, UserExtRepository userExtRepository) {
        this.motoRepository = motoRepository;
        this.userRepository = userRepository;
        this.userExtRepository = userExtRepository;
    }

    /**
     * POST  /motos : Create a new moto.
     *
     * @param moto the moto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new moto, or with status 400 (Bad Request) if the moto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/motos")
    public ResponseEntity<Moto> createMoto(@RequestBody Moto moto) throws URISyntaxException {
        log.debug("REST request to save Moto : {}", moto);
        if (moto.getId() != null) {
            throw new BadRequestAlertException("A new moto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Moto result = motoRepository.save(moto);
        return ResponseEntity.created(new URI("/api/motos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /motos : Updates an existing moto.
     *
     * @param moto the moto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated moto,
     * or with status 400 (Bad Request) if the moto is not valid,
     * or with status 500 (Internal Server Error) if the moto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/motos")
    public ResponseEntity<Moto> updateMoto(@RequestBody Moto moto) throws URISyntaxException {
        log.debug("REST request to update Moto : {}", moto);
        if (moto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Moto result = motoRepository.save(moto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, moto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /motos : get all the motos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of motos in body
     */
    @GetMapping("/motos")
    public List<Moto> getAllMotos() {
        log.debug("REST request to get all Motos");
        return motoRepository.findAll();
    }

    /**
     * GET  /motos/:id : get the "id" moto.
     *
     * @param id the id of the moto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the moto, or with status 404 (Not Found)
     */
    @GetMapping("/motos/{id}")
    public ResponseEntity<Moto> getMoto(@PathVariable Long id) {
        log.debug("REST request to get Moto : {}", id);
        Optional<Moto> moto = motoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(moto);
    }

    @GetMapping("/motos/by-brand/{brand}")
    public List<Moto> getMotoByBrand(@PathVariable String brand) {
        log.debug("REST request to get Moto : {}", brand);
        return motoRepository.findByBrandAndUserLogin(brand, SecurityUtils.getCurrentUserLogin().get());
    }


    @GetMapping("/my-motos")
    public List<Moto> getMotoById() {
        log.debug("REST request to get Moto : {}");
        return motoRepository.findByUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
    }


    @GetMapping("/motos/by-userextid/{id}")
    @Transactional
    public List<Moto> getMotoById(@RequestParam Long id) {
        log.debug("REST request to get Moto : {}");
        User user = userExtRepository.findById(id).get().getUser();
        return motoRepository.findByUser(user);
    }



    /**
     * DELETE  /motos/:id : delete the "id" moto.
     *
     * @param id the id of the moto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/motos/{id}")
    public ResponseEntity<Void> deleteMoto(@PathVariable Long id) {
        log.debug("REST request to delete Moto : {}", id);
        motoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
