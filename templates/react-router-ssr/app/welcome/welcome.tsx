import type {ReactNode} from "react"

export function Welcome(): ReactNode {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading-xl text-neutral-primary mb-6">
        Welcome to Your App
      </h1>

      <div className="bg-surface-primary mb-6 rounded-lg p-6 shadow-sm">
        <h2 className="font-heading-lg text-neutral-primary mb-4">
          Getting Started
        </h2>
        <p className="text-neutral-secondary font-body-md mb-4">
          This template demonstrates the use of Qualcomm UI components
          including the Header Bar and Side Navigation. Explore the
          navigation to see different sections of your application.
        </p>
        <p className="text-neutral-secondary font-body-md">
          Use the theme toggle in the header to switch between light and
          dark modes. The side navigation can be collapsed using the
          button in its header.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-surface-primary rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Components
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            This template uses various QUI components like HeaderBar,
            SideNav, Avatar, IconButton, and more.
          </p>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Theming
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            Full support for light and dark themes with automatic
            persistence using cookies.
          </p>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Navigation
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            Collapsible side navigation with expandable sections and
            keyboard accessibility.
          </p>
        </div>

        <div className="bg-surface-primary rounded-lg p-6 shadow-sm">
          <h3 className="font-heading-md text-neutral-primary mb-3">
            Responsive
          </h3>
          <p className="text-neutral-secondary font-body-sm">
            Responsive design using container queries that adapts to
            different screen sizes.
          </p>
        </div>
      </div>
    </div>
  )
}