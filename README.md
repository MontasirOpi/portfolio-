# ⚔️ SECURE OPERATIONAL MANUAL // DEPLOYMENT_GUIDE_V4.3

**CODENAME**: OPERATOR_PORTFOLIO  
**OPERATIVE**: Fahim Montasir Opi  
**CLASSIFICATION**: CROSS-PLATFORM & FLUTTER SPECIALIST  
**NET_STATUS**: STABLE // READY_FOR_DEPLOYMENT

---

## 🛰️ 1. MISSION BRIEFING
This repository houses the fully overhauled, AAA game-inspired developer portfolio of Associate Software Engineer **Fahim Montasir Opi**. Inspired by the high-tech, cinematic command console HUDs of the **Call of Duty (Modern Warfare & Warzone)** franchise, this site reimagines a traditional technical CV as a military personnel dossier, loadout system, and combat operations command center.

It preserves **100%** of Fahim's background details, including all 10 specialized projects, core work experiences, and academic achievements from his old portfolio, displaying them in a state-of-the-art cinematic web experience.

---

## 🛠️ 2. TECHNICAL LOADOUT (TECH STACK)
* **Core Runtime**: React.js 19 (Blazing fast virtual DOM rendering)
* **Build Engine**: Vite 8 (Ultra-fast module bundling, built in under 500ms)
* **Styling Matrix**: Tailwind CSS v4 (Compiles directly into Vite via the official `@tailwindcss/vite` compiler)
* **Motion Graphics**: Framer Motion (Delivers premium UI sweeps, glides, and cinematic page entry)
* **HUD Synthesizer**: Native Web Audio API (Synthesizes tactical clicks, radar pulses, and radio static programmatically—no external MP3 asset delays)
* **Core Iconography**: Lucide React & React Icons (Clean vectors for HUD detailing)

---

## 📁 3. DIRECTORY SCHEMATICS (FOLDER STRUCTURE)
```text
j:\reatc\
├── public\
│   ├── operator.png          # Cinematic Generated operative dossier photo
│   └── favicon.svg           # High-tech logo badge
├── src\
│   ├── components\
│   │   ├── Preloader.jsx     # Shader-compiling game entry lobby
│   │   ├── Navbar.jsx        # Sticky navigation tabs (Lobby, Dossier, Comms)
│   │   ├── HUDOverlay.jsx    # Live FPS calculator, scroll-bar, and sound manager
│   │   ├── TacticalCursor.jsx# Mouse-tracking crosshair / mobile autodetect
│   │   └── Footer.jsx        # Active scanning radar and system ticks
│   ├── data\
│   │   ├── profile.js        # Personal bio details, education history, and stats
│   │   ├── skills.js         # Technical weapons classifications & attachment metrics
│   │   ├── experience.js     # Professional corporate deployments
│   │   ├── projects.js       # 10 Campaign missions logs (links, codes, stats)
│   │   └── socialLinks.js    # Secure channel SATCOM links
│   ├── sections\
│   │   ├── Hero.jsx          # Cinematic lobby, typewriter loop, rotating SVG sweep
│   │   ├── About.jsx         # Biometrics file dossier folder with interactive tabs
│   │   ├── Skills.jsx        # Custom loadout grid and dynamic details analysis card
│   │   ├── Experience.jsx    # Vertical checkpoint map route timeline
│   │   ├── Projects.jsx      # Mission folder grids with Cinematic Briefing Modal
│   │   ├── Services.jsx      # Specialized capabilities specs
│   │   └── Contact.jsx       # SATCOM Uplink with active terminal encryption logs
│   ├── utils\
│   │   └── audio.js          # Native Web Audio API tactical synthesizer
│   ├── index.css             # Main styling, CRT grid scanning, and custom scrollbars
│   ├── main.jsx              # StrictMode bundle entrypoint
│   └── App.jsx               # Master coordinates router and preloader gate
├── package.json              # System dependencies
├── tailwind.config.js        # Call of Duty matte/neon custom palettes & fonts
├── vite.config.js            # Bundler configurations with compiler extensions
└── README.md                 # Secure Operations Manual
```

---

## 🎮 4. SPECIAL OPERATIONS (FEATURES)
1. **Interactive Entry Preloader**: Compiles shaders, loads satellite arrays, decrypts biometrics, and prompts sound system authorization before dropping the user into the active lobby.
2. **Real-time FPS Calculator**: High-precision frame counters running natively in the top left, displaying browser render cycles.
3. **Web Audio API UI Tones**: Emits programmatic hover ticks, selection sweeps, and satellite static bursts with zero network load.
4. **Interactive Target Radar**: Rotating SVG sectors in the lobby and footer that sweep compass degrees.
5. **Interactive Loadout Analyzer**: Hovering over any skill card in the Loadout screen feeds details live into a side Weapon Spec Analyzer sheet, detailing impact, range, and accuracy bars.
6. **Active Uplink Console**: Submitting a contact card triggers a terminal logger printout, mimicking RSA encryption uploads.
7. **Mobile Combat Mode**: Responsive layouts that gracefully adapt the HUD overlays and cursors to touch coordinates.

---

## 🚀 5. INFILTRATION COORDINATES (LOCAL SETUP)

### Prerequisites
* Ensure **Node.js** (v18+) is installed on your local control server.

### Initial Command Line Routines
1. **Clone the Sector Repository** and enter the directory.
2. **Install Hardware Packages**:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Ignite Local Lobby Server (Development Mode)**:
   ```bash
   npm run dev
   ```
4. **Compile Production Bundle**:
   ```bash
   npm run build
   ```
5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 6. DEPLOYMENT TO CLOUD NETWORKS

### Vercel Deployment (Recommended)
Our codebase is fully modular, complies with strict ES specifications, and builds into a lightweight static site ready for **Vercel** distribution in seconds.
1. Install Vercel CLI globally: `npm install -g vercel`
2. Run command: `vercel`
3. Follow the terminal prompts. Configure the build command as `npm run build` and target output directory as `dist`.
4. Deploy to production: `vercel --prod`

### Netlify Deployment
1. Drag and drop the compiled `/dist` folder directly onto the Netlify Dashboard.
2. Alternatively, connect this repository to your Netlify account and set the build command to `npm run build` with the publish directory set to `dist`.

---

## 🛡️ CREDENTIAL SECURITY
ALL CONTENT DEVELOPED IN THIS DOSSIER BELONGS TO OPERATIVE FAHIM MONTASIR OPI.  
*STANCE // MISSION COMPLETED.*
