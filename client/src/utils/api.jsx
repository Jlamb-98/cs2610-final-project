import cookie from "cookie";

class Api {
  async makeRequest(url, method, body) {
    const { csrftoken } = cookie.parse(document.cookie);
    const options = {
      method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrftoken,
      },
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    const res = await fetch(url, options);
    return res.json();
  }

  async uploadFile(url, name, file) {
    const { csrftoken } = cookie.parse(document.cookie);
    const formData = new FormData();
    formData.append(name, file);
    formData.append("csrfmiddlewaretoken", csrftoken);
    const res = await fetch(url, {
      method: "post",
      credentials: "include",
      body: formData
    });
    return res.json();
  }

  get(url) {
    return this.makeRequest(url, "get");
  }

  post(url, body={}) {
    return this.makeRequest(url, "post", body);
  }

  put(url, body={}) {
    return this.makeRequest(url, "put", body);
  }

  del(url) {
    return this.makeRequest(url, "delete");
  }
}

const api = new Api();

export const useApi = () => {
  return api;
}