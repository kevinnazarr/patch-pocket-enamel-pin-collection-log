---
version: "1.0"
name: "Patch Pocket"
description: "Enamel pin collection log with tactile, playful badge-board aesthetic"
---

## Design System: Patch Pocket

### Colors

- **Primary**: #1a1a1a (near-black for text, dark surfaces)
- **Surface**: #ffffff (card backgrounds, light surfaces)
- **Border**: #e0e0e0 (subtle dividers)
- **Accent**: #ff6b35 (bold action highlights)
- **Gold**: #d4af37 (pin color tag)
- **Silver**: #c0c0c0 (pin color tag)
- **Rainbow**: gradient via multi-stop (pin color tag)
- **Pastel**: #f4d6f0 (pin color tag)
- **Dark**: #2a2a2a (pin color tag)
- **Text Secondary**: #666666 (muted text)

### Typography

- **Font**: System stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **H1**: 28px, weight 700
- **H2**: 20px, weight 700
- **Body**: 16px, weight 400, line-height 1.5
- **Small**: 14px, weight 400
- **Label**: 13px, weight 600

### Spacing

- Base unit: 8px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Radius

- sm: 4px
- md: 8px
- lg: 12px

### Borders

- Default: 2px solid #e0e0e0
- Accent: 3px solid (color-tag specific)
- Focus: 2px solid #ff6b35

### Shadows

- Card: 0 2px 8px rgba(0,0,0,0.08)
- Hover: 0 4px 12px rgba(0,0,0,0.12)
- Modal: 0 8px 32px rgba(0,0,0,0.15)

### Motion

- Base duration: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Hover transitions on interactive elements
- Respect prefers-reduced-motion

### Components

**Button**: Primary accent bg, white text, 2px border, 8px padding, hover shadow lift
**Card**: 2px border (color-tag based), subtle shadow, 12px padding
**Input**: 1px border, 8px padding, focus ring 2px offset
**Badge**: 3px border, color-tag fill, 2px padding, display status badge on owned cards

### Responsive

- Mobile-first approach
- Grid breakpoints: 320px, 768px, 1024px
- No horizontal overflow
- Touch targets: min 44px

### Accessibility

- Semantic HTML: article, section, button, form
- Labels on all inputs
- Focus visible outlines
- Color + text for all meanings
- ARIA labels for icons
- Keyboard navigation support
