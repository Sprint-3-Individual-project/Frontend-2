<template>
    <div v-if="products.length > 0" class="webshop">
        <h2 class="webshop-title">Products</h2>
        <ul class="product-list">
            <li v-for="product in products" :key="product.productid" class="product-item">
                <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-price">price: {{ product.price }} <span v-if="product.discountPercentage > 0">discount: {{product.discountPercentage}}%</span></p>
                    <router-link :to="{ name: 'EditProduct', params: { id: product.productid } }" class="edit-button">Edit</router-link>
                </div>
                <img :src="product.fotourl" class="product-image" />
            </li>
        </ul>
    </div>
</template>

<script>
import ProductService from '../services/ProductService'

export default {
        name: 'products',
        props: {

        },
        data() {
            return {
                products: [],
            };
        },
        methods: {
            async GetProducts() {
                this.products = await ProductService.getAllProducts();
                console.log(this.products);
            },
            async selectProduct(ProductId) {
                console.log(ProductId);
                this.$emit("selected-product", ProductId)
            },
        },
        mounted() {
            this.GetProducts();
        }
}
</script>


<style scoped>
    .webshop {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .webshop-title {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .product-list {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .product-item {
        flex: 0 0 calc(33.33% - 20px);
        margin: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .product-info {
        margin-bottom: 10px;
    }

    .product-name {
        font-size: 18px;
        margin: 0;
    }

    .product-price {
        font-size: 16px;
        color: #007bff;
        margin: 0;
    }

    .product-image {
        max-width: 100%;
        height: auto;
    }

    .edit-button {
        margin-top: 10px;
        background-color: #28a745;
        color: #fff;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
    }
</style>

