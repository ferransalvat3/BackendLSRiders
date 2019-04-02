package com.lsriders.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ParticipacionEvento.
 */
@Entity
@Table(name = "participacion_evento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ParticipacionEvento implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_apuntado")
    private ZonedDateTime fechaApuntado;

    @ManyToOne
    @JsonIgnoreProperties("participacionEventos")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("ratings")
    private Event event;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaApuntado() {
        return fechaApuntado;
    }

    public ParticipacionEvento fechaApuntado(ZonedDateTime fechaApuntado) {
        this.fechaApuntado = fechaApuntado;
        return this;
    }

    public void setFechaApuntado(ZonedDateTime fechaApuntado) {
        this.fechaApuntado = fechaApuntado;
    }

    public User getUser() {
        return user;
    }

    public ParticipacionEvento user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public ParticipacionEvento event(Event event) {
        this.event = event;
        return this;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ParticipacionEvento participacionEvento = (ParticipacionEvento) o;
        if (participacionEvento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), participacionEvento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParticipacionEvento{" +
            "id=" + getId() +
            ", fechaApuntado='" + getFechaApuntado() + "'" +
            "}";
    }
}
