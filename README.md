# Precision Scientific & Unit Hub

A high-performance, responsive Scientific Calculator & Unit Converter web application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dual-Mode Interface**: Easily toggle between a full-featured Scientific Calculator and a robust Unit Converter.
- **Scientific Calculator**: Supports basic arithmetic, trigonometry (sin, cos, tan), logarithms (log, ln), square roots, exponents, and constants (π, e). Includes calculation history.
- **Unit Converter**:
  - **Weight**: Convert between kg, grams, pounds, and ounces.
  - **Measurement**: Convert between meters, kilometers, feet, inches, and miles.
- **Glassmorphic Design**: A modern "Glassmorphism" aesthetic with smooth animations powered by `motion`.
- **Theme System**: Sleek Dark/Light mode toggle that persists in local storage.
- **Multilingual Support**: Supports English, Tagalog, and Spanish with instant UI updates.
- **Responsive & Accessible**: Fully optimized for mobile and desktop, with ARIA labels and keyboard navigation support.

## Getting Started

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to `http://localhost:3000` in your browser.

### Deployment

To deploy this application to **Netlify**:

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Upload the `dist` folder**:
   Drag and drop the generated `dist` folder into the Netlify "Deploy" area, or connect your repository for continuous deployment.

## Technical Details

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Logic**: Custom expression evaluation in `src/lib/mathUtils.ts`.

## Evaluation Logic

The calculator uses a sanitized `Function` constructor approach for high-performance evaluation of mathematical expressions, replacing visual symbols with standard JavaScript Math object calls.
