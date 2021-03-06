export const saveLogin = state => {
  try {
    const serializedstate = JSON.stringify({ authentication: state });
    localStorage.setItem("authentication", serializedstate);
  } catch (err) {
    return err;
  }
};

export const saveTeams = state => {
  try {
    const serializedstate = JSON.stringify({ teams: state });
    localStorage.setItem("teams", serializedstate);
  } catch (err) {
    return err;
  }
};

export const loadLogin = () => {
  try {
    const serializedState = localStorage.getItem("authentication");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const loadTeams = () => {
  try {
    const serializedState = localStorage.getItem("teams");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const removeLogin = () => {
  try {
    localStorage.removeItem("authentication");
  } catch (err) {
    return undefined;
  }
};

export const removeTeams = () => {
  try {
    localStorage.removeItem("teams");
  } catch (err) {
    return undefined;
  }
};
