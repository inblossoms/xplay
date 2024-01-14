import { axios } from "@/libs";
import { IUID } from "@/typings";
import qs from "qs";

async function getUserRouteList(url: string, data: IUID) {
  try {
    const response = await axios.post(url, qs.stringify(data));
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
export { getUserRouteList };
