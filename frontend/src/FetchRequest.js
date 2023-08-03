const hostname = "http://localhost:3001";

export async function GET(path) {
  console.log(hostname + path);
  const response = await fetch(hostname + path);
  return response;
}

export async function POST(path, body) {
  const requestBody = JSON.stringify(body);
  console.log(requestBody);

  const response = await fetch(hostname + path, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: requestBody,
  });

  return response;
}

export async function PUT(path, body) {
  console.log("put", body);
  const response = await fetch(hostname + path, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response;
}

export async function DELETE(path) {
  const response = await fetch(hostname + path, {
    method: "DELETE",
  });
  return await response;
}
