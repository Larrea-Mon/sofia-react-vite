import config from "../config";
import { decodeToken } from "react-jwt";

const hasToken = () => {
  const token = localStorage.getItem('token');
  if (!config.isBackend && token) return true;
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = decodeToken(token);
  if (!data) return;
  return date < data.exp;
}

export default hasToken;
