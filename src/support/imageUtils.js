export const imageExists = (imageURL, callBack) => {
  let imageData = new Image();
  imageData.onload = function() {
    callBack(true);
  };
  imageData.onerror = function() {
    callBack(false);
  };
  imageData.src = imageURL;
};
