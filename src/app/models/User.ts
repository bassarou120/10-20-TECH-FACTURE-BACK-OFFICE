import { Role } from './Role';


export class User {

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

  accountStatus: boolean;
  firstLogin: boolean;



  
  constructor(
    createBy: string, createdAt: string, deleteBy: string, email: string,
    firstName: string, id: number, lastName: string, tel: string, profession: string,
    roles: Array<Role>, status: boolean, updatedAt: string,
    username: string, accountStatus: boolean
  ) {
    this.createBy = createBy;
    this.createdAt = createdAt;
    this.deleteBy = deleteBy;
    this.email = email;
    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName;
    this.tel = tel;
    this.profession = profession;
    this.roles = roles;
    this.status = status;
    this.updatedAt = updatedAt;
    this.username = username;

    this.accountStatus = accountStatus;
  }

}
