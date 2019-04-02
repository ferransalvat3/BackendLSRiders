package com.lsriders.backend.web.rest;

import com.lsriders.backend.BackendLsRidersApp;

import com.lsriders.backend.domain.RatingEvent;
import com.lsriders.backend.repository.RatingEventRepository;
import com.lsriders.backend.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.lsriders.backend.web.rest.TestUtil.sameInstant;
import static com.lsriders.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RatingEventResource REST controller.
 *
 * @see RatingEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendLsRidersApp.class)
public class RatingEventResourceIntTest {

    private static final Integer DEFAULT_PUNTUACION = 1;
    private static final Integer UPDATED_PUNTUACION = 2;

    private static final String DEFAULT_VALORACION = "AAAAAAAAAA";
    private static final String UPDATED_VALORACION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RatingEventRepository ratingEventRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRatingEventMockMvc;

    private RatingEvent ratingEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RatingEventResource ratingEventResource = new RatingEventResource(ratingEventRepository);
        this.restRatingEventMockMvc = MockMvcBuilders.standaloneSetup(ratingEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RatingEvent createEntity(EntityManager em) {
        RatingEvent ratingEvent = new RatingEvent()
            .puntuacion(DEFAULT_PUNTUACION)
            .valoracion(DEFAULT_VALORACION)
            .date(DEFAULT_DATE);
        return ratingEvent;
    }

    @Before
    public void initTest() {
        ratingEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createRatingEvent() throws Exception {
        int databaseSizeBeforeCreate = ratingEventRepository.findAll().size();

        // Create the RatingEvent
        restRatingEventMockMvc.perform(post("/api/rating-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingEvent)))
            .andExpect(status().isCreated());

        // Validate the RatingEvent in the database
        List<RatingEvent> ratingEventList = ratingEventRepository.findAll();
        assertThat(ratingEventList).hasSize(databaseSizeBeforeCreate + 1);
        RatingEvent testRatingEvent = ratingEventList.get(ratingEventList.size() - 1);
        assertThat(testRatingEvent.getPuntuacion()).isEqualTo(DEFAULT_PUNTUACION);
        assertThat(testRatingEvent.getValoracion()).isEqualTo(DEFAULT_VALORACION);
        assertThat(testRatingEvent.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createRatingEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ratingEventRepository.findAll().size();

        // Create the RatingEvent with an existing ID
        ratingEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRatingEventMockMvc.perform(post("/api/rating-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingEvent)))
            .andExpect(status().isBadRequest());

        // Validate the RatingEvent in the database
        List<RatingEvent> ratingEventList = ratingEventRepository.findAll();
        assertThat(ratingEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRatingEvents() throws Exception {
        // Initialize the database
        ratingEventRepository.saveAndFlush(ratingEvent);

        // Get all the ratingEventList
        restRatingEventMockMvc.perform(get("/api/rating-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ratingEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].puntuacion").value(hasItem(DEFAULT_PUNTUACION)))
            .andExpect(jsonPath("$.[*].valoracion").value(hasItem(DEFAULT_VALORACION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getRatingEvent() throws Exception {
        // Initialize the database
        ratingEventRepository.saveAndFlush(ratingEvent);

        // Get the ratingEvent
        restRatingEventMockMvc.perform(get("/api/rating-events/{id}", ratingEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ratingEvent.getId().intValue()))
            .andExpect(jsonPath("$.puntuacion").value(DEFAULT_PUNTUACION))
            .andExpect(jsonPath("$.valoracion").value(DEFAULT_VALORACION.toString()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingRatingEvent() throws Exception {
        // Get the ratingEvent
        restRatingEventMockMvc.perform(get("/api/rating-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRatingEvent() throws Exception {
        // Initialize the database
        ratingEventRepository.saveAndFlush(ratingEvent);

        int databaseSizeBeforeUpdate = ratingEventRepository.findAll().size();

        // Update the ratingEvent
        RatingEvent updatedRatingEvent = ratingEventRepository.findById(ratingEvent.getId()).get();
        // Disconnect from session so that the updates on updatedRatingEvent are not directly saved in db
        em.detach(updatedRatingEvent);
        updatedRatingEvent
            .puntuacion(UPDATED_PUNTUACION)
            .valoracion(UPDATED_VALORACION)
            .date(UPDATED_DATE);

        restRatingEventMockMvc.perform(put("/api/rating-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRatingEvent)))
            .andExpect(status().isOk());

        // Validate the RatingEvent in the database
        List<RatingEvent> ratingEventList = ratingEventRepository.findAll();
        assertThat(ratingEventList).hasSize(databaseSizeBeforeUpdate);
        RatingEvent testRatingEvent = ratingEventList.get(ratingEventList.size() - 1);
        assertThat(testRatingEvent.getPuntuacion()).isEqualTo(UPDATED_PUNTUACION);
        assertThat(testRatingEvent.getValoracion()).isEqualTo(UPDATED_VALORACION);
        assertThat(testRatingEvent.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingRatingEvent() throws Exception {
        int databaseSizeBeforeUpdate = ratingEventRepository.findAll().size();

        // Create the RatingEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRatingEventMockMvc.perform(put("/api/rating-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ratingEvent)))
            .andExpect(status().isBadRequest());

        // Validate the RatingEvent in the database
        List<RatingEvent> ratingEventList = ratingEventRepository.findAll();
        assertThat(ratingEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRatingEvent() throws Exception {
        // Initialize the database
        ratingEventRepository.saveAndFlush(ratingEvent);

        int databaseSizeBeforeDelete = ratingEventRepository.findAll().size();

        // Delete the ratingEvent
        restRatingEventMockMvc.perform(delete("/api/rating-events/{id}", ratingEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RatingEvent> ratingEventList = ratingEventRepository.findAll();
        assertThat(ratingEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RatingEvent.class);
        RatingEvent ratingEvent1 = new RatingEvent();
        ratingEvent1.setId(1L);
        RatingEvent ratingEvent2 = new RatingEvent();
        ratingEvent2.setId(ratingEvent1.getId());
        assertThat(ratingEvent1).isEqualTo(ratingEvent2);
        ratingEvent2.setId(2L);
        assertThat(ratingEvent1).isNotEqualTo(ratingEvent2);
        ratingEvent1.setId(null);
        assertThat(ratingEvent1).isNotEqualTo(ratingEvent2);
    }
}
