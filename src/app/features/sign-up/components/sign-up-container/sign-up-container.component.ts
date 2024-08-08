import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { A11yFooterComponent } from '../../../../shared/components/a11y-footer/a11y-footer.component';
import { SignUpService } from '../../services/sign-up.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfig, FormLang } from '../../../../core/models/models';
import { LoadingSpinnerDirective } from '../../../../shared/directives/loading.directive';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-container',
  standalone: true,
  imports: [
    CommonModule, 
    NgIf, 
    A11yFooterComponent, 
    LoadingSpinnerDirective,
    ReactiveFormsModule
  ],

  templateUrl: './sign-up-container.component.html',
  styleUrl: './sign-up-container.component.scss'
})
export class SignUpContainerComponent implements OnInit {
  // loading= true;
  title = `سامانه احراز هویت`;
  signupService = inject(SignUpService);
  formConfig$ = computed(() => this.signupService.formConfig());
  signUpForm$ = computed(() => this.signupService.form$());
  formLang: FormLang = 'fa';
  showPassword:boolean = false;
  showPasswordConfirm:boolean = false;
  tooltipVisible:boolean[] = [];
  passwordShow = {
    newPassword: false,
    newPasswordConfirm: false,
  }
  constructor(
    private titleService: Title,
    ){
      effect(()=>{
        if(this.formConfig$() && this.signUpForm$()){
          this.tooltipVisible = new Array(this.formConfig$()?.form.fields.length).fill(false);
          // this.loading = false;
        }
      })
    }
    
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.signupService.getSignUpFormConfig(this.formLang);
  }

  onSubmit(){

  }

  showDescription(index:number){
    for(let i = 0; i<this.tooltipVisible.length ; i++){
      this.tooltipVisible[i] = i === index ? !this.tooltipVisible[i] : false;
    }
  }

  togglePasswordShow(name:string){
    let inputEl = document.getElementById(name);
    if(name === 'newPassword'){
      this.passwordShow.newPassword = !this.passwordShow.newPassword;
      inputEl?.setAttribute('type', this.passwordShow.newPassword? 'text' : 'password')
    }else{
      this.passwordShow.newPasswordConfirm = !this.passwordShow.newPasswordConfirm;
      inputEl?.setAttribute('type', this.passwordShow.newPasswordConfirm? 'text' : 'password')
    }
  }

  
}
