const getUser = async (email) => {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${email}`
  );
  const data = await response.json();
  return { status: response.status, data };
};

const createUser = async (email) => {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  ).catch((err) => {});
  const data = await response.json();
  return { status: response.status, data };
};

export { getUser, createUser };
