import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { CaptchaField, FieldUnion, FormConfig, FormFields, FormLang, NewPasswordField, TextField } from '../../../core/models/models';
import { Subscription, catchError, map, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private baseURL = '/api/app/sign-up';;
  private formConfig$ = signal<FormConfig | undefined>(undefined);
  formConfig = computed(() => this.formConfig$())
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({});
  form$ = computed(() => this.createForm(this.formConfig$()))
  private subscription: Subscription | null = null;
  private formLang:string ='fa';
  constructor(private http : HttpClient) {}

  getSignUpFormConfig(lang: FormLang){
    this.formLang = lang;
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.subscription = this.http.get<FormConfig>(`${this.baseURL}`, {
      headers:{
        'Accept-Language': lang,
        'Content-Type': 'application/json',
      }
    }).pipe(
      map((val:FormConfig) => val),
      catchError((error) => {
        return throwError(() => new Error(error))})
    ).subscribe({
      next: config => {
        this.formConfig$.set(config);
      },
      error: error => {

      }
    });
    
  }

  getFormConfig(){
    return this.formConfig$;
  }

  createForm(config: FormConfig | undefined) {
    const group: any = {};
    const fields: (TextField | NewPasswordField | CaptchaField)[] = config?.form.fields ?? [];
    if(config !== undefined && config?.form?.fields!==undefined){
      for (const field of fields) {
        const control = this.fb.control(null, this.getValidators(field));
        this.form.addControl(field.name, control);
        if(field.type === 'NEW_PASSWORD' && Object.hasOwn(field , 'showConfirmPassword')){
          const formConfigCopy = {...this.formConfig$()} as FormConfig;
          if(formConfigCopy && formConfigCopy.form){
            let passwordFieldIndex = fields.findIndex((f) => f.type === 'NEW_PASSWORD');
            let passwordConfirmField = {...fields[passwordFieldIndex], name:`${fields[passwordFieldIndex].name}Confirm`, title:this.formLang === 'fa' ? 'تکرار رمز عبور' : 'Confirm New Password'} 
            formConfigCopy.form.fields = [...fields.slice(0 , passwordFieldIndex), passwordConfirmField , ...fields.slice(passwordFieldIndex)]
            // this.formConfig$.set(formConfigCopy) ;
            const control = this.fb.control(null, this.getValidators(field));
            this.form.addControl(`${field.name}Confirm`, control);
          }
        }
      }
    }
    return this.form;
  }

  getValidators(field: FieldUnion) {
    let validators = [];
  
    if (field.required) {
      validators.push(Validators.required);
    }
  
    if (this.isTextField(field)) {
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }
      if (field.regex) {
        validators.push(Validators.pattern(field.regex));
      }
    } else if (this.isNewPasswordField(field)) {
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      if (field.regex) {
        validators.push(Validators.pattern(field.regex));
      }
    } else if (this.isCaptchaField(field)) {
      if (field.length) {
        validators.push(Validators.minLength(field.length));
        validators.push(Validators.maxLength(field.length));
      }
    }
  
    return validators;
  }
  
  isTextField(field: FieldUnion): field is TextField {
    return field.type === 'TEXT';
  }
  
  isNewPasswordField(field: FieldUnion): field is NewPasswordField {
    return field.type === 'NEW_PASSWORD';
  }
  
  isCaptchaField(field: FieldUnion): field is CaptchaField {
    return field.type === 'CAPTCHA';
  }

  submitForm(){

  }
}
