# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

---

## 📄 Creator and License

**Author:** Florencio Jorge Vilca Taipe  
**Contact:** jorgevilcataipe@gmail.com  
**Copyright:** © 2025 Florencio Jorge Vilca Taipe. All rights reserved.

This project was created by Florencio Jorge Vilca Taipe and is protected by copyright.

The source code is provided **only for personal, educational, or testing use**.  
Any of the following actions are **strictly prohibited without the author's explicit written permission**:

1. 🚫 **Commercial Use** – Selling, sublicensing, or using the code in products or services that generate revenue.
2. 🚫 **Redistribution** – Sharing the code (original or modified) through any public or private platform.
3. 🚫 **Plagiarism** – Claiming authorship or presenting this work as your own.

If you wish to use this code for commercial purposes, you **must contact the author** to obtain a license or reach a prior agreement.

---

### ⚖️ Legal Notice

Unauthorized commercial use, redistribution, or plagiarism of this software may result in legal action, including claims for damages and retroactive licensing fees.



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
