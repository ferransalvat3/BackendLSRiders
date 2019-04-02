package com.lsriders.backend.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Moto.
 */
@Entity
@Table(name = "moto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Moto implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "cc")
    private Integer cc;

    @Column(name = "jhi_year")
    private ZonedDateTime year;

    @ManyToOne
    @JsonIgnoreProperties("motos")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public Moto brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public Moto model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getCc() {
        return cc;
    }

    public Moto cc(Integer cc) {
        this.cc = cc;
        return this;
    }

    public void setCc(Integer cc) {
        this.cc = cc;
    }

    public ZonedDateTime getYear() {
        return year;
    }

    public Moto year(ZonedDateTime year) {
        this.year = year;
        return this;
    }

    public void setYear(ZonedDateTime year) {
        this.year = year;
    }

    public User getUser() {
        return user;
    }

    public Moto user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Moto moto = (Moto) o;
        if (moto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Moto{" +
            "id=" + getId() +
            ", brand='" + getBrand() + "'" +
            ", model='" + getModel() + "'" +
            ", cc=" + getCc() +
            ", year='" + getYear() + "'" +
            "}";
    }
}
