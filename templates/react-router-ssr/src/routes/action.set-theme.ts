import type {ActionFunction} from "react-router"

import {createThemeAction} from "@qualcomm-ui/react-router-utils/client"

import {qdsThemeCookie} from "../sessions.server"

export const action: ActionFunction = createThemeAction(qdsThemeCookie)
