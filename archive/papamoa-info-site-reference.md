# Papamoa.info Site Reference
## Sales Automation System Build — April 2026

---

## 1. CMS & Platform Details

- **CMS:** Drupal (Klixo-built)
- **Theme:** `papamoa_info_theme`
- **Domain:** www.papamoa.info
- **Sitemap:** Yes — `/sitemap.xml` (single file, not index)
- **SSL:** Yes (HTTPS)
- **Admin contact:** admin@papamoa.info / 07 307 8616
- **Social:** facebook.com/papamoa.info / instagram.com/papamoa.info
- **Google Ads pixel:** Active (DoubleClick conversion tracking)

---

## 2. URL Structure & Patterns

### Category Pages
```
/{top-level-category}
/{top-level-category}/{subcategory-slug}
```
Examples:
- `papamoa.info/food-drink`
- `papamoa.info/food-drink/cafes`
- `papamoa.info/services/dentist`
- `papamoa.info/shops/clothing`

### Listing Pages (Business Profiles)
```
/business/{business-name-slug}
```
Examples:
- `papamoa.info/business/wagon-gourmet-burgers-bar-grill`
- `papamoa.info/business/papamoa-orthodontist`
- `papamoa.info/business/tara-rd-dental`

**KEY INSIGHT:** Listing URLs live under `/business/` regardless of which category they belong to. The category association is handled by Drupal taxonomy, not the URL path. This means a single listing can appear in multiple subcategories.

### Other Page Types
```
/papamoa-news                          — News index
/papamoa-events-whats-on               — Events index
/papamoa-events-whats-on/{event-slug}  — Individual event
/papamoa-notices                       — Notices
/papamoa-classifieds                   — Classifieds index
/papamoa-classifieds/{category-slug}   — Classified category
/overview                              — About Papamoa
/maps                                  — Maps page
/contact-papamoainfo                   — Contact form
/other-regions                         — Sister sites
/competition-entry-form                — Competition
/papamoa-specials                      — Specials/deals
```

### Breadcrumbs
Pattern: `Home > [Page Title]`
Example: `Home > THE WAGON — Gourmet Burgers, Bar & Grill`
Note: Breadcrumbs do NOT show category hierarchy — just Home > Listing Title.

---

## 3. Complete Category Tree

### 3.1 Accommodation (12 subcategories)
| Subcategory | Slug |
|---|---|
| Apartments | apartments |
| Backpackers | backpackers |
| Bed & Breakfast | bed-breakfast |
| Book Online | book-online |
| Holiday Homes | holiday-homes |
| Holiday Parks | holiday-parks |
| Hotels | hotels |
| Motels | motels |
| Pet Friendly Accommodation | pet-friendly-accommodation |
| Rental Homes | rental-homes |
| Retirement Villages | retirement-villages |
| Self Contained | self-contained |

### 3.2 Activities (37 subcategories)
| Subcategory | Slug |
|---|---|
| Adventure | adventure |
| Arcade Games | arcade-games |
| Art | art |
| Boating & Boat Hire | boating-boat-hire |
| Bounce Park | bounce-park |
| Cinema | cinema |
| Climbing | climbing |
| Clubs and Societies | clubs-and-societies |
| Cycling | cycling |
| Diving | diving |
| Escape Rooms | escape-rooms |
| Family | family |
| Fishing | fishing |
| Flying | flying |
| Go Karts | go-karts |
| Golf | golf |
| Gym | gym |
| Health & Recreation | health-recreation |
| Hunting | hunting |
| Indoor Activities | indoor-activities |
| Indoor Playground | indoor-playground |
| Internet Cafe | internet-cafe |
| Jet Boating | jet-boating |
| Kayaking | kayaking |
| Maori Culture | maori-culture |
| Paintball | paintball |
| Quad Bike Tours | quad-bike-tours |
| Rafting | rafting |
| Sightseeing | sightseeing |
| Skydiving | skydiving |
| Sport | sport |
| Swimming | swimming |
| Team Building | team-building |
| Ten Pin Bowling | ten-pin-bowling |
| Tours | tours |
| Virtual Reality | virtual-reality |
| Walking | walking |
| Winery Tours | winery-tours |

### 3.3 Food & Drink (18 subcategories)
| Subcategory | Slug |
|---|---|
| Bars | bars |
| Beer, Wine & Spirits | beer-wine-spirits |
| Burgers | burgers |
| Cafes | cafes |
| Caterers | caterers |
| Delivery | delivery |
| Fish & Chips | fish-chips |
| French Food | french-food |
| Function Venues | function-venues |
| Indian Food | indian-food |
| Italian Food | italian-food |
| Japanese Food | japanese-food |
| Mexican Food | mexican-food |
| Order Online | order-online |
| Pizza | pizza |
| Restaurants | restaurants |
| Retail | retail |
| Takeaways | takeaways |
| Thai Food | thai-food |
| Turkish Food | turkish-food |
| Vietnamese Food | vietnamese-food |

### 3.4 Shops (57 subcategories)
| Subcategory | Slug |
|---|---|
| Arts and Crafts | arts-and-crafts |
| Audio & Video | audio-video |
| Automotive Parts | automotive-parts |
| Baby Products | baby-products |
| Bathrooms | bathrooms |
| Beds and Bedding | beds-and-bedding |
| Benchtops | benchtops |
| Boats | boats |
| Books | books |
| Bridal Supplies | bridal-supplies |
| Building Supplies | building-supplies |
| Butcher | butcher |
| Camping Equipment and Supplies | camping-equipment-and-supplies |
| Caravans & Motor Homes | caravans-motor-homes |
| Cars | cars |
| Chainsaws | chainsaws |
| Cleaning Materials | cleaning-materials |
| Clothing | clothing |
| Computers | computers |
| Confectionery | confectionery |
| Curtains | curtains |
| Cycles | cycles |
| Equestrian Supplies | equestrian-supplies |
| Fishing Supplies | fishing-supplies |
| Flooring | flooring |
| Flowers | flowers |
| Fruit and Vegetables | fruit-and-vegetables |
| Furnishings | furnishings |
| Garden Centre | garden-centre |
| Gift Vouchers | gift-vouchers |
| Gifts and Souvenirs | gifts-and-souvenirs |
| Health and Sports Nutrition | health-and-sports-nutrition |
| Home and Decor | home-and-decor |
| Home Heating | home-heating |
| Household Appliances | household-appliances |
| Hunting Supplies | hunting-supplies |
| Jewellery | jewellery |
| Kitchens | kitchens |
| Lawnmowers | lawnmowers |
| Lighting | lighting |
| Liquor | liquor |
| Mobile Phones | mobile-phones |
| Motorcycles | motorcycles |
| Musical Instruments | musical-instruments |
| Office Supplies | office-supplies |
| Outdoor Power Equipment | outdoor-power-equipment |
| Painting and Decorating | painting-and-decorating |
| Pharmacy | pharmacy |
| Photographic Equipment | photographic-equipment |
| Plumbing Supplies | plumbing-supplies |
| Sewing Machines | sewing-machines |
| Shoes | shoes |
| Shop Online | shop-online |
| Souvenirs | souvenirs |
| Sporting Equipment | sporting-equipment |
| Stationery | stationery |
| Supermarket | supermarket |
| Surf / Skate / Snow | surf-skate-snow |
| Swimming Pools and Spas | swimming-pools-and-spas |
| Water Filters | water-filters |
| Whiteware | whiteware |
| Wool and Fabrics | wool-and-fabrics |

### 3.5 Services (127 subcategories)
| Subcategory | Slug |
|---|---|
| Abrasive Blasting & Sandblasting | abrasive-blasting-sandblasting |
| Accountants | accountants |
| Acupuncture | acupuncture |
| Advertising | advertising |
| Agricultural Spraying | agricultural-spraying |
| Air Conditioning | air-conditioning |
| Aluminium | aluminium |
| Appliance Repairs | appliance-repairs |
| Arborist | arborist |
| Architect | architect |
| Audiology | audiology |
| Auditors | auditors |
| Auto Electrical | auto-electrical |
| Automotive Repairs | automotive-repairs |
| Awnings & Canopies | awnings-canopies |
| Banking | banking |
| Batteries | batteries |
| Beauty Therapy | beauty-therapy |
| Benchtops | benchtops |
| Blinds | blinds |
| Boarding Kennels & Cattery | boarding-kennels-cattery |
| Boat and Yacht Services | boat-and-yacht-services |
| Body Piercing | body-piercing |
| Bouncy Castles | bouncy-castles |
| Brick and Block Laying | brick-and-block-laying |
| Bridal Services | bridal-services |
| Broadband / Internet Providers | broadband-internet-providers |
| Builders | builders |
| Building | building |
| Bus Charters | bus-charters |
| Business Services | business-services |
| Cakes & Wedding Cakes | cakes-wedding-cakes |
| Car & Boat Interiors | car-boat-interiors |
| Car Rental | car-rental |
| Car Servicing | car-servicing |
| Car Valet | car-valet |
| Caravan & Motorhomes | caravan-motorhomes |
| Carpet Cleaning | carpet-cleaning |
| Catering | catering |
| Childcare | childcare |
| Chimney Sweep | chimney-sweep |
| Chiropractor | chiropractor |
| Churches | churches |
| Civil Contractors & Construction | civil-contractors-construction |
| Cleaning | cleaning |
| Clothing Alterations | clothing-alterations |
| Computer Repairs | computer-repairs |
| Concrete | concrete |
| Conference and Event Facilities | conference-and-event-facilities |
| Contrast Therapy | contrast-therapy |
| Counselling | counselling |
| Crane and Hiab Hire | crane-and-hiab-hire |
| Dance Classes | dance-classes |
| Dentist | dentist |
| Dentures | dentures |
| Digger & Bobcat Hire | digger-bobcat-hire |
| Doctor | doctor |
| Dog Grooming | dog-grooming |
| Drain Laying | drain-laying |
| Drug Testing | drug-testing |
| Dry Cleaners | dry-cleaners |
| Earthmoving & Excavation | earthmoving-excavation |
| Electric Scooter Hire | electric-scooter-hire |
| Electric Vehicle Charging | electric-vehicle-charging |
| Electrical Contractors | electrical-contractors |
| Embroidery | embroidery |
| Employment Services | employment-services |
| Engineering | engineering |
| Exterior Cleaning | exterior-cleaning |
| Farming | farming |
| Fencing | fencing |
| Financial Advisor | financial-advisor |
| First Aid | first-aid |
| Flooring | flooring |
| Florist | florist |
| Function Room & Venue Hire | function-room-venue-hire |
| Furnishings | furnishings |
| Furniture Movers & Removals | furniture-movers-removals |
| Gas Fitting | gas-fitting |
| Gas Supplies | gas-supplies |
| Glass | glass |
| Graphic Design | graphic-design |
| Hairdressers | hairdressers |
| Handyman | handyman |
| Health & Fitness | health-fitness |
| Health and Safety | health-and-safety |
| Heat Pumps | heat-pumps |
| Hire | hire |
| Home and Decor | home-and-decor |
| Home Ventilation | home-ventilation |
| Insurance | insurance |
| Interior Decoration | interior-decoration |
| IT Solutions | it-solutions |
| Joinery | joinery |
| Kinesiologist | kinesiologist |
| Landscaping | landscaping |
| Launderette | launderette |
| Lawn Mowing | lawn-mowing |
| Lawyers | lawyers |
| Life Coach | life-coach |
| Locksmith | locksmith |
| Marquee Hire | marquee-hire |
| Massage Therapy | massage-therapy |
| Mobile Mechanic | mobile-mechanic |
| Mobile Phone Repairs | mobile-phone-repairs |
| Mobility Aids | mobility-aids |
| Mortgage Brokers | mortgage-brokers |
| Motorcycles | motorcycles |
| Natural Health | natural-health |
| Optometrist | optometrist |
| Osteopath | osteopath |
| Outdoor Fireplaces | outdoor-fireplaces |
| Outdoor Power Equipment | outdoor-power-equipment |
| Painters and Decorators | painters-and-decorators |
| Panel Beaters | panel-beaters |
| Party Hire | party-hire |
| Personal Trainer | personal-trainer |
| Pest Management | pest-management |
| Pet Minder | pet-minder |
| Pharmacy | pharmacy |
| Photocopying | photocopying |
| Photographic Processing | photographic-processing |
| Photography | photography |
| Physiotherapy | physiotherapy |
| Plasterers | plasterers |
| Plumber | plumber |
| Podiatrist | podiatrist |
| Printing | printing |
| Project Management | project-management |
| Property Maintenance | property-maintenance |
| Property Management | property-management |
| Real Estate | real-estate |
| Refrigeration | refrigeration |
| Retirement | retirement |
| Roofing | roofing |
| Sanitizing | sanitizing |
| Scaffolding | scaffolding |
| Second Hand Dealers | second-hand-dealers |
| Security | security |
| Shuttle | shuttle |
| Signs | signs |
| Skin Treatments / Skin Care | skin-treatments-skin-care |
| Solar Energy & Equipment / Solar Power | solar-energy-equipment-solar-power |
| Storage | storage |
| Surveyors | surveyors |
| Swimming Pools and Spas | swimming-pools-and-spas |
| Taxis | taxis |
| Telecommunications | telecommunications |
| Test & Tag Services | test-tag-services |
| Tiling | tiling |
| Towing & Salvage | towing-salvage |
| Tractors | tractors |
| Transport | transport |
| Travel | travel |
| Trophy Engraving | trophy-engraving |
| Truck Repairs | truck-repairs |
| Tyres | tyres |
| Upholsterer | upholsterer |
| Valuers | valuers |
| Veterinary Services & Supplies | veterinary-services-supplies |
| Video Production | video-production |
| Wardrobes | wardrobes |
| Waste Disposal | waste-disposal |
| Water Blasting | water-blasting |
| Website Developers | website-developers |
| Weddings | weddings |
| Window & Windscreen Repairs | window-windscreen-repairs |
| Windows and Doors | windows-and-doors |
| WOF | wof |
| Worm Farming | worm-farming |
| Yoga | yoga |

### 3.6 Essential Information (standalone page, no subcategories in nav)

### Category Totals
| Top-Level | Subcategory Count |
|---|---|
| Accommodation | 12 |
| Activities | 37 |
| Food & Drink | 21 |
| Shops | 57 |
| Services | 127 |
| Essential Information | 0 (informational) |
| **TOTAL SUBCATEGORIES** | **254** |

---

## 4. Listing Page Field Map

Based on analysis of The Wagon, Papamoa Orthodontist, and Tara Rd Dental:

### Standard Listing Fields (All Listings)

| Field | Required | Notes |
|---|---|---|
| **Business Title** | Yes | H1, displayed ALL CAPS in title bar |
| **Logo** | Yes | Displayed in sidebar, path: `/sites/.../pics/listings/logos/` |
| **Street Address** | Yes | e.g. "8 Toorea Street" |
| **Suburb, City** | Yes | e.g. "Papamoa, Tauranga" or "Papamoa, Tauranga" |
| **Phone** | Yes | Clickable tel: link, format "07 XXX XXXX" |
| **Email** | Yes | mailto: link, subject auto-filled "Website enquiry from Taupo.info" (note: legacy subject line referencing Taupo.info) |
| **Website URL** | Yes | External link with "Visit Website" label |
| **Description (body)** | Yes | Rich HTML content, paragraphs, bold, links. Multiple sections possible |
| **Image Gallery** | Yes | Slideshow + thumbnail grid below description |
| **Location Map** | Yes | Google Maps embed section |
| **Contact Form** | Yes | Name*, Email, Phone, Enquiry* fields |
| **Category Tags** | Yes | "Find [BUSINESS] in these Categories" section at bottom |

### Optional / Extended Fields

| Field | Seen On | Notes |
|---|---|---|
| **Opening Hours** | The Wagon | Free-text format, not structured |
| **Services List** | Orthodontist, Tara Rd | Links to service pages on the business's own website |
| **Quick Feature Tags** | The Wagon | Bullet-style feature list ("Fully Licenced", "Cocktails", etc.) |
| **Social Media Links** | The Wagon, Orthodontist | Facebook and Instagram link sections |
| **Affiliate Logos** | Orthodontist | Association badges (NZAO, Invisalign, etc.) in `/pics/listings/affiliate-logos/` |
| **"More Information" Section** | Orthodontist, Tara Rd | Expandable detailed content with anchor link from header |
| **CTA Buttons** | The Wagon | "ORDER ONLINE" / "VIEW MENU" styled as bold linked text |
| **Facebook Embed** | The Wagon | Blockquote linking to FB page |

### Listing Page In-Page Navigation

Top of listing includes anchor links based on content:
- `#gallery` (when image gallery present)
- `#more-information` (when extended info section present)
- `#map` (always present)
- `#contact-form` (always present)

### Image Paths & Styles

```
Logo:        /sites/.../pics/listings/logos/{filename}
Gallery:     /sites/.../pics/listings/images/{filename}
Affiliates:  /sites/.../pics/listings/affiliate-logos/{filename}
Category:    /sites/.../pics/category/{filename}

Image styles (Drupal image_style):
- slideshow__smartport    (gallery main)
- list__smartport         (gallery thumbnails)
- full__smartport         (lightbox/popup)
- inline__smartport       (logo in sidebar)
- logo                    (affiliate badges)
```

---

## 5. Schema & SEO Notes

### HTML Title Pattern
```
{BUSINESS NAME} | Papamoa Information
```
Example: `THE WAGON — Gourmet Burgers, Bar & Grill`

### Category Page Title Pattern
```
{Category Name} | Papamoa Information
```
Example: `Shops | Papamoa Information`

### Category Page SEO Description
Each category index page has a unique editorial description paragraph at the top, written in third-person voice about Papamoa as a destination. Example from Shops page:
> "Papamoa is a vibrant destination for shopping lovers, offering a diverse mix of retail experiences..."

### Schema Markup
No structured data (JSON-LD, Microdata, or RDFa) was detected in the listing pages. The CMS does not output LocalBusiness schema. This is an SEO gap that the PPP (Premium Profile Page) system can exploit — PPP pages on GitHub will include full LocalBusiness schema markup.

### Sitemap Details
- Single `sitemap.xml` (not a sitemap index)
- Includes category pages (priority 0.9), listing pages (priority 0.7), events (priority 0.3)
- `changefreq` varies: daily (homepage), weekly (active listings), monthly (most), yearly (archives)
- ~250 URLs total in sitemap
- Listings appear as `/business/{slug}`, confirming flat listing URL structure

---

## 6. Listings Identified from Sitemap

### Active Business Listings (recently updated, priority 0.7)
| Business | URL Slug | Last Modified |
|---|---|---|
| About Our District | about-our-district | 2026-02-10 |
| Justice of Peace | justice-peace | 2026-02-23 |
| Coastguard Tauranga | coastguard-tauranga | 2026-02-24 |
| EV Charging Stations | ev-charging-stations | 2026-02-23 |
| Webcam | papamoa-web-cam-live-camera | 2026-02-23 |
| Bay of Plenty | bay-plenty | 2026-02-10 |
| Dot Info Marketing | dot-info-marketing | 2026-03-04 |
| Papamoa Orthodontist | papamoa-orthodontist | 2026-03-25 |
| Tara Rd Dental | tara-rd-dental | 2026-03-25 |
| Pacific Park Holiday Camp | pacific-park-christian-holiday-camp | 2026-03-23 |
| The Wagon | wagon-gourmet-burgers-bar-grill | 2026-03-25 |
| Karaka Pines Papamoa | karaka-pines-papamoa | 2026-03-24 |
| Police | papamoa-police | 2026-02-23 |
| St John Ambulance | st-john-ambulance | 2026-02-23 |
| Tauranga Airport | tauranga-airport | 2026-02-23 |
| SPCA | spca-tauranga-centre | 2026-02-23 |
| District Council | tauranga-district-council | 2026-02-23 |
| Fire Station | papamoa-fire-station | 2026-02-23 |
| Hospital | tauranga-hospital | 2026-02-23 |
| Duty Doctor / Pharmacy | papamoa-duty-doctor-pharmacy | 2026-02-23 |
| Radio Stations | papamoa-radio-stations | 2026-02-23 |
| Museum | tauranga-museum | 2026-02-23 |
| Citizens Advice | tauranga-citizens-advice-bureau | 2026-02-23 |
| Library | papamoa-library | 2026-02-23 |
| Retirement | retirement-papamoa | 2026-03-22 |
| Landfill / Recycling | landfill-and-recycling-facilities | 2026-02-23 |
| Education | education-papamoa | 2026-02-24 |
| Health Services | health-services-papamoa | 2026-02-24 |
| Recreational Facilities | recreational-facilities | 2026-02-10 |
| Sports Clubs | sports-clubs-and-societies | 2026-02-23 |
| Business Opportunities | business-opportunities | 2026-02-24 |
| Living History | living-history-papamoa | 2026-02-10 |
| Photo Gallery | papamoa-photo-gallery | 2026-02-10 |
| Local Attractions | local-attractions | 2026-02-24 |
| Weather | papamoa-weather | 2026-02-18 |
| Support Groups | support-groups | 2026-02-23 |

**NOTE:** Most of these are essential/community info pages, not paid business listings. The paid commercial listings (Orthodontist, Tara Rd Dental, The Wagon, Karaka Pines, Pacific Park) are the minority, which confirms the directory is early-stage with lots of room for new paid listings.

---

## 7. Key Observations for Sales System Build

### Spotlight Scarcity Logic
- **254 total subcategories** across 5 top-level categories
- Each subcategory supports exactly ONE Gold/Spotlight listing
- Current paid listings appear to be fewer than 5, meaning ~249 Spotlight slots are open
- Services has 127 subcategories (the largest pool of Spotlight opportunities)
- A business can be listed in MULTIPLE subcategories (The Wagon appears in 7)
- Gold gets primary subcategory included; additional subcategories cost $99+gst each

### Onboarding Form Mapping
The listing field map above directly maps to the onboarding form fields:
- Company Name -> Business Title
- Admin Email -> used for portal/invoicing
- Customer Email -> displayed on listing as contact
- Admin Phone -> internal
- Customer Phone -> displayed on listing
- Website -> "Visit Website" link
- Social Profiles -> Facebook/Instagram section
- Logo (PNG/SVG) -> sidebar logo
- Hero Images (up to 5, Silver; unlimited, Gold) -> gallery slideshow
- Menu/Pricing docs -> used by Jayden for description writing

### Content Generation Prompt Notes
- Listings are written in THIRD PERSON ("they offer...", "the team provides...")
- Tone is editorial/directory voice, not business voice
- Descriptions include geographic context ("conveniently located...", "serving patients from Papamoa, Mt Maunganui, Te Puke, and Tauranga")
- CTAs use bold linked text, not button components
- Opening hours are free-text, not structured data
- Service lists can link to the business's own website pages

### CMS Pattern for PPP Integration
- Drupal taxonomy handles category assignment (multi-value)
- No structured data/schema in CMS output (PPP advantage)
- Image paths follow predictable Drupal patterns
- Contact form uses built-in Drupal webform (not Web3Forms)
- The legacy email subject says "from Taupo.info" — this is a template artifact from the sister network

---

## 8. Pages Discovered Only via Sitemap

These pages exist but are not linked in the main nav:
- `/papamoa-specials` — Deals/specials page
- `/haere-mai-ki-papamoa` — Alternate homepage/welcome (priority 1.0)
- `/competition-entry-form` — Competition entry
- `/privacy-policy` — Privacy
- `/papamoa-events` — Alternate events URL (vs /papamoa-events-whats-on)
- `/business/dot-info-marketing` — The directory's own marketing/advertising page
- `/business/central-plateau` — Bay of Plenty info (slug doesn't match content)

---

## 9. Classifieds Categories

A separate system from the business directory:
- Art, Crafts & Toys
- Baby Products
- Cars, Bikes & Boats
- Clothing, Shoes & Fashion
- Computers & Games
- Fishing
- Food & Drink (with Mexican sub-category)
- Health & Beauty
- Home and Living
- Locally Made Products & Produce
- Music & Instruments
- Sports Equipment

---

*Document generated by scraping papamoa.info on 2026-04-01. Sources: homepage, sitemap.xml, /shops, /services, plus listing pages for The Wagon, Papamoa Orthodontist, and Tara Rd Dental.*
