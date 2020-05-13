import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  currUser;

  user: String;
  room: String = "";
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];
  userArray: String[] = ["User1", "User2", "User3", "PepeChuy"]; //idealmente lo obtiene de base de datos
  //urerArr = this.

  constructor(private _chatService: ChatService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
    console.log(this.messageArray);

    this._chatService.newUserCreated()
      .subscribe(data => this.userArray.push(data.user));
    console.log(this.userArray);
  }

  join() {
    this.room = "Admin-"+this.user;
    this._chatService.joinRoom({ user: this.user, room: this.room });
    this._chatService.sendUser({ user: this.user });
    //this.userArray.push(this.user)
    //console.log(this.userArray);
    console.log("user: " + this.user + " joined: " + this.room);
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    this.messageText = "";
  }

  ngOnInit(): void {
    if (localStorage.user != 'undefined' && localStorage.user != undefined)
    this.currUser = JSON.parse(localStorage.user); //para obter user local

    this.userArray.push(this.currUser.email);

    console.log("Msgs:" + this.messageArray); //debugging
  }

  onKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

}


