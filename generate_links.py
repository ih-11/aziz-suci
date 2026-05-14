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

    writer.writerow([
        "name",
        "invitation_link",
        "whatsapp_message",
        "whatsapp_share_link"
    ])

    for name in names:

        encoded_name = quote(name)

        invitation_link = (
            f"{BASE_URL}?to={encoded_name}"
        )

        message = f"""Assalamualaikum Warahmatullahi Wabarakatuh

Dengan penuh rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i {name} untuk hadir dalam acara pernikahan kami:

━━━━━━━━━━━━━━━━━━
The Wedding of Aziz & Suci
━━━━━━━━━━━━━━━━━━

💍 Akad Nikah
📅 Selasa, 2 Juni 2026
🕗 08.00 WIB – selesai
📍 Kediaman Mempelai Wanita

Detail lengkap acara dapat dilihat melalui link undangan berikut:

{invitation_link}

Merupakan kebahagiaan tersendiri bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Mohon maaf, undangan hanya disampaikan melalui pesan ini.

Terima kasih atas perhatian dan doa restunya.

Wassalamualaikum Warahmatullahi Wabarakatuh"""

        wa_link = (
            "https://wa.me/?text="
            + quote(message)
        )

        writer.writerow([
            name,
            invitation_link,
            message,
            wa_link
        ])

print(
    f"Done. Generated {len(names)} links in {output_file}"
)