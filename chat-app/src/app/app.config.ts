import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { chatReducer } from './state/chat.reducer'; // Import your reducer

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),  // Ensure your routes are provided
    provideStore({ chat: chatReducer }) // Register NgRx Store with your reducer
  ]
};
