from PIL import Image
import requests
from io import BytesIO
import os

# Download the image
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-zeppelin-1m66yN9pnG8-unsplash%20%281%29-RwVjLvGKX6LhC3pZqDPeyddZnzeZwe.jpg"
response = requests.get(url)
img = Image.open(BytesIO(response.content))

# Convert to grayscale
bw_img = img.convert('L')

# Create directory if it doesn't exist
os.makedirs('/vercel/share/v0-project/public/images', exist_ok=True)

# Save the black and white image
bw_img.save('/vercel/share/v0-project/public/images/bridge-aerial-bw.jpg', 'JPEG', quality=95)

print("Image converted to black and white successfully!")
