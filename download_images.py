#!/usr/bin/env python3
import os
import urllib.request
import ssl

# Create images directory if it doesn't exist
images_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
os.makedirs(images_dir, exist_ok=True)

# Disable SSL certificate verification (not recommended for production)
ssl._create_default_https_context = ssl._create_unverified_context

# Images to replace (just image 8 that failed)
replacement_images = [
    {'url': 'https://images.unsplash.com/photo-1577915509669-e8daeb28b498', 'filename': 'nail8.jpg'}  # New replacement for image 8
]

# Add download parameters to the URLs
download_urls = []
for img in replacement_images:
    download_urls.append({
        'url': f"{img['url']}?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjMyNTAxMjMw",
        'filename': img['filename']
    })

# Download all images
print('Starting download of remaining replacement nail design images...')
for img in download_urls:
    try:
        filepath = os.path.join(images_dir, img['filename'])
        # Remove existing file if it exists
        if os.path.exists(filepath):
            os.remove(filepath)
            print(f"Removed existing file: {img['filename']}")
            
        print(f"Downloading {img['filename']}...")
        urllib.request.urlretrieve(img['url'], filepath)
        print(f"Downloaded: {img['filename']}")
    except Exception as e:
        print(f"Error downloading {img['filename']}: {str(e)}")

print('All replacement downloads completed!') 