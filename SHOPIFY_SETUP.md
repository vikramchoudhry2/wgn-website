# Shopify Integration Setup Guide

This guide will help you integrate your Shopify store with the WeGotNext website.

## Prerequisites

1. A Shopify store (you can create one at [shopify.com](https://shopify.com))
2. Products added to your Shopify store
3. Basic understanding of environment variables

## Step 1: Create a Shopify Private App

1. **Log into your Shopify Admin**
   - Go to your Shopify admin panel
   - Navigate to **Apps** > **App and sales channel settings**

2. **Create a Private App**
   - Click **Develop apps for your store**
   - Click **Create an app**
   - Enter app name: "WeGotNext Website"
   - Click **Create app**

3. **Configure API Access**
   - Click **Configure Storefront API scopes**
   - Enable the following permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_read_selling_plans`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`

4. **Generate Access Token**
   - Click **Install app**
   - Copy the **Storefront access token** (you'll need this)

## Step 2: Configure Environment Variables

1. **Create Environment File**
   ```bash
   cp shopify.env.example .env.local
   ```

2. **Add Your Shopify Credentials**
   Open `.env.local` and add:
   ```env
   NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

   Replace:
   - `your-shop-name` with your actual Shopify store name
   - `your-storefront-access-token` with the token from Step 1

## Step 3: Add Products to Shopify

1. **Go to Products in Shopify Admin**
   - Navigate to **Products** > **All products**
   - Click **Add product**

2. **Create Your Products**
   Add products that match your current offerings:
   - WeGotNext Shorts v3
   - WeGotNext Hoodie
   - WeGotNext Shirt
   - Hoop Pack

3. **Important Product Settings**
   - Add high-quality product images
   - Set accurate pricing
   - Add detailed descriptions
   - Configure inventory tracking
   - Set up variants (sizes, colors) if needed

## Step 4: Test the Integration

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Visit the Shop Page**
   - Go to `http://localhost:3000/shop`
   - You should see your Shopify products loaded
   - The demo mode banner should disappear

3. **Test Cart Functionality**
   - Click "Add to Cart" on any product
   - Click the cart icon in the navigation
   - Verify items appear in the cart
   - Test the checkout process

## Step 5: Customize Product Display

The integration automatically maps Shopify products to your existing design. You can customize the mapping in `pages/shop.js`:

```javascript
const transformedProducts = shopifyProducts.map((product, index) => ({
  id: product.id,
  name: product.title,
  description: product.description || 'Premium WeGotNext product',
  price: product.variants[0]?.price ? `$${product.variants[0].price.amount}` : 'Price TBD',
  image: product.images[0]?.src || fallbackProducts[index % fallbackProducts.length].image,
  // ... customize other fields
}));
```

## Features Included

✅ **Product Display**: Automatic loading of Shopify products  
✅ **Shopping Cart**: Add, remove, and update cart items  
✅ **Checkout**: Secure Shopify checkout process  
✅ **Inventory Management**: Real-time inventory tracking  
✅ **Mobile Responsive**: Cart works on all devices  
✅ **Fallback Mode**: Graceful degradation if Shopify is unavailable  

## Troubleshooting

### Products Not Loading
- Check your environment variables are correct
- Verify your Storefront API permissions
- Check the browser console for errors

### Cart Not Working
- Ensure the CartProvider is properly wrapped around your app
- Check that products have valid variants
- Verify checkout creation is successful

### Checkout Issues
- Make sure your Shopify store is not password protected
- Verify checkout permissions in your private app
- Check that your domain is properly configured

## Advanced Configuration

### Custom Product Fields
You can add custom fields by modifying the product transformation:

```javascript
// Add custom badges based on Shopify tags
badge: product.tags.includes('new') ? 'New Arrival' : 
       product.tags.includes('bestseller') ? 'Best Seller' : '',
```

### Inventory Tracking
Enable real-time inventory updates:

```javascript
// Check if product is in stock
inStock: product.variants[0]?.available,
inventory: product.variants[0]?.quantityAvailable,
```

### Multiple Variants
Handle size/color variants:

```javascript
// Display all variants
variants: product.variants.map(variant => ({
  id: variant.id,
  title: variant.title,
  price: variant.price.amount,
  available: variant.available,
})),
```

## Support

If you encounter any issues:

1. Check the [Shopify API documentation](https://shopify.dev/api/storefront)
2. Review the browser console for error messages
3. Verify your Shopify store settings
4. Test with a simple product first

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Regularly rotate your API tokens
- Monitor your API usage in Shopify admin

---

Your Shopify integration is now complete! Customers can browse products, add them to cart, and complete purchases through Shopify's secure checkout process. 