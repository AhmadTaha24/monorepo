// auth.model.ts
export interface AuthState {
    user: User | null; 
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  