import CryptoJS from 'crypto-js';
import { http } from '@/lib/http';

// Cached encryption key - fetched from server on first use
let cachedKey: string | null = null;

// Fallback key for backwards compatibility during migration
const FALLBACK_KEY = 'nanokvm-sipeed-2024';

async function getEncryptionKey(): Promise<string> {
  if (cachedKey) {
    return cachedKey;
  }

  try {
    const response: any = await http.get('/api/auth/encryption-key');
    if (response.code === 0 && response.data?.key) {
      cachedKey = response.data.key as string;
      return cachedKey;
    }
  } catch (error) {
    console.warn('Failed to fetch encryption key, using fallback');
  }

  // Fallback for older servers that don't have the endpoint
  cachedKey = FALLBACK_KEY;
  return cachedKey;
}

export async function encrypt(data: string): Promise<string> {
  const key = await getEncryptionKey();
  const dataEncrypt = CryptoJS.AES.encrypt(data, key).toString();
  return encodeURIComponent(dataEncrypt);
}

// Pre-fetch the key on module load for better UX
getEncryptionKey().catch(() => {});
