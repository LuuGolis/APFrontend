/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.portfolio.glap.Dto;

import javax.validation.constraints.NotBlank;

/**
 *
 * @author lugol
 */
public class dtoHyss {
    @NotBlank
      private String nombre;
     @NotBlank
      private int porcentaje;

    public dtoHyss() {
    }

    public dtoHyss(String nombre, int porcentaje) {
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }
     
     
}
