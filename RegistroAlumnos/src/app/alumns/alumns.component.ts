import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Students } from '../interface'

@Component({
  selector: 'app-alumns',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './alumns.component.html',
  styleUrl: './alumns.component.css'
})
export class AlumnsComponent implements OnInit{
    @ViewChild('myModal') model: ElementRef | undefined;
  
    studentObj: Students = this.initializeStudent();
    studentList: Students[] = [];

  constructor(private router: Router){}
  
    ngOnInit(): void {
      const localData = localStorage.getItem("key");
      if (localData != null) {
        this.studentList = JSON.parse(localData);
      }
    }
  
    openModel(){
      const model = document.getElementById("myModal");
      if(model != null){
        model.style.display = 'block';
      }
    }
  
    openModel1(){
      this.studentObj = this.initializeStudent();
      this.openModel();
    }
  
    closeModel(){
      if(this.model != null){
        this.model.nativeElement.style.display = 'none';
      }
    }
  
    onEdit(item: Students){
      this.studentObj = { ...item };
      this.openModel();
    }
  
    updateStud(){
      const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
      if(currentRecord != undefined){
        currentRecord.name = this.studentObj.name;
        currentRecord.address = this.studentObj.address;
        currentRecord.movileNo = this.studentObj.movileNo;
      }
      localStorage.setItem('key', JSON.stringify(this.studentList));
      this.closeModel();
    }
  
    onDelete(item: Students) {
      const isDelete = confirm("Are you sure want to delete?");
      if (isDelete) {
        const index = this.studentList.findIndex(m => m.id === item.id);
        if (index !== -1) {
          this.studentList.splice(index, 1);
        }
        localStorage.setItem('key', JSON.stringify(this.studentList));
      }
    }
  
    saveStudent(){
      const isLocalPresent = localStorage.getItem("key");
      if(isLocalPresent != null){
        const oldArray = JSON.parse(isLocalPresent);
        this.studentObj.id = oldArray.length + 1;
        oldArray.push(this.studentObj);
        this.studentList = oldArray;
        localStorage.setItem('key', JSON.stringify(oldArray));
      } else {
        const newArr: Students[] = [];
        this.studentObj.id = 1;
        newArr.push(this.studentObj);
        this.studentList = newArr;
        localStorage.setItem('key', JSON.stringify(newArr));
      }
    }

  logout(){
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(["/login"]);
  }
  
    private initializeStudent(): Students {
      return {
        id: 0,
        name: "",
        movileNo: "",
        email: "",
        city: "",
        state: "",
        pincode: "",
        address: ""
      };
    }
  }