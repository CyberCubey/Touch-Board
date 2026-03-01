export default function Footer() {
  return (
    <footer className="footer">
      <p>Dette digitale verdenskort er udviklet af elever på Webudvikler-uddannelsen</p>
      <p>© {new Date().getFullYear()} – Skolen</p>
    </footer>
  );
}