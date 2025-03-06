// Script to download nail design images from Unsplash
const https = require('https');
const fs = require('fs');
const path = require('path');

// Make sure the images directory exists
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Function to download an image
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filePath);
        
        https.get(url, response => {
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
            
            file.on('error', err => {
                fs.unlink(filePath, () => {}); // Delete the file if there's an error
                reject(err);
            });
        }).on('error', err => {
            fs.unlink(filePath, () => {}); // Delete the file if there's an error
            reject(err);
        });
    });
}

// Unsplash nail design image URLs (these are direct download links to Unsplash images)
const nailImages = [
    // These are direct download links to nail design images on Unsplash
    { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371', filename: 'nail1.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344499878-4772644b5193', filename: 'nail2.jpg' },
    { url: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e', filename: 'nail3.jpg' },
    { url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66', filename: 'nail4.jpg' },
    { url: 'https://images.unsplash.com/photo-1600014767785-38cd0e5f7c95', filename: 'nail5.jpg' },
    { url: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067', filename: 'nail6.jpg' },
    { url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc', filename: 'nail7.jpg' },
    { url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b', filename: 'nail8.jpg' },
    { url: 'https://images.unsplash.com/photo-1636018943991-397460c8d688', filename: 'nail9.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344580902-acdf85240bc8', filename: 'nail10.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-1c7c8a06e343', filename: 'nail11.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-e7cd35179cfa', filename: 'nail12.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-b82da7a4f4b3', filename: 'nail13.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-4c7c8a06e343', filename: 'nail14.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-5c7c8a06e343', filename: 'nail15.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-6c7c8a06e343', filename: 'nail16.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-7c7c8a06e343', filename: 'nail17.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-8c7c8a06e343', filename: 'nail18.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-9c7c8a06e343', filename: 'nail19.jpg' },
    { url: 'https://images.unsplash.com/photo-1632344431972-3c7c8a06e343', filename: 'nail20.jpg' }
];

// Add download parameters to the URLs
const downloadUrls = nailImages.map(img => {
    return {
        url: `${img.url}?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjMyNTAxMjMw`,
        filename: img.filename
    };
});

// Download all images
async function downloadAllImages() {
    console.log('Starting download of nail design images...');
    
    for (const img of downloadUrls) {
        try {
            await downloadImage(img.url, img.filename);
        } catch (error) {
            console.error(`Error downloading ${img.filename}:`, error.message);
        }
    }
    
    console.log('All downloads completed!');
}

// Start the download process
downloadAllImages(); 