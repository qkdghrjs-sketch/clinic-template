import { clinic } from "@/lib/clinic";

export function handleReservation() {
  if (typeof window === "undefined") return;

  const phone = clinic.phone.trim();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (phone && isMobile) {
    window.location.href = `tel:${phone}`;
    return;
  }

  if (clinic.reservationUrl) {
    window.open(clinic.reservationUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (!phone) {
    const location = document.getElementById("location");
    location?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.location.href = `tel:${phone}`;
}
