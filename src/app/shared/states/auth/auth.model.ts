export interface AuthStateModel {
    isAuthenticated: boolean;
    token: string | null;
    connectedUser : any;
    connectedOperator : any

  }