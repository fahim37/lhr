export const metadata = {
  title: "Royal House Check",
  description: "24/7 Professional Security Monitoring for Homes & Businesses",
  icons: {
    icon: "/assets/lhasis-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
