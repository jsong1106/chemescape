# Deploying ChemEscape to Vercel

This is a complete walkthrough assuming you've never used GitHub or Vercel before. Follow it top to bottom and you'll have a public URL to share in about 15 minutes.

---

## Part 1: Install the Tools (One Time Only)

You need two things installed on your computer:

### 1.1 — Install Node.js
- Go to https://nodejs.org
- Click the green "LTS" download button
- Install it (just keep clicking Next)
- Verify: open Terminal (Mac) or Command Prompt (Windows) and type:
  ```bash
  node --version
  ```
  You should see something like `v20.x.x`.

### 1.2 — Install Git
- Go to https://git-scm.com/downloads
- Install for your operating system
- Verify in Terminal:
  ```bash
  git --version
  ```

---

## Part 2: Put the Code on Your Computer

You should already have the project folder (called `chemescape/`) somewhere on your computer. Open Terminal and navigate to it:

```bash
cd path/to/chemescape
```

Install the project dependencies:

```bash
npm install
```

Test it runs locally:

```bash
npm run dev
```

Open http://localhost:5173 in your browser. You should see ChemEscape. Press `Ctrl+C` in the Terminal to stop it.

---

## Part 3: Push the Code to GitHub

### 3.1 — Create a GitHub repo
1. Go to https://github.com and log in.
2. Click the **+** in the top-right → **New repository**.
3. Repository name: `chemescape`
4. Description: `Chemistry final exam review escape room game`
5. Keep it **Public** (Vercel free tier needs this, and it doesn't hurt).
6. **Don't** check "Initialize with README" — your project already has one.
7. Click **Create repository**.

GitHub will now show you a page with some commands. Ignore most of them and use these instead:

### 3.2 — Connect your local folder to the GitHub repo

In your Terminal (still in the `chemescape` folder):

```bash
git init
git add .
git commit -m "Initial commit: ChemEscape game"
git branch -M main
```

Now copy your repo URL from GitHub. It looks like `https://github.com/YOUR_USERNAME/chemescape.git`.

```bash
git remote add origin https://github.com/YOUR_USERNAME/chemescape.git
git push -u origin main
```

**If prompted for credentials:** GitHub no longer accepts passwords. You need a "Personal Access Token":
1. GitHub → top-right profile → **Settings**
2. Scroll down → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)** → tick "repo" scope → Generate
4. Copy the token. Paste it as your password when Git asks.

Refresh your GitHub repo page. You should see all your files.

---

## Part 4: Deploy with Vercel

### 4.1 — Sign up for Vercel
1. Go to https://vercel.com/signup
2. Click **Continue with GitHub** (uses your existing GitHub account)
3. Authorize Vercel to access GitHub

### 4.2 — Import your project
1. On the Vercel dashboard, click **Add New...** → **Project**
2. You'll see your GitHub repos listed. Find `chemescape` and click **Import**.
3. Vercel auto-detects it's a Vite project. **Don't change any settings.** Click **Deploy**.
4. Wait ~60 seconds. You'll see "Congratulations!" with confetti.

### 4.3 — Get your shareable URL
- Vercel gives you a URL like `chemescape-abc123.vercel.app`
- Click **Settings → Domains** to customize it to `chemescape.vercel.app` (if available)
- This is the link you send your teacher and classmates.

---

## Part 5: Making Updates Later

If you change anything (fix a puzzle, tweak colors, whatever):

```bash
git add .
git commit -m "describe what you changed"
git push
```

Vercel auto-rebuilds and updates the live site in ~60 seconds. No need to redeploy manually.

---

## Common Problems

**`npm install` fails with permission errors (Mac/Linux)**
Don't use `sudo`. If it keeps failing, try: `npm install --legacy-peer-deps`

**`git push` says "authentication failed"**
You need a Personal Access Token (see Part 3.2). GitHub doesn't accept account passwords for git anymore.

**Vercel build fails**
Click into the failed build → check the logs. Usually it's a typo. Run `npm run build` locally first to catch errors before pushing.

**Site loads but is blank**
Open browser DevTools (F12) → Console tab → look for red errors. Common cause: missing import in a file you edited.

---

## What to Send Your Teacher

Once deployed, send a short email like:

> Mr./Ms. [Teacher],
>
> Here's the final exam review game I built: https://chemescape.vercel.app
>
> It's an escape room that covers all 9 chapters of Chemistry: The Central Science. Four rooms scale from easy recall to full calculations. Players have 20 minutes total and the timer pauses between rooms.
>
> No login needed — just open the link on any phone, laptop, or Chromebook.
>
> — [Your Name]
