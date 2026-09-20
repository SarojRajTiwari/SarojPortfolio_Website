# ✅ How to Enable Email Notifications (Netlify Forms)

## Step 1 — Deploy the site
Drag and drop the ZIP to https://app.netlify.com (or push to your repo).

## Step 2 — Enable email notifications in Netlify dashboard
1. Go to your site on https://app.netlify.com
2. Click **Forms** in the top menu
3. You'll see the "contact" form listed after first deploy
4. Click **Form notifications** (or go to Site Settings → Forms → Form notifications)
5. Click **Add notification** → choose **Email notification**
6. Enter your email: **sarojrajtiwari50@gmail.com**
7. Select form: **contact**
8. Click **Save**

## That's it! 🎉
Every time someone fills the contact form, Netlify will:
- Send you an email notification to sarojrajtiwari50@gmail.com
- Store the submission in your Netlify Forms dashboard
- Show the sender's name, email, subject, and message

## View past submissions
Netlify → Your Site → Forms → contact → view all entries

## Why the old form wasn't working
The button was type="button" which bypassed form submission.
This has been fixed — button is now type="submit" with proper event handling.

---

## 📩 New: Quote / Recommendation Form Notifications

A new form called **"quote-submission"** has been added for team members to leave recommendations.

### To get email alerts when someone submits a quote:
1. Go to **Netlify → Forms** after deploying
2. You'll see **"quote-submission"** form listed
3. Click **Form notifications** → **Add notification** → **Email notification**
4. Enter your email: **sarojrajtiwari50@gmail.com**
5. Select form: **quote-submission**
6. Click **Save**

You'll receive an email with the person's name, role, relationship, and their quote. You can then review it and manually add it to the testimonials section in index.html.

### View all quote submissions:
Netlify → Your Site → Forms → quote-submission → view all entries
