# Carwyn's feedback on papamoa-previews

**From:** Carwyn Evans, Dot Info Marketing Ltd
**Email:** carwyn@dotinfomarketing.co.nz · 027 249 3762
**Site:** www.dotinfomarketing.co.nz
**Tagline:** *Your Complete Online Marketing Solution. Local Directories · Website Development · Google Ads · Email · Social Media Marketing · SEO*

**Captured into this doc:** 2026-06-02 (from PlainBlack Hub item I-54, originally received around 2026-05-23)

**Status:** Canonical client brief. Drives Project_Master §21 (Carwyn's Requirements). Any conflict between this email and earlier locked decisions is a conflict to resolve, not silently override.

---

## Verbatim email body

> Hey Jayden,
>
> Have checked out the website and it looks like it has a lot of potential. Designers are always going to disagree on certain things so we have some feedback that you may or may not agree with.
>
> We want to see it from a users POV and so we would like to see a lot more imagery to start with. Placeholders that represent what each page is. eg Activities, Accommodation. A Home page slide show that shows the beach the moment people land on the site it shouts Papamoa. The header needs to be easier to see the main page tabs and have more visual appeal. Home needs call to actions and not so busy so users know where to start. Have some local touch on the home page with images, local news stories. Etc Eg:
>
> - https://www.aucklandnz.com/
> - https://www.australia.com/en-nz/places/gold-coast-and-surrounds/guide-to-the-gold-coast.html
> - https://www.visitlondon.com/
>
> The images appeal to users and make the site look much better aesthetically.
>
> The main thing we have tried to do is keep the KISS factor for users so they can easily find what they are looking for. The current home page is very busy with so much content and offers which could perhaps be hidden in drop down menus or more info links. I see there are some already leading to more info but maybe we show less options on the home page to allow for the main info to POP so users can easily navigate around. Eg the essential info. Maybe less info required on home page such as Essential info (seems too busy).
>
> Ideally the pages would be more balanced with info and imagery. Can we also stick to the Brand colours Blue, Green shades — Not brown / Beige like the EAT page. Use imagery to differentiate between pages instead of colours.
>
> How easy is it for us to manage the pages and update info when required? Can we see the CMS. The site is integrated with AI and pages stay hosted on GitHub. I will process the migration via Astro? How much does or would the monthly hosting etc cost? How secure and reliable is the hosting platform, server etc?
>
> In terms of the AI model, what are we charged to use it on our websites? Ie Monthly? Per sale? Annually? Looks like you have created your own AI model and integrated it into the business. So how does it work if we want another site in another town or city?
>
> How and who monitors content and ALLOWS content loaded by public to appear. How do renews work if we cant charge a CC card that has expired. What about the monthly payment options for business who cant afford up front payments?
>
> Should GOLD Listings allow for other business to be included and ROTATE randomly like we currently have set up?
>
> This just some feedback to start with. I would think we would still have to offer this to businesses directly to get more sales and we may end up with some businesses signing up themselves. Especially if we can market it to them via social media etc.
>
> Talk soon.
>
> Carwyn Evans
> 027 249 3762
> carwyn@dotinfomarketing.co.nz
> www.dotinfomarketing.co.nz
>
> Dot Info Marketing Ltd – Your Complete Online Marketing Solution
> Local Directories – Website Development – Google Ads – Email – Social Media Marketing – SEO

---

## Structured read (the source of Project_Master §21)

### Locked design direction Carwyn gave us

1. **Imagery first.** A lot more of it. Each page should have placeholder imagery representing what the page is (Activities, Accommodation, etc.).
2. **Hero slideshow / beach imagery.** Home page should "shout Papamoa" the moment a visitor lands.
3. **Header needs visual lift.** Main page tabs should be more visible. More visual appeal.
4. **KISS homepage.** Clear CTAs, not busy, users know where to start. Hide secondary content in dropdowns or "more info" links.
5. **Local touch on homepage.** Local images, local news stories.
6. **Balance info + imagery on every page.**
7. **Blue and green shades only.** No brown / beige. EAT page specifically called out.
8. **Use imagery to differentiate pages, not colour.**
9. **Essential Info block too busy on homepage.** Trim or move.

### Reference sites Carwyn likes (tourism / destination style)

- https://www.aucklandnz.com/
- https://www.australia.com/en-nz/places/gold-coast-and-surrounds/guide-to-the-gold-coast.html
- https://www.visitlondon.com/

Plus the devonport.net.au structural reference Jay surfaced separately (hub item I-55).

### Open questions PB needs a position on before reply

| # | Question | Notes for the answer |
|---|---|---|
| 1 | How do we manage the pages and update info? Can we see the CMS? | Currently no CMS. Either build a simple one (admin/upload + GitHub commits via Worker) or document the "hand-edit and re-deploy" flow. Carwyn assumes there is one. |
| 2 | I will process the migration via Astro? | He is offering to drive the Astro migration himself. Confirm scope: does PB hand off the static repo for him to migrate, or does PB do the migration? |
| 3 | Monthly hosting cost? | GitHub Pages is free for the static site; Cloudflare Worker is free at current volume. Real answer: ~$0/month for v1, scaling to $5-20/month if R2 or KV traffic grows. |
| 4 | How secure and reliable is the hosting? | GitHub Pages + Cloudflare = enterprise-grade. Specific reassurance answers needed: SLA, uptime track record, DDoS posture. |
| 5 | What does the AI cost? Monthly / per sale / annual? | Currently no per-customer AI cost. Worker uses Claude Haiku for fishing-data + PPP search check. Real answer: PB absorbs current AI cost; if scale changes, model would be flat per-site or usage-based. Needs a clean answer Carwyn can repeat to a buyer. |
| 6 | How does it work if we want another site in another town or city? | Multi-site rollout. Templating approach: clone the static repo, swap content + brand, redeploy. Real answer needs a price band for what PB would charge to spin up a TaurangaNZ.info equivalent. |
| 7 | Who monitors / approves public-submitted content? | Currently no public submission flow. If we add one, moderation queue with notify-on-submit to operator. Needs an answer even if "not in v1." |
| 8 | How do renewals work when a CC expires? | Stripe default flow handles dunning. Real answer: PB sets up the automation; operator receives a flag and reaches out manually for the dropped renewals. |
| 9 | Monthly payment plans for businesses that can't afford up-front? | Currently locked as annual subscriptions. Stripe supports monthly billing trivially. **Conflicts with §3** so needs an explicit decision: do we add monthly $50/mo and $100/mo options, or hold the line on annual? |
| 10 | Should Gold Listings rotate randomly between multiple businesses per slot? | **Major conflict with §3** which locks "one Gold per sub-category". Carwyn's rotation idea changes the scarcity model entirely. Needs an explicit decision before reply. |

### Strategic signals to read

- He still expects direct sales to businesses (cold outreach), not pure organic. *"I would think we would still have to offer this to businesses directly to get more sales."*
- He sees self-signup as a bonus if social marketing brings them in. *"We may end up with some businesses signing up themselves. Especially if we can market it to them via social media etc."*
- He sees himself as the design authority. *"Designers are always going to disagree on certain things."* — meet that respectfully when answering, do not argue brand direction.
- He runs Dot Info Marketing Ltd, a full marketing services agency. He is not a hobbyist client. The bar for the response is higher because of who he is.
