import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { useSession } from "../hooks/useSession";

export const Route = createFileRoute("/signIn")({
  component: SignInPage,
});

function SignInPage() {
  const [selectedTab, setSelectedTab] = useState<string>("signin");
  const { data: session, isPending } = useSession();

  // Redirect to app if already authenticated
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (session?.user) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Codo.ing</h1>
          <p className="text-gray-600">
            Sign in to access your collaborative workspace
          </p>
        </div>

        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          className="flex w-full flex-col"
          color="primary"
          size="lg"
        >
          <Tab key="signin" title="Sign In">
            <div className="flex justify-center">
              <SignIn />
            </div>
          </Tab>
          <Tab key="signup" title="Sign Up">
            <div className="flex justify-center">
              <SignUp />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
