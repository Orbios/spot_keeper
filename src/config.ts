const isDevLocal = import.meta.env.DEV;

const exports = {
  isDevLocal,
  baseUrl: isDevLocal ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD,
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_KEY || '',
    storageUrl: import.meta.env.VITE_SUPABASE_STORAGE_URL || ''
  }
};

export default exports;
