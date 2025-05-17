export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('role');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}