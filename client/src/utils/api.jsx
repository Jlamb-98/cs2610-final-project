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

  async makeMultipartRequest(url, method, body) {
    const { csrftoken } = cookie.parse(document.cookie);
    const formData = new FormData();

    for (const key in body) {
      if (key !== "file") {
        formData.append(key, body[key]);
      }
    }

    formData.append("my_file", body.file);
    formData.append("csrfmiddlewaretoken", csrftoken);

    const res = await fetch(url, {
      method: method,
      credentials: "include",
      body: formData
    });

    return res.json();
  }

  get(url, multipart=false) {
    return multipart ? this.makeMultipartRequest(url, "get") : this.makeRequest(url, "get");
  }

  post(url, body={}, multipart=false) {
    return multipart ? this.makeMultipartRequest(url, "post", body) : this.makeRequest(url, "post", body);
  }

  put(url, body={}, multipart=false) {
    return multipart ? this.makeMultipartRequest(url, "put", body) :  this.makeRequest(url, "put", body);
  }

  del(url, multipart=false) {
    return multipart ? this.makeMultipartRequest(url, "delete") :  this.makeRequest(url, "delete");
  }
}

const api = new Api();

export const useApi = () => {
  return api;
}