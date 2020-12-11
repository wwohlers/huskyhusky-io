import { AuthStorageCredentials } from "@/interfaces/auth-storage-credentials";

/**
 * This module stores and retrieves auth token credentials stored in the browser's LocalStorage.
 */
export default {
  /**
   * Sets the credentials.
   * @param creds
   */
  setCreds(creds: AuthStorageCredentials) {
    window.localStorage.setItem(process.env.VUE_APP_LOCALSTORAGE_KEY, JSON.stringify(creds));
  },

  /**
   * Clears creds.
   */
  removeCreds() {
    window.localStorage.clear();
  },

  /**
   * Gets whether there are credentials stored.
   */
  hasCreds(): boolean {
    return !!window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_KEY);
  },

  /**
   * Gets the user's creds.
   */
  getCreds(): AuthStorageCredentials {
    if (!this.hasCreds()) {
      throw new Error("No creds available");
    }
    const credsString = window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_KEY) as string;
    return JSON.parse(credsString);
  }
}
