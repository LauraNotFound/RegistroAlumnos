import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Administration } from '../interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  administrationObj: Administration = this.initializeManager();
  administrationList: Administration [] = [];

  constructor(private router: Router){}

  ngOnInit(): void{
    const localD = localStorage.getItem("clave");
    if (localD !=null) {
      this.administrationList = JSON.parse(localD);
    }
  }

  registration(){
    const isLocal = localStorage.getItem("clave");
      if (isLocal != null) {
        const oldArr = JSON.parse(isLocal);
        oldArr.push(this.administrationObj);
        this.administrationObj = oldArr;
        localStorage.setItem('clave', JSON.stringify(oldArr));
      }
      else{
        const newArray: Administration[] = [];
        newArray.push(this.administrationObj);
        this.administrationList = newArray;
        localStorage.setItem('clave', JSON.stringify(newArray));
      }
      this.router.navigate(['/login']);    
  }

  private initializeManager(): Administration { //Método para inicializar los valores de los atributos del objeto
        return {
          name: "",
          email: "",
          password: ""
        };
      }
}
