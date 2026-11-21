---
title: "Personal Assistant App Without AI Chatbot or Cloud"
description: "Looking for a personal assistant app without AI? Most offline assistants are local chatbots. Here is a 6-question test and how Unutma works with no cloud."
pubDate: 2026-11-24
keyword: "personal assistant app without AI"
tags: ["Unutma", "assistant", "privacy", "offline", "on-device"]
image: /blog/covers/v3/a-phone-assistant-without-an-llm.jpg
imageAlt: "Unutma assistant splitting one sentence into a calendar entry, a shopping item and a budget expense"
draft: true
---

A personal assistant app without AI is hard to find, because almost every "offline assistant" in the stores is a language model that runs on your phone. Unutma takes a different route. It has no chatbot and no cloud: hand-written rules in six languages plus a 29 MB embedding model and a 41 KB classifier pick where a sentence goes, and all of it runs on the phone, with no account.

"No AI" needs one honest footnote, so here it is up front. There is a small machine-learning model inside the app. What is missing is the part most people mean by AI: a chatbot that writes text, runs on a server, or needs gigabytes of weights. This guide explains the difference, gives you a test for any assistant app, and shows what Unutma does and does not do.

## What people mean when they search for an assistant without AI

When we looked at the search results for this phrase in November 2026, the first page was mostly App Store listings. Many were offline chat apps built on downloaded language models. They are private, and some need no account, but they are chatbots. Few of them file your dentist appointment into a calendar.

That gap is the reason for this page. People who type "without AI" usually want one of three things:

- **No data leaving the phone.** They do not want sentences about money, health or family sent to a server.
- **No made-up output.** They want a note saved as typed, not rephrased by a model that sometimes invents a field.
- **No big download or battery drain.** A language model is hundreds of megabytes to several gigabytes.

None of these requires the absence of every model. They require that the assistant is local, predictable and small.

## Three kinds of "assistant" in an app

| Kind | How it works | Typical cost to you | Can it invent text? |
|---|---|---|---|
| **Cloud chatbot** | Your sentence goes to a server that runs a large model | Account, connection, data leaves the phone | Yes |
| **Local chatbot** | A language model is downloaded and runs on the phone | Hundreds of MB to GB of storage, seconds per answer | Yes |
| **Rules plus a small classifier** (Unutma) | Rules extract dates, amounts and repeats; a small model only picks the destination | A few dozen MB, instant on the phone | No, it never writes content |

Unutma is the third kind. The longer technical story is in [how we built a phone assistant without an LLM](/blog/a-phone-assistant-without-an-llm/). Here is the short version.

## How does Unutma work without a chatbot?

You type or say one sentence and the assistant saves it in the right place. Three parts do the work, all on the phone:

1. **Rules in six languages.** Turkish, English, German, Spanish, French and Italian. They pull out dates, times, amounts and repetition such as "every other day".
2. **A pruned multilingual embedding model.** About 29 MB, int8, run through ONNX Runtime.
3. **A 41 KB classifier.** It chooses one of 18 destinations. It never writes the entry itself, and if the rules for that destination cannot build a concrete entry, the choice is dropped.

Some real examples:

| You say | It does |
|---|---|
| Dentist Thursday at 3pm | A calendar entry for Thursday, with a reminder |
| Water the plants every other day | A routine that repeats every 2 days |
| Mom's birthday is May 3rd | A remembered date that returns every year |
| Wifi password is hunter22 | The encrypted vault, masked in the chat |
| What's on this week? | An answer from your own records |

It does not hold a free conversation. If you ask it for a poem, it will not write one. That limit is the point.

## What happens when it is not sure?

A wrong guess is the real risk of any assistant. Unutma handles it in three ways. When rules and the model agree, it saves and shows an undo. When the rules are very sure but the model disagrees, it asks. When it is unsure, it shows the likely places and a "save as a to-do" option.

We measured this on a sealed set of 1,595 test sentences in the six languages, as of 18 September 2026. Rules plus the model put 63.9% in the right place on the first try (rules alone: 50.2%), and 19.9% were saved in the wrong place without asking. That is not 100%, and the test sentences were written for testing rather than taken from real users, because the app collects no usage data. The full table is in the post linked above.

## A 6-question test for any "private" assistant app

Run this before you trust an assistant with real information. It takes about ten minutes.

1. **Does it need an account to open?** Delete and reinstall, then see what the first screen asks for.
2. **Does it work in airplane mode after a restart?** Add a reminder, turn on airplane mode, restart the phone, then dictate and type something new. Our [5-step offline test](/blog/why-you-should-use-offline-apps/) walks through it.
3. **How big is the download?** A multi-gigabyte install means a language model on the phone.
4. **Does it ever rewrite what you typed?** Save a sentence with a typo and a name. A rules-based assistant keeps your words.
5. **What does the privacy label say?** Apple publishes the [App Store privacy details](https://developer.apple.com/app-store/app-privacy-details/) developers must declare. The labels are self-reported, so treat them as a starting point.
6. **What about voice?** Check whether speech recognition stays on the device. See the next section.

## Does voice stay on the phone?

This is the exception, and we state it plainly. Unutma uses your phone's own speech recognition for voice input. On iPhone, Apple lets an app check [whether the recognizer can run without network access](https://developer.apple.com/documentation/speech/sfspeechrecognizer/supportsondevicerecognition). On Android, the default [speech recognizer may stream audio to remote servers](https://developer.android.com/reference/android/speech/SpeechRecognizer), while newer versions also offer an on-device one. Typed sentences never leave the phone. If that matters to you, type. More on dictation is in our guide to [voice commands and hands-free organizing](/blog/unutma-voice-commands-hands-free-organizing/).

## What you give up

- **No sync and no computer version.** Your records are on one phone. Move them to a new phone with a backup file, as described in [moving Unutma to a new phone](/blog/move-unutma-to-a-new-phone/).
- **No live sharing.** You can send a one-off copy of a list, not a shared list that updates.
- **No open conversation.** It files and answers questions about your own records. That is all.
- **No recovery from us.** With no account, nobody can restore your data if you lose the phone. Keep a backup file.
- **It is paid after a trial.** Everything is free for 7 days. After that, adding and editing needs a subscription, while your existing records stay visible.

## Where it fits

Unutma covers the daily "where does this go?" problem: to-dos, shopping, calendar, budget, journal and a [password vault](/blog/unutma-vault-passwords-face-id-privacy/). The [complete feature guide](/blog/unutma-app-complete-feature-guide/) maps every screen. If you only need a list, see our [offline to-do app](/blog/best-offline-todo-app/) comparison. For the privacy habits around all of this, read how to [keep your data safe on your phone](/blog/keep-your-data-safe-on-your-phone/).

## Frequently asked questions

### Is there a personal assistant app without AI?

Not literally without any model. Unutma has no chatbot and no cloud AI. It uses rules, a 29 MB embedding model and a 41 KB classifier on the phone to decide where a sentence is saved.

### Does Unutma use ChatGPT or a large language model?

No. Nothing you type is sent to a language model. The assistant files and answers from your own records and cannot write free text.

### Does the assistant work offline?

Typed sentences work in airplane mode, because the rules, the embedding model and the classifier run on the phone. Voice input depends on your phone's speech recognition, which may need a connection.

### Do I need an account?

No. There is no sign-up screen and no server that receives your records.

### Which languages does the assistant understand?

Six: English, Turkish, German, Spanish, French and Italian. The app interface has 8 languages, but the assistant is not available in the other two.

### Does it work on Android and iPhone?

Yes, on iPhone, iPad and Android. There is no desktop version.

## Bottom line

If "without AI" means no chatbot, no account and nothing sent to a server, a rules-based assistant with a small on-device classifier fits. Try the 6-question test on any app, ours included. Unutma is on the [App Store](https://apps.apple.com/app/id6758889495) and [Google Play](https://play.google.com/store/apps/details?id=com.mehmet.unutma).
