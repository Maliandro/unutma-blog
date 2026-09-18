---
title: "Talk to Unutma: The Voice Feature Most Organizer Apps Don't Have"
description: "Unutma doesn't just transcribe your voice — it understands it. Say a task, an expense, or 'open my calendar' and watch it go straight to the right place, hands-free."
pubDate: 2026-07-25
tags: ["Unutma", "voice", "productivity", "accessibility"]
draft: false
image: "/blog/covers/auto/unutma-voice-commands-hands-free-organizing.svg"
imageAlt: "Unutma voice command feature cover"
---

Most apps that add a microphone button do exactly one thing with it: turn your speech into text in a box. You still have to decide which app that text belongs in, open the right screen, and type or paste it there yourself. That is dictation, not help.

**Unutma's voice feature does something most competitors don't: it listens, figures out what you meant, and puts it where it belongs — automatically.** Tap the mic, say a sentence in plain language, and Unutma routes it to your to-do list, shopping list, journal, wishlist, or expense tracker on its own. Say a command instead of a note, and it can even **navigate the app for you** — no tapping, no menus.

## What actually happens when you talk to Unutma

The part that decides what you meant runs on your phone: the routing is rule-based, with no AI service in the loop, consistent with the rest of the app's offline-first design (see our [complete feature guide](/blog/unutma-app-complete-feature-guide/)). Turning your speech into text is the one step Unutma hands off — to your phone's own dictation service, Apple's on iOS and Google's on Android. Unutma asks for on-device recognition whenever your phone reports that language is available offline, and falls back to the provider's service when it isn't; either way nothing is sent to us, because there is no account and no server on our side. When you tap the mic and speak, two things can happen:

**1. You describe something you want to capture.** Unutma parses the sentence and decides where it belongs:

- *"Pick up milk and bread"* → two items land in your **Shopping list**, split automatically.
- *"Dentist appointment tomorrow at 3"* → a **To-do** with the due date and reminder time already attached.
- *"Spent 50 on groceries"* → an **expense** logged in Economy, amount detected, category remembered from last time.
- *"Idea for the birthday gift"* → filed as a **Note**.
- Anything without a clear task-shape lands in your **Journal** entry for today.

You never chose a screen. You never picked a category. You just talked, and the sentence ended up exactly where a person who knew your life would have put it.

**2. You give the app a command instead of content.** Say *"open my calendar"*, *"go to reminders"*, *"show my vault"*, or *"takvimi aç"* if you're speaking Turkish, and Unutma jumps straight to that screen — no unlocking your phone and hunting through tabs first. It works because the app checks for a short list of **navigation verbs** ("go", "open", "show" — "aç", "git", "göster") next to a recognizable screen name, and tells the difference between "open my calendar" (a command) and "reminder to open the garage before I leave" (content for your to-do list).

## Why this matters more than it sounds

If you've ever tried voice input in a to-do or note app before, you know the usual flow: hold the mic, speak, get a wall of text, then manually clean it up and file it. That's an extra decision every single time — exactly the kind of small friction that makes people stop using a feature after day three.

Unutma removes that decision. The app absorbs the "which app / which list / which category" question so your hands and your attention can stay on whatever you were actually doing — cooking, driving (safely, hands-free), or holding a baby. **Voice becomes a shortcut instead of a chore.**

This also quietly helps in moments where typing is genuinely hard: low light, one hand full, low vision, or just a brain that's too tired for a keyboard at 11pm. A private journal line you can speak instead of type is a real accessibility win, not a gimmick.

## How to try it in Unutma

1. Open the **Quick Capture** button (the floating action button on the home screen) or tap the mic icon next to any text field.
2. Speak naturally — a full sentence, not keywords. Unutma listens until you stop or you tap again to finish.
3. Check the destination pill that appears — it shows exactly where your words are about to be filed, before anything saves.
4. If you'd rather just move around the app, say a command like "open settings" or "show statistics" instead.

Voice input currently covers the same 8 languages as the rest of the app (Turkish, English, German, Spanish, French, Italian, Arabic, and Chinese), so this works whether you think in Turkish or English. Whether the dictation step stays on your phone depends on which of those languages your phone has downloaded for offline recognition.

## What it's not

To be precise about what this feature is and isn't: it's a rule-based intent detector, not a general-purpose AI assistant you can have a conversation with. It won't answer trivia or write an email for you. What it does — reliably and privately — is take one clear sentence and get it to the right place in your own organizer, or take you to the right screen. That's a narrower promise, and it's one Unutma actually keeps.

## Bottom line

A microphone icon is easy to add. Understanding what someone means well enough to route it correctly — and to tell "content" apart from "command" — is the harder, more useful feature, and it's one you won't find in most to-do or note apps. If you've been typing the same three sentences into your phone every day, try saying them instead.

Read more in the [complete Unutma feature guide](/blog/unutma-app-complete-feature-guide/), or see how voice pairs with [journaling in Unutma](/blog/unutma-journal-mood-voice-reflection/) on the days typing feels like too much.

---

**Ready to get organized?** [Download Unutma](https://play.google.com/store/apps/details?id=com.mehmet.unutma) — free, offline, and private. Available on [Google Play](https://play.google.com/store/apps/details?id=com.mehmet.unutma) and [App Store](https://apps.apple.com/app/id6758889495).
