<template>
    <div class="login-container">
        <h1>Login to Your Account</h1>
        <form @submit.prevent="loginUser">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>

            <button @click="loginUser" type="submit">Login</button>
        </form>
        <router-link to="/Register">Don't have an account? Register here</router-link>
    </div>
</template>

<script>
    // Import or define AccountService
    import AccountService from '../services/AccountService'; // Adjust the path accordingly

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: null // Initialize error to null
            };
        },
        methods: {
            async loginUser() {
                try {
                    // Call the loginUser function from AccountService
                    await AccountService.userLogin(this.email, this.password);

                    // Implement any logic you need after successful login
                    console.log('User Logged in:', {
                        email: this.email,
                        password: this.password
                    });
                } catch (error) {
                    // Handle errors during login
                    console.error('Error during login:', error);

                    // Set the specific error message from the caught error, if available
                    this.error = error.message || 'Login failed. Please try again.';
                }
            },
        }
    };
</script>

<style scoped>
    .login-container {
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


