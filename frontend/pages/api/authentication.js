export const login = async (data) => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/`);
  let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status == 200) {
    return response;
  } else if (response.status == 401) {
    return { email: "Invalid credentials" };
  } else {
    return { error: "Something went wrong" };
  }
};

export const signup = async (data) => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup/`);
  let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status == 201) {
    return response;
  } else if (response.status == 409) {
    return { error: "A user with this email already exists. Please log in." };
  } else {
    return { error: "Something went wrong" };
  }
};

export const logout = async () => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout/`);
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout/`);
};
