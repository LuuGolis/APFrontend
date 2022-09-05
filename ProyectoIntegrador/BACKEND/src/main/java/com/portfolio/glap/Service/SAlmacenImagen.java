/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.portfolio.glap.Service;

import com.portfolio.glap.Entity.AlmacenImagen;
import com.portfolio.glap.Repository.RAlmacenImagen;
import java.io.IOException;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author lugol
 */
@Service
public class SAlmacenImagen {
    @Autowired
    private RAlmacenImagen rAlmacenImagen;
    public AlmacenImagen store(MultipartFile file) throws IOException{
      String fileName = StringUtils.cleanPath(file.getOriginalFilename());
      AlmacenImagen AlmacenImagen = new AlmacenImagen(fileName, file.getContentType(), file.getBytes());
      return rAlmacenImagen.save(AlmacenImagen);
        
    }
    
    public AlmacenImagen getFile(String id){
        return rAlmacenImagen.findById(id).get();
        
    }
    
    public Stream<AlmacenImagen> getAllFiles(){
        return rAlmacenImagen.findAll().stream();
    }
    
    
    
    
}
