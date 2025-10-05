import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useSession } from "../hooks/useSession";

function RootComponent() {
  const location = useLocation();
  const isInApp = location.pathname.startsWith("/app");
  const { data: session, isPending } = useSession();

  return (
    <>
      {!isInApp && (
        <Navbar className="bg-white/80 backdrop-blur-md">
          <NavbarBrand>
            <Link to="/" className="font-bold text-lg">
              Codo<span className="text-primary">.ing</span>
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link to="/" className="[&.active]:text-primary">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button variant="light" className="text-foreground">
                Features
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button variant="light" className="text-foreground">
                Pricing
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            {!isPending && session?.user ? (
              // Show logged in user with "Go to App" button
              <>
                <NavbarItem>
                  <Link to="/app">
                    <Button color="primary">Go to App</Button>
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="primary"
                        name={session.user.name || session.user.email}
                        size="sm"
                        src={session.user.image ?? ""}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{session.user.email}</p>
                      </DropdownItem>
                      <DropdownItem key="app">
                        <Link to="/app" className="w-full">
                          Go to App
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </>
            ) : (
              // Show sign in/up buttons for non-authenticated users
              <>
                <NavbarItem>
                  <Link to="/signIn">
                    <Button variant="light">Sign In</Button>
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/signIn">
                    <Button color="primary">Sign Up</Button>
                  </Link>
                </NavbarItem>
              </>
            )}
          </NavbarContent>
        </Navbar>
      )}
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
