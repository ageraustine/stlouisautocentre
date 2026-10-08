# St. Louis Auto Centre – Website

Static, responsive site (HTML/CSS/JS, no build step) themed on the company logo: black, orange gradient and chrome silver.

## Deploy on GitHub Pages
1. Create a repo and push these files to the `main` branch (root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Customising
- **Logo:** the logo is at `assets/logo.jpg` (used in the hero); you can also swap the inline SVG mark in `index.html` (`.brand-mark`) for `<img src="assets/logo.png" alt="St. Louis Auto Centre">`.
- **Before/after photos:** replace the `.ph-box` placeholders in the *Our Work* section with `<img src="assets/your-photo.jpg" alt="...">`.
- **Colours:** edit the variables at the top of `styles.css`.
- **Contact details:** search `index.html` for `254725452734` and the email address.
