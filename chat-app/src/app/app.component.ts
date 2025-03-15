import { Component, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from './models/message.model';
import { ChatState } from './state/chat.state';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, NgIf, NgFor, FormsModule],
})
export class AppComponent {
  private _message = signal(''); 

  get message() {
    return this._message();
  }

  set message(value: string) {
    this._message.set(value);
  }

  messages$: Observable<Message[]>;
  typingUsers$: Observable<string[]>;

  constructor(private readonly store: Store<{ chat: ChatState }>) {
    this.messages$ = this.store.pipe(select((state) => state.chat.messages));
    this.typingUsers$ = this.store.pipe(select((state) => state.chat.typingUsers));
  }

  sendMessage() {
    if (this.message.trim()) {
      const newMessage: Message = {
        user: 'User1', // You can replace this with dynamic username
        text: this.message,
        timestamp: Date.now(),
      };
      this.store.dispatch({ type: '[Chat] Add Message', message: newMessage });
      this.message = ''; // Reset input field
    }
  }
}
