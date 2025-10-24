# UI Features & Design Guide

## 🎨 Visual Design System

### Color Palette

#### Primary Colors
- **Blue**: `#3b82f6` - Main accent, buttons, highlights
- **Purple**: `#8b5cf6` - Secondary accent, gradients
- **Green**: `#22c55e` - Success, correct answers

#### Status Colors
- **Red**: `#ef4444` - Errors, incorrect answers
- **Yellow**: `#eab308` - Warnings, achievements
- **Orange**: `#f97316` - Leaderboard, rankings

#### Background Colors
- **Dark Slate**: `#0f172a` - Primary background
- **Slate 800**: `#1e293b` - Cards, containers
- **Slate 700**: `#334155` - Hover states

### Typography

#### Font Stack
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

#### Font Sizes
- **H1**: 2.25rem (36px) - Page titles
- **H2**: 1.875rem (30px) - Section headers
- **H3**: 1.5rem (24px) - Subsections
- **Body**: 1rem (16px) - Regular text
- **Small**: 0.875rem (14px) - Labels, hints

#### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels
- **Semibold**: 600 - Buttons, highlights
- **Bold**: 700 - Headings

## 🎬 Animation System

### Page Transitions
```javascript
// Fade in on load
gsap.from('main', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
});
```

### Button Interactions
```javascript
// Ripple effect on click
gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1
});
```

### Hover Effects
```css
/* Scale on hover */
transform: scale(1.05);
transition: all 0.3s ease;
```

### Staggered Animations
```javascript
// Animate list items with delay
gsap.from('tbody tr', {
    opacity: 0,
    x: -20,
    stagger: 0.05,
    duration: 0.5
});
```

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Larger touch targets (48px minimum)
- Simplified navigation
- Full-width cards

### Tablet (640px - 1024px)
- Two column layouts
- Balanced spacing
- Optimized navigation
- Medium-sized cards

### Desktop (> 1024px)
- Multi-column layouts
- Compact spacing
- Full navigation
- Optimized card sizes

## 🎯 Component Styles

### Buttons

#### Primary Button
```html
<button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
    hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold 
    text-white transition-all transform hover:scale-105 active:scale-95">
    Action
</button>
```

#### Secondary Button
```html
<button class="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg 
    font-semibold text-white transition-all">
    Secondary
</button>
```

### Cards

#### Standard Card
```html
<div class="bg-slate-800 bg-opacity-80 backdrop-blur-xl rounded-xl 
    p-6 border border-slate-700 hover:border-blue-500 transition-all">
    Content
</div>
```

#### Stat Card
```html
<div class="bg-slate-800 rounded-xl p-6 border border-slate-700 
    hover:border-blue-500 transition-all transform hover:scale-105">
    <div class="text-4xl font-bold text-blue-400">Value</div>
    <div class="text-slate-400 text-sm">Label</div>
</div>
```

### Input Fields

#### Text Input
```html
<input type="text" class="w-full px-4 py-3 bg-slate-700 border 
    border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 
    focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all 
    text-white placeholder-slate-500">
```

### Tables

#### Leaderboard Table
```html
<table class="w-full">
    <thead class="bg-slate-900 border-b border-slate-700">
        <tr>
            <th class="text-left py-4 px-6 text-slate-300 font-semibold">
                Column
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="border-b border-slate-700 hover:bg-slate-700 
            hover:bg-opacity-50 transition-colors">
            <td class="py-4 px-6">Data</td>
        </tr>
    </tbody>
</table>
```

## 🎨 Gradient Effects

### Text Gradient
```css
background: linear-gradient(135deg, #3b82f6, #8b5cf6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Background Gradient
```css
background: linear-gradient(to br, #0f172a, #1e293b, #0f172a);
```

### Button Gradient
```css
background: linear-gradient(to right, #3b82f6, #8b5cf6);
```

## ✨ Glass Morphism

### Card with Glass Effect
```css
background: rgba(15, 23, 42, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(148, 163, 184, 0.1);
```

## 🎯 Interactive States

### Focus State
```css
outline: 2px solid #3b82f6;
outline-offset: 2px;
```

### Hover State
```css
background-color: rgba(59, 130, 246, 0.1);
border-color: #3b82f6;
transform: translateY(-2px);
```

### Active State
```css
transform: scale(0.95);
opacity: 0.9;
```

### Disabled State
```css
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

## 📊 Data Visualization

### Progress Bar
```html
<div class="w-full bg-slate-700 rounded-full h-2">
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 
        h-2 rounded-full" style="width: 75%"></div>
</div>
```

### Stat Display
```html
<div class="text-4xl font-bold text-blue-400">85</div>
<div class="text-slate-400 text-sm">WPM</div>
```

## 🎬 Animation Timing

### Standard Durations
- **Quick**: 0.1s - 0.2s (button clicks)
- **Normal**: 0.3s - 0.5s (transitions)
- **Slow**: 0.6s - 0.8s (page loads)
- **Very Slow**: 1s+ (complex animations)

### Easing Functions
- **power2.out** - Smooth deceleration
- **back.out** - Bouncy effect
- **ease-in-out** - Smooth both ways
- **sine.inOut** - Gentle wave

## 🌙 Dark Mode Features

### Advantages
- Reduces eye strain
- Better for extended use
- Modern aesthetic
- Improves focus

### Implementation
- Default dark theme
- Light theme toggle available
- Smooth transitions between themes
- Persistent theme preference

## ♿ Accessibility Features

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for navigation

### Visual Indicators
- Focus rings on all interactive elements
- High contrast text
- Clear error messages
- Status indicators

### Screen Reader Support
- Semantic HTML
- ARIA labels where needed
- Descriptive button text
- Proper heading hierarchy

## 📐 Spacing System

### Padding
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### Margins
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### Gap (Flexbox/Grid)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

---

**Design System Version**: 1.0  
**Last Updated**: October 2024

