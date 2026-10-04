export function whatsappNumber(...candidates: (string | undefined)[]): string {
  for (const candidate of [...candidates, "905400065544"]) {
    let digits = (candidate || "").replace(/\D/g, "");
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = `9${digits}`;
    if (digits.length === 10) digits = `90${digits}`;
    if (/^[1-9]\d{9,14}$/.test(digits)) return digits;
  }
  return "905400065544";
}

export function prepareWhatsApp(form: HTMLFormElement, phone: string, source: string) {
  for (const name of ["name", "message"]) {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
    if (field) field.setCustomValidity(field.value.trim() ? "" : "Lütfen bu alanı doldurun.");
  }
  if (!form.reportValidity()) return null;
  const data = new FormData(form);
  const value = (name: string) => String(data.get(name) || "").trim();
  const service = form.querySelector<HTMLSelectElement>('select[name="subject"], select[name="service"]');
  const message = [source, `Ad Soyad: ${value("name")}`, `E-posta: ${value("email")}`,
    `Telefon: ${value("phone") || "Belirtilmedi"}`,
    `Hizmet: ${service?.value ? service.selectedOptions[0].text : "Belirtilmedi"}`,
    `Mesaj: ${value("message")}`].join("\n");
  return { data, url: `https://wa.me/${whatsappNumber(phone)}?text=${encodeURIComponent(message)}` };
}

export function clearFormValidity(form: HTMLFormElement) {
  for (const name of ["name", "message"]) {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
    field?.setCustomValidity("");
  }
}
