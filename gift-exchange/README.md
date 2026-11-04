# Family Gift Exchange

A single-page Secret Santa for the family. Static site (GitHub Pages) + Firebase Auth and Firestore.

## How it works
- `index.html` is the whole app. Firebase web config is at the top of the file (public by design).
- Email + password sign-in (Firebase Auth). "Forgot password" sends a reset email.
- Profiles and wishlists are public to anyone with the link. Each person edits only their own.
- The organizer (an account listed in the `admins` collection) edits the roster, removes people and runs the draw.
- The draw writes one `matches/{uid}` document per person. Only that person can read it.
- New sign-ups are refused once the draw exists (`meta/draw`).

## One-time setup (already done for this project)
1. Firebase project with **Authentication → Email/Password** enabled and a **Firestore** database (production mode).
2. Paste `firestore.rules` into Firestore → Rules and **Publish**.
3. Firebase → Authentication → Settings → **Authorized domains**: add `YOURNAME.github.io`.
4. Push this folder to a public GitHub repo; Settings → Pages → Deploy from branch `main` / root.

## Make yourself the organizer
1. Open the live site and create your profile (pick your name from your family list).
2. Firebase → Authentication → Users → copy your **User UID**.
3. Firestore → Start collection `admins` → Document ID = your UID → add one field (for example `ok: true`) → Save.
4. Reload the site. The **Admin** tab appears.

## Test locally
Open the folder with VS Code's Live Server (`localhost` is an authorized domain by default).

## Reminders
- Free (Spark) plan, no billing. Backups need the paid plan, so export data from the console before the draw.
- Don't put phone numbers or addresses in wishlists: profiles are visible to anyone with the link.
- Removing a person here removes their profile and match, not their login. They can sign in and create a profile again until the draw.
