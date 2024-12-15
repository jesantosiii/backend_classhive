type Tokens = {
  refresh: string;
  access: string;
};

type User = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender: string;
  id: number;
  role: string;
  username: string;
};

const config = {
  TOKEN_STORAGE_KEY: 'authTokens',
  USER_STORAGE_KEY: 'authUser',
  DEFAULT_TOKENS: null as Tokens | null,
  DEFAULT_USER: null as User | null,
};

// Functions for Tokens
export const getTokens = (): Tokens | null => {
  const tokens: Tokens | null = JSON.parse(
    localStorage.getItem(config.TOKEN_STORAGE_KEY) || 'null'
  );
  return tokens || config.DEFAULT_TOKENS;
};

export const setTokens = (tokens: Tokens): void => {
  localStorage.setItem(config.TOKEN_STORAGE_KEY, JSON.stringify(tokens));
};

export const clearTokens = (): void => {
  localStorage.removeItem(config.TOKEN_STORAGE_KEY);
};

// Functions for User
export const getUser = (): User | null => {
  const user: User | null = JSON.parse(
    localStorage.getItem(config.USER_STORAGE_KEY) || 'null'
  );
  return user || config.DEFAULT_USER;
};

export const setUser = (user: User): void => {
  localStorage.setItem(config.USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearUser = (): void => {
  localStorage.removeItem(config.USER_STORAGE_KEY);
};

// Combined Clear Function
export const clearAuthData = (): void => {
  clearTokens();
  clearUser();
};
