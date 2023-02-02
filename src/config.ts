const isDevLocal = process.env.NODE_ENV !== 'production';

const exports = {
  isDevLocal,
  supabase: {
    url: process.env.REACT_APP_SUPABASE_URL || '',
    key: process.env.REACT_APP_SUPABASE_KEY || '',
    storageUrl: process.env.REACT_APP_SUPABASE_STORAGE_URL || ''
  }
};

export default exports;
