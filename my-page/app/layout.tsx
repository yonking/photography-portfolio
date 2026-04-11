export const metadata = {
  title: "光影摄影 | 个人作品集",
  description: "胶片摄影 | 人像 | 风光 | 纪实",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}