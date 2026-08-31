import {
  type ReactElement,
  type ComponentPropsWithRef,
  type ReactNode,
  useState,
} from "react"

import {skipToken, useQuery} from "@tanstack/react-query"
import {MoonIcon, SunIcon} from "lucide-react"
import {
  Link as ReactRouterLink,
  useLocation,
  useSearchParams,
} from "react-router"

import type {SemanticSearchResult} from "@qualcomm-ui/mdx-common"
import {QdsTheme} from "@qualcomm-ui/qds-core/theme"
import {
  DocsFooter,
  DocsLayout,
  type DocsLayoutSettings,
  MobileSidebar,
} from "@qualcomm-ui/react-mdx/docs-layout"
import {
  SemanticSiteSearch,
  useSemanticSearchReducer,
} from "@qualcomm-ui/react-mdx/site-search"
import {useTheme} from "@qualcomm-ui/react-router-utils/client"
import {HeaderBar} from "@qualcomm-ui/react/header-bar"
import {Link} from "@qualcomm-ui/react/link"

function ThemeToggle(): ReactNode {
  const [theme, setTheme] = useTheme()

  const handleThemeSwitch = () => {
    const nextTheme = theme === QdsTheme.DARK ? QdsTheme.LIGHT : QdsTheme.DARK
    setTheme(nextTheme)
  }

  return (
    <HeaderBar.ActionIconButton
      aria-label="Toggle Theme"
      icon={theme === QdsTheme.LIGHT ? SunIcon : MoonIcon}
      onClick={handleThemeSwitch}
    />
  )
}

interface DocLinkProps extends ComponentPropsWithRef<"a"> {
  href: string
}

function DocLink({href, ref, ...props}: DocLinkProps) {
  return (
    <ReactRouterLink
      ref={ref}
      prefetch="intent"
      to={href}
      viewTransition
      {...props}
    />
  )
}

interface Props extends Partial<DocsLayoutSettings> {
  /**
   * React {@link https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children children} prop.
   */
  children: ReactNode
}

export function MdxLayout({children, ...props}: Props): ReactNode {
  const [searchParams] = useSearchParams()

  // persist the search input to the URL
  const query = searchParams.get("query") ?? ""

  const [searchInput, setSearchInput] = useState(query)

  const location = useLocation()

  // sync the search input with the url state (used in browser back/forward)
  if (searchInput !== query) {
    setSearchInput(query)
  }

  return (
    <DocsLayout
      footer={
        <DocsFooter className="flex flex-col items-start justify-center gap-1">
          Copyright © 2026 QUALCOMM incorporated. All rights reserved.{" "}
          <span>
            This site is built with{" "}
            <Link
              href="https://docs-next.qui.qualcomm.com/"
              size="md"
              target="_blank"
            >
              QUI Docs
            </Link>
            . Head over to the{" "}
            <Link
              href="https://github.com/qualcomm/qualcomm-ui-templates/tree/main/templates/react-qui-docs"
              size="md"
              target="_blank"
            >
              template repository
            </Link>{" "}
            to start building.
          </span>
        </DocsFooter>
      }
      header={
        <div className="qui-docs__header">
          <HeaderBar.Root>
            <HeaderBar.Logo>
              <MobileSidebar>
                <HeaderBar.AppTitle>QUI Docs</HeaderBar.AppTitle>
              </MobileSidebar>
              <ReactRouterLink className="flex items-center gap-2" to="/">
                <HeaderBar.AppTitle>
                  <span className="whitespace-nowrap">QUI Docs</span>
                </HeaderBar.AppTitle>
              </ReactRouterLink>
            </HeaderBar.Logo>

            <HeaderBar.Divider />

            <HeaderBar.Nav className="hidden @min-[600px]:flex">
              {/* TODO: nav items go here */}
            </HeaderBar.Nav>

            <HeaderBar.ActionBar>
              <GlobalSearch />
              <ThemeToggle />
            </HeaderBar.ActionBar>
          </HeaderBar.Root>
        </div>
      }
      pathname={location.pathname}
      renderLink={DocLink}
      rootBreadcrumb={{
        children: "Home",
        render: <ReactRouterLink to="/" viewTransition />,
      }}
      {...props}
    >
      {children}
    </DocsLayout>
  )
}

export function GlobalSearch(): ReactElement {
  const [searchState, searchDispatch] = useSemanticSearchReducer()
  const {data, error, isLoading} = useQuery<SemanticSearchResult[]>({
    placeholderData: (previousData) => previousData,
    queryFn:
      searchState.inputValue.trim().length > 2
        ? async () => {
            return fetch("/api/search", {
              body: JSON.stringify({query: searchState.inputValue.trim()}),
              headers: {"Content-Type": "application/json"},
              method: "POST",
            })
              .then((res) => res.json())
              .then((resJson) => {
                return resJson.results
              })
          }
        : skipToken,
    queryKey: [searchState.inputValue],
  })

  return (
    <SemanticSiteSearch
      error={
        error && !isLoading && !data?.length
          ? "Search is unavailable."
          : undefined
      }
      isLoadingResults={isLoading}
      results={data ?? []}
      searchActionDispatch={searchDispatch}
      searchState={searchState}
    />
  )
}
