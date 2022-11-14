import { Role } from './Role';


export class UserSystem {

  createBy: string;
  createdAt: string;
  deleteBy: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  tel: string;
  profession: string;
  roles: Array<Role>;
  status: boolean;
  updatedAt: string;
  username: string;
  password: string;

  accountStatus: boolean;
  firstLogin: boolean;


  constructor(email: string, firstName: string, lastName: string, roles: Array<Role>, username: string, password: string, firstLogin: boolean) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roles = roles;
    this.username = username;
    this.password = password;
    this.firstLogin = firstLogin;
  }
}
