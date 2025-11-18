# Campaign Tracking for Admissions Page

## Campaign Links

### 1. Billboard QR Code

Use this link for your billboard QR code:

```
https://tsh.edu.in/admissions?utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=billboard_qr
```

### 2. Pamphlet QR Code

Use this link for your pamphlet QR code:

```
https://tsh.edu.in/admissions?utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=pamphlet_qr
```

### 3. Meta Campaign

Use this link for your Meta (Facebook/Instagram) ad campaigns:

```
https://tsh.edu.in/admissions?utm_source=meta&utm_medium=cpc&utm_campaign=admissions_2026&utm_content=meta_ad_1
```

**Alternative Meta source:**
```
https://tsh.edu.in/admissions?utm_source=facebook&utm_medium=cpc&utm_campaign=admissions_2026&utm_content=facebook_ad_1
```

### Customizable Parameters

You can customize the UTM parameters for different billboards, pamphlets, or campaigns:

- `utm_source=billboard`, `utm_source=pamphlet`, `utm_source=meta`, or `utm_source=facebook` - Identifies the source (required for tracking)
- `utm_medium=qr_code` (for QR codes) or `utm_medium=cpc` (for paid ads) - Identifies the medium (required for tracking)
- `utm_campaign=admissions_2026` - Campaign name (customize per campaign)
- `utm_content=billboard_qr`, `utm_content=pamphlet_qr`, or `utm_content=meta_ad_1` - Content identifier (customize per location/version/ad)

**Examples for different locations:**
- Billboard Location A: `...utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=location_a`
- Billboard Location B: `...utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=location_b`
- Pamphlet Version 1: `...utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=version_1`
- Pamphlet Version 2: `...utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=version_2`
- Meta Ad Set 1: `...utm_source=meta&utm_medium=cpc&utm_campaign=admissions_2026&utm_content=ad_set_1`
- Meta Ad Set 2: `...utm_source=meta&utm_medium=cpc&utm_campaign=admissions_2026&utm_content=ad_set_2`

## PostHog Events Tracked

### 1. Page View Events

**Event: `admissions_page_viewed`**
- Tracks all admissions page visits
- Includes UTM parameters
- Includes `is_qr_code_visit` flag (true for QR code visits)

**Event: `qr_code_billboard_visit`**
- Specifically tracks QR code billboard visits
- Only fires when `utm_source=billboard` and `utm_medium=qr_code`
- Includes campaign and content information

**Event: `qr_code_pamphlet_visit`**
- Specifically tracks QR code pamphlet visits
- Only fires when `utm_source=pamphlet` and `utm_medium=qr_code`
- Includes campaign and content information

**Event: `meta_campaign_visit`**
- Specifically tracks Meta campaign visits
- Only fires when `utm_source=meta` or `utm_source=facebook`
- Includes campaign and content information
- Also triggers Meta Pixel `ViewContent` event

### 2. Button Click Events

**Event: `admission_cta_clicked`**
- Tracks "Apply Now" button clicks on campus cards
- Includes:
  - Campus name
  - Campus location
  - UTM parameters (for attribution)
  - `is_qr_code_visit` flag (true for both billboard and pamphlet QR codes)
  - `is_meta_campaign` flag (true for Meta campaign visits)
  - Click timestamp

**Event: `qr_code_billboard_conversion`**
- Specifically tracks conversions from QR code billboard visits
- Only fires when user came from billboard QR code AND clicked "Apply Now"
- Includes:
  - Campus name
  - Campaign information
  - Conversion timestamp

**Event: `qr_code_pamphlet_conversion`**
- Specifically tracks conversions from QR code pamphlet visits
- Only fires when user came from pamphlet QR code AND clicked "Apply Now"
- Includes:
  - Campus name
  - Campaign information
  - Conversion timestamp

**Event: `meta_campaign_conversion`**
- Specifically tracks conversions from Meta campaign visits
- Only fires when user came from Meta campaign AND clicked "Apply Now"
- Includes:
  - Campus name
  - Campaign information
  - Conversion timestamp
- Also triggers Meta Pixel `Lead` event

### 3. Meta Pixel Events

**Event: `ViewContent`**
- Fires when a user visits the admissions page from a Meta campaign
- Includes:
  - `content_name`: "Admissions Page"
  - `content_category`: "Admissions"
  - `content_ids`: ["admissions_2026"]
  - Campaign and content information

**Event: `Lead`**
- Fires when a user clicks "Apply Now" after visiting from a Meta campaign
- Includes:
  - `content_name`: "Admissions - [Campus Name]"
  - `content_category`: "Admissions"
  - `content_ids`: ["campus_[campus_name]"]
  - Campus name
  - Campaign and content information

## PostHog Queries

### Billboard QR Code Metrics

**Total Billboard QR Code Visits**
```
Event: qr_code_billboard_visit
```

**Billboard QR Code Visitors Who Clicked Apply**
```
Event: qr_code_billboard_conversion
```

**Billboard Conversion Rate**
```
(qr_code_billboard_conversion count) / (qr_code_billboard_visit count) * 100
```

**Billboard Apply Button Clicks by Campus**
```
Event: qr_code_billboard_conversion
Group by: campus_name
```

### Pamphlet QR Code Metrics

**Total Pamphlet QR Code Visits**
```
Event: qr_code_pamphlet_visit
```

**Pamphlet QR Code Visitors Who Clicked Apply**
```
Event: qr_code_pamphlet_conversion
```

**Pamphlet Conversion Rate**
```
(qr_code_pamphlet_conversion count) / (qr_code_pamphlet_visit count) * 100
```

**Pamphlet Apply Button Clicks by Campus**
```
Event: qr_code_pamphlet_conversion
Group by: campus_name
```

### Combined QR Code Metrics

**All QR Code Visits (Billboard + Pamphlet)**
```
Event: qr_code_billboard_visit OR qr_code_pamphlet_visit
```

**All QR Code Conversions (Billboard + Pamphlet)**
```
Event: qr_code_billboard_conversion OR qr_code_pamphlet_conversion
```

**All Admissions Page Views (with QR code filter)**
```
Event: admissions_page_viewed
Filter: is_qr_code_visit = true
```

**Compare Billboard vs Pamphlet Performance**
```
Compare:
- qr_code_billboard_visit vs qr_code_pamphlet_visit
- qr_code_billboard_conversion vs qr_code_pamphlet_conversion
```

### Meta Campaign Metrics

**Total Meta Campaign Visits**
```
Event: meta_campaign_visit
```

**Meta Campaign Visitors Who Clicked Apply**
```
Event: meta_campaign_conversion
```

**Meta Campaign Conversion Rate**
```
(meta_campaign_conversion count) / (meta_campaign_visit count) * 100
```

**Meta Campaign Apply Button Clicks by Campus**
```
Event: meta_campaign_conversion
Group by: campus_name
```

**Meta Pixel ViewContent Events**
```
Check Meta Events Manager for ViewContent events
Filter by: content_name = "Admissions Page"
```

**Meta Pixel Lead Events**
```
Check Meta Events Manager for Lead events
Filter by: content_category = "Admissions"
```

### Combined Campaign Metrics

**All Campaign Visits (Billboard + Pamphlet + Meta)**
```
Event: qr_code_billboard_visit OR qr_code_pamphlet_visit OR meta_campaign_visit
```

**All Campaign Conversions (Billboard + Pamphlet + Meta)**
```
Event: qr_code_billboard_conversion OR qr_code_pamphlet_conversion OR meta_campaign_conversion
```

**Compare All Channels Performance**
```
Compare:
- qr_code_billboard_visit vs qr_code_pamphlet_visit vs meta_campaign_visit
- qr_code_billboard_conversion vs qr_code_pamphlet_conversion vs meta_campaign_conversion
```

## How It Works

1. **UTM Parameter Capture**: PostHog automatically captures UTM parameters from the URL and includes them in all events
2. **Campaign Visit Detection**: 
   - When a user scans a billboard QR code, the system detects `utm_source=billboard` and `utm_medium=qr_code` and fires a `qr_code_billboard_visit` event
   - When a user scans a pamphlet QR code, the system detects `utm_source=pamphlet` and `utm_medium=qr_code` and fires a `qr_code_pamphlet_visit` event
   - When a user clicks a Meta ad, the system detects `utm_source=meta` or `utm_source=facebook` and fires a `meta_campaign_visit` event, plus a Meta Pixel `ViewContent` event
3. **Page View Tracking**: All page views are automatically tracked by PostHog with UTM parameters included
4. **Button Click Attribution**: When users click "Apply Now", the system captures the event with UTM parameters to attribute the click to the source (billboard, pamphlet, or Meta campaign)
5. **Conversion Tracking**: 
   - Special `qr_code_billboard_conversion` events are fired for billboard QR code visitors who click "Apply Now"
   - Special `qr_code_pamphlet_conversion` events are fired for pamphlet QR code visitors who click "Apply Now"
   - Special `meta_campaign_conversion` events are fired for Meta campaign visitors who click "Apply Now", plus a Meta Pixel `Lead` event
6. **Meta Pixel Integration**: 
   - Meta Pixel is initialized on page load (if `NEXT_PUBLIC_META_PIXEL_ID` is set)
   - ViewContent events are tracked when users visit from Meta campaigns
   - Lead events are tracked when users click "Apply Now" from Meta campaigns
   - All Meta Pixel events include campaign and content information for attribution

## Testing

### Testing Billboard QR Code Tracking

1. Visit the billboard QR code link in an incognito/private browser window:
   ```
   https://tsh.edu.in/admissions?utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=billboard_qr
   ```
2. Open browser console and check for PostHog events:
   - Should see `admissions_page_viewed` with `is_qr_code_visit: true`
   - Should see `qr_code_billboard_visit` event
3. Click an "Apply Now" button
4. Check console for:
   - `admission_cta_clicked` with UTM parameters
   - `qr_code_billboard_conversion` event

### Testing Pamphlet QR Code Tracking

1. Visit the pamphlet QR code link in an incognito/private browser window:
   ```
   https://tsh.edu.in/admissions?utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=pamphlet_qr
   ```
2. Open browser console and check for PostHog events:
   - Should see `admissions_page_viewed` with `is_qr_code_visit: true`
   - Should see `qr_code_pamphlet_visit` event
3. Click an "Apply Now" button
4. Check console for:
   - `admission_cta_clicked` with UTM parameters
   - `qr_code_pamphlet_conversion` event

### Testing Meta Campaign Tracking

1. Visit the Meta campaign link in an incognito/private browser window:
   ```
   https://tsh.edu.in/admissions?utm_source=meta&utm_medium=cpc&utm_campaign=admissions_2026&utm_content=meta_ad_1
   ```
2. Open browser console and check for events:
   - Should see `admissions_page_viewed` with `is_meta_campaign: true`
   - Should see `meta_campaign_visit` event in PostHog
   - Should see Meta Pixel `ViewContent` event (check Network tab for Facebook Pixel calls)
3. Click an "Apply Now" button
4. Check console for:
   - `admission_cta_clicked` with UTM parameters and `is_meta_campaign: true`
   - `meta_campaign_conversion` event in PostHog
   - Meta Pixel `Lead` event (check Network tab for Facebook Pixel calls)
5. Verify in Meta Events Manager:
   - ViewContent event should appear for the admissions page visit
   - Lead event should appear for the "Apply Now" click

## Notes

- UTM parameters persist for 30 days in localStorage
- All events include timestamps for time-based analysis
- The system tracks both direct campaign visits and subsequent actions
- Multiple billboards can be tracked by using different `utm_content` values
- Multiple pamphlets can be tracked by using different `utm_content` values
- Multiple Meta ad sets can be tracked by using different `utm_content` values
- Billboard, pamphlet, and Meta campaigns are tracked separately, allowing you to compare performance between all channels
- Meta Pixel requires `NEXT_PUBLIC_META_PIXEL_ID` environment variable to be set
- Meta Pixel events are tracked in both PostHog (for internal analytics) and Meta Events Manager (for ad optimization)
- Use `utm_source=meta` or `utm_source=facebook` for Meta campaigns (both are supported)

