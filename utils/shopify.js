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
  console.log('🆕 Creating Shopify checkout...');
  console.log('🏪 Domain:', process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN);
  console.log('🔑 Token present:', !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  
  try {
    const checkout = await client.checkout.create();
    console.log('✅ Checkout created successfully:', {
      id: checkout.id,
      webUrl: checkout.webUrl,
      ready: checkout.ready
    });
    return checkout;
  } catch (error) {
    console.error('❌ Error creating checkout:', error);
    console.error('❌ Error details:', {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError
    });
    return null;
  }
};

// Add line items to checkout
export const addToCheckout = async (checkoutId, lineItemsToAdd) => {
  console.log('🛒 addToCheckout called:', { checkoutId, lineItemsToAdd });
  
  if (!checkoutId) {
    console.error('❌ No checkout ID provided');
    return null;
  }
  
  if (!lineItemsToAdd || lineItemsToAdd.length === 0) {
    console.error('❌ No line items to add');
    return null;
  }
  
  try {
    // Ensure variant IDs are properly formatted
    const formattedLineItems = lineItemsToAdd.map(item => ({
      variantId: item.variantId,
      quantity: parseInt(item.quantity) || 1,
    }));
    
    console.log('📦 Formatted line items:', formattedLineItems);
    
    const checkout = await client.checkout.addLineItems(checkoutId, formattedLineItems);
    console.log('✅ Shopify checkout response:', checkout);
    console.log('📦 Line items in response:', checkout.lineItems?.length || 0);
    
    if (checkout.lineItems && checkout.lineItems.length > 0) {
      console.log('📦 Cart items details:', checkout.lineItems.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        variantId: item.variant?.id
      })));
    }
    
    return checkout;
  } catch (error) {
    console.error('❌ Shopify addToCheckout error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError
    });
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