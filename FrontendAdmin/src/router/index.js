import { createWebHistory, createRouter } from 'vue-router';
import HelloWorld from '@/pages/HelloWorld.vue';
import ByeWorld from '@/pages/ByeWorld.vue';
import Register from '@/pages/Register.vue';
import Login from '@/pages/Login.vue';
import ProductOverview from '@/pages/ProductOverview.vue'
import ProductEdit from '@/pages/ProductEdit.vue'

const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld
    },
    {
        path: "/Bye",
        name: "ByeWorld",
        component: ByeWorld
    },
    {
        path: "/Register",
        name: "Register",
        component: Register
    },
    {
        path: "/Login",
        name: "Login",
        component: Login
    },
    {
        path: "/ProductOverview",
        name: "Products",
        component: ProductOverview
    },
    {
        path: "/ProductEdit/:id",
        name: "EditProduct",
        component: ProductEdit
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;