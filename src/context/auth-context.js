import React from "react";

const authContext = React.createContext({
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),

  login: (token, userId, tokenExpiration) => {},
  logout: () => {}
});

export const UserProvider = authContext.Provider;
export const UserConsumer = authContext.Consumer;
export default authContext;
