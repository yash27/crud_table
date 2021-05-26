import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Details[] = [];
  model: any = {}
  isEditingOn: boolean = false;

  constructor(
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    if(this.global.data.length > 0) this.data = this.global.data;
  }

  addDetails(form: any) {
    let details = form.value;
    details['isEditing'] = false;
    this.data.push(details);
    this.saveDataGlobally();
    form.reset();
    if(this.isEditingOn) this.data.forEach(element => element.isEditing = false);
  }

  viewDetails(entry: Details) {
    console.log(entry);
  }

  editDetails(entry: Details) {
    this.isEditingOn = true;
    this.data.forEach(element => element.isEditing = false);
    entry.isEditing = true;
  }

  removeDetails(index: number) {
    if(confirm('Are you sure you want to delete this record')) {
      this.data.splice(index, 1);
      this.saveDataGlobally();
    }
  }

  saveDetails(entry: Details) {
    entry.isEditing = false;
    this.isEditingOn = false;
  }

  saveDataGlobally() {
    this.global.data = JSON.parse(JSON.stringify(this.data));
  }

}

interface Details {
  title: string;
  author: string;
  price: string;
  isEditing: boolean;
}
