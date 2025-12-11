import {createCookie} from "react-router"

export const qdsThemeCookie = createCookie("app-qds-theme", {
  // one year
  maxAge: 31536000,
})
