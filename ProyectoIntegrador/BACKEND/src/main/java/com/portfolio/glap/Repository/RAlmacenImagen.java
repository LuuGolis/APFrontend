package com.portfolio.glap.Repository;

import com.portfolio.glap.Entity.AlmacenImagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RAlmacenImagen extends JpaRepository<AlmacenImagen, String>{
    
}