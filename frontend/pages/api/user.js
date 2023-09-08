const getUser = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${email}`
  );
  const data = response.status === 200 ? await response.json() : "";
  return { status: response.status, data };
};

const createUser = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const data = response.status === 201 ? await response.json() : "";
  return { status: response.status, data };
};

export { getUser, createUser };
