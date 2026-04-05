'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsList } from './data/index';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(true);

  // 防右键/防F12
  useEffect(() => {
    // 禁止右键
    document.addEventListener('contextmenu', e => e.preventDefault());
    // 禁止F12/Ctrl+U/Ctrl+Shift+I
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || 
         (e.ctrlKey && e.key === 'u') || 
         (e.ctrlKey && e.shiftKey && e.key === 'i')) {
        e.preventDefault();
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', e => e.preventDefault());
      document.removeEventListener('keydown', e => {});
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f5f0eb';
    document.body.style.color = darkMode ? '#e8e0d6' : '#2d241b';
    document.body.style.transition = 'background-color 0.8s ease';
  }, [darkMode]);

  return (
    <>
      {/* 鼠标跟随 */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'lighten',
          background: 'rgba(0,0,0,0.1)',
        }}
      />

      <main className="main-container">
        {/* 导航 */}
        <nav className="navbar">
          <h2 className="logo">LIGHT & SHADOW</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? '📸 亮调' : '🎞️ 暗调'}
          </button>
        </nav>

        {/* 英雄区 */}
        <section className="hero-section">
          <h1 className="hero-title">
            每一帧<br/>都是时光的底片
          </h1>
          <p className="hero-subtitle">
            人像 · 风光 · 纪实 | 胶片摄影
          </p>
          <Link href="#projects" className="explore-btn">
            浏览作品集 →
          </Link>
        </section>

        {/* 作品展示 */}
        <section id="projects" className="projects-section">
          <h2 className="section-title">PORTFOLIO</h2>
          <div className="projects-grid">
            {projectsList.map((project, index) => (
              <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="film-border">
                  {/* 核心：给图片容器加 watermark 类名 */}
                  <div className="project-img-wrapper watermark">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                      className="project-img"
                    />
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span>{project.location}</span>
             {/* <span>{project.film}</span>*/} 
<span>{project.film ?? '胶片摄影'}</span>
                  </div>
                  <Link href={`/projects/${project.id}`} className="project-link">
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 页脚 */}
        <footer className="footer">
          <p>© 2026 LIGHT & SHADOW · 所有作品均为原创拍摄</p>
          <div className="footer-meta">
            <span>Contact: your@email.com</span>
            <span>WeChat: your-wechat-id</span>
          </div>
        </footer>
      </main>

      {/* 全局样式（包含水印样式） */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Times New Roman', 'Noto Serif SC', serif;
          cursor: none;
        }

        /* 防图片盗用基础样式 */
        img {
          user-select: none;
          -webkit-user-drag: none;
          draggable: false;
          pointer-events: none;
        }

        /* 核心：半透明水印样式 */
        .watermark {
          position: relative;
        }
        /* 单位置水印（右下角） */
        .watermark::after {
          content: '© 你的名字 Photography'; /* 替换成你的名字 */
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: ${darkMode ? '#ffffff' : '#000000'};
          opacity: 0.3; /* 透明度，0.2-0.4 最佳 */
          font-size: 14px;
          letter-spacing: 0.1em;
          font-weight: 300;
          z-index: 10;
          pointer-events: none;
          /* 防篡改：禁止选中水印文字 */
          user-select: none;
          -webkit-user-select: none;
        }

        /* 可选：全屏平铺水印（更防盗，按需开启） */
        /* .watermark::before {
          content: '© 你的名字';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: ${darkMode ? '#ffffff' : '#000000'};
          opacity: 0.1;
          font-size: 40px;
          letter-spacing: 0.5em;
          z-index: 9;
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
          transform: rotate(-15deg);
          display: flex;
          align-items: center;
          justify-content: center;
        } */

        .main-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 5vw;
          overflow-x: hidden;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3rem 0;
        }

        .logo {
          font-size: 1.2rem;
          letter-spacing: 0.2em;
          color: ${darkMode ? '#e8e0d6' : '#2d241b'};
          text-transform: uppercase;
        }

        .mode-btn {
          padding: 0.5rem 1rem;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
          background: transparent;
          color: ${darkMode ? '#e8e0d6' : '#2d241b'};
          cursor: pointer;
          border-radius: 0;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .mode-btn:hover {
          background: ${darkMode ? '#222' : '#eee'};
        }

        .hero-section {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 8rem;
          border-bottom: 1px solid ${darkMode ? '#222' : '#eee'};
          padding-bottom: 4rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: ${darkMode ? '#e8e0d6' : '#2d241b'};
        }

        .hero-subtitle {
          font-size: 1rem;
          letter-spacing: 0.2em;
          color: ${darkMode ? '#999' : '#777'};
          margin-bottom: 3rem;
          text-transform: uppercase;
        }

        .explore-btn {
          display: inline-block;
          padding: 1rem 2rem;
          border: 1px solid ${darkMode ? '#e8e0d6' : '#2d241b'};
          color: ${darkMode ? '#e8e0d6' : '#2d241b'};
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: all 0.4s ease;
          width: fit-content;
        }

        .explore-btn:hover {
          background: ${darkMode ? '#e8e0d6' : '#2d241b'};
          color: ${darkMode ? '#121212' : '#f5f0eb'};
        }

        .projects-section {
          margin-bottom: 10rem;
        }

        .section-title {
          font-size: 1.8rem;
          letter-spacing: 0.3em;
          text-align: center;
          margin-bottom: 6rem;
          color: ${darkMode ? '#999' : '#777'};
          text-transform: uppercase;
          font-weight: 400;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 6rem;
        }

        .project-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .film-border {
          border: 12px solid ${darkMode ? '#1a1a1a' : '#fff'};
          box-shadow: 0 0 0 1px ${darkMode ? '#333' : '#ddd'}, 
                      0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }

        .project-img-wrapper {
          width: 100%;
          height: 450px;
          position: relative;
          overflow: hidden;
        }

        .project-img {
          filter: ${darkMode ? 'sepia(10%) contrast(1.1)' : 'sepia(5%)'};
          transition: filter 0.8s ease;
        }

        .project-card:hover .project-img {
          filter: ${darkMode ? 'sepia(0%) contrast(1.2)' : 'sepia(0%)'};
        }

        .project-info {
          padding: 0 0.5rem;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 400;
          margin-bottom: 0.8rem;
          color: ${darkMode ? '#e8e0d6' : '#2d241b'};
        }

        .project-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: ${darkMode ? '#888' : '#666'};
        }

        .project-link {
          font-size: 0.9rem;
          color: ${darkMode ? '#aaa' : '#555'};
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .project-link:hover {
          border-bottom: 1px solid ${darkMode ? '#aaa' : '#555'};
        }

        .footer {
          padding: 6rem 0 3rem;
          border-top: 1px solid ${darkMode ? '#222' : '#eee'};
          text-align: center;
        }

        .footer p {
          font-size: 0.9rem;
          color: ${darkMode ? '#888' : '#777'};
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
        }

        .footer-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-size: 0.8rem;
          color: ${darkMode ? '#777' : '#666'};
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .project-img-wrapper {
            height: 300px;
          }

          .footer-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}