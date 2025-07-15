/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_BREVO_API_KEY: string;
  // otras variables de entorno...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
