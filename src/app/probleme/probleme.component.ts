import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm!: FormGroup;
  
  constructor(private FormGroup: FormBuilder){

  }

  ngOnInit() {
    this.problemeForm = this.FormGroup.group({
        prenom: ['',[Validators.minLength(3), Validators.required]]
    });
  }
}
