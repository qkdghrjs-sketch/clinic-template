export default function KakaoMap() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "clamp(280px, 72vw, 420px)", position: "relative" }}>
      <iframe
        src="/kakaomap.html"
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, border: "none" }}
        allowFullScreen
        loading="lazy"
        title="병원 위치 카카오맵"
      />
    </div>
  );
}
