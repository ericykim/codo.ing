import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Checkbox,
  Divider,
} from "@heroui/react";
import { useSession } from "@/hooks/useSession";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Use Better-auth session hook
  const { data: session, isPending } = useSession();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const isLoading = isPending;

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col text-center">
          <p className="text-lg md:text-xl font-bold">Sign In</p>
          <p className="text-xs md:text-sm text-default-500">
            Enter your email below to login to your account
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {error && (
          <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-medium">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            variant="bordered"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-default-600">Password</span>
              <Link href="#" size="sm" className="text-primary">
                Forgot your password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              variant="bordered"
            />
          </div>

          <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
            Remember me
          </Checkbox>

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            isDisabled={!email || !password}
            onPress={async () => {
              setError("");

              try {
                await signIn.email(
                  {
                    email,
                    password,
                    rememberMe,
                  },
                  {
                    onError: (ctx) => {
                      setError(ctx.error.message || "Sign in failed");
                    },
                    onSuccess: () => {
                      console.log("Signed in successfully");
                      // Navigate to app after successful sign in
                      setTimeout(() => {
                        navigate({ to: "/app" });
                      }, 100);
                    },
                  },
                );
              } catch (err) {
                setError("An unexpected error occurred");
              }
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <Divider className="my-4" />

          <Button
            variant="bordered"
            className="w-full"
            isLoading={isLoading}
            onPress={async () => {
              setError("");
              
              try {
                await signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/app",
                  },
                  {
                    onError: (ctx) => {
                      setError("Google sign in failed");
                    },
                    onSuccess: () => {
                      // For OAuth, the redirect happens automatically via callbackURL
                      // No need for manual navigation here
                    },
                  },
                );
              } catch (err) {
                setError("Google sign in failed");
              }
            }}
            startContent={
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
