import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { chatReducer } from './app/state/chat.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ chat: chatReducer }) 
  ]
}).catch(err => console.error(err));
