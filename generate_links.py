from pathlib import Path
from urllib.parse import quote

BASE_URL = "https://ha-ibnu.github.io/aziz-suci/"   # use this for testing first
# BASE_URL = "https://aziz-suci-invitation.pages.dev/"   # use later after deploy

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

with output_file.open("w", encoding="utf-8") as f:
    f.write("name,link,message,wa_share_link\n")

    for name in names:
        encoded_name = quote(name)
        invitation_link = f"{BASE_URL}?to={encoded_name}"

        message = (
            f"Halo {name},\n\n"
            f"Kami mengundang Anda ke acara pernikahan kami.\n\n"
            f"Silakan buka undangan melalui link berikut:\n"
            f"{invitation_link}\n\n"
            f"Terima kasih."
        )

        wa_share_link = f"https://wa.me/?text={quote(message)}"

        f.write(
            f"\"{name}\","
            f"\"{invitation_link}\","
            f"\"{message}\","
            f"\"{wa_share_link}\"\n"
        )

print(f"Done. Generated {len(names)} links in {output_file}")