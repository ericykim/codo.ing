import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Card, CardBody } from "@heroui/react";
import { trpc } from "../trpc";

export const Route = createFileRoute("/")({
  component: MarketingPage,
});

function MarketingPage() {
  // Test public API endpoint
  const { data: publicGreeting, isLoading: publicLoading } =
    trpc.test.publicHello.useQuery({
      name: "Visitor",
    });

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Codo<span className="text-primary">.ing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A cross-platform collaborative note-taking application built for
              developers. Take notes, share ideas, and build knowledge together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signIn">
                <Button color="primary" size="lg" className="font-semibold">
                  Get Started
                </Button>
              </Link>
              <Button variant="bordered" size="lg" className="font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Modern Development
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for collaborative note-taking, designed with
            developers in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardBody>
              <div className="text-primary text-2xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
              <p className="text-gray-600">
                Access your notes from anywhere - web, desktop, or mobile.
                Native apps for all your devices.
              </p>
            </CardBody>
          </Card>

          <Card className="p-6">
            <CardBody>
              <div className="text-primary text-2xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together in real-time. Share notes, collaborate on ideas,
                and build knowledge as a team.
              </p>
            </CardBody>
          </Card>

          <Card className="p-6">
            <CardBody>
              <div className="text-primary text-2xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Rich Text Editor</h3>
              <p className="text-gray-600">
                Powerful block-based editor with syntax highlighting, code
                blocks, and markdown support.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600">
              Powered by the latest and greatest in web development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-gray-600 font-semibold">React 19</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-semibold">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-semibold">Better-auth</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-semibold">PostgreSQL</div>
            </div>
          </div>
        </div>
      </div>

      {/* API Demo Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Live API Demo
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our API is working! Here's a live response from our public endpoint:
          </p>
          <Card className="max-w-md mx-auto">
            <CardBody>
              {publicLoading ? (
                <p>Loading API response...</p>
              ) : (
                <p className="text-green-600 font-medium">
                  {publicGreeting?.greeting || "API not available"}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start taking better notes?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join developers who are already using Codo.ing to organize their
            thoughts and collaborate effectively.
          </p>
          <Link to="/signIn">
            <Button color="primary" size="lg" className="font-semibold">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
