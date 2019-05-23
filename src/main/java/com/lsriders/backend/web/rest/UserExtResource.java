package com.lsriders.backend.web.rest;
import com.lsriders.backend.domain.Event;
import com.lsriders.backend.domain.Moto;
import com.lsriders.backend.domain.User;
import com.lsriders.backend.domain.UserExt;
import com.lsriders.backend.repository.UserExtRepository;
import com.lsriders.backend.web.rest.errors.BadRequestAlertException;
import com.lsriders.backend.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserExt.
 */
@RestController
@RequestMapping("/api")
public class UserExtResource {

    private final Logger log = LoggerFactory.getLogger(UserExtResource.class);

    private static final String ENTITY_NAME = "userExt";

    private final UserExtRepository userExtRepository;
    //private final UserRepository userRepository;


    public UserExtResource(UserExtRepository userExtRepository) {
        this.userExtRepository = userExtRepository;
        //this.userRepository = userRepository;
    }

    /**
     * POST  /user-exts : Create a new userExt.
     *
     * @param userExt the userExt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userExt, or with status 400 (Bad Request) if the userExt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-exts")
    public ResponseEntity<UserExt> createUserExt(@RequestBody UserExt userExt) throws URISyntaxException {
        log.debug("REST request to save UserExt : {}", userExt);
        if (userExt.getId() != null) {
            throw new BadRequestAlertException("A new userExt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExt result = userExtRepository.save(userExt);
        return ResponseEntity.created(new URI("/api/user-exts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-exts : Updates an existing userExt.
     *
     * @param userExt the userExt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userExt,
     * or with status 400 (Bad Request) if the userExt is not valid,
     * or with status 500 (Internal Server Error) if the userExt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-exts")
    public ResponseEntity<UserExt> updateUserExt(@RequestBody UserExt userExt) throws URISyntaxException {
        log.debug("REST request to update UserExt : {}", userExt);
        if (userExt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserExt result = userExtRepository.save(userExt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userExt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-exts : get all the userExts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userExts in body
     */
    /*
    @GetMapping("/user-exts")
    public List<UserExt> getAllUserExts(Pageable pageable) {
        log.debug("REST request to get all UserExts");
        return userExtRepository.findAll(pageable);
    }
    */
    @GetMapping("/user-exts")
    public List<UserExt> getAllUserExts(Pageable pageable) {
        log.debug("REST request to get all Events");
        return userExtRepository.findAll(pageable).getContent();
    }

    @GetMapping("/user-exts/students")
    public List<UserExt> getUserExtStudent() {
        log.debug("REST request to get all Students");
        return userExtRepository.findByUserStudent();
    }

    /*@GetMapping("/users-exts/by-userid/{id}")
    public List<User> getUserExtById(@PathVariable Long id) {
        log.debug("REST request to get UserExt : {}");
        User user = userExtRepository.findById(id).get().getUser();
        return userExtRepository.findByUser(user);
    }*/



    /**
     * GET  /user-exts/:id : get the "id" userExt.
     *
     * @param id the id of the userExt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExt, or with status 404 (Not Found)
     */
    @GetMapping("/user-exts/{id}")
    public ResponseEntity<UserExt> getUserExt(@PathVariable Long id) {
        log.debug("REST request to get UserExt : {}", id);
        Optional<UserExt> userExt = userExtRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userExt);
    }

    /**
     * DELETE  /user-exts/:id : delete the "id" userExt.
     *
     * @param id the id of the userExt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-exts/{id}")
    public ResponseEntity<Void> deleteUserExt(@PathVariable Long id) {
        log.debug("REST request to delete UserExt : {}", id);
        userExtRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
