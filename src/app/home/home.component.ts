import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(ListComponent) list!: ListComponent;
  initialView: boolean = true;
  emailForm = new FormGroup({
    from: new FormControl('',Validators.required),
    to: new FormControl('',Validators.required),
    body: new FormControl('',Validators.required)
  })
  selectedFile: File | any = null;
  constructor(private api: ApiService,private alert:MatSnackBar ) {}

  sendEmail(){
    const user: string | any = localStorage.getItem('user')
    const from: any = this.emailForm.controls.from.value;
    const to: any = this.emailForm.controls.to.value;
    const body: any = this.emailForm.controls.body.value;
    const formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('body', body);
    formData.append('uploadUser', user);
    formData.append('attachment', this.selectedFile);
    this.api.sendMail('/sendMail',formData).subscribe((res: any) =>{
      this.alert.open(res.data.message,'success');
      this.initialView=true;
      this.list?.get();
      this.emailForm.reset()
    })
  }
  handleFileInput(eve: any) {
    this.selectedFile = eve.target.files[0] as File;

  }
  change(){
    this.initialView = false;
  }

}
