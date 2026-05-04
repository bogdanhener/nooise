import "../styles/globals.css";

export const metadata = {
  title: "nooise — events, energy, moments",
  description: "Events. Energy. Moments. Timișoara.",
  openGraph: {
    title: "nooise",
    description: "Events. Energy. Moments.",
    images: ["/nooise.jpg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/nooise.jpg" />
        <meta name="theme-color" content="#fafaf7" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}