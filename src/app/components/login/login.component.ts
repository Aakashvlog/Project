import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]],
    });

    if (this.auth.isLoggedIn()) {
      this.route.navigate(['admin']);
    }
  }

  loginSubmit(data: any) {
    console.log(data);
    if (this.user.valid) {
      this.auth.login(this.user.value).subscribe(
        (result) => {
          console.log(result);
          this.route.navigate(['admin']);
        },
        (err: Error) => {
          console.log(err);
        }
      );
    }
  }
}
