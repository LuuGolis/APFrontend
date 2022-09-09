/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.portfolio.glap.Controller;

import Mensaje.RptaImagen;
import Mensaje.RptaMsg;
import com.portfolio.glap.Entity.AlmacenImagen;
import com.portfolio.glap.Service.SAlmacenImagen;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 *
 * @author lugol
 */

@Controller
@CrossOrigin("http://localhost:4200")
public class CAlmacenImagen {
    @Autowired
    private SAlmacenImagen sAlmacenImagen;
    @PostMapping("/upload")
    public ResponseEntity<RptaMsg> uploadFile(@RequestParam("file") MultipartFile file){
        String msg = "";
        try{
            sAlmacenImagen.store(file);
            msg = "Archivo subido correctamente: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new RptaMsg(msg));
        } catch (Exception e){
            msg = "Nose pudo subir el archivo: " + file.getOriginalFilename() + ":c";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new RptaMsg(msg));
        }
    }
    
    @GetMapping("/files")
    public ResponseEntity<List<RptaImagen>> getListFiles(){
        List<RptaImagen> files = sAlmacenImagen.getAllFiles().map(dbFile ->{
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();
            return new RptaImagen(
            dbFile.getName(), fileDownloadUri, dbFile.getType(), dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id){
        AlmacenImagen almacenImagen =  sAlmacenImagen.getFile(id);
        return ResponseEntity.ok()
               .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + almacenImagen.getName() + "\"")
                .body(almacenImagen.getData());
                       
    }
}
