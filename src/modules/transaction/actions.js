import * as constants from "./constants";

export const makeFormVisible = () => {
  return { type: constants.MAKE_FORM_VISIBLE };
};

export const makeFormInvisible = () => {
  return { type: constants.MAKE_FORM_INVISIBLE };
};
