import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Observable, of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'my-son',
  template: `
    <form [formGroup]="form">
      <input type="text" formControlName="name" [value]="value.name">
      <input type="text" formControlName="surename" [value]="value.surename">
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SonComponent
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      multi: true,
      useExisting: SonComponent
    }
  ]
})
export class SonComponent implements ControlValueAccessor, OnInit, AsyncValidator {

  form: FormGroup;

  @Input() value: {name: string, surename: string};

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
  }

  writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.form.valid ? of(null) : of({controlsKo: 'Generic error'});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        surename: ['', [Validators.required, Validators.minLength(3)]],
      },
      {asyncValidators: this.asyncValidator}
    );
  }

private callService(): Observable<any> {
    return timer(1)
      .pipe(
        switchMap(() => {
          // Check if username is available
          console.log('SSSSSSSSSS');
          return this.http.get<any>('pippo')
        })
      );
}

private  asyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      return this.callService().pipe(
        map(() => {
          if (control) {
            return null;
          }
          return {error: 'error'}
        } 
        )
      )
    };
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  onTouched = (val: any) => {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

}


