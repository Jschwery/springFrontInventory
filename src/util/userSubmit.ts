import { request } from "./axiosHelper";
export type Request = {
  urlEndpoint: string;
  requestType: "GET" | "POST" | "DELETE" | "PUT";
  header?: {};
  body?: {};
  params?: {};
};

export const userSubmit = ({
  urlEndpoint,
  requestType,
  body,
  header,
  params,
}: Request) => {
  request(requestType, urlEndpoint, body, header, params);
};

// export const validation = () => {
//   for (const key of Object.keys(inputValues)) {
//     validateInput(key, inputValues[key].value);
//   }
// };
