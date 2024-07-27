import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  visible:boolean=false;

  opendialog(){
    this.visible=true;
  }

}
