/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const firebaseConfig = {
  apiKey: 'AIzaSyBBnwSANr0-OoIPQAptg-D9Qrn2GnWi93o',
  authDomain: 'microemprende.firebaseapp.com',
  projectId: 'microemprende',
  storageBucket: 'microemprende.appspot.com',
  messagingSenderId: '458604439846',
  appId: '1:458604439846:web:a84b905f5e92fee12a39e7',
  measurementId: 'G-T2829EC7C5',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
