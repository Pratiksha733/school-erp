const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'https://school-erp-md0r.onrender.com';

/**
 * Register a new user in MongoDB backend & get JWT token
 */
export const registerUser = async(userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('API registerUser Error:', error);
        throw error;
    }
};

/**
 * Login user with email & password, verify with MongoDB & get JWT token
 */
export const loginUser = async(credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('API loginUser Error:', error);
        throw error;
    }
};

/**
 * Verify JWT token and fetch user profile from MongoDB
 */
export const getAuthProfile = async(token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Token expired or invalid');
        }

        return data;
    } catch (error) {
        console.error('API getAuthProfile Error:', error);
        throw error;
    }
};

/**
 * Check backend connection status
 */
export const checkBackendHealth = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) {
        return { status: 'Offline', error: err.message };
    }
};

/**
 * Mark Attendance for Teacher/Student/Staff in Backend
 */
export const markAttendance = async(attendanceData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/attendance/mark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to save attendance');
        }

        return data;
    } catch (error) {
        console.error('API markAttendance Error:', error);
        throw error;
    }
};

/**
 * Fetch all attendance records from backend
 */
export const fetchAttendanceRecords = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/attendance/all`, {
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error('API fetchAttendanceRecords Error:', error);
        return { success: false, records: [] };
    }
};