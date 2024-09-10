import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookTicket, ILogin, ILoginResponse, IRegisterResponse, Iuser } from './model/train';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private credsKey = 'creds';
  private credsSubject = new BehaviorSubject<any>(null);
  apiUrl: string = "https://freeapi.miniprojectideas.com/api/TrainApp"

  constructor(private http: HttpClient) {
    const storedCreds = localStorage.getItem(this.credsKey);
    if (storedCreds) {
      this.credsSubject.next(JSON.parse(storedCreds));
    }

  }

  getAlStations = () => {
    return this.http.get(`${this.apiUrl}/GetAllStations`)
  }



  getTrainsSearch(fromStation: number, toStation: number, dateOfTravel: string) {
    return this.http.get(`${this.apiUrl}/GetTrainsBetweenStations?departureStationId=${fromStation}&arrivalStationId=${toStation}&departureDate=${dateOfTravel}`)
  }

  createUSer(user: Iuser) {
    return this.http.post<IRegisterResponse>(`${this.apiUrl}/AddUpdatePassengers`, user)
  }

  loginUser = (user: ILogin) => {
    return this.http.post<ILoginResponse>(`${this.apiUrl}/Login`, user)

  }

  formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  bookTicket = (ticket: IBookTicket) => {
    return this.http.post<IRegisterResponse>(`${this.apiUrl}/BookTrain`, ticket)
  }

  get creds$() {
    return this.credsSubject.asObservable();
  }

  setCreds(creds: any) {
    localStorage.setItem(this.credsKey, JSON.stringify(creds));
    this.credsSubject.next(creds);
  }

  clearCreds() {
    localStorage.removeItem(this.credsKey);
    this.credsSubject.next(null);
  }
}
