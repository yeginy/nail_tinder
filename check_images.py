#!/usr/bin/env python3
import os
import hashlib
from collections import defaultdict

def get_file_hash(filepath):
    """Calculate MD5 hash of a file to identify duplicates."""
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def main():
    # Path to images directory
    images_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
    
    # Get all jpg files
    image_files = [f for f in os.listdir(images_dir) if f.endswith('.jpg')]
    
    # Check file sizes
    file_sizes = {}
    for img_file in image_files:
        filepath = os.path.join(images_dir, img_file)
        size = os.path.getsize(filepath)
        file_sizes[img_file] = size
    
    # Group by file size to find potential duplicates
    size_groups = defaultdict(list)
    for img_file, size in file_sizes.items():
        size_groups[size].append(img_file)
    
    # Print potential duplicates (files with identical sizes)
    print("Potential duplicates (files with identical sizes):")
    has_duplicates = False
    for size, files in size_groups.items():
        if len(files) > 1:
            has_duplicates = True
            print(f"Size {size} bytes: {', '.join(files)}")
    
    if not has_duplicates:
        print("No potential duplicates found based on file size.")
    
    # For more accurate duplicate detection, check file hashes
    print("\nChecking file hashes for exact duplicates...")
    file_hashes = {}
    hash_groups = defaultdict(list)
    
    for img_file in image_files:
        filepath = os.path.join(images_dir, img_file)
        file_hash = get_file_hash(filepath)
        file_hashes[img_file] = file_hash
        hash_groups[file_hash].append(img_file)
    
    # Print exact duplicates (files with identical hashes)
    print("Exact duplicates (files with identical content):")
    has_exact_duplicates = False
    for file_hash, files in hash_groups.items():
        if len(files) > 1:
            has_exact_duplicates = True
            print(f"Hash {file_hash[:8]}...: {', '.join(files)}")
    
    if not has_exact_duplicates:
        print("No exact duplicates found.")
    
    print("\nSummary:")
    print(f"Total images: {len(image_files)}")
    print(f"Unique images by size: {len(size_groups)}")
    print(f"Unique images by content: {len(hash_groups)}")

if __name__ == "__main__":
    main() 