import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'victor-d505e',
        appId: '1:650714971652:web:d3d3ec2a3e333cd6eb3f51',
        storageBucket: 'victor-d505e.appspot.com',
        apiKey: 'AIzaSyAcXMKF0e6CjUEuICUmyqxINexzTk2Xrbk',
        authDomain: 'victor-d505e.firebaseapp.com',
        messagingSenderId: '650714971652',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
