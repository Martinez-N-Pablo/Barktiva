import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.barktiva.app',
  appName: 'Barktiva',
  webDir: 'www/browser',
  server: {
    cleartext: true,
    allowNavigation: [
      "https://barktiva-backend-production.up.railway.app/api",
    ]
  },
   plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
