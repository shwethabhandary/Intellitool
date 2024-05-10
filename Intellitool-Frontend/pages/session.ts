// session.ts

export const setSession = (isLoggedIn: boolean, username: string, role: string, uid: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('uid', uid);
  }
};

export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

export const getSession = (): { isLoggedIn: boolean; username: string; role: string; uid : string} => {
  let isLoggedIn = false;
  let username = '';
  let role = '';
  let uid ='';

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    username = localStorage.getItem('username') || '';
    role = localStorage.getItem('role') || '';
    uid= localStorage.getItem('uid') || '' ;
  }

  return { isLoggedIn, username, role , uid};
};
