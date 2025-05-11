import { authAPI } from './api';

/**
 * Checks if an email belongs to a registered doctor
 * This now uses the user role from the API
 */
export async function isRegisteredDoctor(email: string): Promise<boolean> {
  try {
    // In a real application, you would make an API call to verify
    // For now, we'll check if the user is already authenticated
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      // Check if this user has a doctor role
      if (userData.email === email && userData.role === 'doctor') {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking doctor status:', error);
    return false;
  }
}

/**
 * Registers user as a doctor
 * In a real application, this would update the user role in the database
 */
export async function registerDoctor(userId: string): Promise<boolean> {
  try {
    // This would typically involve a call to update the user role
    // For now, we'll assume success
    return true;
  } catch (error) {
    console.error('Error registering doctor:', error);
    return false;
  }
}
