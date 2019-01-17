export const setLocalStore = (key, value) => {
  localStorage.setItem(key, value);
}

export const getLocalStore = (key) => {
  return localStorage.getItem( key );
}