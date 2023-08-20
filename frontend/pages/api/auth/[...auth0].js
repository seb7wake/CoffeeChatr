import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: "/home",
      });
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
        returnTo: "/home",
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        redirectTo: "/home",
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
