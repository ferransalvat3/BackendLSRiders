package com.lsriders.backend.web.rest;

import com.lsriders.backend.BackendLsRidersApp;

import com.lsriders.backend.domain.PuntsClau;
import com.lsriders.backend.repository.PuntsClauRepository;
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
import java.util.List;


import static com.lsriders.backend.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PuntsClauResource REST controller.
 *
 * @see PuntsClauResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendLsRidersApp.class)
public class PuntsClauResourceIntTest {

    private static final String DEFAULT_OBSERVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUD = 1F;
    private static final Float UPDATED_LATITUD = 2F;

    private static final Float DEFAULT_LONGITUD = 1F;
    private static final Float UPDATED_LONGITUD = 2F;

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private PuntsClauRepository puntsClauRepository;

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

    private MockMvc restPuntsClauMockMvc;

    private PuntsClau puntsClau;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PuntsClauResource puntsClauResource = new PuntsClauResource(puntsClauRepository);
        this.restPuntsClauMockMvc = MockMvcBuilders.standaloneSetup(puntsClauResource)
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
    public static PuntsClau createEntity(EntityManager em) {
        PuntsClau puntsClau = new PuntsClau()
            .observation(DEFAULT_OBSERVATION)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .type(DEFAULT_TYPE);
        return puntsClau;
    }

    @Before
    public void initTest() {
        puntsClau = createEntity(em);
    }

    @Test
    @Transactional
    public void createPuntsClau() throws Exception {
        int databaseSizeBeforeCreate = puntsClauRepository.findAll().size();

        // Create the PuntsClau
        restPuntsClauMockMvc.perform(post("/api/punts-claus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puntsClau)))
            .andExpect(status().isCreated());

        // Validate the PuntsClau in the database
        List<PuntsClau> puntsClauList = puntsClauRepository.findAll();
        assertThat(puntsClauList).hasSize(databaseSizeBeforeCreate + 1);
        PuntsClau testPuntsClau = puntsClauList.get(puntsClauList.size() - 1);
        assertThat(testPuntsClau.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
        assertThat(testPuntsClau.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testPuntsClau.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testPuntsClau.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createPuntsClauWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = puntsClauRepository.findAll().size();

        // Create the PuntsClau with an existing ID
        puntsClau.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPuntsClauMockMvc.perform(post("/api/punts-claus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puntsClau)))
            .andExpect(status().isBadRequest());

        // Validate the PuntsClau in the database
        List<PuntsClau> puntsClauList = puntsClauRepository.findAll();
        assertThat(puntsClauList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPuntsClaus() throws Exception {
        // Initialize the database
        puntsClauRepository.saveAndFlush(puntsClau);

        // Get all the puntsClauList
        restPuntsClauMockMvc.perform(get("/api/punts-claus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(puntsClau.getId().intValue())))
            .andExpect(jsonPath("$.[*].observation").value(hasItem(DEFAULT_OBSERVATION.toString())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getPuntsClau() throws Exception {
        // Initialize the database
        puntsClauRepository.saveAndFlush(puntsClau);

        // Get the puntsClau
        restPuntsClauMockMvc.perform(get("/api/punts-claus/{id}", puntsClau.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(puntsClau.getId().intValue()))
            .andExpect(jsonPath("$.observation").value(DEFAULT_OBSERVATION.toString()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD.doubleValue()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.doubleValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPuntsClau() throws Exception {
        // Get the puntsClau
        restPuntsClauMockMvc.perform(get("/api/punts-claus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePuntsClau() throws Exception {
        // Initialize the database
        puntsClauRepository.saveAndFlush(puntsClau);

        int databaseSizeBeforeUpdate = puntsClauRepository.findAll().size();

        // Update the puntsClau
        PuntsClau updatedPuntsClau = puntsClauRepository.findById(puntsClau.getId()).get();
        // Disconnect from session so that the updates on updatedPuntsClau are not directly saved in db
        em.detach(updatedPuntsClau);
        updatedPuntsClau
            .observation(UPDATED_OBSERVATION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .type(UPDATED_TYPE);

        restPuntsClauMockMvc.perform(put("/api/punts-claus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPuntsClau)))
            .andExpect(status().isOk());

        // Validate the PuntsClau in the database
        List<PuntsClau> puntsClauList = puntsClauRepository.findAll();
        assertThat(puntsClauList).hasSize(databaseSizeBeforeUpdate);
        PuntsClau testPuntsClau = puntsClauList.get(puntsClauList.size() - 1);
        assertThat(testPuntsClau.getObservation()).isEqualTo(UPDATED_OBSERVATION);
        assertThat(testPuntsClau.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testPuntsClau.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testPuntsClau.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPuntsClau() throws Exception {
        int databaseSizeBeforeUpdate = puntsClauRepository.findAll().size();

        // Create the PuntsClau

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPuntsClauMockMvc.perform(put("/api/punts-claus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(puntsClau)))
            .andExpect(status().isBadRequest());

        // Validate the PuntsClau in the database
        List<PuntsClau> puntsClauList = puntsClauRepository.findAll();
        assertThat(puntsClauList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePuntsClau() throws Exception {
        // Initialize the database
        puntsClauRepository.saveAndFlush(puntsClau);

        int databaseSizeBeforeDelete = puntsClauRepository.findAll().size();

        // Delete the puntsClau
        restPuntsClauMockMvc.perform(delete("/api/punts-claus/{id}", puntsClau.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PuntsClau> puntsClauList = puntsClauRepository.findAll();
        assertThat(puntsClauList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PuntsClau.class);
        PuntsClau puntsClau1 = new PuntsClau();
        puntsClau1.setId(1L);
        PuntsClau puntsClau2 = new PuntsClau();
        puntsClau2.setId(puntsClau1.getId());
        assertThat(puntsClau1).isEqualTo(puntsClau2);
        puntsClau2.setId(2L);
        assertThat(puntsClau1).isNotEqualTo(puntsClau2);
        puntsClau1.setId(null);
        assertThat(puntsClau1).isNotEqualTo(puntsClau2);
    }
}
