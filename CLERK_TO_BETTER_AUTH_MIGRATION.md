# Clerk to Better-auth Migration Plan

## Overview

Migrate from Clerk authentication to Better-auth for email/password + Google SSO authentication with proper authenticated/unauthenticated route handling.

## Migration Todo List

### 1. Remove Clerk Integration (Clean Slate)

- [ ] Backup existing Clerk user data (if any exists)
- [ ] Remove Clerk dependencies: `bun remove @clerk/clerk-react @clerk/nextjs`
- [ ] Delete all Clerk configuration files and components
- [ ] Remove Clerk providers from React app root
- [ ] Remove Clerk hooks and components from all files
- [ ] Remove Clerk environment variables from `.env` files
- [ ] Clean up Clerk imports throughout codebase
- [ ] Remove any Clerk-specific middleware from server
- [ ] Create temporary "no auth" state (allow access to all routes)

### 2. Database Schema Setup

- [ ] Create migration script for Better-auth tables
- [ ] Add Better-auth schema to `postgres/init/` directory
- [ ] Update database with required tables (users, sessions, accounts, verification_tokens)
- [ ] Run database migration to create new schema
- [ ] Verify tables are created correctly

### 3. Better-auth Server Configuration

- [ ] Install Better-auth dependencies: `bun add better-auth`
- [ ] Install Google OAuth plugin: `bun add @better-auth/oauth-providers`
- [ ] Create `apps/server/src/lib/auth.ts` - Better-auth server config
- [ ] Configure email/password + Google provider
- [ ] Add Better-auth middleware to Fastify server
- [ ] Create auth API routes (`/api/auth/*`)
- [ ] Set up session management and validation
- [ ] Update server environment validation for Better-auth

### 4. Better-auth Client Setup

- [ ] Create `apps/web/src/lib/auth-client.ts` - Better-auth client
- [ ] Install client dependencies if needed
- [ ] Configure client to connect to server auth endpoints
- [ ] Create authentication context/provider for React
- [ ] Test basic client-server authentication connection

### 5. Authentication UI Components

- [ ] Create sign-in page with HeroUI (`apps/web/src/routes/signin.tsx`)
- [ ] Create sign-up page with HeroUI (`apps/web/src/routes/signup.tsx`)
- [ ] Add email/password forms with proper validation
- [ ] Add Google SSO button integration
- [ ] Implement loading states and error handling
- [ ] Add user profile/settings components
- [ ] Test form submissions and user feedback

### 6. Route Protection with TanStack Router

- [ ] Create authentication guard function for route protection
- [ ] Configure unauthenticated routes (signin, signup)
- [ ] Configure authenticated routes (index, dashboard, etc.)
- [ ] Set up route redirects (unauth -> signin, auth -> index)
- [ ] Update route tree configuration with auth checks
- [ ] Test route access and redirects

### 7. Server-Side Route Protection

- [ ] Create authenticated/unauthenticated tRPC procedures
- [ ] Move all existing tRPC routes to authenticated procedures
- [ ] Add session validation middleware
- [ ] Test API endpoint protection
- [ ] Ensure proper error handling for unauthenticated requests

### 8. Replace Authentication Logic

- [ ] Replace any remaining Clerk hooks with Better-auth equivalents
- [ ] Update user data handling to match Better-auth schema
- [ ] Modify user profile/settings functionality
- [ ] Update any user-related database queries
- [ ] Test user session management

### 9. Environment & Configuration

- [ ] Add Better-auth environment variables to `.env.example`
- [ ] Set up Google OAuth app credentials
- [ ] Configure session secrets and encryption keys
- [ ] Update server environment validation
- [ ] Test environment configuration

### 10. Testing & Validation

- [ ] Test complete email/password authentication flow
- [ ] Test Google SSO integration end-to-end
- [ ] Verify all route protection works correctly
- [ ] Test session persistence across page reloads
- [ ] Test logout functionality
- [ ] Cross-browser compatibility testing
- [ ] Electron desktop app authentication testing
- [ ] Test error scenarios and edge cases

### 11. Documentation & Cleanup

- [ ] Update CLAUDE.md with Better-auth instructions
- [ ] Document new authentication flow and API endpoints
- [ ] Add troubleshooting guide for auth issues
- [ ] Clean up any remaining Clerk references
- [ ] Update development workflow documentation

## Key Technical Details

### Authentication Flow

1. **Unauthenticated Users**: Redirect to `/signin` page
2. **Sign In Options**: Email/password form + Google SSO button
3. **Successful Auth**: Redirect to `/` (index route)
4. **Session Management**: Better-auth handles cookies and session validation
5. **Route Guards**: TanStack Router `beforeLoad` checks authentication status

### Route Structure

```
/signin     - Sign in page (unauthenticated only)
/signup     - Sign up page (unauthenticated only)
/           - Index route (authenticated only)
/dashboard  - Protected routes (authenticated only)
```

### Server API Structure

```
/api/auth/signin    - Email/password + Google signin
/api/auth/signup    - Email/password signup
/api/auth/signout   - Logout endpoint
/api/auth/session   - Session validation
/trpc/*            - All tRPC routes (authenticated procedures)
```

### Environment Variables

```
# Better-auth Configuration
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Migration Strategy

1. **Phase 1**: Complete Clerk removal (clean slate approach)
2. **Phase 2**: Set up Better-auth server and database schema
3. **Phase 3**: Implement Better-auth client using HERO UI components
4. **Phase 4**: Add route protection and finalize authentication system

**Why Remove Clerk First?**

- Avoids conflicts between authentication systems
- Ensures clean codebase without mixed auth patterns
- Makes it easier to implement Better-auth without legacy code interference
- Reduces complexity during development and testing

## Notes

- Maintain backward compatibility during migration
- Test thoroughly in both browser and Electron environments
- Use HeroUI components for consistent design
- Follow existing code conventions and patterns
- Ensure proper error handling and user feedback
