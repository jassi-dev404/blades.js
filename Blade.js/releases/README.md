# Releases

This folder contains the built application packages.

## How to Build

### macOS (DMG + ZIP)
```bash
npm run electron:build:mac
```

### Windows (EXE installer)
```bash
npm run electron:build:win
```

### Both macOS and Windows
```bash
npm run electron:build:all
```

## Development

Run the app in development mode:
```bash
npm run electron:dev
```

## Output Files

After building, you'll find:
- **macOS**: `Blade.js-{version}.dmg` and `Blade.js-{version}-mac.zip`
- **Windows**: `Blade.js Setup {version}.exe`
