import axios from 'axios';
import backendUrl from '../config/config';

const AccountService = {
    // Register function
     async registerUser(username, email, password){
        try {
            const response = await axios.post(`${backendUrl}/api/User/register`,
                {
                    username: username,
                    email: email,
                    password: password,
                },
                {
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                });

            // Check the response and handle accordingly
            if (response.status === 200) {
                console.log('Registration successful!');
                return response.data;
            } else {
                console.error('Registration failed:', response.data);

                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },

    async userLogin(email, password) {
        try {
            const response = await axios.post(`${backendUrl}/api/User/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                });

            // Check the response and handle accordingly
            if (response.status === 200) {
                console.log(response.data);
                console.log('Login successful!');
                return response.data;
            } else {
                console.error('Login failed:', response.data);

                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during Login:', error);
            throw error;
        }
    },

    // Add other functions like login if needed
};

export default AccountService;