From Rhys L*******z
To B****n W*****m L*******z


Welcome to your new portfolio website!

This guide will walk you through everything you need to know to take ownership of the site and, most importantly, how to add new photos to your gallery. The system is designed to be highly automated, so after a one-time setup, adding new content will be very easy.

---

## Part 1: Initial Setup (One-Time Only)

In this part, we will create your own copy of the website and host it online for free using a service called Vercel.

### Step 1: Create Your Own Copy on GitHub (Forking)

First, you need to create a personal copy of the project's code in your own GitHub account. This is called "forking".

1.  Navigate to the project's main page on GitHub.
2.  In the top-right corner of the page, you will see a button labeled **"Fork"**. Click it.
3.  A new screen will appear asking where to create the fork. Simply click the green **"Create fork"** button.

**Success:** You will be taken to a new GitHub page that looks identical to the original, but the name at the top-left will now be `your-username/atoptics.com`. This is now your personal copy.

### Step 2: Deploy Your Website with Vercel

Next, we will use a free service called Vercel to put your website online.

1.  Go to vercel.com.
2.  Click **"Sign Up"** and choose the **"Hobby"** plan, which is free.
3.  When asked how to sign up, click the button that says **"Continue with GitHub"**. This will link your Vercel and GitHub accounts.
4.  After signing up, you will be on your Vercel dashboard. Click the **"Add New..."** button and select **"Project"**.
5.  Vercel will show you a list of your GitHub projects. Find your new `atoptics.com` project (the one you just forked) and click the **"Import"** button next to it.
6.  On the next screen, you don't need to change any settings. Just scroll down and click the **"Deploy"** button.

**Success:** Vercel will start building your site. After a minute or two, you will see a "Congratulations!" message with a preview of your live website. Vercel has given you a free URL (like `atoptics-com-username.vercel.app`). Your website is now live!

### Step 3: Create a Secure "Password" for the Uploader (GitHub Token)

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

### Step 4: Add the Secure "Password" to Vercel

Now we need to give your live website the token so it can talk to GitHub. We will do this using secure "Environment Variables".

1.  Go back to your project on the Vercel dashboard.
2.  Click the **"Settings"** tab at the top, then click **"Environment Variables"** in the left menu.
3.  You will need to create **three** variables. For each one, enter the name and value, then click **"Save"**.
    *   **Variable 1:**
        *   **Name:** `GITHUB_TOKEN`
        *   **Value:** Paste the token you copied from GitHub.
    *   **Variable 2:**
        *   **Name:** `GITHUB_OWNER`
        *   **Value:** Your GitHub username.
    *   **Variable 3:**
        *   **Name:** `GITHUB_REPO`
        *   **Value:** The name of your repository, which should be `atoptics.com`.

**Success:** After you save the last variable, Vercel will automatically start a new deployment to apply these settings. Wait for it to finish. Your setup is now complete!

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

