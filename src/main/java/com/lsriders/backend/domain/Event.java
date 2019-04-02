package com.lsriders.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "gpx")
    private byte[] gpx;

    @Column(name = "gpx_content_type")
    private String gpxContentType;

    @Column(name = "km_route")
    private Integer kmRoute;

    @Column(name = "time_route")
    private Double timeRoute;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Column(name = "descripction")
    private String descripction;

    @Column(name = "observacions_prev")
    private String observacionsPrev;

    @ManyToOne
    @JsonIgnoreProperties("events")
    private User creador;

    @OneToMany(mappedBy = "event")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RatingEvent> ratings = new HashSet<>();
    @OneToMany(mappedBy = "event")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PuntsClau> punts = new HashSet<>();
    @OneToMany(mappedBy = "event")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ParticipacionEvento> participacions = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getGpx() {
        return gpx;
    }

    public Event gpx(byte[] gpx) {
        this.gpx = gpx;
        return this;
    }

    public void setGpx(byte[] gpx) {
        this.gpx = gpx;
    }

    public String getGpxContentType() {
        return gpxContentType;
    }

    public Event gpxContentType(String gpxContentType) {
        this.gpxContentType = gpxContentType;
        return this;
    }

    public void setGpxContentType(String gpxContentType) {
        this.gpxContentType = gpxContentType;
    }

    public Integer getKmRoute() {
        return kmRoute;
    }

    public Event kmRoute(Integer kmRoute) {
        this.kmRoute = kmRoute;
        return this;
    }

    public void setKmRoute(Integer kmRoute) {
        this.kmRoute = kmRoute;
    }

    public Double getTimeRoute() {
        return timeRoute;
    }

    public Event timeRoute(Double timeRoute) {
        this.timeRoute = timeRoute;
        return this;
    }

    public void setTimeRoute(Double timeRoute) {
        this.timeRoute = timeRoute;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Event date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getDescripction() {
        return descripction;
    }

    public Event descripction(String descripction) {
        this.descripction = descripction;
        return this;
    }

    public void setDescripction(String descripction) {
        this.descripction = descripction;
    }

    public String getObservacionsPrev() {
        return observacionsPrev;
    }

    public Event observacionsPrev(String observacionsPrev) {
        this.observacionsPrev = observacionsPrev;
        return this;
    }

    public void setObservacionsPrev(String observacionsPrev) {
        this.observacionsPrev = observacionsPrev;
    }

    public User getCreador() {
        return creador;
    }

    public Event creador(User user) {
        this.creador = user;
        return this;
    }

    public void setCreador(User user) {
        this.creador = user;
    }

    public Set<RatingEvent> getRatings() {
        return ratings;
    }

    public Event ratings(Set<RatingEvent> ratingEvents) {
        this.ratings = ratingEvents;
        return this;
    }

    public Event addRating(RatingEvent ratingEvent) {
        this.ratings.add(ratingEvent);
        ratingEvent.setEvent(this);
        return this;
    }

    public Event removeRating(RatingEvent ratingEvent) {
        this.ratings.remove(ratingEvent);
        ratingEvent.setEvent(null);
        return this;
    }

    public void setRatings(Set<RatingEvent> ratingEvents) {
        this.ratings = ratingEvents;
    }

    public Set<PuntsClau> getPunts() {
        return punts;
    }

    public Event punts(Set<PuntsClau> puntsClaus) {
        this.punts = puntsClaus;
        return this;
    }

    public Event addPunt(PuntsClau puntsClau) {
        this.punts.add(puntsClau);
        puntsClau.setEvent(this);
        return this;
    }

    public Event removePunt(PuntsClau puntsClau) {
        this.punts.remove(puntsClau);
        puntsClau.setEvent(null);
        return this;
    }

    public void setPunts(Set<PuntsClau> puntsClaus) {
        this.punts = puntsClaus;
    }

    public Set<ParticipacionEvento> getParticipacions() {
        return participacions;
    }

    public Event participacions(Set<ParticipacionEvento> participacionEventos) {
        this.participacions = participacionEventos;
        return this;
    }

    public Event addParticipacion(ParticipacionEvento participacionEvento) {
        this.participacions.add(participacionEvento);
        participacionEvento.setEvent(this);
        return this;
    }

    public Event removeParticipacion(ParticipacionEvento participacionEvento) {
        this.participacions.remove(participacionEvento);
        participacionEvento.setEvent(null);
        return this;
    }

    public void setParticipacions(Set<ParticipacionEvento> participacionEventos) {
        this.participacions = participacionEventos;
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
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", gpx='" + getGpx() + "'" +
            ", gpxContentType='" + getGpxContentType() + "'" +
            ", kmRoute=" + getKmRoute() +
            ", timeRoute=" + getTimeRoute() +
            ", date='" + getDate() + "'" +
            ", descripction='" + getDescripction() + "'" +
            ", observacionsPrev='" + getObservacionsPrev() + "'" +
            "}";
    }
}
