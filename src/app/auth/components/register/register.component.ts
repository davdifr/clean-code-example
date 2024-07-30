import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'cce-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BackendErrorMessagesComponent],
})
export class RegisterComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  form = this.#fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmiting: this.#store.select(selectIsSubmitting),
    backendErrors: this.#store.select(selectValidationErrors),
  });

  constructor() {}

  onSubmit() {
    console.log(this.form.getRawValue());

    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.#store.dispatch(authActions.register({ request }));
  }
}
