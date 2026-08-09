---
title: "How to Move Your Unutma Data to a New Phone"
description: "Unutma keeps everything on your device — no account, no cloud. That means moving to a new phone is a deliberate step. Here is the exact path, including the one place people get stuck."
pubDate: 2026-08-09
tags: ["Unutma", "backup", "privacy", "how-to"]
image: /blog/covers/auto/move-unutma-to-a-new-phone.svg
imageAlt: "Moving Unutma data from an old phone to a new one"
draft: false
---

Unutma has no account and no cloud. Your routines, journal, lists and vault live on your phone and nowhere else. That is the whole point — but it has one consequence worth being honest about:

**Nobody can restore your data for you. Not even us.** There is no copy on a server, because there is no server.

So when you change phones, you move the data yourself. It takes about two minutes. Here is exactly how.

## The short version

1. On the **old phone**: Settings → Export → **"I'm changing phones"** → *This is my old phone* → set a password → **Save to Files** (or Drive/iCloud)
2. Get that file onto the new phone
3. On the **new phone**: Settings → Export → *This is my new phone* → **Restore from file** → same password

That is it. But step 2 is where people get stuck, so let's be specific.

## Step 2 is the one that trips people up

When you tap "Back up", your phone opens the normal share sheet. You can send that file anywhere — and that freedom is exactly the trap.

**Save it to Files (iOS) or Drive/Downloads (Android).** Those are *file locations*, and the restore screen can browse them.

**If you send it to Mail, Notes, or a chat app**, the file lives *inside that app*. On iOS the file picker cannot see inside Mail — so when you tap "Restore from file" on the new phone, the backup you emailed yourself will not be in the list. The file is not lost. It is just somewhere the picker cannot reach.

### If you already emailed it to yourself

No problem, three taps:

1. Open the email on the new phone
2. Tap the attachment, then the share icon
3. Choose **"Save to Files"**

Now it is a real file, and the restore screen will find it.

> On Android this is usually smoother — email attachments download to your Downloads folder, which the picker already sees.

## About that password

The backup file is encrypted with a password **you choose**, and that password is not stored anywhere. It is not in the file, and it is not on our side.

That is deliberate: the file may travel through email or a cloud drive, so it has to be useless to anyone who does not know the password.

It also means **there is no reset**. If you forget it, the backup cannot be opened. Write it down somewhere real.

## The vault is separate — back it up too

Passwords and sensitive notes in the vault are encrypted with a key that lives in your phone's secure hardware. That key never leaves the device and is never in a backup — that is what makes the vault a vault.

So the vault has **its own backup button**, inside the vault screen, with its own password. If you have anything in there, back it up separately before switching phones.

## Do this before you wipe the old phone

The most common way to lose data is not a bug — it is **wiping the old phone before checking the new one**.

Restore first. Open the app. Look at your journal, your lists, your vault. Only then reset the old device.

## Why not just sync it to the cloud?

Because then it would not be private in the way we claim.

A sync service means your journal sits on someone's server, encrypted by keys that someone else manages, subject to someone else's breach. Plenty of good apps make that trade. Unutma does not, and the cost of that choice is this page: **you own the copy, so you have to make the copy.**

We think that is a fair trade. But it only works if we are clear about it — which is why the app now shows you exactly what is stored on your device, under **Settings → "Where is your data?"**.

---

**Short version, one more time:** back up to *Files*, not to Mail. Restore before you wipe. Write the password down. The vault needs its own backup.
