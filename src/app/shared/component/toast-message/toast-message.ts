import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  imports: [CommonModule],
  templateUrl: './toast-message.html',
  styleUrl: './toast-message.css'
})
export class ToastMessage {
@Input() message: string='';
enableToast=false;

show(message:string){
  console.log("Toasted!")
  this.message=message;
  this.enableToast=true;
  setTimeout(()=>{
    this.enableToast=false;
  },5000);
}


}
