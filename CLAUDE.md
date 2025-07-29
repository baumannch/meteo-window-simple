# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a frontend-only single-page application called "Keller Dashboard" that displays weather data and calculates resulting indoor humidity based on outdoor temperature and humidity. The app helps users decide when ventilation makes sense for basement/cellar humidity control.

## Architecture

**Single HTML File Structure**: The entire application is contained in `index.html` with embedded CSS and JavaScript. No build process or external dependencies.

**Core Components**:
- Weather data fetching via CORS proxies
- Indoor humidity calculation using Magnus formula 
- Caching system (1-minute duration)
- Seasonal temperature defaults
- Security features (CSP, input validation, HTML sanitization)
- Responsive layout with optimized grid system

## Key Technical Details

**CORS Proxy System**: Uses multiple fallback proxies to fetch weather data from external APIs:
- `api.codetabs.com` (primary - fastest)
- `api.allorigins.win` (secondary)  
- `thingproxy.freeboard.io` (backup)

**Data Sources**:
- Meteotest API: `https://meteotest.ch/actions/mdxConnector/mdx/MeteotestMeasurements`
- Smart Urban Heat Map: `https://smart-urban-heat-map.ch/api/v2/timeseries?stationId=11059`

**Seasonal Temperature Defaults**:
- Winter (Dec-Feb): 18°C
- Spring/Fall (Mar-May, Sep-Nov): 19°C
- Summer (Jun-Aug): 20°C

**Security Implementation**:
- Content Security Policy with strict domain allowlist
- HTML sanitization for all dynamic content (`sanitizeHTML()`)
- Input validation with realistic temperature ranges (-50°C to 60°C)
- API response validation (`validateApiData()`)

**UI/UX Design**:
- Responsive grid layout: 2 columns (mobile), 2 columns (tablet), 4 columns (desktop ≥900px)
- Modern glassmorphism design with backdrop filters
- Animated status indicators and hover effects
- Optimized control panel with improved input handling
- Consistent color scheme with enhanced accessibility contrasts

## Development

**No Build Process**: Direct file editing and browser refresh for development.

**Testing**: Open `index.html` in browser. Check browser console for CORS proxy performance and API fetch logs.

**Deployment**: Static file hosting (currently GitHub Pages via `CNAME` file pointing to `keller.hochnebel.ch`).

## File Structure

- `index.html` - Main application file
- `old.html` - Previous version (reference only)
- `favicon.ico` - Wind emoji favicon
- `CNAME` - GitHub Pages custom domain configuration

## Important Functions

- `getSeasonalDefaultTemperature()` - Returns season-appropriate indoor temperature
- `validateTemperature()` - Input validation with seasonal fallbacks
- `validateApiData()` - Validates API responses for security/data integrity
- `calculateRelativeHumidity()` - Magnus formula for humidity calculation
- `fetchMeteotestData()` / `fetchSmartUrbanData()` - API data fetching with proxy fallbacks