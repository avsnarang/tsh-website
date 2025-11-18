# QR Code Tracking for Admissions Page

## QR Code Links

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

### Customizable Parameters

You can customize the UTM parameters for different billboards, pamphlets, or campaigns:

- `utm_source=billboard` or `utm_source=pamphlet` - Identifies the source (required for tracking)
- `utm_medium=qr_code` - Identifies the medium as QR code (required for tracking)
- `utm_campaign=admissions_2026` - Campaign name (customize per campaign)
- `utm_content=billboard_qr` or `utm_content=pamphlet_qr` - Content identifier (customize per location/version)

**Examples for different locations:**
- Billboard Location A: `...utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=location_a`
- Billboard Location B: `...utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=location_b`
- Pamphlet Version 1: `...utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=version_1`
- Pamphlet Version 2: `...utm_source=pamphlet&utm_medium=qr_code&utm_campaign=admissions_2026&utm_content=version_2`

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

### 2. Button Click Events

**Event: `admission_cta_clicked`**
- Tracks "Apply Now" button clicks on campus cards
- Includes:
  - Campus name
  - Campus location
  - UTM parameters (for attribution)
  - `is_qr_code_visit` flag (true for both billboard and pamphlet QR codes)
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

## How It Works

1. **UTM Parameter Capture**: PostHog automatically captures UTM parameters from the URL and includes them in all events
2. **QR Code Visit Detection**: 
   - When a user scans a billboard QR code, the system detects `utm_source=billboard` and `utm_medium=qr_code` and fires a `qr_code_billboard_visit` event
   - When a user scans a pamphlet QR code, the system detects `utm_source=pamphlet` and `utm_medium=qr_code` and fires a `qr_code_pamphlet_visit` event
3. **Page View Tracking**: All page views are automatically tracked by PostHog with UTM parameters included
4. **Button Click Attribution**: When users click "Apply Now", the system captures the event with UTM parameters to attribute the click to the QR code source (billboard or pamphlet)
5. **Conversion Tracking**: 
   - Special `qr_code_billboard_conversion` events are fired for billboard QR code visitors who click "Apply Now"
   - Special `qr_code_pamphlet_conversion` events are fired for pamphlet QR code visitors who click "Apply Now"

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

## Notes

- UTM parameters persist for 30 days in localStorage
- All events include timestamps for time-based analysis
- The system tracks both direct QR code visits and subsequent actions
- Multiple billboards can be tracked by using different `utm_content` values
- Multiple pamphlets can be tracked by using different `utm_content` values
- Billboard and pamphlet QR codes are tracked separately, allowing you to compare performance between the two channels

