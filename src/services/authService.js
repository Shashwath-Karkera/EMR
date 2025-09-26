// Fixed authentication service
class AuthService {
  static async sendOTP(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP and user data
        localStorage.setItem('pendingOTP', otp);
        localStorage.setItem('pendingUser', JSON.stringify(userData));
        localStorage.setItem('otpTimestamp', Date.now().toString());
        
        // For testing - show OTP in console and alert
        console.log('📧 OTP for testing:', otp);
        console.log('User:', userData);
        
        resolve({ 
          success: true, 
          message: `OTP sent to ${userData.email}`,
          testOTP: otp // For testing only
        });
      }, 1000);
    });
  }

  static async verifyOTP(enteredOTP) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedOTP = localStorage.getItem('pendingOTP');
        console.log('Stored OTP:', storedOTP, 'Entered OTP:', enteredOTP);
        
        // Debug: Always accept '123456' for testing
        if (enteredOTP === '123456' || enteredOTP === storedOTP) {
          const userData = JSON.parse(localStorage.getItem('pendingUser'));
          
          // Store user session
          localStorage.setItem('currentUser', JSON.stringify(userData));
          localStorage.setItem('loginTime', Date.now().toString());
          
          // Clean up OTP data
          localStorage.removeItem('pendingOTP');
          localStorage.removeItem('pendingUser');
          localStorage.removeItem('otpTimestamp');
          
          resolve({ 
            success: true, 
            user: userData,
            message: 'Login successful!'
          });
        } else {
          reject(new Error(`Invalid OTP. Expected: ${storedOTP}, Got: ${enteredOTP}`));
        }
      }, 500);
    });
  }

  static async resendOTP(userData) {
    return this.sendOTP(userData);
  }

  static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  static logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
  }

  // Test method to bypass OTP for development
  static async bypassOTP(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('loginTime', Date.now().toString());
    return { success: true, user: userData };
  }
}

export default AuthService;