export interface UserSession {
  email: string;
  isLoggedIn: boolean;
  licenseKey: string | null;
  isLicenseActive: boolean;
  activeWallet: "phantom" | "trust" | "ledger";
}

const STORAGE_KEY = "larp_wallet_auth_session";

export const getAuthSession = (): UserSession => {
  if (typeof window === "undefined") {
    return {
      email: "demo@larpzwallet.app",
      isLoggedIn: false,
      licenseKey: null,
      isLicenseActive: false,
      activeWallet: "phantom",
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      email: "demo@larpzwallet.app",
      isLoggedIn: false,
      licenseKey: null,
      isLicenseActive: false,
      activeWallet: "phantom",
    };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {
      email: "demo@larpzwallet.app",
      isLoggedIn: false,
      licenseKey: null,
      isLicenseActive: false,
      activeWallet: "phantom",
    };
  }
};

export const setAuthSession = (session: Partial<UserSession>): UserSession => {
  const current = getAuthSession();
  const updated = { ...current, ...session };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
};

export const loginUser = (email = "demo@larpzwallet.app"): UserSession => {
  return setAuthSession({
    email,
    isLoggedIn: true,
  });
};

export const logoutUser = (): UserSession => {
  const reset = {
    email: "demo@larpzwallet.app",
    isLoggedIn: false,
    licenseKey: null,
    isLicenseActive: false,
    activeWallet: "phantom" as const,
  };
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return reset;
};

export const activateLicenseKey = (key: string): UserSession => {
  return setAuthSession({
    licenseKey: key || "LRP-9814-DEMO-2026",
    isLicenseActive: true,
  });
};

export const setActiveWalletType = (wallet: "phantom" | "trust" | "ledger"): UserSession => {
  return setAuthSession({
    activeWallet: wallet,
  });
};
