# Category feature-row photos — generation prompts (28 placeholders)

Each merged category page has **one real hero photo + the rest gradient placeholders**.
This doc lists a prompt + filename for every placeholder so we can swap gradients → real images.

## How to deliver
1. Generate / source a **landscape** image for each row below (ChatGPT / Midjourney / stock / a real local photo — your call).
2. Save it named exactly the **Filename** (any extension — `.jpg` / `.jpeg` / `.png`), into **`assets/category-features/`**.
   - Don't worry about sizing or webp — drop the full image and I'll optimise it (cwebp, ~640px wide) and rename to `.webp`.
3. Tell me which are ready (all, or a batch). I'll **wire each row** (placeholder → photo), **verify** (no overflow/console errors, mobile stacks), and **commit + push**.

## Spec / style (append to every prompt)
> `professional photographic stock image, landscape 3:2 orientation, natural daylight, bright and inviting, coastal Bay of Plenty New Zealand feel, shallow depth of field, vivid but natural colour`

## Hard rules (editorial neutrality — important)
- **No text, no logos, no identifiable business signage, no brand names** in the image (a visible shopfront name re-introduces a business name visually — the whole point of the rebuild was to remove those).
- **No recognisable faces** (avoid model-release / likeness issues). People fine from behind / mid-distance / cropped.
- Panel renders ~210px wide on desktop, full-width ~150px tall on mobile — so keep the **subject centred** and the composition readable when cropped to a wide-ish strip.

---

## Accommodation — `categories/accommodation/accommodation.html` (4)
*(Real already: holiday-parks, homes/short-stay, living/retirement.)*

| Filename | Row | Alt text | Subject prompt |
|---|---|---|---|
| `accommodation-motels.jpg` | Motels, Apartments & Self-Contained | Self-contained motel and apartment stays in Pāpāmoa | A bright, modern self-contained motel/apartment unit with a private outdoor deck, beachy holiday feel |
| `accommodation-luxury.jpg` | Luxury & Premium Stays | A luxury beachfront stay in Pāpāmoa | A premium beachfront holiday villa with an infinity pool or spa and ocean view, upscale and serene |
| `accommodation-backpackers.jpg` | Backpackers & Budget Stays | Budget and backpacker stays in Pāpāmoa | A relaxed budget hostel / holiday-park communal lounge, casual surf-trip vibe, friendly |
| `accommodation-groups.jpg` | Groups, Camps & Retreats | Group and camp accommodation in Pāpāmoa | A group lodge / camp with shared dining and bunk facilities for school camps and sports teams, communal and welcoming |

## Services — `categories/services/services.html` (6)
*(Real already: Trades.)*

| Filename | Row | Alt text | Subject prompt |
|---|---|---|---|
| `services-health.jpg` | Health & Medical | Health and medical services in Pāpāmoa | A clean, modern medical clinic reception or a calm physio treatment room, professional |
| `services-professional.jpg` | Professional Services | Professional services in Pāpāmoa | A bright professional office desk — laptop, documents, plants — real-estate / legal / accounting feel |
| `services-automotive.jpg` | Automotive | Automotive services in Pāpāmoa | A car on a hoist in a tidy modern workshop, a mechanic servicing it, clean and professional |
| `services-beauty.jpg` | Hair & Beauty | Hair and beauty in Pāpāmoa | A stylish hair / beauty salon interior with chairs and mirrors, soft lighting, inviting |
| `services-home.jpg` | Home & Garden | Home and garden services in Pāpāmoa | A lush coastal home garden with a freshly mown lawn and tidy planting, sunny suburban NZ |
| `services-family.jpg` | Family & Community | Family and community services in Pāpāmoa | A bright childcare play space or a warm vet / pet-care moment, friendly and welcoming |

## Activities — `categories/activities/entertainment.html` (7)
*(Real already: Beach & Water.)*

| Filename | Row | Alt text | Subject prompt |
|---|---|---|---|
| `activities-indoor.jpg` | Indoor & VR Entertainment | Indoor and VR entertainment in Pāpāmoa | A neon-lit VR / arcade / sim-racing space, people gaming, fun and energetic |
| `activities-fitness.jpg` | Gym & Fitness | Gyms and fitness in Pāpāmoa | A modern gym interior with weights and equipment, bright and motivating |
| `activities-yoga.jpg` | Yoga & Pilates | Yoga and pilates in Pāpāmoa | A serene yoga / pilates studio with reformer machines or mats, soft natural light, calm |
| `activities-golf.jpg` | Golf | Golf near Pāpāmoa | A green coastal golf-course fairway with the flag on the green, blue sky, NZ links feel |
| `activities-walks.jpg` | Walks & Outdoor Trails | Walking and biking trails near Pāpāmoa | A scenic hilltop walking / mountain-bike trail with panoramic coastal Bay of Plenty views, lush green |
| `activities-groups.jpg` | Groups & Events | Group activities and events near Pāpāmoa | An energetic outdoor group activity — paintball / laser tag / team event, action and fun |
| `activities-more.jpg` | More Activities | More things to do in Pāpāmoa | A family enjoying a coastal park / playground, sunny and active |

## Food & Drink — `categories/food-drink/food-and-drink.html` (6)
*(Real already: Restaurants.)*

| Filename | Row | Alt text | Subject prompt |
|---|---|---|---|
| `food-cafes.jpg` | Cafes & Brunch | Cafes and brunch in Pāpāmoa | An inviting brunch flat-lay — coffee and a brunch plate on a wooden table, warm natural light |
| `food-bars.jpg` | Bars & Licensed Venues | Bars and licensed venues in Pāpāmoa | A stylish bar counter with craft cocktails, warm evening ambience |
| `food-takeaways.jpg` | Takeaways & Delivery | Takeaways and delivery in Pāpāmoa | Fresh fish & chips / takeaway food in paper, casual beachside vibe, appetising |
| `food-asian.jpg` | Asian Cuisine | Asian cuisine in Pāpāmoa | A vibrant spread of Asian dishes — curry, sushi, noodles — colourful and appetising |
| `food-pizza-burgers.jpg` | Pizza & Burgers | Pizza and burgers in Pāpāmoa | A gourmet pizza and a stacked burger with fries, mouth-watering, casual dining |
| `food-more.jpg` | More Food & Drink | More food and drink in Pāpāmoa | A colourful spread of varied cuisine — tacos, a vegan bowl, mediterranean plates — fresh and appetising |

## Shopping — `categories/shops/shopping.html` (5)
*(Real already: Everyday Shopping.)*

| Filename | Row | Alt text | Subject prompt |
|---|---|---|---|
| `shopping-fashion.jpg` | Fashion & Beauty | Fashion and beauty shopping in Pāpāmoa | A bright clothing boutique / outlet interior with racks and displays, stylish |
| `shopping-home.jpg` | Home & Garden | Home and garden retail in Pāpāmoa | A homewares / garden-centre display — plants, pots, decor — bright and inviting |
| `shopping-sport.jpg` | Sport & Outdoors | Sport and outdoors retail in Pāpāmoa | A sports / outdoors store with surfboards, bikes and camping gear, active vibe |
| `shopping-specialist.jpg` | Specialist Retail | Specialist retail in Pāpāmoa | A cosy second-hand bookstore aisle packed with books, warm lighting, browsable |
| `shopping-trade.jpg` | Trade & Hardware | Trade and hardware in Pāpāmoa | A hardware / building-supplies aisle with timber and tools, bright and organised |
