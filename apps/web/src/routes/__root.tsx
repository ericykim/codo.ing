import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAccount, useIsAuthenticated } from 'jazz-tools/react';

function RootComponent() {
  const isAuthenticated = useIsAuthenticated();
  const { logOut } = useAccount();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <h1 className="font-bold text-lg">Codo.ing</h1>
        </NavbarBrand>
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/" className="[&.active]:text-primary">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/about" className="[&.active]:text-primary">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {!isAuthenticated ? (
            <>
              <NavbarItem>
                <SignInButton>
                  <Button variant="light">
                    Sign In
                  </Button>
                </SignInButton>
              </NavbarItem>
              <NavbarItem>
                <SignUpButton>
                  <Button color="primary">
                    Sign Up
                  </Button>
                </SignUpButton>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Button variant="light" onPress={logOut}>
                Sign Out
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
