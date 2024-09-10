import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../train.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data, IRegisterResponse, Istation, Itrain, Search } from '../model/train';
import { DxMenuModule, DxButtonModule, DxListModule, DxTileViewModule, DxFormModule, DxDataGridModule } from "devextreme-angular";
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { DxPopupModule, DxPopupTypes } from 'devextreme-angular/ui/popup';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DxMenuModule, DxButtonModule, CommonModule, DxListModule, JsonPipe, DxTileViewModule, DxFormModule, DatePipe, DxDataGridModule, DxPopupModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
  router = inject(Router)
  isPopupVisible = false

  selectedTrain: Itrain = {
    trainId: 0,
    trainNo: 0,
    trainName: '',
    departureStationName: '',
    arrivalStationName: '',
    arrivalTime: '',
    departureTime: '',
    totalSeats: 0,
    departureDate: '',
    bookedSeats: 0,

  }
  data: any = [
  ];
  onButtonClick(cellData: any) {
    alert(`Button clicked for ID: ${cellData.data.id}`);
    // Implement any other logic here
  }
  trainService = inject(TrainService)
  activateRoute = inject(ActivatedRoute)
  searchDataParams: Search = new Search();
  cardsData: Itrain[] = []
  formData = {
    fromStation: '',
    toStation: '',
    dateOfTravel: null
  };
  departureStation: any;
  arrivalStation: any;
  dateOfTravel: any
  stationList: Istation[] = []
  stationNames: string[] = []

  passengerInfo = {
    passengerName: '',
    Age: ''
  }
  localData: any



  constructor() {
    this.activateRoute.params.subscribe((res: any) => {
      this.searchDataParams = res
      const { fromStation, toStation, dateOfTravel } = this.searchDataParams
      this.getSearchTrains(fromStation, toStation, dateOfTravel)
      const storageData = localStorage.getItem("creds")
      if (storageData !== null) {
        this.localData = JSON.parse(storageData)
      }


    })
  }
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

      const formattedDate = this.trainService.formatDate(dateOfTravel)
      if (formStationCode && typeof formStationCode === "number" && toStationCode && typeof toStationCode === "number" && formattedDate) {
        this.getSearchTrains(formStationCode, toStationCode, formattedDate)
      }

    }

  }

  ngOnInit(): void {
    this.trainService.getAlStations().subscribe((res: any) => {
      this.stationList = res.data
      this.stationNames = this.stationList.map(ele => ele.stationName)


    })
  }
  getTime(date: string) {
    return date.substring(11, 16)
  }
  getDay(date: string) {
    const dayOfWeekNumber: number = new Date(date).getDate()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[dayOfWeekNumber];

  }

  getDate(date: string) {
    return new Date(date).getDate()
  }

  getMonth = (date: string): string => {
    return new Date(date).toLocaleString('default', { month: 'short' });
  }





  getSearchTrains = (fromStation: number, toStation: number, dateOfTravel: string) => {

    this.trainService.getTrainsSearch(fromStation, toStation, dateOfTravel).subscribe((res: any) => {

      this.cardsData = res.data
      const data1 = this.cardsData[0]
      this.departureStation = data1.departureStationName;
      this.arrivalStation = data1.arrivalStationName;
      this.dateOfTravel = dateOfTravel


      console.log(this.cardsData)
    })
  }
  bookTicket = (data: Itrain) => {
    debugger;
    if (this.localData && this.localData !== null) {
      this.isPopupVisible = true;
      this.selectedTrain = data;
    }
    else {
      alert("please login");
      this.router.navigate(['/login'])

    }


  }
  bookTickets() {
    const ticket = {
      "bookingId": 0,
      "trainId": this.selectedTrain.trainId,
      "passengerId": this.localData.passengerID,
      "travelDate": this.selectedTrain.departureDate.toString(),
      "bookingDate": new Date(),
      "totalSeats": this.data.length,
      "TrainAppBookingPassengers": []
    }
    ticket.TrainAppBookingPassengers = this.data;

    this.trainService.bookTicket(ticket).subscribe((res: IRegisterResponse) => {
      if (res.result) {
        alert(res.message)
        this.hideModal()

      }
    })


  }

  hideModal = () => {
    this.isPopupVisible = false;
  }

  AddPassenger = () => {
    const newObj = JSON.parse(JSON.stringify(this.passengerInfo))
    this.data.push(newObj)
  }

  deleteRow = (index: number) => {
    this.data.splice(index, 1)


  }



}
