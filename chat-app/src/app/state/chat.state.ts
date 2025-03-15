import { createReducer, on } from '@ngrx/store';
import { Message } from '../models/message.model';
import * as ChatActions from '../state/chat.actions';

export interface ChatState {
  messages: Message[];
  typingUsers: string[];
}

export const initialState: ChatState = {
  messages: [],
  typingUsers: [],
};

export const chatReducer = createReducer(
  initialState,
  on(ChatActions.addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(ChatActions.setTypingStatus, (state, { username, isTyping }) => ({
    ...state,
    typingUsers: isTyping
      ? [...state.typingUsers, username]
      : state.typingUsers.filter(user => user !== username),
  }))
);
