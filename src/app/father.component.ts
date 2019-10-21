import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'my-father',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="textField"> <br>
      FORM FATHER VALID : {{ form.valid }}<br>

      <my-son type="text" formControlName="sonField" 
      [value]="{name: 'NOME', surename:'COGNOME'}" > <br>
      </my-son>
      SON VALID : {{ form.controls.sonField.valid }} <br>

    </form>
  `
})
export class FatherComponent implements OnInit {

  form: FormGroup;

  @Input() value: string;

  constructor(public formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
        textField: ['', [Validators.required, Validators.minLength(3)]],
        sonField: [{}],
      }
    );

  }



}
