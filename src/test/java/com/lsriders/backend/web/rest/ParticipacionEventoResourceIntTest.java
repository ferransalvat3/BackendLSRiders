package com.lsriders.backend.web.rest;

import com.lsriders.backend.BackendLsRidersApp;

import com.lsriders.backend.domain.ParticipacionEvento;
import com.lsriders.backend.repository.ParticipacionEventoRepository;
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
 * Test class for the ParticipacionEventoResource REST controller.
 *
 * @see ParticipacionEventoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendLsRidersApp.class)
public class ParticipacionEventoResourceIntTest {

    private static final ZonedDateTime DEFAULT_FECHA_APUNTADO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_APUNTADO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ParticipacionEventoRepository participacionEventoRepository;

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

    private MockMvc restParticipacionEventoMockMvc;

    private ParticipacionEvento participacionEvento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParticipacionEventoResource participacionEventoResource = new ParticipacionEventoResource(participacionEventoRepository);
        this.restParticipacionEventoMockMvc = MockMvcBuilders.standaloneSetup(participacionEventoResource)
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
    public static ParticipacionEvento createEntity(EntityManager em) {
        ParticipacionEvento participacionEvento = new ParticipacionEvento()
            .fechaApuntado(DEFAULT_FECHA_APUNTADO);
        return participacionEvento;
    }

    @Before
    public void initTest() {
        participacionEvento = createEntity(em);
    }

    @Test
    @Transactional
    public void createParticipacionEvento() throws Exception {
        int databaseSizeBeforeCreate = participacionEventoRepository.findAll().size();

        // Create the ParticipacionEvento
        restParticipacionEventoMockMvc.perform(post("/api/participacion-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participacionEvento)))
            .andExpect(status().isCreated());

        // Validate the ParticipacionEvento in the database
        List<ParticipacionEvento> participacionEventoList = participacionEventoRepository.findAll();
        assertThat(participacionEventoList).hasSize(databaseSizeBeforeCreate + 1);
        ParticipacionEvento testParticipacionEvento = participacionEventoList.get(participacionEventoList.size() - 1);
        assertThat(testParticipacionEvento.getFechaApuntado()).isEqualTo(DEFAULT_FECHA_APUNTADO);
    }

    @Test
    @Transactional
    public void createParticipacionEventoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = participacionEventoRepository.findAll().size();

        // Create the ParticipacionEvento with an existing ID
        participacionEvento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParticipacionEventoMockMvc.perform(post("/api/participacion-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participacionEvento)))
            .andExpect(status().isBadRequest());

        // Validate the ParticipacionEvento in the database
        List<ParticipacionEvento> participacionEventoList = participacionEventoRepository.findAll();
        assertThat(participacionEventoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParticipacionEventos() throws Exception {
        // Initialize the database
        participacionEventoRepository.saveAndFlush(participacionEvento);

        // Get all the participacionEventoList
        restParticipacionEventoMockMvc.perform(get("/api/participacion-eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(participacionEvento.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaApuntado").value(hasItem(sameInstant(DEFAULT_FECHA_APUNTADO))));
    }
    
    @Test
    @Transactional
    public void getParticipacionEvento() throws Exception {
        // Initialize the database
        participacionEventoRepository.saveAndFlush(participacionEvento);

        // Get the participacionEvento
        restParticipacionEventoMockMvc.perform(get("/api/participacion-eventos/{id}", participacionEvento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(participacionEvento.getId().intValue()))
            .andExpect(jsonPath("$.fechaApuntado").value(sameInstant(DEFAULT_FECHA_APUNTADO)));
    }

    @Test
    @Transactional
    public void getNonExistingParticipacionEvento() throws Exception {
        // Get the participacionEvento
        restParticipacionEventoMockMvc.perform(get("/api/participacion-eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParticipacionEvento() throws Exception {
        // Initialize the database
        participacionEventoRepository.saveAndFlush(participacionEvento);

        int databaseSizeBeforeUpdate = participacionEventoRepository.findAll().size();

        // Update the participacionEvento
        ParticipacionEvento updatedParticipacionEvento = participacionEventoRepository.findById(participacionEvento.getId()).get();
        // Disconnect from session so that the updates on updatedParticipacionEvento are not directly saved in db
        em.detach(updatedParticipacionEvento);
        updatedParticipacionEvento
            .fechaApuntado(UPDATED_FECHA_APUNTADO);

        restParticipacionEventoMockMvc.perform(put("/api/participacion-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParticipacionEvento)))
            .andExpect(status().isOk());

        // Validate the ParticipacionEvento in the database
        List<ParticipacionEvento> participacionEventoList = participacionEventoRepository.findAll();
        assertThat(participacionEventoList).hasSize(databaseSizeBeforeUpdate);
        ParticipacionEvento testParticipacionEvento = participacionEventoList.get(participacionEventoList.size() - 1);
        assertThat(testParticipacionEvento.getFechaApuntado()).isEqualTo(UPDATED_FECHA_APUNTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingParticipacionEvento() throws Exception {
        int databaseSizeBeforeUpdate = participacionEventoRepository.findAll().size();

        // Create the ParticipacionEvento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParticipacionEventoMockMvc.perform(put("/api/participacion-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participacionEvento)))
            .andExpect(status().isBadRequest());

        // Validate the ParticipacionEvento in the database
        List<ParticipacionEvento> participacionEventoList = participacionEventoRepository.findAll();
        assertThat(participacionEventoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParticipacionEvento() throws Exception {
        // Initialize the database
        participacionEventoRepository.saveAndFlush(participacionEvento);

        int databaseSizeBeforeDelete = participacionEventoRepository.findAll().size();

        // Delete the participacionEvento
        restParticipacionEventoMockMvc.perform(delete("/api/participacion-eventos/{id}", participacionEvento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParticipacionEvento> participacionEventoList = participacionEventoRepository.findAll();
        assertThat(participacionEventoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParticipacionEvento.class);
        ParticipacionEvento participacionEvento1 = new ParticipacionEvento();
        participacionEvento1.setId(1L);
        ParticipacionEvento participacionEvento2 = new ParticipacionEvento();
        participacionEvento2.setId(participacionEvento1.getId());
        assertThat(participacionEvento1).isEqualTo(participacionEvento2);
        participacionEvento2.setId(2L);
        assertThat(participacionEvento1).isNotEqualTo(participacionEvento2);
        participacionEvento1.setId(null);
        assertThat(participacionEvento1).isNotEqualTo(participacionEvento2);
    }
}
