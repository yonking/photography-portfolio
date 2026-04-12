'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { projectsList } from '../../data/index';

type Project = {
  id: string;
  title: string;
  cover: string;
  videoUrl?: string;
  gallery?: string[];
  description: string;
  location: string;
  camera: string;
  film?: string;
};

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const project = projectsList.find((p: Project) => p.id === id) as Project;

  const [currentImage, setCurrentImage] = useState(0);
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

  if (!isMounted || !project) return null;

  const images = project.gallery || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          border: darkMode ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(0,0,0,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          mixBlendMode: 'normal',
        }}
      />

      {/* 📸 相机光圈镜头鼠标（核心修改部分） */}
 <div
  ref={cursorRef}
  style={{
    position: 'fixed',
    width: '44px',
    height: '44px',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'}`,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    mixBlendMode: 'normal',
  }}
>
  {/* 取景十字线 */}
  <div
    style={{
      position: 'absolute',
      width: '1px',
      height: '16px',
      background: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
  <div
    style={{
      position: 'absolute',
      width: '16px',
      height: '1px',
      background: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
  {/* 中心红点 */}
  <div
    style={{
      position: 'absolute',
      width: '3px',
      height: '3px',
      background: darkMode ? '#ff4d4f' : '#dc2626',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
</div>

      <main className="main-container">
        <nav className="navbar">
          <h2 className="logo">LIGHT & SHADOW</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? '📸 亮调' : '🎞️ 暗调'}
          </button>
        </nav>

        <section className="project-detail-section">
          <div className="project-header">
            <h1 className="project-title">{project.title}</h1>
            <div className="project-meta">
              <span>{project.location}</span>
              <span>{project.film ?? '胶片摄影'}</span>
              <span>{project.camera}</span>
            </div>
          </div>

          <div className="image-gallery">
            <div className="main-image-wrapper watermark">
              <Image
                src={images[currentImage] || project.cover}
                alt={project.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="main-image"
              />
              <button className="nav-btn prev-btn" onClick={prevImage}>←</button>
              <button className="nav-btn next-btn" onClick={nextImage}>→</button>
            </div>

            <div className="thumbnail-grid">
              {images.map((img, index) => (
                <div key={index} className={`thumbnail ${index === currentImage ? 'active' : ''}`} onClick={() => setCurrentImage(index)}>
                  <Image src={img} alt={`${project.title} ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="project-description">
            <p>{project.description}</p>
          </div>

          <a href="/#projects" className="back-btn">← 返回作品集</a>
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

        .project-detail-section {
          margin-bottom: 10rem;
        }

        .project-header {
          margin-bottom: 4rem;
          text-align: center;
        }

        .project-title {
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          letter-spacing: 0.1em;
        }

        .project-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        .image-gallery {
          margin-bottom: 4rem;
        }

        .main-image-wrapper {
          width: 100%;
          height: 70vh;
          position: relative;
          margin-bottom: 2rem;
          border: 12px solid #1a1a1a;
          box-shadow: 0 0 0 1px #333, 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .main-image {
          filter: sepia(10%) contrast(1.1);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          border: none;
          color: #fff;
          font-size: 2rem;
          padding: 1rem;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .prev-btn { left: 20px; }
        .next-btn { right: 20px; }

        .thumbnail-grid {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 1rem 0;
        }

        .thumbnail {
          width: 120px;
          height: 80px;
          position: relative;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .thumbnail.active {
          border-color: #888;
        }

        .project-description {
          max-width: 800px;
          margin: 0 auto 4rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .back-btn {
          display: inline-block;
          padding: 1rem 2rem;
          border: 1px solid currentColor;
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: all 0.4s ease;
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