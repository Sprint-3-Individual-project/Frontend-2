<template>
    <div class="edit-product-container">
        <h2>Edit Product Price</h2>
        <p>Editing product with ID: {{ productId }}</p>

        <div v-if="product" class="product-details">
            <h3>{{ product.name }}</h3>
            <p>Current Price: {{ product.price }}</p>

            <label for="newPrice">New Price:</label>
            <input v-model.number="newPrice" type="number" step="0.01" required />

            <button @click="updateProduct">Save</button>
        </div>
    </div>
</template>

<script>
    import ProductService from '../services/ProductService';
    import WebSocketService from '../services/WebSocketService.js';

export default {
        data() {
            return {
                productId: null,
                product: null,
                newPrice: null,
            };
        },
        mounted() {
            this.productId = this.$route.params.id;
            this.fetchProductDetails();

            // Luister naar WebSocket-berichten
            WebSocketService.connection.on('broadcastMessage', (message) => {
                console.log('Received message from server:', message);
                // Doe hier iets met het ontvangen bericht in je component
                // Bijvoorbeeld, toon het bericht als een notificatie
                alert(message);
            });
        },
        methods: {
            async fetchProductDetails() {
                try {
                    this.product = await ProductService.ShowProductInfo(this.productId);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            },
            async updateProduct() {
                try {
                    // Rond de waarde van newPrice af op twee decimalen
                    this.newPrice = parseFloat(this.newPrice.toFixed(2));

                    await ProductService.updateProductPrice(this.productId, this.newPrice);
                    console.log(this.newPrice);
                    console.log('Product updated successfully!');
                    // Optioneel: je kunt doorverwijzen naar een andere pagina of andere acties uitvoeren na het bijwerken
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            },
        },
};
</script>

<style scoped>
    .edit-product-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .product-details {
        margin-top: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }

    button {
        background-color: #28a745;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-size: 16px;
    }
</style>







