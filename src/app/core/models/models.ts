export type FormLang = 'fa' | 'en';
export type FieldType = 'TEXT' | 'NEW_PASSWORD' | 'CAPTCHA'
export type FieldUnion = TextField | NewPasswordField | CaptchaField;
export interface FieldBase {
    '@type': string;
    name: string;
    title: string;
    description: string;
    errorMessage: string;
    required: boolean;
    type: FieldType; // Can be used to determine field type
  }
  
  export interface TextField extends FieldBase {
    minLength: number;
    maxLength: number;
    regex: string;
  }
  
  export interface NewPasswordField extends FieldBase {
    maxLength: number;
    regex: string;
    showConfirmPassword: boolean;
  }
  
  export interface CaptchaField extends FieldBase {
    length: number;
    resendAction: string;
    resendIntervalSeconds: number;
    number: boolean;
  }
  
  export interface FormFields {
    name: string;
    title: string;
    submitLabel: string;
    nestedFormShowType: string;
    fieldDescriptionShowType: string;
    fields: (TextField | NewPasswordField | CaptchaField)[];
    forms: unknown[]; // For nested forms, if any
  }

  export interface FormConfig {
    form: FormFields,
    steps: number,
    current: number,
    fieldErrors : string,
    errors: string[]
  }
