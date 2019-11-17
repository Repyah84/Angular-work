
export class User {
  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
    // tslint:disable-next-line:variable-name
    private _tokenExpirationData: Date
  ) {}

  get token() {
    if (!this._tokenExpirationData || new Date() > this._tokenExpirationData) {
        return null;
    }
    return this._token;
  }

 }
