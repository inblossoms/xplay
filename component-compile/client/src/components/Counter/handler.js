import { count } from "./states";

export const addBtnEv = () => {
  count.value += 1;
};

export const logBtnEv = () => {
  console.log(count.value);
};
