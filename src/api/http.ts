import { RequestType } from "@/api/request-type.enum";
import { ApiResponse } from "@/interfaces/api-response";
import auth from "@/auth/auth";

import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_DEV_API
    : process.env.VUE_APP_PROD_API;
const http = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

/**
 * Make a request to the API. This method should not be used directly by the app; it is used as
 * a helper for the API layer.
 * @param type HTTP method to use
 * @param url url to request to
 * @param body body (if any)
 */
export default async function request(
  type: RequestType,
  url: string,
  body: any = {}
): Promise<ApiResponse<any>> {
  let req;
  let config = {};
  if (auth.hasCreds()) {
    config = {
      headers: { Authorization: `Bearer ${auth.getCreds().token}` }
    };
  }
  switch (type) {
    case RequestType.GET:
      req = http.get(url, config);
      break;
    case RequestType.POST:
      req = http.post(url, body, config);
      break;
    case RequestType.PATCH:
      req = http.patch(url, body, config);
      break;
    case RequestType.PUT:
      req = http.put(url, body, config);
      break;
    case RequestType.DELETE:
      req = http.delete(url, config);
      break;
    default:
      throw new Error("Invalid request type");
  }
  try {
    const res = await req;
    if (res.status > 299) {
      throw new Error(res.status.toString());
    }
    return {
      OK: true,
      data: res.data,
      error: null
    };
  } catch (e) {
    let error;
    if (e.response) {
      error = e.response.status;
    } else if (Number.isInteger(e)) {
      error = Number.parseInt(e);
    } else error = 500;
    return {
      OK: false,
      data: null,
      error
    };
  }
}
