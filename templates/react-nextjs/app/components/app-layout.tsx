"use client"

import type {ReactNode} from "react"

import {Layers2, MoonIcon, SunIcon} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"

import {Avatar} from "@qualcomm-ui/react/avatar"
import {HeaderBar} from "@qualcomm-ui/react/header-bar"
import {Icon} from "@qualcomm-ui/react/icon"

import {useTheme} from "./theme-provider"

function ThemeToggle(): ReactNode {
  const {theme, toggleTheme} = useTheme()

  return (
    <HeaderBar.ActionIconButton
      aria-label="Toggle Theme"
      icon={theme === "light" ? SunIcon : MoonIcon}
      onClick={toggleTheme}
    />
  )
}

export function AppLayout({children}: {children: ReactNode}): ReactNode {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col">
      <HeaderBar.Root className="@container shrink-0">
        <HeaderBar.Logo render={<Link href="/" />}>
          <div className="rounded-sm p-0.5">
            <Icon icon={Layers2} size="lg" />
          </div>
          <HeaderBar.AppTitle>Qualcomm App</HeaderBar.AppTitle>
        </HeaderBar.Logo>

        <HeaderBar.Divider />

        <HeaderBar.Nav className="hidden @min-[580px]:flex">
          <HeaderBar.NavItem
            active={pathname === "/"}
            render={<Link href="/" />}
          >
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
        <main className="bg-background flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
