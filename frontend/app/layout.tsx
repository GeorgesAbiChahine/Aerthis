import 'cesium/Build/Cesium/Widgets/widgets.css';  // <-- ligne ajoutée
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
