package com.lsriders.backend.web.rest;

import com.lsriders.backend.BackendLsRidersApp;

import com.lsriders.backend.domain.Moto;
import com.lsriders.backend.repository.MotoRepository;
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
 * Test class for the MotoResource REST controller.
 *
 * @see MotoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendLsRidersApp.class)
public class MotoResourceIntTest {

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final Integer DEFAULT_CC = 1;
    private static final Integer UPDATED_CC = 2;

    private static final ZonedDateTime DEFAULT_YEAR = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_YEAR = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MotoRepository motoRepository;

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

    private MockMvc restMotoMockMvc;

    private Moto moto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MotoResource motoResource = new MotoResource(motoRepository);
        this.restMotoMockMvc = MockMvcBuilders.standaloneSetup(motoResource)
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
    public static Moto createEntity(EntityManager em) {
        Moto moto = new Moto()
            .brand(DEFAULT_BRAND)
            .model(DEFAULT_MODEL)
            .cc(DEFAULT_CC)
            .year(DEFAULT_YEAR);
        return moto;
    }

    @Before
    public void initTest() {
        moto = createEntity(em);
    }

    @Test
    @Transactional
    public void createMoto() throws Exception {
        int databaseSizeBeforeCreate = motoRepository.findAll().size();

        // Create the Moto
        restMotoMockMvc.perform(post("/api/motos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moto)))
            .andExpect(status().isCreated());

        // Validate the Moto in the database
        List<Moto> motoList = motoRepository.findAll();
        assertThat(motoList).hasSize(databaseSizeBeforeCreate + 1);
        Moto testMoto = motoList.get(motoList.size() - 1);
        assertThat(testMoto.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testMoto.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testMoto.getCc()).isEqualTo(DEFAULT_CC);
        assertThat(testMoto.getYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createMotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = motoRepository.findAll().size();

        // Create the Moto with an existing ID
        moto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMotoMockMvc.perform(post("/api/motos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moto)))
            .andExpect(status().isBadRequest());

        // Validate the Moto in the database
        List<Moto> motoList = motoRepository.findAll();
        assertThat(motoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMotos() throws Exception {
        // Initialize the database
        motoRepository.saveAndFlush(moto);

        // Get all the motoList
        restMotoMockMvc.perform(get("/api/motos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(moto.getId().intValue())))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())))
            .andExpect(jsonPath("$.[*].cc").value(hasItem(DEFAULT_CC)))
            .andExpect(jsonPath("$.[*].year").value(hasItem(sameInstant(DEFAULT_YEAR))));
    }
    
    @Test
    @Transactional
    public void getMoto() throws Exception {
        // Initialize the database
        motoRepository.saveAndFlush(moto);

        // Get the moto
        restMotoMockMvc.perform(get("/api/motos/{id}", moto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(moto.getId().intValue()))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()))
            .andExpect(jsonPath("$.cc").value(DEFAULT_CC))
            .andExpect(jsonPath("$.year").value(sameInstant(DEFAULT_YEAR)));
    }

    @Test
    @Transactional
    public void getNonExistingMoto() throws Exception {
        // Get the moto
        restMotoMockMvc.perform(get("/api/motos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMoto() throws Exception {
        // Initialize the database
        motoRepository.saveAndFlush(moto);

        int databaseSizeBeforeUpdate = motoRepository.findAll().size();

        // Update the moto
        Moto updatedMoto = motoRepository.findById(moto.getId()).get();
        // Disconnect from session so that the updates on updatedMoto are not directly saved in db
        em.detach(updatedMoto);
        updatedMoto
            .brand(UPDATED_BRAND)
            .model(UPDATED_MODEL)
            .cc(UPDATED_CC)
            .year(UPDATED_YEAR);

        restMotoMockMvc.perform(put("/api/motos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMoto)))
            .andExpect(status().isOk());

        // Validate the Moto in the database
        List<Moto> motoList = motoRepository.findAll();
        assertThat(motoList).hasSize(databaseSizeBeforeUpdate);
        Moto testMoto = motoList.get(motoList.size() - 1);
        assertThat(testMoto.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testMoto.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testMoto.getCc()).isEqualTo(UPDATED_CC);
        assertThat(testMoto.getYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingMoto() throws Exception {
        int databaseSizeBeforeUpdate = motoRepository.findAll().size();

        // Create the Moto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotoMockMvc.perform(put("/api/motos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moto)))
            .andExpect(status().isBadRequest());

        // Validate the Moto in the database
        List<Moto> motoList = motoRepository.findAll();
        assertThat(motoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMoto() throws Exception {
        // Initialize the database
        motoRepository.saveAndFlush(moto);

        int databaseSizeBeforeDelete = motoRepository.findAll().size();

        // Delete the moto
        restMotoMockMvc.perform(delete("/api/motos/{id}", moto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Moto> motoList = motoRepository.findAll();
        assertThat(motoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Moto.class);
        Moto moto1 = new Moto();
        moto1.setId(1L);
        Moto moto2 = new Moto();
        moto2.setId(moto1.getId());
        assertThat(moto1).isEqualTo(moto2);
        moto2.setId(2L);
        assertThat(moto1).isNotEqualTo(moto2);
        moto1.setId(null);
        assertThat(moto1).isNotEqualTo(moto2);
    }
}
