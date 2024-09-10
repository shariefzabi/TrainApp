import { Component, inject } from '@angular/core';
import { DxButtonModule, DxFormModule, DxPopoverModule, DxPopupModule } from 'devextreme-angular';
import { IRegisterResponse, Iuser } from '../model/train';
import { TrainService } from '../train.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DxPopupModule, DxButtonModule, DxFormModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isModalVisible = true
  trainService = inject(TrainService)
  router = inject(Router)
  hideModal = () => {
    this.isModalVisible = false;
    this.router.navigate(['/home'])

  }
  formData: Iuser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passengerID: 0

  };
  popupToolbarItems = [{
    widget: 'dxButton',
    location: 'after',
    options: {
      text: 'Close',
      onClick: this.hideModal,
    }
  }];

  Register = () => {
    debugger;
    this.trainService.createUSer(this.formData).subscribe((res: IRegisterResponse) => {
      if (res.result) {
        alert(res.message)
        this.hideModal()
      }
    })

  }
}
