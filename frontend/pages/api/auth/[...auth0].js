import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import { getUser, createUser } from "../user";
import Router from "next/router";

const afterCallback = async (req, res, session, state) => {
  console.log("Hello!", session);
  if (session.user) {
    // const user = await getUser(session.user.email).catch(async (err) => {
    console.log("created user!", session.user);
    createUser(session.user.email);
    // await createUser(session.user.email);
    // });
    // Router.replace("/");
  }
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res);
      console.log("World!");
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
