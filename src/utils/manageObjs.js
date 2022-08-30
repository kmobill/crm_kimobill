export const isObjEmpty = (obj) => {
  //return obj && Object.keys(obj).length === 0 && obj.constructor === Object;//if obj is empty return true
  return Object.keys(obj).length === 0; //asuming is an obj -> check if it is empty
};
