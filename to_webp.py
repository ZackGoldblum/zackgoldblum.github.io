import os
import sys
from PIL import Image


def convert_to_webp(directory, delete_original=False):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                original_path = os.path.join(root, file)
                webp_path = original_path.rsplit(".", 1)[0] + ".webp"
                try:
                    image = Image.open(original_path)
                    # Preserve transparency if source image is in 'RGBA' mode
                    if image.mode in ("RGBA", "LA") or (
                        image.mode == "P" and "transparency" in image.info
                    ):
                        image = image.convert("RGBA")
                    else:
                        image = image.convert("RGB")
                    image.save(webp_path, "webp")
                    print(f"Converted {original_path} to {webp_path}")
                    if delete_original:
                        os.remove(original_path)
                        print(f"Deleted original image: {original_path}")
                except Exception as e:
                    print(f"Failed to convert {original_path}: {e}")


if __name__ == "__main__":
    directory = sys.argv[1] if len(sys.argv) > 1 else "."
    delete_original = "--delete" in sys.argv
    convert_to_webp(directory, delete_original)
