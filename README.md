# Smart Stream TV V2

This is a second version of Smart Stream TV web app to browse and watch TV channels with other features.

🔗 **Live demo:** https://mohammed-d-1427.github.io/smart-stream-tv-v2



## About

This project was an assignment of a Sprint in YouCode school, and it was a very good idea to desplay and whatch TV channels in a web app, and this is the second version

## Features

- Move channels to favorites.
- Move channels to blacklist.
- Show the last 5 watched channels.
- Create a new channel and add it to MockAPI.
- Delete a channel from MockAPI.
- Channel list loaded from MockAPI
- Search by channel name/channel number
- Filters by category
- Responsive UI built with Tailwind CSS

## Tech Stack

- HTML5
- Tailwind CSS
- JavaScript (vanilla, modular)
- GitHub Pages + GitHub Actions (CI/CD)


### Prerequisites
- Node.js (v18 or later)

### Installation

```bash
git clone https://github.com/MOHAMMED-D-1427/smart-stream-tv-v2.git
cd REPO-NAME
npm install
npm run build
npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css --watch
```

Then open `index.html` in your browser (or use a local server such as the VS Code Live Server extension).

## Project Structure

```
├── .github/workflows/   # Deployment workflow (deploy.yml)
├── assets/              # Icons and images
├── css/                 # style.css (input) and output.css (Tailwind build)
├── data/                # channels.json(It wast for testing)
├── js/
│   ├── app.js           # App entry point
│   ├── filter.js        # Filtering logic
│   ├── search.js        # Search logic
│   └── ui.js            # UI rendering
│   └── add.js           
│   └── update.js           
│   └── delete.js            
├── services/
│   └── api.js           # Data fetching
├── index.html
├── package.json
└── README.md
```

## Git Workflow

- `main`: stable version
- `develop`: integration branch
- `features/*`: one branch per feature
- Commits follow: `feat:`, `fix:`, `style:`, `docs:`

## Author

**Mohammed Darkaoui**
GitHub: [@MOHAMMED-D-1427](https://github.com/MOHAMMED-D-1427)