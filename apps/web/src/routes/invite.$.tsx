import { Button, Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAcceptInvite } from 'jazz-tools/react';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

export const Route = createFileRoute('/invite/$')({
  component: InvitePage,
});

function InvitePage() {
  const inviteCode = Route.useParams()['_splat'];
  const { isSignedIn, signIn } = useAuth();
  const navigate = useNavigate();
  
  const { state, acceptInvite, project } = useAcceptInvite({
    inviteLinkFragment: inviteCode,
    forValueHint: 'project',
  });

  useEffect(() => {
    if (state === 'accepted' && project?.$jazz?.id) {
      navigate({ to: '/project/$projectId', params: { projectId: project.$jazz.id } });
    }
  }, [state, project, navigate]);

  const handleAcceptInvite = () => {
    acceptInvite();
  };

  const handleSignInAndAccept = () => {
    if (signIn) {
      signIn.attemptFirstFactor({
        strategy: 'oauth_google',
      });
    }
  };

  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (state === 'errored') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-red-600">Invalid Invite</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">This invite link is invalid or has expired.</p>
            <Link to="/">
              <Button color="primary">Go to Home</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (state === 'accepted') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <h2 className="text-xl font-semibold text-green-600">Redirecting...</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-center">
              <Spinner size="lg" />
            </div>
            <p className="text-center mt-4">Taking you to the project...</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Project Invitation</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <p>You've been invited to collaborate on a project!</p>
          
          <div className="space-y-2">
            <Button 
              color="primary" 
              className="w-full"
              onPress={handleAcceptInvite}
            >
              {isSignedIn ? 'Accept Invite' : 'View as Guest'}
            </Button>
            
            {!isSignedIn && (
              <Button 
                variant="bordered" 
                className="w-full"
                onPress={handleSignInAndAccept}
              >
                Sign In & Accept Invite
              </Button>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {isSignedIn 
              ? 'You will be added as a collaborator to this project.' 
              : 'You can view the project anonymously or sign in to become a full collaborator.'
            }
          </p>
        </CardBody>
      </Card>
    </div>
  );
}