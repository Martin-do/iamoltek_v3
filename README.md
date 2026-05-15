# iamoltek — Oyewale Areoye Personal Website

Vite + React personal brand website for Oyewale Areoye (@iamoltek).

## Project Structure

```
src/
├── assets/           ← All images go here
│   ├── logo-white.png
│   ├── logo-light.png
│   ├── hero-portrait.png
│   ├── atobase-honour.jpeg
│   ├── initiative-logo.jpg
│   └── initiative-impact.jpg
│
├── components/
│   ├── Nav.jsx / Nav.module.css
│   └── Footer.jsx / Footer.module.css
│
├── pages/
│   ├── Home.jsx / Home.module.css
│   ├── About.jsx / About.module.css
│   ├── Initiative.jsx / Initiative.module.css
│   ├── Atobase.jsx / Atobase.module.css
│   └── Contact.jsx / Contact.module.css
│
├── App.jsx           ← Routes live here
├── main.jsx          ← Entry point
└── index.css         ← Global styles + design tokens
```

## Setup

### If this is a new project:
```bash
npm install
npm run dev
```

### If dropping into an existing Vite/React project:
1. Copy the `src/` folder contents into your existing `src/`
2. Copy `src/assets/` images into your `src/assets/`
3. Make sure `react-router-dom` is installed:
   ```bash
   npm install react-router-dom
   ```
4. Update your `main.jsx` to render `<App />` from `App.jsx`
5. Add the Google Fonts link to your `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400;500&family=Jost:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
   ```
6. Import `index.css` in your `main.jsx`

## Adding More Images

Drop new images into `src/assets/` and import them in the relevant page:
```jsx
import myNewPhoto from '../assets/my-new-photo.jpg'
```

## Design Tokens (index.css)

All colours live as CSS custom properties in `index.css`:
- `--charcoal` / `--charcoal-2` — Dark backgrounds
- `--gold` / `--gold-light` — Gold accents
- `--burg` / `--burg-light` — Burgundy (Initiative brand)
- `--cream` / `--ivory` — Light backgrounds
- `--muted` — Grey text

## Routes
| Path          | Page       |
|---------------|------------|
| `/`           | Home       |
| `/about`      | About      |
| `/initiative` | Initiative |
| `/atobase`    | Atobase    |
| `/contact`    | Contact    |
