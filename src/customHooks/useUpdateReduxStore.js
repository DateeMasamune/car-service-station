const useUpdateReduxStore = (setLoad, dispatch, action, data) => {
  setLoad(true);
  return new Promise((res) => {
    setTimeout(() => {
      dispatch(action(data));
      setLoad(false);
      res('ready');
    }, 1000);
  });
};

export default useUpdateReduxStore;
