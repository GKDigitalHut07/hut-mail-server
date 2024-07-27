import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/api.service';
import { Notification } from '../data/notification';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputTextModule,ButtonModule,FormsModule,FloatLabelModule,InputTextareaModule,CommonModule, HttpClientModule,
    ProgressSpinnerModule, ToastModule],
  providers:[MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  request = {
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  };

  enableLoader:boolean=false;

  onSubmit(form: any) {
    if (form.valid) {
      let data = new Notification();
      data.emailTo=[this.request.email];
      data.body="<h3>Hello!</h3><h5>Welcome to GK Digital Hut!!!</h5>"+
      "<p>We received your request, our team will contact you within 2days.</p><br>"+
      "<h4>Requestor Details:</h4><p><b>Requestor Name : </b>"+this.request.name+"<br>"+
      "<b>Contact Number : </b>"+ this.request.phoneNumber+
      "<br><b>Email : </b>"+this.request.email+
      "<br><b>Message : </b>"+this.request.message+"<br><br> <b>Regards,<br>GK DIGITAL HUT<br>(+91) 6369537963</b></p> ";
      data.subject="Enquiry";
      data.html=true;
      this.enableLoader=true;
      this.apiService.sendEmail(data).subscribe(response => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: response.message, life: 5000 });
        this.request={name: '',phoneNumber: '',email: '',message: ''};
        this.enableLoader=false;
      },
      error => {
        console.error('Error occurred during form submission', error);
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: "Sorry for the inconvinience! please try again later.", life: 5000 });
        this.request={name: '',phoneNumber: '',email: '',message: ''};
        this.enableLoader=false;
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Please enter mandatory all fields', life: 3000 });
    }
  }

  ngOnInit(): void {}
  constructor(private apiService:ApiService,private messageService: MessageService){}

}
