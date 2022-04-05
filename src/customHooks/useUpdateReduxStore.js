const useUpdateReduxStore = (setLoad, dispatch, action, data) => {
  setLoad(true);
  setTimeout(() => {
    dispatch(action(data));
    setLoad(false);
  }, 3000);
};

export default useUpdateReduxStore;
