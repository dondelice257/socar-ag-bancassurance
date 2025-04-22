import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bancassurance.app',
  appName: 'Ucar vie Bancassurance',
  webDir: 'dist/serenity-agent/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
