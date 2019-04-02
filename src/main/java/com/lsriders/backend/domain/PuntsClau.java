package com.lsriders.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PuntsClau.
 */
@Entity
@Table(name = "punts_clau")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PuntsClau implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "observation")
    private String observation;

    @Column(name = "latitud")
    private Float latitud;

    @Column(name = "longitud")
    private Float longitud;

    @Column(name = "jhi_type")
    private String type;

    @ManyToOne
    @JsonIgnoreProperties("punts")
    private Event event;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObservation() {
        return observation;
    }

    public PuntsClau observation(String observation) {
        this.observation = observation;
        return this;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Float getLatitud() {
        return latitud;
    }

    public PuntsClau latitud(Float latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Float latitud) {
        this.latitud = latitud;
    }

    public Float getLongitud() {
        return longitud;
    }

    public PuntsClau longitud(Float longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Float longitud) {
        this.longitud = longitud;
    }

    public String getType() {
        return type;
    }

    public PuntsClau type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Event getEvent() {
        return event;
    }

    public PuntsClau event(Event event) {
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
        PuntsClau puntsClau = (PuntsClau) o;
        if (puntsClau.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), puntsClau.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PuntsClau{" +
            "id=" + getId() +
            ", observation='" + getObservation() + "'" +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", type='" + getType() + "'" +
            "}";
    }
}
