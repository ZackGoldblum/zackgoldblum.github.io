"""
Two-tier book covers for the bookshelf.

The grid slot is ~172px at the widest, so shipping the full-size cover there
sends ~50x more pixels than get painted. This writes a small thumbnail next to
each cover for the grid, re-encodes the full-size cover the lightbox opens, and
records each cover's natural dimensions in books.json so the grid can reserve
the right box before anything loads.

    python3 optimize_books.py
"""

import collections
import json
import os

from PIL import Image

COVERS = "public/books"
THUMBS = "public/books/thumbs"
BOOKS_JSON = "src/content/books.json"

THUMB_WIDTH = 340  # 2x the widest grid slot (~172px at the 1080px content width)
THUMB_QUALITY = 72
FULL_WIDTH = 1200  # 2x the tallest lightbox cover on a large display
FULL_QUALITY = 80
FULL_MIN_SAVING = 0.15  # leave a cover alone unless re-encoding saves at least this


def resized(image, max_width):
    if image.width <= max_width:
        return image
    height = round(image.height * max_width / image.width)
    return image.resize((max_width, height), Image.LANCZOS)


def main():
    os.makedirs(THUMBS, exist_ok=True)
    dimensions = {}
    thumb_bytes = full_before = full_after = 0

    for name in sorted(os.listdir(COVERS)):
        path = os.path.join(COVERS, name)
        if not name.lower().endswith(".webp") or not os.path.isfile(path):
            continue

        image = Image.open(path).convert("RGB")

        thumb_path = os.path.join(THUMBS, name)
        resized(image, THUMB_WIDTH).save(thumb_path, "webp", quality=THUMB_QUALITY, method=6)
        thumb_bytes += os.path.getsize(thumb_path)

        # Re-encode the full-size cover, but only when that's a real win. WebP
        # is lossy, so an unconditional rewrite would shave quality off every
        # already-optimized cover each time this is re-run for a new book.
        before = os.path.getsize(path)
        tmp_path = path + ".tmp"
        resized(image, FULL_WIDTH).save(tmp_path, "webp", quality=FULL_QUALITY, method=6)
        if os.path.getsize(tmp_path) < before * (1 - FULL_MIN_SAVING):
            os.replace(tmp_path, path)
        else:
            os.remove(tmp_path)
        full_before += before
        full_after += os.path.getsize(path)

        dimensions["/books/" + name] = (image.width, image.height)

    shelf = json.load(open(BOOKS_JSON), object_pairs_hook=collections.OrderedDict)
    for group in shelf:
        for book in group["books"]:
            width, height = dimensions[book["cover"]]
            book["w"] = width
            book["h"] = height
    with open(BOOKS_JSON, "w") as f:
        json.dump(shelf, f, indent=2, ensure_ascii=False)
        f.write("\n")

    mb = 1024 * 1024
    print(f"thumbs: {thumb_bytes / mb:.1f} MB")
    print(f"full:   {full_before / mb:.1f} MB -> {full_after / mb:.1f} MB")


if __name__ == "__main__":
    main()
