# Aziz & Suci — Digital Wedding Invitation

Elegant responsive digital wedding invitation website with:
- personalized guest invitations
- realtime guestbook
- RSVP system
- Google Sheets integration
- GitHub Pages deployment
- WhatsApp invitation generator

---

# Live Website

```text
https://ih-11.github.io/aziz-suci/
```

Example personalized invitation:

```text
https://ih-11.github.io/aziz-suci/?to=Ibnu%20Halim
```

---

# Preview Features

## Personalized Guest Name

Guest names are automatically rendered from URL parameters:

```text
?to=Ibnu%20Halim
```

Displayed dynamically in:
- cover section
- invitation section
- footer section
- RSVP form

---

## Wedding Sections

The invitation contains:

- Hero section
- Bride & Groom profile
- Countdown timer
- Wedding event details
- Google Maps location
- Wedding gallery
- Wedding gift section
- RSVP & guestbook
- Footer section

---

# RSVP & Guestbook System

Guests can:
- submit attendance
- send wishes/prayers
- view realtime guestbook entries

Guestbook data is stored permanently using:
- Google Apps Script
- Google Sheets backend

---

# Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Backend

- Google Apps Script
- Google Sheets

## Hosting

- GitHub Pages

---

# Project Structure

```bash
.
├── README.md
├── assets
│   ├── images
│   │   ├── bride.png
│   │   ├── groom.png
│   │   ├── main-figure.png
│   │   ├── moment-1.png
│   │   └── moment-2.png
│   └── music
│       └── background.mp3
├── generate_links.py
├── generated_links.csv
├── guests.txt
├── index.html
├── script.js
└── style.css
```

---

# Local Development

Run local development server:

```bash
python3 -m http.server 9999
```

Open browser:

```text
http://localhost:9999/index.html
```

---

# Personalized Invitation Generator

Guest names stored in:

```text
guests.txt
```

Example:

```text
Ibnu Halim
Bapak Ahmad
Ibu Rina
```

Generate invitation links:

```bash
python3 generate_links.py
```

Generated output:

```text
generated_links.csv
```

CSV contains:
- guest name
- personalized invitation URL
- WhatsApp-ready invitation message
- WhatsApp share link

---

# Google Sheets Integration

Guestbook backend uses Google Apps Script.

Deployment configuration:

```text
Execute as:
Me

Who has access:
Anyone
```

Apps Script provides:
- POST endpoint for RSVP submission
- GET endpoint for guestbook retrieval

---

# GitHub Pages Deployment

Repository deployed using GitHub Pages.

Settings:

```text
Source:
Deploy from branch

Branch:
main

Folder:
/ (root)
```

Live deployment:

```text
https://ih-11.github.io/aziz-suci/
```

---

# Current Features

- Responsive layout
- Dynamic guest name
- Countdown timer
- Background music
- Smooth scroll animation
- Wedding gallery
- Gift section
- RSVP form
- Realtime guestbook
- Google Sheets persistence
- WhatsApp invitation generator

---

# Possible Future Improvements

- attendance statistics
- admin dashboard
- spam protection
- CAPTCHA
- QR invitation
- custom domain
- analytics
- copy rekening button
- image lightbox gallery
- WhatsApp auto sender
- Supabase/Firebase migration

---

# License

Personal wedding invitation project for Aziz & Suci.