import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
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
          <SignedOut>
            <NavbarItem>
              <Button as={SignInButton} variant="light">
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={SignUpButton} color="primary">
                Sign Up
              </Button>
            </NavbarItem>
          </SignedOut>
          <SignedIn>
            <NavbarItem>
              <UserButton />
            </NavbarItem>
          </SignedIn>
        </NavbarContent>
      </Navbar>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
