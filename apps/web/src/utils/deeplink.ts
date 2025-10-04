// Check if running in Electron
export const isElectron =
  typeof window !== 'undefined' && window.navigator.userAgent.includes('Electron');

// Generate appropriate URL for the current environment
export function createProjectUrl(projectId: string): string {
  return isElectron ? `codo-ing://project/${projectId}` : `/project/${projectId}`;
}

// Generate appropriate invite URL for the current environment
export function createInviteUrl(inviteFragment: string): string {
  return isElectron ? `codo-ing://invite/${inviteFragment}` : `/invite/${inviteFragment}`;
}
