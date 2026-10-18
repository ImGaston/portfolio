#!/usr/bin/env node
// Instala, quita o revisa la publicación automática Bear → blog en tu Mac.
//
//   npm run bear:install     → corre bear:publish cada 5 minutos en segundo plano
//   npm run bear:status      → muestra si está activo y las últimas líneas del log
//   npm run bear:uninstall   → lo desactiva
//
// Usa launchd (el programador de tareas de macOS). Sigue corriendo después de reiniciar.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LABEL = 'com.gastoncorbalan.bear-sync';
const PLIST = path.join(os.homedir(), 'Library/LaunchAgents', `${LABEL}.plist`);
const LOG = path.join(os.homedir(), 'Library/Logs/bear-sync.log');
const INTERVAL = Number(process.env.BEAR_SYNC_INTERVAL || 300);
const DOMAIN = `gui/${process.getuid()}`;

const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function launchctl(...args) {
  try {
    return execFileSync('launchctl', args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
  } catch {
    return null;
  }
}

function install() {
  // Corre el mismo node con el que ejecutás este comando (así el permiso de disco
  // va a un solo programa) y con tu PATH actual, para que encuentre git.
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${xml(process.execPath)}</string>
    <string>--no-warnings</string>
    <string>scripts/bear-sync.mjs</string>
    <string>--push</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${xml(ROOT)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>${xml(process.env.PATH || '/usr/bin:/bin')}</string>
  </dict>
  <key>StartInterval</key>
  <integer>${INTERVAL}</integer>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${xml(LOG)}</string>
  <key>StandardErrorPath</key>
  <string>${xml(LOG)}</string>
</dict>
</plist>
`;
  fs.mkdirSync(path.dirname(PLIST), { recursive: true });
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  fs.writeFileSync(PLIST, plist);
  launchctl('bootout', `${DOMAIN}/${LABEL}`);
  if (launchctl('bootstrap', DOMAIN, PLIST) === null) {
    console.error(`No pude activar el agente. Probá a mano:\n  launchctl bootstrap ${DOMAIN} ${PLIST}`);
    process.exit(1);
  }
  console.log(`Listo: Bear se sincroniza con el blog cada ${Math.round(INTERVAL / 60)} minutos.

Último paso (una sola vez): dale "Acceso total al disco" a node para que pueda leer Bear
en segundo plano.
  1. Ajustes del Sistema → Privacidad y seguridad → Acceso total al disco
  2. Botón "+", luego Cmd+Shift+G y pegá esta ruta:
       ${process.execPath}
  3. Activá el interruptor.

Para revisar que funciona:  npm run bear:status
Log completo:               ${LOG}`);
}

function uninstall() {
  launchctl('bootout', `${DOMAIN}/${LABEL}`);
  fs.rmSync(PLIST, { force: true });
  console.log('Publicación automática desactivada.');
}

function status() {
  const info = launchctl('print', `${DOMAIN}/${LABEL}`);
  if (!info) {
    console.log('No está activo. Instalalo con: npm run bear:install');
  } else {
    const field = (name) => info.match(new RegExp(`\\n\\s*${name} = (.*)`))?.[1] ?? '?';
    console.log(`Activo. Corre cada ${field('run interval')}; última salida: ${field('last exit code')}.`);
  }
  if (fs.existsSync(LOG)) {
    const lines = fs.readFileSync(LOG, 'utf8').trimEnd().split('\n');
    console.log(`\nÚltimas líneas de ${LOG}:\n${lines.slice(-15).join('\n')}`);
  }
}

const actions = { install, uninstall, status };
const action = actions[process.argv[2]];
if (!action) {
  console.error('Uso: node scripts/bear-agent.mjs install | uninstall | status');
  process.exit(1);
}
action();
