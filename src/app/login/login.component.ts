import { Component, inject } from '@angular/core';
import { DxButtonModule, DxFormModule, DxPopupModule } from 'devextreme-angular';
import { TrainService } from '../train.service';
import { ILogin, ILoginResponse, IRegisterResponse } from '../model/train';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DxPopupModule, DxButtonModule, DxFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  trainService = inject(TrainService)
  formData: ILogin = {
    phone: '',
    password: '',
  };
  isModalVisible = true
  router = inject(Router)
  hideModal = () => {
    this.isModalVisible = false;
    this.router.navigate(['/home'])

  }
  Login = () => {
    this.trainService.loginUser(this.formData).subscribe((res: ILoginResponse) => {
      if (res.result) {
        alert(res.message)
        this.trainService.setCreds(res.data)
        this.hideModal()
      }
    })
  }
}
