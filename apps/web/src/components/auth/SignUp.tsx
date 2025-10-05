import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Avatar,
} from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "@/hooks/useSession";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Use Better-auth session hook
  const { data: session, isPending } = useSession();
  const { signUp } = useAuth();
  const isLoading = isPending;

  const passwordsMatch = password === passwordConfirmation;
  const isFormValid =
    firstName &&
    lastName &&
    email &&
    password &&
    passwordConfirmation &&
    passwordsMatch &&
    password.length >= 8;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col text-center">
          <p className="text-lg md:text-xl font-bold">Sign Up</p>
          <p className="text-xs md:text-sm text-default-500">
            Enter your information to create an account
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="First Name"
              placeholder="Max"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isRequired
              variant="bordered"
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Robinson"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isRequired
              variant="bordered"
            />
          </div>
          <Input
            type="email"
            label="Email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            variant="bordered"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            description="Must be at least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
            variant="bordered"
            color={password && password.length < 8 ? "danger" : "default"}
            errorMessage={
              password && password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            isRequired
            variant="bordered"
            color={
              passwordConfirmation && !passwordsMatch ? "danger" : "default"
            }
            errorMessage={
              passwordConfirmation && !passwordsMatch
                ? "Passwords don't match"
                : ""
            }
          />
          <div className="space-y-2">
            <span className="text-sm text-default-600">
              Profile Image (optional)
            </span>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative">
                  <Avatar src={imagePreview} alt="Profile preview" size="lg" />
                  <Button
                    isIconOnly
                    size="sm"
                    variant="solid"
                    color="danger"
                    className="absolute -top-2 -right-2 min-w-unit-6 w-unit-6 h-unit-6"
                    onPress={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </Button>
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                variant="bordered"
                className="flex-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isLoading}
            isDisabled={!isFormValid}
            onPress={async () => {
              setError("");

              try {
                await signUp.email(
                  {
                    name: `${firstName} ${lastName}`,
                    email,
                    password,
                    image: image
                      ? await convertImageToBase64(image)
                      : undefined,
                    callbackURL: "/home",
                  },
                  {
                    onError: (ctx) => {
                      setError(ctx.error.message || "Sign up failed");
                    },
                    onSuccess: () => {
                      console.log("Signed up successfully");
                      // Session will be automatically updated via useSession hook
                    },
                  },
                );
              } catch (err) {
                setError("An unexpected error occurred");
              }
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
