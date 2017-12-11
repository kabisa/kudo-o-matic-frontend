export const saveLogin = state => {
  try {
    const serializedstate = JSON.stringify({ authentication: state });
    localStorage.setItem("authentication", serializedstate);
  } catch (err) {
    //Nothing should happen.
  }
};

export const loadLogin = () => {
  try {
    const serializedState = localStorage.getItem("authentication");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
