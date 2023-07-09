export const getChats = async (id) => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings`);
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings`
  );
  const data = await response.json();
  console.log("here", data);
  return data;
};

export const generateQuestions = async (background) => {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/generate/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(background),
    }
  );
  console.log(response);
  const data = await response.json();
  return data;
};

export const getChat = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/meetings/${id}`
  );
  const data = await response.json();
  return data;
};

export const createChat = async (id, chat) => {
  console.log(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings/`,
    chat
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    }
  );
  const data = await response.json();
  return data;
};

export const updateChat = async (id, chat) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/meetings/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chat),
  });
};
