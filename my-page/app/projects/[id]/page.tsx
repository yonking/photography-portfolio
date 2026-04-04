'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/app/data/index';

export default function ProjectDetail() {
  const params = useParams();
  const id = params?.id as string;
  const project = projectsData[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 防右键/防F12
  useState(() => {
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || 
         (e.ctrlKey && e.key === 'u') || 
         (e.ctrlKey && e.shiftKey && e.key === 'i')) {
        e.preventDefault();
      }
    });
    return () => {
      document.removeEventListener('contextmenu', e => e.preventDefault());
      document.removeEventListener('keydown', e => {});
    };
  }, []);

  if (!project) {
    return (
      <main style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5vw',
        fontFamily: 'Times New Roman, Noto Serif SC, serif',
        backgroundColor: '#121212',
        color: '#e8e0d6'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '2rem' }}>作品不存在</h1>
        <Link 
          href="/" 
          style={{ 
            color: '#e8e0d6',
            textDecoration: 'none',
            borderBottom: '1px solid #e8e0d6'
          }}
        >
          返回作品集
        </Link>
      </main>
    );
  }

  return (
    <main style={{ 
      maxWidth: '1920px',
      margin: '0 auto',
      padding: 0,
      fontFamily: 'Times New Roman, Noto Serif SC, serif',
      backgroundColor: '#121212',
      color: '#e8e0d6'
    }}>
      {/* 返回按钮 */}
      <div style={{ 
        position: 'fixed',
        top: '2rem',
        left: '5vw',
        zIndex: 99,
        mixBlendMode: 'lighten'
      }}>
        <Link
          href="/"
          style={{
            color: '#e8e0d6',
            textDecoration: 'none',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            borderBottom: '1px solid transparent',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.borderBottom = '1px solid #e8e0d6'}
          onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}
        >
          ← 返回
        </Link>
      </div>

      {/* 作品展示区（加水印） */}
      <section style={{ width: '100%', marginBottom: '6rem' }}>
        {project.videoUrl ? (
          // 视频封面加水印
          <div style={{ 
            width: '100%',
            height: '85vh',
            position: 'relative',
            padding: '2rem'
          }}>
            <div className="watermark" style={{ 
              width: '100%',
              height: '100%',
             border: '12px solid #1a1a1a',
              boxShadow: '0 0 0 1px #333',
              position: 'relative'
            }}>
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block', filter: 'sepia(10%)' }}
              />
              {/* 视频区水印 */}
              <div style={{
                content: '',
                position: 'absolute',
                bottom: 20,
                right: 20,
                color: '#ffffff',
                opacity: 0.3,
                fontSize: 14,
                letterSpacing: '0.1em',
                zIndex: 10,
                pointerEvents: 'none',
                userSelect: 'none'
              }}>© 你的名字 Photography</div>
            </div>
          </div>
        ) : project.gallery ? (
          // 图集加水印
          <div style={{ 
            width: '100%',
            height: '85vh',
            position: 'relative',
            padding: '2rem'
          }}>
            <div className="watermark" style={{ 
              width: '100%',
              height: '100%',
              border: '12px solid #1a1a1a',
              boxShadow: '0 0 0 1px #333',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Image
                src={project.gallery[currentImageIndex]}
                alt={`${project.title} - 第${currentImageIndex+1}张`}
                fill
                style={{ objectFit: 'cover', filter: 'sepia(10%) contrast(1.1)' }}
                priority
                className="project-img"
              />
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1))}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: '1px solid #666',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1))}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: '1px solid #666',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ›
              </button>
              <div style={{ 
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.6)',
                padding: '0.5rem 1rem',
                border: '1px solid #666',
                color: '#fff',
                fontSize: '0.8rem',
                letterSpacing: '0.1em'
              }}>
                {currentImageIndex + 1} / {project.gallery.length}
              </div>
            </div>
          </div>
        ) : (
          // 单张封面图加水印
          <div style={{ 
            width: '100%',
            height: '85vh',
            position: 'relative',
            padding: '2rem'
          }}>
            <div className="watermark" style={{ 
              width: '100%',
              height: '100%',
              border: '12px solid #1a1a1a',
              boxShadow: '0 0 0 1px #333',
              position: 'relative'
            }}>
              <Image
                src={project.cover}
                alt={project.title}
                fill
                style={{ objectFit: 'cover', filter: 'sepia(10%) contrast(1.1)' }}
                priority
                className="project-img"
              />
            </div>
          </div>
        )}
      </section>

      {/* 作品信息区 */}
      <section style={{ 
        padding: '0 8vw 8rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '2rem',
          letterSpacing: '0.05em'
        }}>
          {project.title}
        </h1>
        
        <div style={{ 
          display: 'flex',
          gap: '2rem',
          marginBottom: '3rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #222',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#999' }}>{project.location}</span>
          <span style={{ fontSize: '0.9rem', color: '#999' }}>{project.camera}</span>
          <span style={{ fontSize: '0.9rem', color: '#999' }}>{project.film}</span>
        </div>
        
        <p style={{ 
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: '#ccc',
          fontWeight: 400,
          letterSpacing: '0.02em'
        }}>
          {project.description}
        </p>
      </section>

      {/* 详情页水印样式 */}
      <style jsx global>{`
        /* 防图片盗用基础样式 */
        img {
          user-select: none;
          -webkit-user-drag: none;
          draggable: false;
          pointer-events: none;
        }

        /* 详情页水印 */
        .watermark::after {
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
      `}</style>
    </main>
  );
}