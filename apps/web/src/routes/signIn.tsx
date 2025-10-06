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
      <div className="flex grow items-center justify-center">Loading...</div>
    );
  }

  if (session?.user) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="flex-1 flex justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-auto">
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Codo.ing</h1>
            <p className="text-gray-600">
              Sign in to access your collaborative workspace
            </p>
          </div>

          <div className="w-full">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
              className="flex w-full flex-col"
              color="primary"
              size="lg"
            >
              <Tab key="signin" title="Sign In">
                <div className="mt-4 min-h-[600px] sm:min-h-[550px] flex flex-col">
                  <SignIn />
                </div>
              </Tab>
              <Tab key="signup" title="Sign Up">
                <div className="mt-4 min-h-[600px] sm:min-h-[550px] flex flex-col">
                  <SignUp />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
