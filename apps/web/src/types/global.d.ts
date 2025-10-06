/**
 * Global type declarations for the web application
 */

// Electron API exposed via preload script
interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  platform: string;
}

// Extend the global Window interface
declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

// This file needs to be a module to work with declare global
export {};