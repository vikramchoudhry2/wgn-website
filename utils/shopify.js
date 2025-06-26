import Client from 'shopify-buy';

// Initialize the Shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Fetch all products
export const fetchProducts = async () => {
  try {
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch a single product by handle
export const fetchProduct = async (handle) => {
  try {
    const product = await client.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Create a checkout
export const createCheckout = async () => {
  try {
    const checkout = await client.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};

// Add line items to checkout
export const addToCheckout = async (checkoutId, lineItemsToAdd) => {
  try {
    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    return checkout;
  } catch (error) {
    console.error('Error adding to checkout:', error);
    return null;
  }
};

// Update line items in checkout
export const updateCheckout = async (checkoutId, lineItemsToUpdate) => {
  try {
    const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    return checkout;
  } catch (error) {
    console.error('Error updating checkout:', error);
    return null;
  }
};

// Remove line items from checkout
export const removeFromCheckout = async (checkoutId, lineItemIdsToRemove) => {
  try {
    const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove);
    return checkout;
  } catch (error) {
    console.error('Error removing from checkout:', error);
    return null;
  }
};

// Fetch checkout
export const fetchCheckout = async (checkoutId) => {
  try {
    const checkout = await client.checkout.fetch(checkoutId);
    return checkout;
  } catch (error) {
    console.error('Error fetching checkout:', error);
    return null;
  }
};

export default client; 