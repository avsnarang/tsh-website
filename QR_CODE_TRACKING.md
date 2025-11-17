# QR Code Billboard Tracking for Admissions Page

## QR Code Link

Use this link for your billboard QR code:

```
https://tsh.edu.in/admissions?utm_source=billboard&utm_medium=qr_code&utm_campaign=admissions_2025&utm_content=billboard_qr
```

### Customizable Parameters

You can customize the UTM parameters for different billboards or campaigns:

- `utm_source=billboard` - Identifies the source as a billboard (required for tracking)
- `utm_medium=qr_code` - Identifies the medium as QR code (required for tracking)
- `utm_campaign=admissions_2025` - Campaign name (customize per campaign)
- `utm_content=billboard_qr` - Content identifier (customize per billboard location)

**Example for different billboard locations:**
- Location A: `...&utm_campaign=admissions_2025&utm_content=location_a`
- Location B: `...&utm_campaign=admissions_2025&utm_content=location_b`

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

### 2. Button Click Events

**Event: `admission_cta_clicked`**
- Tracks "Apply Now" button clicks on campus cards
- Includes:
  - Campus name
  - Campus location
  - UTM parameters (for attribution)
  - `is_qr_code_visit` flag
  - Click timestamp

**Event: `qr_code_billboard_conversion`**
- Specifically tracks conversions from QR code billboard visits
- Only fires when user came from QR code AND clicked "Apply Now"
- Includes:
  - Campus name
  - Campaign information
  - Conversion timestamp

## PostHog Queries

### Total QR Code Visits
```
Event: qr_code_billboard_visit
```

### QR Code Visitors Who Clicked Apply
```
Event: qr_code_billboard_conversion
```

### Conversion Rate
```
(qr_code_billboard_conversion count) / (qr_code_billboard_visit count) * 100
```

### Apply Button Clicks by Campus (from QR code)
```
Event: qr_code_billboard_conversion
Group by: campus_name
```

### All Admissions Page Views (with QR code filter)
```
Event: admissions_page_viewed
Filter: is_qr_code_visit = true
```

## How It Works

1. **UTM Parameter Capture**: When a user scans the QR code, UTM parameters are captured from the URL
2. **Local Storage**: UTM parameters are stored in localStorage for 30 days for attribution
3. **Page View Tracking**: On page load, the system detects QR code visits and tracks them
4. **Button Click Attribution**: When users click "Apply Now", the system includes UTM parameters to attribute the click to the QR code source
5. **Conversion Tracking**: Special conversion events are fired for QR code visitors who click "Apply Now"

## Testing

To test the tracking:

1. Visit the QR code link in an incognito/private browser window
2. Open browser console and check for PostHog events:
   - Should see `admissions_page_viewed` with `is_qr_code_visit: true`
   - Should see `qr_code_billboard_visit` event
3. Click an "Apply Now" button
4. Check console for:
   - `admission_cta_clicked` with UTM parameters
   - `qr_code_billboard_conversion` event

## Notes

- UTM parameters persist for 30 days in localStorage
- All events include timestamps for time-based analysis
- The system tracks both direct QR code visits and subsequent actions
- Multiple billboards can be tracked by using different `utm_content` values

