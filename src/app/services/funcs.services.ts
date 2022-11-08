import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FuncsService {
  constructor() { }
  
   showSpinner() {
    $('#sbt_btn').addClass('disabled');
    $('#spinner').removeClass('d-none')
   }

 hideSpinner() {
    $('#sbt_btn').removeClass('disabled');
    $('#spinner').addClass('d-none')
}
 
}