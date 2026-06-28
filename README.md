# Wyze Bundle Builder

A step-by-step security system bundle builder built with React, Vite, and Tailwind CSS.

---

## Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Start the dev server**
```bash
npm run dev
```

**3. Open in browser**
```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── data/
│   └── products.json        # All products, prices, and image paths
├── hooks/
│   └── useBundleBuilder.js  # Main state logic
├── context/
│   └── BundleContext.jsx    # Shares state across components
├── components/
│   ├── Accordion/           # 4-step accordion (cameras, plan, sensors, accessories)
│   ├── ProductCard/         # Product card with stepper and variants
│   ├── VariantSelector/     # Color/variant picker
│   ├── QuantityStepper/     # +/- quantity control
│   ├── ReviewPanel/         # Live order summary sidebar
│   └── Buttons/             # Shared button components
├── layout/
│   └── BuilderLayout.jsx    # Page layout (desktop side-by-side, mobile stacked)
└── utils/
    ├── calculateTotals.js   # Subtotal, savings, grand total
    ├── formatCurrency.js    # $0.00 formatting
    ├── storage.js           # localStorage save/load
    ├── productHelpers.js    # Selection state helpers
    └── reviewHelpers.js     # Builds review panel groups
```

---

## Adding Images & Icons

Drop your files into the `public/` folder. Paths are set in `src/data/products.json`.

---

## Customizing Products

Edit `src/data/products.json` to change names, prices, variants, or image paths. The UI rebuilds from JSON automatically — no component changes needed.

---

## Tech Stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v3](https://tailwindcss.com)