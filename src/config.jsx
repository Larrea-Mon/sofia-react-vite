const hostApi = process.env.NODE_ENV === "development"
  ? "http://localhost"
  : "https://sing-generator-node.herokuapp.com";

const portApi = process.env.NODE_ENV === "development"
  ? 8080
  : "";

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/sofia-react"
  : "https://demo.flatlogic.com/sofia-react";


const config = {
  redirectUrl,
  hostApi,
  portApi,
  baseURLApi,
  remote: "https://sing-generator-node.herokuapp.com",
  isBackend: import.meta.env.VITE_BACKEND,
  auth: {
    email: 'admin@flatlogic.com',
    password: 'password'
  },
};

export default config;
