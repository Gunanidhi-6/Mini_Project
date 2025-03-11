import { createReducer, on } from '@ngrx/store';
import { Message } from '../models/message.model';
import * as ChatActions from './chat.actions';

export interface ChatState {
  messages: Message[];
  typingUsers: { [userId: string]: boolean };  // Track typing users
}

const initialState: ChatState = {
  messages: [],
  typingUsers: {}
};

export const chatReducer = createReducer(
  initialState,
  on(ChatActions.addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message]
  })),
  on(ChatActions.setTypingStatus, (state, { userId, isTyping }) => ({
    ...state,
    typingUsers: { ...state.typingUsers, [userId]: isTyping }  // Update typing status per user
  }))
);
