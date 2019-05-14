package com.lsriders.backend.service.dto;

public class EventDTO {

    private Long id;
    private String name;
    private Integer kmRoute;
    private String descripction;

    public EventDTO(Long id, String name, Integer kmRoute, String descripction) {
        this.id = id;
        this.name = name;
        this.kmRoute = kmRoute;
        this.descripction = descripction;
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getKmRoute() {
        return kmRoute;
    }

    public void setKmRoute(Integer kmRoute) {
        this.kmRoute = kmRoute;
    }

    public String getDescripction() {
        return descripction;
    }

    public void setDescripction(String descripction) {
        this.descripction = descripction;
    }

    @Override
    public String toString() {
        return "EventDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", kmRoute=" + kmRoute +
            ", descripction='" + descripction + '\'' +
            '}';
    }
}
