import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  selectedEntry: any = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      value = value.id;
      let selectedEntry = this.global.data.find(element => element.title === value);
      if(selectedEntry && selectedEntry.title) {
        this.selectedEntry = selectedEntry;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

}
