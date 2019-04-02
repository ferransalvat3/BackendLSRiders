package com.lsriders.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A RatingEvent.
 */
@Entity
@Table(name = "rating_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RatingEvent implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "puntuacion")
    private Integer puntuacion;

    @Column(name = "valoracion")
    private String valoracion;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @ManyToOne
    @JsonIgnoreProperties("ratingEvents")
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

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public RatingEvent puntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
        return this;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getValoracion() {
        return valoracion;
    }

    public RatingEvent valoracion(String valoracion) {
        this.valoracion = valoracion;
        return this;
    }

    public void setValoracion(String valoracion) {
        this.valoracion = valoracion;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public RatingEvent date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public RatingEvent user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public RatingEvent event(Event event) {
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
        RatingEvent ratingEvent = (RatingEvent) o;
        if (ratingEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ratingEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RatingEvent{" +
            "id=" + getId() +
            ", puntuacion=" + getPuntuacion() +
            ", valoracion='" + getValoracion() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
