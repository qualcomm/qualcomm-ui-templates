import {
  Link,
  Outlet,
  useLocation,
} from "react-router"
import {HeaderBar} from "@qualcomm-ui/react/header-bar"
import {Icon} from "@qualcomm-ui/react/icon"
import {
  Bell,
  Layers2,
  LayoutDashboard,
  MoonIcon,
  SunIcon,
} from "lucide-react"
import {Avatar} from "@qualcomm-ui/react/avatar"
import type {ReactNode} from "react"
import {
  Theme,
  useTheme,
} from "@qualcomm-ui/react-router-utils/client"

function ThemeToggle(): ReactNode {
  const [theme, setTheme] = useTheme()
  
  const handleThemeSwitch = () => {
    const nextTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(nextTheme)
  }

  return (
    <HeaderBar.ActionIconButton
      aria-label="Toggle Theme"
      icon={theme === Theme.LIGHT ? SunIcon : MoonIcon}
      onClick={handleThemeSwitch}
    />
  )
}

export default function Layout() {
  const pathname = useLocation().pathname

  return (
    <div className="flex h-screen flex-col">
      <HeaderBar.Root className="@container shrink-0">
        <HeaderBar.Logo render={<Link to="/" />}>
          <div className="bg-category-1-subtle rounded-sm p-0.5">
            <Icon icon={Layers2} size="lg" />
          </div>
          <HeaderBar.AppTitle>Qualcomm App</HeaderBar.AppTitle>
        </HeaderBar.Logo>

        <HeaderBar.Divider />

        <HeaderBar.Nav className="hidden @min-[580px]:flex">
          <HeaderBar.NavItem active={pathname === '/'} render={<Link to="/" />}>
            Introduction
          </HeaderBar.NavItem>
        </HeaderBar.Nav>

        <HeaderBar.ActionBar className="hidden @min-[285px]:flex">
          <ThemeToggle />

          <HeaderBar.Divider className="hidden @min-[375px]:block" />

          <Avatar.Root
            className="hidden @min-[375px]:flex"
            size="xs"
            variant="contrast"
          >
            <Avatar.Content>JD</Avatar.Content>
          </Avatar.Root>
        </HeaderBar.ActionBar>
      </HeaderBar.Root>

      <div className="flex min-h-0 flex-1">
        <main className="bg-background-neutral-01 flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}