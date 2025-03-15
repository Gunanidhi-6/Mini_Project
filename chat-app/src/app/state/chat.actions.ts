import { createAction, props } from '@ngrx/store';
import { Message } from '../models/message.model';


export const addMessage = createAction(
  '[Chat] Add Message',
  props<{ message: Message }>()
);


export const setTypingStatus = createAction(
  '[Chat] Set Typing Status',
  props<{ userId: string; username: string; isTyping: boolean }>() 
);
