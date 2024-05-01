// session.ts
export const setSession = (isLoggedIn: boolean, username: string, role: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
  }
};

export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

export const getSession = (): { isLoggedIn: boolean; username: string; role: string } => {
  let isLoggedIn = false;
  let username = '';
  let role = '';

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    username = localStorage.getItem('username') || '';
    role = localStorage.getItem('role') || '';
  }

  return { isLoggedIn, username, role };
};
