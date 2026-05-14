from pathlib import Path
from urllib.parse import quote
import csv

BASE_URL = "https://ih-11.github.io/aziz-suci/"

guest_file = Path("guests.txt")
output_file = Path("generated_links.csv")

if not guest_file.exists():
    print("guests.txt not found")
    raise SystemExit(1)

names = []

with guest_file.open("r", encoding="utf-8") as f:
    for line in f:
        name = line.strip()
        if name:
            names.append(name)

with output_file.open("w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)

    writer.writerow(["name", "link"])

    for name in names:
        encoded_name = quote(name)
        invitation_link = f"{BASE_URL}?to={encoded_name}"

        writer.writerow([name, invitation_link])

print(f"Done. Generated {len(names)} links in {output_file}")