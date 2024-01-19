import axios from 'axios';
import backendUrl from '../config/config';

const ProductService = {
    async getAllProducts() {
        try {
            const response = await axios.get(`${backendUrl}/api/Product`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    async ShowProductInfo(productId) {
        try {
            const response = await axios.get(`${backendUrl}/api/Product/${productId}`);
            return response.data;
        } catch (error) {
            console.error('error fetching product by id: ', error);
            throw error;
        }
    },
    async updateProductPrice(productId, price) {
        try {
            console.log("Request Configuration:", {
                method: "PUT",
                url: `${backendUrl}/api/Product/updatePrice/${productId}`,
                data: { newPrice: price },
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            })
            console.log(price);
            const response = await axios.put(`${backendUrl}/api/Product/updatePrice/${productId}`, {
                newPrice: price,  // Stuur de nieuwe prijs direct als eigenschap van het object
            }, {
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            });

            // Check the response and handle accordingly
            if (response.status === 200) {
                console.log('Product updated successfully!');
                window.alert('Product price updated succesfully!');
                // Optionally, you can redirect to another page or perform other actions after updating
            } else {
                console.error('Failed to update product:', response.data);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
};

export default ProductService;