const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value as string;
};

export const API_BASE_URL = getEnvVar('VITE_ALPHA_VANTAGE_BASE_URL');
export const API_KEY      = getEnvVar('VITE_ALPHA_VANTAGE_API_KEY');
