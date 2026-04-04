import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 引入谷歌字体
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '你的名字 - 个人主页',
  description: '酷炫的个人主页 | 前端开发者 | 设计师',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}