/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.portfolio.glap.Interface;

import com.portfolio.glap.Entity.Persona;
import java.util.List;


/**
 *
 * @author lugol
 */
public interface IPersonaService {
    //traer lista de personas
    public List<Persona> getPersona();
    
//guardar objeto de tipo persona
public void savePersona(Persona persona);

//eliminar objeto según ID
public void deletePersona(Long id);

//buscar objeto según id
public Persona findPersona(Long id);
    
}
