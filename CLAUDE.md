# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StrongPlan is a static web application for generating strength training routines based on 1RM (one-rep max) values. The site is in Korean and includes:
- A workout routine generator supporting multiple programs (Starting Strength, 5/3/1, Texas Method, GZCL, nSuns LP)
- An AI-powered squat video analysis tool using MediaPipe Pose

## Architecture

### Core Files
- `app.js` - Main application logic for the workout generator, including all program algorithms and routine display
- `nav.js` - SPA-like navigation system that swaps page content without full reloads
- `styles.css` - Global styles with CSS variables for theming

### Page Structure
Pages follow a shared layout pattern:
- Navbar with site-wide navigation
- `page-hero` header section
- `page-content` main section with id `content-root` (required for SPA navigation)
- Footer with legal links

The `nav.js` IIFE intercepts link clicks and performs fetch-based content swaps for same-origin `.html` files. It syncs the `<style id="page-style">` element and calls `window.initToolPage()` after content swap.

### Workout Generator (`/tool/workout-generator.html`)
- Program selection via clickable cards storing program ID in `data-program`
- Form inputs: 4 lift 1RMs, experience level, training days
- `generateRoutine()` dispatches to program-specific generators (e.g., `generate531()`)
- Each generator calculates Training Max (TM = 1RM × 0.85-0.9) and produces multi-week structured data
- `displayRoutine()` renders the routine and stores it in `window.currentRoutine`
- PDF export via `window.print()` with print-specific CSS styles

### Squat Video Analysis (`/squat-video-analysis.html`)
- Uses MediaPipe Pose for real-time pose estimation
- Auto-detects camera angle (side vs front) via landmark voting over first 60 frames
- Tracks squat phases (standing → descending → bottom → ascending) and counts reps
- Provides coaching feedback with problem/cause/cue/drill structure
- Coupang affiliate ad triggered after detecting repeated depth issues

## Development

This is a static site with no build step. To develop:
1. Serve the files with any static server (e.g., `npx serve`, VS Code Live Server, Python `http.server`)
2. Open in browser and test changes directly

### External Dependencies (CDN-loaded)
- Bootstrap 5.3.2 (CSS and JS, used on tool page)
- Google Fonts (Oswald, Work Sans, Noto Sans KR)
- MediaPipe Pose (for video analysis)
- html2pdf.js (for PDF generation)

### Key Conventions
- All pages use Korean language (`lang="ko"`)
- CSS uses custom properties defined in `:root` (--primary, --secondary, --accent, --bg, --text, --border)
- Global variables are attached to `window` to survive SPA navigation (`window.selectedProgram`, `window.currentRoutine`, `window.initToolPage`)
- Page-specific styles go in `<style id="page-style">` for SPA sync

### TODOs in Code
- Canonical URLs need updating when domain is finalized (marked with `<!-- TODO: -->`)
