#!/usr/bin/env python3
import os
import urllib.request
import ssl

# Create images directory if it doesn't exist
images_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
os.makedirs(images_dir, exist_ok=True)

# Disable SSL certificate verification (not recommended for production)
ssl._create_default_https_context = ssl._create_unverified_context

# Nail design image URLs from Unsplash - these are direct download links that should work
# We're only downloading images 12-20 since 1-11 already exist
nail_images = [
    # These are direct download links to nail design images on Unsplash
    {'url': 'https://images.unsplash.com/photo-1604902396830-aca29e19b067', 'filename': 'nail12.jpg'},
    {'url': 'https://images.unsplash.com/photo-1583255448430-17c5eda08e5c', 'filename': 'nail13.jpg'},
    {'url': 'https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7', 'filename': 'nail14.jpg'},
    {'url': 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f', 'filename': 'nail15.jpg'},
    {'url': 'https://images.unsplash.com/photo-1577915509669-e8daeb28b498', 'filename': 'nail16.jpg'},
    {'url': 'https://images.unsplash.com/photo-1610992015732-2449b76344bc', 'filename': 'nail17.jpg'},
    {'url': 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b', 'filename': 'nail18.jpg'},
    {'url': 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e', 'filename': 'nail19.jpg'},
    {'url': 'https://images.unsplash.com/photo-1604654894610-df63bc536371', 'filename': 'nail20.jpg'}
]

# Add download parameters to the URLs
download_urls = []
for img in nail_images:
    download_urls.append({
        'url': f"{img['url']}?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjMyNTAxMjMw",
        'filename': img['filename']
    })

# Download all images
print('Starting download of additional nail design images...')
for img in download_urls:
    try:
        filepath = os.path.join(images_dir, img['filename'])
        # Skip if file already exists
        if os.path.exists(filepath):
            print(f"Skipping {img['filename']} - file already exists")
            continue
            
        print(f"Downloading {img['filename']}...")
        urllib.request.urlretrieve(img['url'], filepath)
        print(f"Downloaded: {img['filename']}")
    except Exception as e:
        print(f"Error downloading {img['filename']}: {str(e)}")

print('All downloads completed!') 