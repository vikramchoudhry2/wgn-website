import React, { useState } from 'react';
import Image from 'next/image';

const ProductCard = ({ product, onAddToCart }) => {
  const {
    name,
    description,
    price,
    image,
    previewImages = [],
    badge,
    badgeColor,
    variants = [],
    colors = ['#000000', '#FFFFFF', '#808080', '#FF6B00'], // Default colors if none provided
  } = product;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  // Map color names to real hex codes for swatches
  const colorHexMap = {
    'White / Red': ['#ffffff', '#d32f2f'],
    'White / Blue': ['#ffffff', '#2196f3'],
    'Yellow / Blue': ['#ffd600', '#1976d2'],
    'Black / Gold': ['#212121', '#ffd700'],
    'Chestnut': ['#7B3F00'],
    'Mustard': ['#FFD600'],
    'Army Green': ['#4B5320'],
    'Charcoal Heather': ['#36454F'],
    'White': ['#ffffff'],
    'Pale Pink': ['#FADADD'],
    'Blue Mist': ['#B5C7D3'],
    'Heather Grey': ['#BEBEBE'],
    'Black': ['#000000'],
    // Add more as needed
  };

  // Color-to-image mapping for hoodies
  const hoodieColorImageMap = {
    'Mustard': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/ScreenShot2022-02-14at9.01.19PM.png',
    'Black': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/anamika_black.png',
    'Pale Pink': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/Salmon_Pink.png',
    'Pink': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/anamika_pink.png',
    'Chestnut': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/chestnut_brown.png',
    'Army Green': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/olive_green.png',
    'Heather Grey': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/heather_gray.png',
    'Blue Mist': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/blue_mist.png',
  };
  // Color-to-image mapping for shorts
  const shortsColorImageMap = {
    'Purple / Yellow': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/IMG_7812.jpg',
    'Pink / Black': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/IMG_7814.jpg',
    'Light Blue': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/IMG_7813.jpg',
    'Red / Black': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/products/6eadf08e-d860-4a4b-94e6-163934969492.jpg',
    'Main': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/shorts.png',
    'Black / Gold': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/black_shorts.jpg',
    'White / Blue': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/white_blue_shorts.jpg',
    'Yellow / Blue': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/blue_yellow_shorts.jpg',
    'White / Red': 'https://cdn.shopify.com/s/files/1/0025/6085/2017/files/red_white_shorts.jpg',
    // Add more as needed
  };

  // Helper to get the correct image for selected color
  function getColorImage() {
    if (!selectedColor) return image;
    if (name.toLowerCase().includes('hoodie')) {
      return hoodieColorImageMap[selectedColor] || image;
    }
    if (name.toLowerCase().includes('short')) {
      return shortsColorImageMap[selectedColor] || image;
    }
    return image;
  }

  // Helper to check if colors are valid by looking at variant titles
  const hasValidColors = (() => {
    // If only one variant, no color options
    if (variants.length <= 1) return false;
    
    // Check if variants have different colors by looking at their titles
    const uniqueColors = new Set();
    variants.forEach(variant => {
      const parts = variant.title.split(' / ');
      if (name.toLowerCase().includes('short')) {
        // Shorts format: "L / White / Blue" -> color="White / Blue"
        const color = parts.length > 2 ? `${parts[1]} / ${parts[2]}` : parts[1];
        if (color) uniqueColors.add(color.toLowerCase());
      } else if (name.toLowerCase().includes('hoodie')) {
        // Hoodie format: "L / Army Green" -> color="Army Green"
        const color = parts[1];
        if (color) uniqueColors.add(color.toLowerCase());
      }
    });
    
    // Only show colors if there are actually different color options
    return uniqueColors.size > 1;
  })();

  // Check if product has size variants by looking at variant titles
  const hasValidSizes = variants.length > 1 && variants.some(variant => {
    const parts = variant.title.split(' / ');
    const firstPart = parts[0]?.toLowerCase();
    return ['xs', 's', 'm', 'l', 'xl', 'xxl', '2xl', 'small', 'medium', 'large'].includes(firstPart);
  });

  // Check if this is a single-variant product (like Solepack)
  const isSingleVariantProduct = variants.length === 1;

  // Get actual color options from variants
  const actualColors = (() => {
    if (!hasValidColors) return [];
    
    const colorSet = new Set();
    variants.forEach(variant => {
      const parts = variant.title.split(' / ');
      if (name.toLowerCase().includes('short')) {
        const color = parts.length > 2 ? `${parts[1]} / ${parts[2]}` : parts[1];
        if (color) colorSet.add(color);
      } else if (name.toLowerCase().includes('hoodie')) {
        const color = parts[1];
        if (color) colorSet.add(color);
      }
    });
    
    return Array.from(colorSet);
  })();

  // Set initial color selection
  React.useEffect(() => {
    if (hasValidColors && actualColors.length > 0 && !selectedColor) {
      setSelectedColor(actualColors[0]);
    }
  }, [hasValidColors, actualColors, selectedColor]);

  const handleAddToCart = () => {
    if (variants.length > 0) {
      // For single variant products, just use the only variant
      if (isSingleVariantProduct) {
        const selectedVariant = variants[0];
        console.log('✅ Using single variant for', name, ':', selectedVariant.title);
        onAddToCart(selectedVariant.id, 1);
        setShowQuickView(false);
        return;
      }
      
      // Parse variant title to extract size and color
      const parseVariantTitle = (title) => {
        const parts = title.split(' / ');
        if (name.toLowerCase().includes('short')) {
          // Shorts format: "L / White / Blue" -> size=L, color="White / Blue"
          return {
            size: parts[0],
            color: parts.length > 2 ? `${parts[1]} / ${parts[2]}` : parts[1]
          };
        } else {
          // Hoodie format: "L / Army Green" -> size=L, color="Army Green"
          return {
            size: parts[0],
            color: parts[1]
          };
        }
      };
      
      // Find the variant that matches selected color and size
      let selectedVariant = variants[0]; // Default to first variant
      
      if (selectedSize || selectedColor) {
        // Try to find exact match by parsing variant titles
        const exactMatch = variants.find(variant => {
          const parsed = parseVariantTitle(variant.title);
          const sizeMatch = !selectedSize || (parsed.size && parsed.size.toLowerCase() === selectedSize.toLowerCase());
          const colorMatch = !selectedColor || (parsed.color && parsed.color.toLowerCase() === selectedColor.toLowerCase());
          return sizeMatch && colorMatch;
        });
        
        if (exactMatch) {
          selectedVariant = exactMatch;
          console.log('✅ Found exact match for', name, ':', exactMatch.title);
        } else {
          // If no exact match, prioritize size match first
          const sizeMatch = variants.find(variant => {
            const parsed = parseVariantTitle(variant.title);
            return selectedSize && parsed.size && parsed.size.toLowerCase() === selectedSize.toLowerCase();
          });
          
          if (sizeMatch) {
            selectedVariant = sizeMatch;
            console.log('⚠️ Found size match only for', name, ':', sizeMatch.title);
          } else {
            // If no size match, try color match
            const colorMatch = variants.find(variant => {
              const parsed = parseVariantTitle(variant.title);
              return selectedColor && parsed.color && parsed.color.toLowerCase() === selectedColor.toLowerCase();
            });
            
            if (colorMatch) {
              selectedVariant = colorMatch;
              console.log('⚠️ Found color match only for', name, ':', colorMatch.title);
            } else {
              console.log('❌ No matches found for', name, ', using default variant');
            }
          }
        }
      }
      
      onAddToCart(selectedVariant.id, 1);
      setShowQuickView(false); // Close modal after adding to cart
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={getColorImage()}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium text-white rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
          
          {/* Quick View Button */}
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/90 text-black text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Quick View
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-white flex-1 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-500 text-sm mb-2">{description}</p>
          
          {/* Color Swatches */}
          {hasValidColors && (
            <div className="flex gap-2 mb-3">
              {actualColors.map((color) => {
                // Use mapped hex codes if available
                const hex = colorHexMap[color];
                let swatchStyle = {};
                if (hex && hex.length === 2) {
                  swatchStyle = {
                    background: `linear-gradient(90deg, ${hex[0]} 50%, ${hex[1]} 50%)`,
                  };
                } else if (hex && hex.length === 1) {
                  swatchStyle = { backgroundColor: hex[0] };
                } else {
                  // fallback: try to parse color name as before
                  const colorParts = color.split('/').map(c => c.trim());
                  if (colorParts.length === 2) {
                    swatchStyle = {
                      background: `linear-gradient(90deg, ${colorParts[0]} 50%, ${colorParts[1]} 50%)`,
                    };
                  } else {
                    swatchStyle = { backgroundColor: colorParts[0] };
                  }
                }
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform flex-shrink-0 ${
                      selectedColor === color ? 'scale-110 border-gray-900' : 'border-gray-300'
                    }`}
                    style={swatchStyle}
                    title={`Select ${color}`}
                  />
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className="text-lg font-semibold text-gray-900">{price}</span>
            <button
              onClick={() => setShowQuickView(true)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              aria-label={`View ${name}`}
            >
              View Product
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div className="relative aspect-square">
                <Image
                  src={getColorImage()}
                  alt={name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                
                {/* Price */}
                <div className="text-xl font-semibold text-gray-900 mb-6">
                  {price}
                </div>

                {/* Color Selection */}
                {hasValidColors && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                    <div className="flex gap-2">
                      {actualColors.map((color) => {
                        // Use mapped hex codes if available
                        const hex = colorHexMap[color];
                        let swatchStyle = {};
                        if (hex && hex.length === 2) {
                          swatchStyle = {
                            background: `linear-gradient(90deg, ${hex[0]} 50%, ${hex[1]} 50%)`,
                          };
                        } else if (hex && hex.length === 1) {
                          swatchStyle = { backgroundColor: hex[0] };
                        } else {
                          // fallback: try to parse color name as before
                          const colorParts = color.split('/').map(c => c.trim());
                          if (colorParts.length === 2) {
                            swatchStyle = {
                              background: `linear-gradient(90deg, ${colorParts[0]} 50%, ${colorParts[1]} 50%)`,
                            };
                          } else {
                            swatchStyle = { backgroundColor: colorParts[0] };
                          }
                        }
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform flex-shrink-0 ${
                              selectedColor === color ? 'scale-110 border-gray-900' : 'border-gray-300'
                            }`}
                            style={swatchStyle}
                            title={`Select ${color}`}
                          />
                        );
                      })}
                    </div>
                    {selectedColor && (
                      <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
                    )}
                  </div>
                )}

                {/* Size Selection */}
                {hasValidSizes && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {(name.toLowerCase().includes('short') 
                        ? ['S', 'M', 'L', 'XL', 'XXL'] 
                        : name.toLowerCase().includes('hoodie')
                        ? ['XS', 'S', 'M', 'L', 'XL', 'XXL']
                        : ['S', 'M', 'L', 'XL']
                      ).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                            selectedSize === size 
                              ? 'border-gray-900 bg-gray-900 text-white' 
                              : 'border-gray-600 bg-gray-100 text-gray-900 hover:border-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Add to Cart {selectedSize && hasValidSizes && `(${selectedSize})`}
                </button>

                {/* Product Features */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    {name.toLowerCase().includes('hoodie') ? 'Size Guide & Details' : 'Features'}
                  </h3>
                  
                  {name.toLowerCase().includes('hoodie') ? (
                    <div className="space-y-4 text-sm text-gray-600">
                      {/* Chest Measurements */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Chest (1" below armhole):</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span>XS: 18"</span>
                          <span>S: 20"</span>
                          <span>M: 22"</span>
                          <span>L: 24"</span>
                          <span>XL: 26"</span>
                          <span>2XL: 28"</span>
                        </div>
                      </div>
                      
                      {/* Body Length */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Body Length:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span>XS: 26"</span>
                          <span>S: 27"</span>
                          <span>M: 28"</span>
                          <span>L: 29"</span>
                          <span>XL: 30"</span>
                          <span>2XL: 31"</span>
                        </div>
                      </div>
                      
                      {/* Fabric */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Fabric:</h4>
                        <p className="text-sm">80% Ringspun Cotton, 20% Polyester — for a soft, durable, and comfortable fit.</p>
                      </div>
                      
                      {/* Additional Features */}
                      <div className="pt-2 border-t border-gray-100">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Premium ringspun cotton blend
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Designed for performance & comfort
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Durable construction
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Premium materials
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Designed for performance
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Sustainable production
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard; 