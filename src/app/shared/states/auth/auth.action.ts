export class SetAuthenticated {
    static readonly type = '[Auth] Set Authenticated';
    constructor(public isAuthenticated: boolean, public token: string | null = null, public connectedUser :any, public connectedOperator :any ) {}
  }




