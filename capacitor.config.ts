import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.microemprende.MEapp',
  appName: 'MicroemprendeApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
