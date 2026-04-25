import fs from 'fs';
const releases = 'releases';
if (fs.existsSync(releases)) {
  fs.readdirSync(releases).forEach(f => {
    if (f.endsWith('.dmg') || f.endsWith('.exe')) return;
    fs.rmSync(releases + '/' + f, { recursive: true, force: true });
  });
}