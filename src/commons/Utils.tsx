export function openResumeInNewTab() {
  window.open("../../public/resume.pdf", "_blank");
}

export function openDonatePageInNewTab() {
  window.open(
    "https://www.paypal.com/donate/?business=YFEQJ9D5KR9PW&no_recurring=0&item_name=Thank+you+for+considering+to+donate+me%21+This+way+I+can+keep+developing+more+applications+for+you.&currency_code=CAD",
    "_blank",
  );
}

export function openMainWebsite() {
  window.location.href = "https://akashcraft.ca";
}
