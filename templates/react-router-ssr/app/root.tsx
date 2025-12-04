import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import {
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router"
import {
  isTheme,
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
} from "@qualcomm-ui/react-router-utils/client"

import type {Route} from "./+types/root"
import "./app.css"

export const links: Route.LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]


import {qdsThemeCookie} from "./sessions.server"

interface RootLoaderData {
  qdsTheme: Theme
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<RootLoaderData> {
  const cookie = request.headers.get("cookie")

  const qdsTheme = await qdsThemeCookie.parse(cookie)

  return {
    qdsTheme: isTheme(qdsTheme) ? qdsTheme : Theme.DARK,
  }
}

export default function App() {
  const {qdsTheme} = useLoaderData<RootLoaderData>()

  return (
    <ThemeProvider theme={qdsTheme} themeAction="/action/set-theme">
      <html
        data-brand="qualcomm"
        data-theme={qdsTheme}
        lang="en"
        style={{colorScheme: qdsTheme || "dark"}}
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,400..600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400..500&display=swap"
            rel="stylesheet"
          />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(qdsTheme)} />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  )
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
