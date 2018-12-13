import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import * as socketIo from 'socket.io-client';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  noticias : any[] = [];
   channel: any;
  //likes : any;
  likes: any;
  constructor(
    public _usuarioService: UsuarioService
  ) { }
 
  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias(){
    this._usuarioService.cargarNoticias()
    .subscribe((resp : any) =>{
      this.noticias = resp.noticias;
    });
  }
  // add to the number of likes to the server
  liked(not) {
    this._usuarioService.likea(not)
    .subscribe((resp : any) =>{
      this.cargarNoticias(); 
    });
  }
}
//----------------------------------------
