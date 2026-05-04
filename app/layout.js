import "../styles/globals.css";

export const metadata = {
  title: "nooise",
  description: "Events. Energy. Moments.",
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
      </head>
      <body>
        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
