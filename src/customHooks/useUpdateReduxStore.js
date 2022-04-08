const useUpdateReduxStore = (setLoad, dispatch, action, data, localStorageItem) => {
  setLoad(true);
  return new Promise((res) => {
    setTimeout(() => {
      dispatch(action(data));
      localStorage.setItem(localStorageItem, JSON.stringify(data));
      setLoad(false);
      res('ready');
    }, 1000);
  });
};

export default useUpdateReduxStore;
