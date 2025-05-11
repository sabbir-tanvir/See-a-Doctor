// Map of registered doctor emails to store doctor information
// In a real app, this would be in a database
export const registeredDoctors: Record<string, boolean> = {};

/**
 * Checks if an email belongs to a registered doctor
 * In a real application, this would query a database
 */
export function isRegisteredDoctor(email: string): boolean {
  // Check if this email is in our registered doctors map
  return !!registeredDoctors[email];
}

/**
 * Registers an email as belonging to a doctor
 * In a real application, this would update a database
 */
export function registerDoctorEmail(email: string): void {
  registeredDoctors[email] = true;
}
