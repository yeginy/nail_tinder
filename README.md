# Nail Swiper

A Tinder-like web application for browsing and rating nail designs. Users can view nail design images and indicate whether they like or dislike each design by clicking thumbs up/down buttons or swiping right/left on touch devices.

## Features

- Simple and intuitive interface
- Responsive design that works on desktop and mobile devices
- Smooth animations for swiping between designs
- Touch gesture support for mobile users
- Modern, clean visual design
- 20 beautiful nail design images included

## Technologies Used

- HTML5
- CSS3 (with Flexbox for layout)
- Vanilla JavaScript (no frameworks)
- Font Awesome for icons
- Images from Unsplash (free to use under the Unsplash license)

## Project Structure

```
nail_swiper/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── download_images.py  # Python script to download nail design images
├── images/             # Directory containing nail design images
│   ├── nail1.jpg
│   ├── nail2.jpg
│   ├── ...
│   └── nail20.jpg
└── README.md           # This documentation file
```

## Setup and Usage

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Click the thumbs up/down buttons or swipe right/left to rate designs

The application comes with 20 nail design images pre-loaded. If you want to use your own images, simply replace the files in the `images/` directory with your own, keeping the same filenames.

## Image Credits

All nail design images are from [Unsplash](https://unsplash.com) and are free to use under the [Unsplash License](https://unsplash.com/license).

## Customization

To add or modify nail designs, edit the `nailDesigns` array in `script.js`. Each design should include:
- `id`: Unique identifier
- `name`: Name of the design
- `description`: Short description
- `image`: Path to the image file

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Improvements

- Add user accounts and authentication
- Store likes/dislikes in a database
- Implement categories for different nail design styles
- Add sharing functionality for social media 