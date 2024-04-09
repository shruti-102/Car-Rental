import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser:User|null=null;
  userIsAdmin: boolean;

  private loggedInSource = new Subject<boolean>();
  LoggedIn$ = this.loggedInSource.asObservable();

  constructor() { }

  authUser(user:any){
    let UserArray=[];
    if(localStorage.getItem('Users')){
      UserArray=JSON.parse(localStorage.getItem('Users'));
    }
    const authUser= UserArray.find(p=>p.email==user.email && p.password==user.password)
    if(authUser){
      localStorage.setItem('token', JSON.stringify(authUser));
    this.loggedInUser = authUser;
    this.userIsAdmin = authUser.isAdmin;
    this.loggedInSource.next(true);
    return authUser;
    }
    this.loggedInSource.next(true);
    return null;
  }

  isLoggedIn():boolean{
    return localStorage.getItem('loggedIn') !==null;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}
