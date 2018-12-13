import { Injectable } from '@angular/core';
declare const Pusher: any;
    import { environment } from '../environments/environment';
    import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient) { 
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  } 

  like( num_likes ) {
    console.log(num_likes)
    this.http.post('http://localhost:3000/update', {'likes': num_likes})
    .subscribe(data => {});
  }
 
} 
