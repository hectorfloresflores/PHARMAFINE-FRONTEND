export class User {
  isVerified: boolean;
  checkout: string[];
  name: string;
  email: string;
  password: string;
  lastname: string;
  genre: string;
  date: string;
  url: string;
  token: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
