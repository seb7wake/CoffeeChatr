export const getChats = async (id) => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings`);
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/meetings`
  );
  const data = await response.json();
  return data;
};

export const generateQuestions = async (profile_url) => {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/generate/${profile_url}`
  );
  const data = await response.json();
  return data;
};

export const createChat = async (id, chat) => {
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
