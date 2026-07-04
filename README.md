Welcome to your new portfolio website!

This guide will walk you through everything you need to know to take ownership of the site and, most importantly, how to add new photos to your gallery. The system is designed to be highly automated, so after a one-time setup, adding new content will be very easy.

---

## Part 1: Initial Setup & Deployment (One-Time Only)

In this part, we will create your own copy of the website and host it online for free.

### Step 1: Create Your Own Copy on GitHub (Forking)

First, you need to create a personal copy of the project's code in your own GitHub account. This is called "forking".

1.  Navigate to the project's main page on GitHub.
2.  In the top-right corner of the page, you will see a button labeled **"Fork"**. Click it.
3.  A new screen will appear asking where to create the fork. Simply click the green **"Create fork"** button.

**Success:** You will be taken to a new GitHub page that looks identical to the original, but the name at the top-left will now be `your-username/atoptics.com`. This is now your personal copy.

### Step 2: Create a Secure "Password" for the Uploader (GitHub Token)

To allow your website's admin page to upload files to your GitHub repository, you need to create a special, secure password called a Personal Access Token (PAT).

1.  While logged into GitHub, click your profile picture in the top-right corner, then click **"Settings"**.
2.  In the left sidebar, scroll all the way down and click **"Developer settings"**.
3.  Click on **"Personal access tokens"**, then select **"Tokens (classic)"**.
4.  Click the **"Generate new token"** button, and then **"Generate new token (classic)"**.
5.  **Note:** In the "Note" box, give the token a descriptive name like `atoptics-gallery-uploader`.
6.  **Expiration:** For security, it's best to set an expiration. Choose **"90 days"**. You can always create a new one later.
7.  **Select scopes:** This is the most important step. Check the box next to **`repo`**. This gives the token permission to add files to your project.
8.  Scroll to the bottom and click the green **"Generate token"** button.

**Success:** GitHub will show you your new token. It will look like a long string of letters and numbers. **COPY THIS TOKEN IMMEDIATELY.** You will not be able to see it again. Paste it into a temporary, safe place like a text file.

### Step 3: Deploy Your Website

Now, choose one of the following free hosting providers to get your site online. Netlify and Vercel are both excellent choices.

---

#### Option A: Deploy with Vercel

1.  **Sign Up & Import:**
    *   Go to vercel.com and sign up for a free "Hobby" account using your GitHub profile.
    *   From your dashboard, click **"Add New..."** -> **"Project"**.
    *   Find your `atoptics.com` repository and click **"Import"**.
    *   You don't need to change any build settings.

2.  **Add Environment Variables:**
    *   Before deploying, expand the **"Environment Variables"** section.
    *   Add all the variables listed in the **"Environment Variables Reference"** section below.
    *   Click the **"Deploy"** button.

**Success:** Vercel will build and deploy your site. You'll get a free URL (like `atoptics-com-username.vercel.app`) where your website is now live.

---

#### Option B: Deploy with Netlify (Recommended Alternative)

1.  **Sign Up & Import:**
    *   Go to netlify.com and sign up for a free account using your GitHub profile.
    *   From your dashboard, click **"Add new site"** -> **"Import an existing project"**.
    *   Choose **"GitHub"** and authorize it to see your repositories.
    *   Select your `atoptics.com` repository.

2.  **Add Environment Variables:**
    *   On the final deployment screen, before you click deploy, go to **"Advanced build settings"** or look for a button to add variables.
    *   Click **"Add environment variables"**.
    *   Add all the variables listed in the **"Environment Variables Reference"** section below.
    *   Click the **"Deploy site"** button.

**Success:** Netlify will build and deploy your site. You'll get a free URL (like `your-project-name.netlify.app`) where your website is now live.

---

### Environment Variables Reference

You need to add the following variables to your chosen hosting provider (Vercel or Netlify) for the site's features to work.

#### For the Gallery Uploader:
*   `GITHUB_TOKEN`: The Personal Access Token you created in Step 2.
*   `GITHUB_OWNER`: Your GitHub username.
*   `GITHUB_REPO`: The name of your repository (`atoptics.com`).

#### For the Contact Form:
*   `EMAIL_SERVICE`: The name of your email provider (e.g., `Gmail` or `Outlook`).
*   `EMAIL_USER`: Your full email address (e.g., `your.email@gmail.com`).
*   `EMAIL_PASS`: An **App Password** for your email account. **Do not use your regular email password.** Search online for "how to create an app password for [Your Email Provider]" for instructions.

---

## Part 2: How to Add New Photos to the Gallery

Now that the setup is done, adding new photos is easy.

### Method 1: Using the Web Uploader (Recommended)

1.  Go to your live website URL provided by Vercel.
2.  Navigate to the admin page by adding `/HTML/admin.html` to the end of your URL. It will look like this: `https://your-site-name.vercel.app/HTML/admin.html`.
3.  You will see a form:
    *   **Folder Name:** Enter a short, descriptive name for your photo (e.g., `aurora-over-the-pines`). Use only letters, numbers, and hyphens.
    *   **Image File:** Click "Choose File" and select the photo from your computer.
    *   **Description Section:** Write a description for your photo. You can click **"Add Description Section"** to create multiple paragraphs, each with its own optional header.
4.  Click the **"Submit to GitHub"** button.

**Success:** You will see an alert that says "Gallery item submitted successfully!". Now, the magic happens. A fully automated process has started. It may take 2-3 minutes, but your website's gallery will update itself with the new photo. You just need to wait and then refresh the gallery page.

### Method 2: Adding Files Manually on GitHub

If you ever want to add files directly, you can also do so on the GitHub website.

1.  Go to your forked repository on GitHub.
2.  Navigate into the `Gallery` folder.
3.  Click **"Add file"** -> **"Create new file"**.
4.  To create a new folder, type the folder name followed by a `/`. For example, to create a folder named `new-photo`, you would type `new-photo/`.
5.  Inside this new folder, you can upload your image and create a `description.md` file.

**Success:** As soon as you save (commit) these new files to the `main` branch, the same automated process will kick off, and your website will update itself within a few minutes.

---

## Part 3: Local Development (Optional)

This part is only for if you want to edit the website's code or design on your own computer before it goes live.

### Step 1: Install Node.js

The tools used to build this website run on Node.js. You only need to install this once.

1.  Go to the official Node.js website: https://nodejs.org/
2.  Download the version labeled **LTS** (Long-Term Support).
3.  Run the installer and accept all the default options. This will install Node.js and a command-line tool called `npm`.

### Step 2: Install Project Dependencies

Next, you need to download all the helper tools (like Tailwind CSS) that the project uses.

1.  Open a terminal or command prompt (like PowerShell on Windows).
2.  Navigate to the project folder on your computer.
3.  Run the following command:
    ```bash
    npm install
    ```

**Success:** This command reads the `package.json` file and creates a `node_modules` folder containing all the necessary tools. You only need to do this once, or after any changes to the project's dependencies.

### Step 3: Run the Local CSS Builder

To see your CSS changes live as you edit the HTML, you need to run the Tailwind CSS builder.

1.  In your terminal (still in the project folder), run this command:
    ```bash
    npm run tailwind:build
    ```

**Success:** The terminal will show some output, and then it will "watch" for changes. Leave this terminal window open while you are coding. Now, when you save changes to any HTML file, the `CSS/style.css` file will be automatically updated with the new styles.
