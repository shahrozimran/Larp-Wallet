export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "admin" | null;
          is_license_active: boolean | null;
          license_key: string | null;
          plan_type: "none" | "starter" | "pro" | "lifetime" | null;
          active_wallet: "phantom" | "trust" | "ledger" | null;
          license_activated_at: string | null;
          license_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin" | null;
          is_license_active?: boolean | null;
          license_key?: string | null;
          plan_type?: "none" | "starter" | "pro" | "lifetime" | null;
          active_wallet?: "phantom" | "trust" | "ledger" | null;
          license_activated_at?: string | null;
          license_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin" | null;
          is_license_active?: boolean | null;
          license_key?: string | null;
          plan_type?: "none" | "starter" | "pro" | "lifetime" | null;
          active_wallet?: "phantom" | "trust" | "ledger" | null;
          license_activated_at?: string | null;
          license_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      licenses: {
        Row: {
          id: string;
          license_key: string;
          plan_name: string;
          plan_tier: "starter" | "pro" | "lifetime";
          duration_days: number | null;
          is_active: boolean | null;
          is_used: boolean | null;
          used_by_user_id: string | null;
          activated_at: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          license_key: string;
          plan_name: string;
          plan_tier: "starter" | "pro" | "lifetime";
          duration_days?: number | null;
          is_active?: boolean | null;
          is_used?: boolean | null;
          used_by_user_id?: string | null;
          activated_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          license_key?: string;
          plan_name?: string;
          plan_tier?: "starter" | "pro" | "lifetime";
          duration_days?: number | null;
          is_active?: boolean | null;
          is_used?: boolean | null;
          used_by_user_id?: string | null;
          activated_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      wallet_portfolios: {
        Row: {
          id: string;
          user_id: string;
          wallet_type: "phantom" | "trust" | "ledger";
          net_worth_usd: number | null;
          sol_balance: number | null;
          btc_balance: number | null;
          eth_balance: number | null;
          usdt_balance: number | null;
          custom_tokens: Json | null;
          wallet_address: string | null;
          wallet_handle: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wallet_type: "phantom" | "trust" | "ledger";
          net_worth_usd?: number | null;
          sol_balance?: number | null;
          btc_balance?: number | null;
          eth_balance?: number | null;
          usdt_balance?: number | null;
          custom_tokens?: Json | null;
          wallet_address?: string | null;
          wallet_handle?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wallet_type?: "phantom" | "trust" | "ledger";
          net_worth_usd?: number | null;
          sol_balance?: number | null;
          btc_balance?: number | null;
          eth_balance?: number | null;
          usdt_balance?: number | null;
          custom_tokens?: Json | null;
          wallet_address?: string | null;
          wallet_handle?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_transactions: {
        Row: {
          id: string;
          user_id: string;
          wallet_type: string;
          type: "send" | "receive" | "swap" | "deposit" | "reward";
          token_symbol: string;
          token_name: string | null;
          amount: number;
          amount_usd: number | null;
          recipient_or_sender: string | null;
          status: "pending" | "confirmed" | "failed" | null;
          tx_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wallet_type?: string;
          type: "send" | "receive" | "swap" | "deposit" | "reward";
          token_symbol: string;
          token_name?: string | null;
          amount: number;
          amount_usd?: number | null;
          recipient_or_sender?: string | null;
          status?: "pending" | "confirmed" | "failed" | null;
          tx_hash?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wallet_type?: string;
          type?: "send" | "receive" | "swap" | "deposit" | "reward";
          token_symbol?: string;
          token_name?: string | null;
          amount?: number;
          amount_usd?: number | null;
          recipient_or_sender?: string | null;
          status?: "pending" | "confirmed" | "failed" | null;
          tx_hash?: string | null;
          created_at?: string;
        };
      };
      crypto_orders: {
        Row: {
          id: string;
          user_id: string | null;
          plan_name: string;
          plan_tier: string;
          price_usd: number;
          crypto_symbol: string;
          crypto_amount: number;
          deposit_address: string;
          status: "pending" | "completed" | "expired" | null;
          generated_license_key: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          plan_name: string;
          plan_tier: string;
          price_usd: number;
          crypto_symbol: string;
          crypto_amount: number;
          deposit_address: string;
          status?: "pending" | "completed" | "expired" | null;
          generated_license_key?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          plan_name?: string;
          plan_tier?: string;
          price_usd?: number;
          crypto_symbol?: string;
          crypto_amount?: number;
          deposit_address?: string;
          status?: "pending" | "completed" | "expired" | null;
          generated_license_key?: string | null;
          created_at?: string;
        };
      };
    };
    Functions: {
      activate_user_license: {
        Args: {
          p_license_key: string;
          p_user_id: string;
        };
        Returns: {
          success: boolean;
          message: string;
          plan_type?: string;
          expires_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type License = Database["public"]["Tables"]["licenses"]["Row"];
export type WalletPortfolio = Database["public"]["Tables"]["wallet_portfolios"]["Row"];
export type UserTransaction = Database["public"]["Tables"]["user_transactions"]["Row"];
export type CryptoOrder = Database["public"]["Tables"]["crypto_orders"]["Row"];
