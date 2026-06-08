import React from 'react'
import styles from './InstagramFeed.module.css'
import { Link } from 'react-router-dom'

export default function InstagramFeed({ handle = "@theoyewaleareoyeinitiative" }) {
  // Placeholder images for the mockup
  const placeholders = [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ]

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Follow Our Journey</div>
          <h2 className={styles.title}>Latest from Instagram</h2>
          <div className="gold-rule center"></div>
        </div>

        {/* 
          This is a placeholder grid. 
          To use a real feed, replace this div with the embed code from Behold.so or EmbedSocial.
          Example: <div data-behold-id="YOUR_WIDGET_ID"></div>
        */}
        <div className={styles.placeholderGrid}>
          {placeholders.map((src, i) => (
            <a 
              key={i} 
              href={`https://instagram.com/${handle.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.post}
            >
              <img src={src} alt="Instagram Post" className={styles.postImg} />
              <div className={styles.postOverlay}>
                <svg className={styles.instagramIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </a>
          ))}
        </div>

        <a 
          href={`https://instagram.com/${handle.replace('@', '')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-ghost"
        >
          View More on {handle}
        </a>
      </div>
    </section>
  )
}
