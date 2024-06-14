import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Administration } from '../interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  administrationObj: Administration = this.initializeManager();
  administrationList: Administration[] = [];
  log = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    const localData = localStorage.getItem('clave');
    if (localData != null) {
      this.administrationList = JSON.parse(localData);
    }
  }

  login(){
    const admin = this.administrationList.find(credentials => credentials.email === this.administrationObj.email && credentials.password === this.administrationObj.password);
    if (admin) {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(["/alumns"]);
    }
    else{
      alert("Credenciales inválidas.")
    }
  }

  initializeManager(){
    return{
      name: "",
      email:"",
      password: ""
    }
  }
}