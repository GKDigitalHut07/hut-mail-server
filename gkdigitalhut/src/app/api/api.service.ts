import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification, NotificationResponse } from '../data/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  BASE_URL="https://mail.gkdigitalhut.com";

  sendEmail(data:Notification):Observable<NotificationResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'APi-Key':'em0kX1VqS0l+di5qeTsoM1FpLStd'
      // 'Api-Key': 'em0kX1VqS0l+di5qeTsoM1FpLStd'
    });
    return this.http.post<NotificationResponse>(this.BASE_URL+'/v1.0/sendEmail',data,{ headers });
  }

}
