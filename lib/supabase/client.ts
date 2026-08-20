import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

const DEFAULT_SUPABASE_URL = "https://uoqdywagkslbljowcklv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcWR5d2Fna3NsYmxqb3dja2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNDc5NTMsImV4cCI6MjEwMjgyMzk1M30.7A2FF3glpw0vvegvl_nxfwAIMATnAAelULmrttvMYx0";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient<Database>(url, key);
}
