# Fluid Typography Conversion Guide

This guide helps you convert fixed text sizes to device-responsive fluid typography.

## Quick Conversion Reference

### Replace Fixed Tailwind Classes:
```
OLD (Fixed) → NEW (Fluid)
text-xs → text-responsive-xs or text-small
text-sm → text-responsive-sm or text-small  
text-base → text-responsive-base or text-body
text-lg → text-responsive-lg or text-body
text-xl → text-responsive-xl
text-2xl → text-responsive-2xl
text-3xl → text-responsive-3xl or heading-card
text-4xl → text-responsive-4xl or heading-section
text-5xl → text-responsive-5xl or heading-section
text-6xl → text-responsive-6xl or heading-hero
text-7xl → text-responsive-7xl or heading-hero  
text-8xl → text-responsive-8xl or heading-hero
text-9xl → text-responsive-9xl
```

### Replace Responsive Classes:
```
OLD: text-4xl md:text-6xl → NEW: heading-hero
OLD: text-3xl md:text-4xl → NEW: heading-section  
OLD: text-2xl md:text-3xl → NEW: heading-card
OLD: text-lg md:text-xl → NEW: text-body
OLD: text-sm md:text-base → NEW: text-small
```

## Pre-built Semantic Classes

### For Headings:
- `heading-hero` - Main page titles (clamp 2.5rem → 6rem)
- `heading-section` - Section headings (clamp 1.875rem → 3rem)  
- `heading-card` - Card/component titles (clamp 1.25rem → 1.875rem)

### For Body Text:
- `text-body` - Main content text (clamp 1rem → 1.25rem)
- `text-small` - Small text, captions (clamp 0.875rem → 1rem)

## Benefits

✅ **Device-Responsive** - Text automatically scales with screen size  
✅ **User Preference Support** - Respects device text size settings  
✅ **Accessibility** - Works with zoom and assistive technologies  
✅ **Performance** - Uses CSS clamp() for smooth scaling  
✅ **Consistent** - Maintains design proportions across all devices

## Examples

### Before:
```jsx
<h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
  Hero Title
</h1>
<p className="text-lg md:text-xl">
  Description text
</p>
```

### After:
```jsx
<h1 className="heading-hero font-bold">
  Hero Title  
</h1>
<p className="text-body">
  Description text
</p>
```

## Migration Tips

1. Start with headings and hero sections first
2. Use semantic classes (heading-hero, text-body) for consistency
3. Test on multiple device sizes 
4. Check with different browser zoom levels
5. Use responsive classes for fine-tuning if needed

The new system ensures your text looks great on all devices while respecting user preferences! 