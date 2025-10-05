import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import {
  createFileRoute,
  Link,
  Outlet,
  Navigate,
} from "@tanstack/react-router";
import { useSession } from "../hooks/useSession";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { data: session, isPending } = useSession();
  const { signOut } = useAuth();

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!session?.user) {
    return <Navigate to="/signIn" />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link to="/app" className="font-bold text-lg">
            Codo.ing
          </Link>
        </NavbarBrand>
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/app" className="[&.active]:text-primary">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/app/about" className="[&.active]:text-primary">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={session.user.name || session.user.email}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}
