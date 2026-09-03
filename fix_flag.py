from PIL import Image
import sys

img_path = '/Users/mikaelfabrin/Documents/App-antigravity/Gratisapp/public/images/talemaader/pkg2_kredsloeb.png'
try:
    # Reload original image if possible? The user says there is still blue.
    # It means some blue pixels weren't caught.
    img = Image.open(img_path)
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size

    for x in range(0, int(w * 0.5)):
        for y in range(int(h * 0.5), h):
            r, g, b, a = pixels[x, y]
            
            # More aggressive blue detection (b is strictly greater than red and green, plus a threshold)
            # This catches anti-aliased edges and lighter/darker blues
            if b > r + 10 and b > g + 5:
                pixels[x, y] = (200, 30, 34, a) # Danish Red
                
            # Yellow was probably mostly caught, but just in case, increase yellow detection:
            # high R and high G, lower B
            elif r > 120 and g > 120 and b < 130 and r > b + 30:
                pixels[x, y] = (245, 245, 245, a) # Danish White
                
    img.save(img_path)
    print("Flaget er malet meget grundigere!")
except Exception as e:
    print(f"Fejl: {e}")
