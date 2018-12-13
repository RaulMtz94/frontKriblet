import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map, repeat , catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import swal from 'sweetalert';
import { environment } from '../../../environments/environment';
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  //VARIABLES PUSHER
  pusher: any;
  channel: any;
  constructor(
    public http:HttpClient,
    public router:Router
  ) { 
    this.cargarStorage();
    
  }
 

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')) 
    }else{
      this.token ='';
      this.usuario = null;
    }
  }

//GUARDAR STORAGE


//CREAR USUARIO

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return  this.http.post(url, usuario)
    .pipe(map((resp:any)=>{
      swal("Usuario Creado", usuario.email, "success");
      console.log(resp);
      return resp;
    }),catchError((err, caught) => {
      console.log(err);
      swal('Error' , 'Error el email ya fue registrado' , 'error');
      return throwError(err);
    }));
  }
//GUARDAR EN STORAGE
  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }
  //LOGOUT
  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    
  }


  //LOGUEAR USUARIO
  login( usuario:Usuario, recordar: boolean = false){
    
    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario).pipe(map((resp:any)=>{
      
      this.guardarStorage( resp.id, resp.token, resp.usuario );

      return true;
    }) ,catchError((err, caught) => {
      console.log(err);
      swal('Error' , err.error.mensaje , 'error');
      return throwError(err);
    }));
  }



  cargarNoticias(){

    let url = URL_SERVICIOS + '/noticias/notice';

    return this.http.get(url);
  }

  likea( not ){
    let number = 1;
    
    let url = URL_SERVICIOS+'/update/' + number ;
      return this.http.put(url , not).pipe(map((resp:any)=>{
        swal('Like', 'Like', 'success' );
        resp;
      }));
    }

}
