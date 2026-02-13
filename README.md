# 💰 Shared Expense Tracker

A modern, multilingual expense tracking application built with React and TypeScript. Perfect for tracking personal expenses, shared costs, and managing budgets across multiple currencies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

## ✨ Features

### 🌍 Multilingual Support
- **English**, **Deutsch**, and **Tiếng Việt**
- Seamless language switching
- Localized date and currency formats

### 💵 Multi-Currency Support
- EUR (€), USD ($), VND (₫)
- Automatic currency conversion
- Real-time exchange rate calculations
- Per-person cost splitting

### 📊 Category Management
- Custom categories with emoji icons
- Auto-categorization with keyword rules
- Category-based expense grouping
- Visual category totals

### 🎨 Customizable Appearance
- Light/Dark mode toggle
- 12 preset accent colors
- Custom color picker
- Live preview of changes

### 📁 Import/Export
- CSV import and export
- Invoice upload (text/PDF parsing)
- Mastercard invoice auto-parsing
- Batch data management

### ⚡ Advanced Features
- Bulk expense entry (separate with `;` or `+`)
- Search and filter expenses
- Batch edit selected expenses
- Inline expense editing
- Per-person cost calculation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Project Structure

```
expense-tracker/
├── src/
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (via CDN)
- **LocalStorage** - Data persistence


## 📖 Usage Guide

### Adding Expenses

1. **Single expense**: Enter description and amount
2. **Multiple expenses**: Separate with `;` or `+`

```
Description: Coffee; Lunch; Dinner
Amount: 3.50; 12.00; 25.00
```


### Auto-Categorization

Set up keyword rules in Settings → Categories:

```
Supermarkt: rewe, kaufland, aldi, lidl
Eating Out: restaurant, pizza, burger, kfc
```


### Importing Invoices

Upload Mastercard text invoices for automatic parsing:

- Extracts date, description, and amount
- Auto-categorizes based on your rules
- Supports German invoice format


### Batch Editing

1. Select expenses using checkboxes
2. Batch edit panel appears at top
3. Change description or category for all selected
4. Apply changes

### CSV Export

Downloads expenses in Excel-compatible format:

- Grouped by category
- Includes formulas for totals
- Per-person calculations
- Filename includes date range


## 🎨 Customization

### Accent Colors

**Preset Colors:**

- Pink (\#F1C4D9) - Default
- Blue (\#4A90E2)
- Purple (\#9B59B6)
- Green (\#2ECC71)
- Orange (\#E67E22)
- Red (\#E74C3C)
- Teal (\#1ABC9C)
- Indigo (\#6C63FF)
- Coral (\#FF6B6B)
- Amber (\#FFA726)
- Cyan (\#00BCD4)
- Lime (\#8BC34A)


### Custom Categories

1. Open Settings → Categories
2. Click "Add New Category"
3. Choose name, icon (from 80+ emojis), and note
4. Set auto-categorization keywords

### Themes

Toggle between light and dark mode using the sun/moon icon in the header.

## 💾 Data Persistence

All data is stored locally in your browser using LocalStorage:

- Expenses
- Categories
- Category rules
- Theme preferences
- Accent color

**Note**: Data persists across sessions but is browser-specific.

## 🌐 Supported Languages

| Language | Code | Status |
| :-- | :-- | :-- |
| English | `en` | ✅ Complete |
| Deutsch | `de` | ✅ Complete |
| Tiếng Việt | `vi` | ✅ Complete |

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+


## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```


## 📊 CSV Format

**Import Format:**

```csv
ID,Description,Date,Amount,Currency,Original Amount,Category,Per Person
1,Coffee,2024-01,3.50,EUR,3.50 EUR,eating_out,1.75
```

**Export Format:**

- Grouped by category
- Category totals with formulas
- Grand total calculation
- Per-person breakdown


## 🐛 Troubleshooting

### Data not persisting

- Check browser LocalStorage permissions
- Clear cache and reload
- Ensure third-party cookies are not blocked


### Invoice parsing fails

- Ensure text format (convert PDF to TXT)
- Check for German Mastercard format
- Verify date format: DD.MM.YYYY


### Currency conversion incorrect

- Rates are hardcoded (EUR: 25000, USD: 23000, VND: 1)
- Update rates in `currencies` object for current values


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [React](https://react.dev/) - UI framework


## 📞 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com


## 🗺️ Roadmap

- [ ] Backend integration with API
- [ ] Real-time currency exchange rates
- [ ] Cloud sync across devices
- [ ] Mobile app (React Native)
- [ ] Receipt photo scanning with OCR
- [ ] Budget alerts and notifications
- [ ] Chart visualizations
- [ ] Recurring expenses
- [ ] Multi-user shared expenses
- [ ] Export to PDF

---

**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!

```

## 🎯 Bonus: LICENSE File

Tạo file `LICENSE`:

```

MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## 📝 Bonus: .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# Cache
.cache/
.parcel-cache/
.eslintcache
```


## 🚀 Bonus: package.json Scripts

Thêm vào `package.json`:

```json
{
  "name": "expense-tracker",
  "version": "1.0.0",
  "description": "Multilingual expense tracking app",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx"
  },
  "keywords": [
    "expense-tracker",
    "budget",
    "finance",
    "react",
    "typescript"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

Bạn muốn tôi tạo thêm:

1. **CONTRIBUTING.md** - Hướng dẫn contribute chi tiết?
2. **CHANGELOG.md** - Version history?
3. **Screenshots** cho README?
4. **GitHub Actions** - CI/CD workflow?
5. **Docker setup** - Containerization? 🐳
