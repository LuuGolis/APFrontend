import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL,
getStorage, deleteObject } from '@angular/fire/storage'


@Injectable({
  providedIn: 'root'
})
export class ImagenService {
url: string="";
urlImg: string = "";
nombre: string= "";

  constructor(private storage:Storage) { }

  public uploadImage($event: any, name:string){
    
    //captura img y guarda en array
    const file = $event.target.files[0]
    //carpeta img en firebase storage
    const imgRef = ref(this.storage, `img/`+ name)
    this.nombre = name;
    uploadBytes(imgRef, file)
    .then(response => {this.getImage()})
    .catch(error => console.log(error))

  }

  getImage(){  
    const imageRef = ref(this.storage, 'img')
   
    list(imageRef).then(async response => {
      for(let item of response.items){       
        this.url = await getDownloadURL(item);
        console.log(item.name);
        
        if(this.nombre == item.name){
          this.urlImg = this.url;
        }

        console.log("la url es:" + this.url);
    }
    }).catch(error => console.log(error))
  }

  deleteImg():void{
  
  }

  clearUrl(){
    this.url = "";
  }
}
