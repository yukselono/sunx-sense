#!/usr/bin/env node
// briefs/render.mjs — DEPRECATED single-brief renderer.
//
// Use `node briefs/build.mjs` instead (scans briefs/data/*.json, rebuilds
// everything deterministically). This wrapper exists only for backward
// compatibility with the original two-file workflow.

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
console.warn('briefs/render.mjs is deprecated — running briefs/build.mjs instead.');
const r = spawnSync('node', [path.join(HERE, 'build.mjs')], { stdio: 'inherit' });
process.exit(r.status ?? 1);
