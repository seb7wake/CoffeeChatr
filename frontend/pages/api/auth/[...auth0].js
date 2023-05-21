import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import { getUser, createUser } from "../user";

const afterCallback = async (req, res, session, state) => {
  if (session.user) {
    const user = await getUser(session.user.email).catch(async (err) => {
      console.log("creating user");
      // await createUser(session.user.email);
    });
  } else {
    res.status(401).end("User does not exist");
  }
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async signup(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        redirectTo: "/",
        // afterCallback,
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
