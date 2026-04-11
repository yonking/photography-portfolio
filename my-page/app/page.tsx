'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsList } from './data/index';

// 定义完整类型，film 设为可选
type Project = {
  id: string;
  title: string;
  cover: string;
  videoUrl?: string;
  gallery: string[];
  description: string;
  location: string;
  camera: string;
  film?: string; // 可选属性，避免类型报错
};

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && e.key === 'i')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
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
        <nav className="navbar">
          <h2 className="logo">LIGHT & SHADOW</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? '📸 亮调' : '🎞️ 暗调'}
          </button>
        </nav>

        <section className="hero-section">
          <h1 className="hero-title">
            每一帧<br />都是时光的底片
          </h1>
          <p className="hero-subtitle">人像 · 风光 · 纪实 | 胶片摄影</p>
          <Link href="#projects" className="explore-btn">
            浏览作品集 →
          </Link>
        </section>

        <section id="projects" className="projects-section">
          <h2 className="section-title">PORTFOLIO</h2>
          <div className="projects-grid">
            {projectsList.map((project: Project, index) => (
              <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="film-border">
                  <div className="project-img-wrapper watermark">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="project-img"
                    />
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span>{project.location}</span>
                    {/* 核心修复：正确的 ?? 语法，类型已兼容 */}
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

        <footer className="footer">
          <p>© 2026 LIGHT & SHADOW · 所有作品均为原创拍摄</p>
          <div className="footer-meta">
            <span>禁止转载 | 版权所有</span>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Times New Roman', 'Noto Serif SC', serif;
          cursor: none;
        }

        img {
          user-select: none;
          -webkit-user-drag: none;
          draggable: false;
          pointer-events: none;
        }

        .dark {
          background-color: #121212;
          color: #e8e0d6;
        }

        .light {
          background-color: #f5f0eb;
          color: #2d241b;
        }

        .dark .watermark::after {
          content: '© 你的名字 Photography';
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: #ffffff;
          opacity: 0.3;
          font-size: 14px;
          letter-spacing: 0.1em;
          z-index: 10;
          pointer-events: none;
          user-select: none;
        }

        .light .watermark::after {
          content: '© 你的名字 Photography';
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: #000000;
          opacity: 0.3;
          font-size: 14px;
          letter-spacing: 0.1em;
          z-index: 10;
          pointer-events: none;
          user-select: none;
        }

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
          text-transform: uppercase;
        }

        .mode-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #888;
          background: transparent;
          cursor: pointer;
          border-radius: 0;
          transition: all 0.3s ease;
        }

        .hero-section {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 8rem;
          border-bottom: 1px solid #333;
          padding-bottom: 4rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1rem;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          text-transform: uppercase;
        }

        .explore-btn {
          display: inline-block;
          padding: 1rem 2rem;
          border: 1px solid currentColor;
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: all 0.4s ease;
          width: fit-content;
        }

        .projects-section {
          margin-bottom: 10rem;
        }

        .section-title {
          font-size: 1.8rem;
          letter-spacing: 0.3em;
          text-align: center;
          margin-bottom: 6rem;
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
          border: 12px solid #1a1a1a;
          box-shadow: 0 0 0 1px #333, 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }

        .project-img-wrapper {
          width: 100%;
          height: 450px;
          position: relative;
          overflow: hidden;
        }

        .project-img {
          filter: sepia(10%) contrast(1.1);
          transition: filter 0.8s ease;
        }

        .project-info {
          padding: 0 0.5rem;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 400;
          margin-bottom: 0.8rem;
        }

        .project-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .project-link {
          font-size: 0.9rem;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .footer {
          padding: 6rem 0 3rem;
          border-top: 1px solid #333;
          text-align: center;
        }

        .footer p {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
        }
      `}</style>
    </>
  );
}