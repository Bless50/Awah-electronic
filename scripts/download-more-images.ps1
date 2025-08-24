# Download additional product images for each category (5 per category)
# This will ADD to existing products, not replace them

Write-Host "Downloading additional product images..." -ForegroundColor Yellow

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

# SMARTPHONES (5 additional)
Download-Image "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&auto=format" "oneplus-12.jpg"
Download-Image "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop&auto=format" "xiaomi-14.jpg"
Download-Image "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&auto=format" "huawei-p60.jpg"
Download-Image "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop&auto=format" "oppo-find-x7.jpg"
Download-Image "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&auto=format" "realme-gt5.jpg"

# LAPTOPS (5 additional)
Download-Image "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&auto=format" "asus-zenbook.jpg"
Download-Image "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&auto=format" "lenovo-thinkpad.jpg"
Download-Image "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop&auto=format" "acer-swift.jpg"
Download-Image "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop&auto=format" "msi-gaming.jpg"
Download-Image "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop&auto=format" "surface-laptop.jpg"

# ACCESSORIES (5 additional)
Download-Image "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&auto=format" "samsung-buds.jpg"
Download-Image "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&auto=format" "fitbit-watch.jpg"
Download-Image "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&auto=format" "bose-headphones.jpg"
Download-Image "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=400&fit=crop&auto=format" "anker-charger.jpg"
Download-Image "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format" "logitech-mouse.jpg"

# GAMING (5 additional)
Download-Image "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&auto=format" "nintendo-switch.jpg"
Download-Image "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&auto=format" "gaming-headset.jpg"
Download-Image "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=400&fit=crop&auto=format" "gaming-mouse.jpg"
Download-Image "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format" "gaming-chair.jpg"
Download-Image "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop&auto=format" "steam-deck.jpg"

# HOME ELECTRONICS (5 additional)
Download-Image "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format" "nest-thermostat.jpg"
Download-Image "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format" "robot-vacuum.jpg"
Download-Image "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&auto=format" "air-purifier.jpg"
Download-Image "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&auto=format" "smart-lights.jpg"
Download-Image "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop&auto=format" "coffee-maker.jpg"

Write-Host "Additional images download complete!" -ForegroundColor Green
Write-Host "Total images: 25 additional products (5 per category)" -ForegroundColor Cyan
