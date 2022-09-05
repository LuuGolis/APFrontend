/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.portfolio.glap.Repository;

import com.portfolio.glap.Entity.AlmacenImagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lugol
 */
@Repository
public interface RAlmacenImagen extends JpaRepository<AlmacenImagen, String>{
    
}
