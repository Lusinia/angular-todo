import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  authForm: FormGroup;
  sent: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      name: '',
      username: '',
      email: '',
      phone: '',
      address: this.fb.group({
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      })
    });
  }

  ngOnInit(): void {
  }

  sendRequest(): void {
    this.sent = true;
    if (this.authForm.valid) {
      this.authService.createUser(this.authForm.value).subscribe((resp) => {
        this.authService.setUser(resp);
        this.router.navigate(['todos']);
      });
    }
  }
}
