import axios from "axios";
import ShoutOut from "../models/ShoutOut";

const baseUrl = process.env.REACT_APP_API_URL || "";

export const getAllShoutOuts = (): Promise<ShoutOut[]> => {
  return axios.get(`${baseUrl}`).then((res) => res.data);
};

export const postNewShoutOut = (shoutOutBody: ShoutOut): Promise<ShoutOut> => {
  return axios.post(`${baseUrl}`, shoutOutBody).then((res) => res.data);
};
