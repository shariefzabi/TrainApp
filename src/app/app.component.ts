import { Component, inject, OnInit } from '@angular/core';
import { Data, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { ILogin, ILoginResponse } from './model/train';
import { TrainService } from './train.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLink, RouterLinkActive, DxMenuModule, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tarin-app';
  isCredsAvailable = false
  trainService = inject(TrainService)
  creds: Data = {


    "passengerID": 841,
    "firstName": "Zabiullah",
    "lastName": "Mohammad",
    "email": "zabiullahsharoefmohammad@gmail.com",
    "phone": "6281567558",
    "password": "Zabi@2000"

  }

  ngOnInit(): void {
    debugger;
    const items = this.trainService.creds$.subscribe((res) => {
      if (items !== null) {
        this.creds = res
        this.isCredsAvailable = true
      }
    })


  }
  constructor() {

  }
  logoff = () => {
    this.trainService.clearCreds()
    this.isCredsAvailable = false;
  }

}
