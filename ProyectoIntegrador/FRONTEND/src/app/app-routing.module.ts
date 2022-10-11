import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditeducacionComponent } from './components/educacion/editeducacion.component';
import { NeweducacionComponent } from './components/educacion/neweducacion.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { EditHyssComponent } from './components/hyss/edit-hyss.component';
import { NewHyssComponent } from './components/hyss/new-hyss.component';
import { LoginComponent } from './components/login/login.component';

//import { ImagenCComponent } from './components/imagen-c/imagen-c.component';
//import { ImagenDComponent } from './components/imagen-d/imagen-d.component';
//import { ImagenLComponent } from './components/imagen-l/imagen-l.component';



const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'nuevaexp', component:NewExperienciaComponent},
  {path: 'editexp/:id', component: EditExperienciaComponent},
  {path:'nuevaedu', component: NeweducacionComponent},
  {path: 'editedu/:id', component: EditeducacionComponent},
  {path: 'newskill', component: NewHyssComponent},
  {path: 'editskill/:id', component: EditHyssComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
