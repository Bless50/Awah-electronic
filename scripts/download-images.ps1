# Download product images for Awah Electronics
# Run this script in PowerShell

# Create products directory if it doesn't exist
if (!(Test-Path "public\products")) {
    New-Item -ItemType Directory -Path "public\products"
}

# Function to download image
function Download-Image {
    param($url, $filename)
    try {
        Invoke-WebRequest -Uri $url -OutFile "public\products\$filename"
        Write-Host "Downloaded: $filename" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download: $filename" -ForegroundColor Red
    }
}

Write-Host "Downloading product images..." -ForegroundColor Yellow

# Smartphones
Download-Image "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format" "iphone-15-pro.jpg"
Download-Image "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format" "samsung-galaxy-s24.jpg"
Download-Image "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&auto=format" "google-pixel-8.jpg"

# Laptops
Download-Image "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&auto=format" "macbook-pro.jpg"
Download-Image "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format" "dell-xps.jpg"
Download-Image "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop&auto=format" "hp-pavilion.jpg"

# Accessories
Download-Image "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&auto=format" "airpods-pro.jpg"
Download-Image "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop&auto=format" "apple-watch.jpg"
Download-Image "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format" "wireless-headphones.jpg"

# Gaming
Download-Image "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&auto=format" "playstation-5.jpg"
Download-Image "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop&auto=format" "xbox-series-x.jpg"
Download-Image "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&auto=format" "gaming-keyboard.jpg"

# Home Electronics
Download-Image "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&auto=format" "smart-tv.jpg"
Download-Image "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format" "smart-speaker.jpg"
Download-Image "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format" "security-camera.jpg"

Write-Host "Image download complete!" -ForegroundColor Green
Write-Host "Images saved to: public\products\" -ForegroundColor Cyan
