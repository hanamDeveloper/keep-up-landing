export interface SignUpRequest {
    username: string;
    password: string;
    visaCode: string;
    birthdate: string;
    gender: string;
    countryCode: string;
    contact: string;
    introduce: string;
    languageCountryCode: string;
    promotion: boolean;
    push: boolean;
    email: string;
  }
  
  export interface BrokerSignUpRequest {
    username: string;
    password: string;
    countryCodeList: string[];
    introduce: string;
    languageCountryCode: string;
    promotion: boolean;
    push: boolean;
    
  }
  
  export interface SignUpResponse {
    result: boolean;
    code: number;
    data: string;
  }
  
  export interface SignInRequest {
    username: string;
    password: string;
    deviceToken: string;
  }
  
  export interface SignInResponse {
    data: string;
  }
  