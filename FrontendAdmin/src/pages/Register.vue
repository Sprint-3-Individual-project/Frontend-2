<template>
    <div class="register-container">
        <h1>Create an Account</h1>
        <form @submit.prevent="registerUser">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
                <!-- Display username error message only after button click -->
                <div v-if="showErrors && !username" class="error-message">Please enter your username.</div>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
                <!-- Display email error message only after button click -->
                <div v-if="showErrors && !email" class="error-message">Please enter your email.</div>
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
                <!-- Display password error message only after button click -->
                <div v-if="showErrors && !password" class="error-message">Please enter your password.</div>
            </div>

            <button type="submit" :disabled="!areFieldsFilled" @click="showErrors = true">Register</button>

            <!-- Display general error message -->
            <div v-if="error" class="error-message">{{ error }}</div>
        </form>
        <router-link to="/Login">Already have an account? Login here</router-link>
    </div>
</template>

<script>
    import AccountService from '../services/AccountService';

    export default {
        data() {
            return {
                username: '',
                email: '',
                password: '',
                error: '', // New error property to hold the general error message
                showErrors: false // New property to track whether to show errors
            };
        },
        computed: {
            // A computed property to check if all fields are filled
            areFieldsFilled() {
                return this.username.trim() !== '' && this.email.trim() !== '' && this.password.trim() !== '';
            }
        },
        methods: {
            async registerUser() {
                // Clear all previous error messages
                this.error = '';

                // Check each field individually for empty values
                if (!this.username) {
                    this.error = 'Please enter your username.';
                    return;
                }

                if (!this.email) {
                    this.error = 'Please enter your email.';
                    return;
                }

                if (!this.password) {
                    this.error = 'Please enter your password.';
                    return;
                }

                // Check if all fields are filled before proceeding
                if (!this.areFieldsFilled) {
                    // Set a general error message if any field is empty
                    this.error = 'Please fill in all fields before registering.';
                    this.showErrors = true; // Show errors when any field is empty
                    return;
                }

                try {
                    // Call the registerUser function from AccountService
                    await AccountService.registerUser(this.username, this.email, this.password);

                    // Implement any logic you need after successful registration
                    console.log('User registered:', {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    });
                } catch (error) {
                    // Handle errors during registration
                    console.error('Error during registration:', error);

                    // Set a general error message based on the specific error, if needed
                    this.error = 'Registration failed. Please try again.';
                }
            }
        }
    };
</script>


<style scoped>

    .error-message {
        color: red;
        margin-top: 10px;
    }

    .register-container {
        max-width: 400px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        background-color: #42b983;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
    }
</style>

