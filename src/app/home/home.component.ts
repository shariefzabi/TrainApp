import { Component, Inject, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { DxMenuModule, DxButtonModule } from "devextreme-angular";
import { ItemClickEvent } from 'devextreme/ui/menu'
import { DxFormModule } from 'devextreme-angular';
import { imageUrl } from '../../../public/images.url';
import { TrainService } from '../train.service';
import { Istation } from '../model/train';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DxMenuModule, RouterLink, RouterLinkActive, DxFormModule, DxButtonModule],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit {

  trainService = inject(TrainService)
  stationList: Istation[] = []
  stationNames: any
  router = inject(Router)
  formData = {
    fromStation: '',
    toStation: '',
    dateOfTravel: null
  };
  constructor() {

  }

  formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.trainService.getAlStations().subscribe((res: any) => {
      this.stationList = res.data
      this.stationNames = this.stationList.map(ele => ele.stationName)
    })

  }

  imageurl = imageUrl
  onSearch = () => {
    let { fromStation, toStation, dateOfTravel } = this.formData;
    if (fromStation === null || toStation === null || dateOfTravel === null) {
      alert("search your journey details")
    }
    else if (fromStation === toStation) {
      alert("to and from stations cant be same")
    }

    else {
      const formStationCode = this.stationList.find(ele => ele.stationName === fromStation)?.stationID
      const toStationCode = this.stationList.find(ele => ele.stationName === toStation)?.stationID

      const formattedDate = this.formatDate(dateOfTravel)
      this.router.navigate(["search", formStationCode, toStationCode, formattedDate])
    }

  }
}
