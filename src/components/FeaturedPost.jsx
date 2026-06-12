import { useState, useEffect, useRef } from 'react';
import styles from './FeaturedPost.module.css';

export default function FeaturedPost({ posts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(55); // vh
  const [isDragging, setIsDragging] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  
  const startY = useRef(0);
  const startHeight = useRef(55);
  const currentHeight = useRef(55);
  const sheetRef = useRef(null);
  const winHeight = useRef(1000);

  // Use the ID of the first post for the "has seen" check
  const primaryPostId = posts && posts.length > 0 ? posts[0].id : 'default';

  useEffect(() => {
    // Only run on client after mount
    setHasMounted(true);
    const hasSeenPost = localStorage.getItem(`seen_post_${primaryPostId}`);
    if (!hasSeenPost) {
      // Auto-open on first visit for this post, slight delay for effect
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [primaryPostId]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(`seen_post_${primaryPostId}`, 'true');
    setTimeout(() => {
      setSheetHeight(55);
      currentHeight.current = 55;
      // Reset back to newest post when closed
      setCurrentPostIndex(0);
    }, 400); // reset height after animation
  };

  const handleOpen = () => {
    setSheetHeight(55);
    currentHeight.current = 55;
    setIsOpen(true);
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = currentHeight.current; // Use the most recent height
    winHeight.current = window.innerHeight; // Cache to prevent jumps on mobile scroll
    setIsDragging(true);

    // Instantly kill transition to prevent the 10ms jump
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY.current;
    const vhDelta = -(deltaY / winHeight.current) * 100;
    let newHeight = startHeight.current + vhDelta;
    if (newHeight > 90) newHeight = 90; // max 90vh
    if (newHeight < 20) newHeight = 20; // min before close
    
    currentHeight.current = newHeight;
    // Direct DOM manipulation for buttery smooth 60fps dragging (bypasses React render loop)
    if (sheetRef.current) {
      sheetRef.current.style.height = `${newHeight}vh`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Restore transition immediately
    if (sheetRef.current) {
      sheetRef.current.style.transition = '';
    }

    const finalHeight = currentHeight.current;
    
    if (finalHeight < 40) {
      handleClose(); // Close if swiped down enough
    } else if (finalHeight > 65) {
      setSheetHeight(88); // Snap to full
      currentHeight.current = 88;
      if (sheetRef.current) sheetRef.current.style.height = '88vh'; // Ensure snap applies immediately
    } else {
      setSheetHeight(55); // Snap back to half
      currentHeight.current = 55;
      if (sheetRef.current) sheetRef.current.style.height = '55vh';
    }
  };

  const handleTapLeft = (e) => {
    e.stopPropagation();
    if (currentPostIndex > 0) {
      setCurrentPostIndex(prev => prev - 1);
    }
  };

  const handleTapRight = (e) => {
    e.stopPropagation();
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
    }
  };

  if (!hasMounted || !posts || posts.length === 0) return null;

  const activePost = posts[currentPostIndex];

  return (
    <>
      {/* Overlay for the Bottom Sheet */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
        onClick={handleClose} 
      />

      {/* The Bottom Sheet Modal */}
      <div 
        ref={sheetRef}
        className={`${styles.bottomSheet} ${isOpen ? styles.sheetOpen : ''} ${isDragging ? styles.dragging : ''}`}
        style={{ height: `${sheetHeight}vh` }}
      >
        <div 
          className={styles.dragHandle}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.dragLine}></div>
        </div>
        
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.sheetContent}>
          <div 
            className={styles.imageContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Segmented Progress Bar */}
            {posts.length > 1 && (
              <div className={styles.progressBar}>
                {posts.map((_, idx) => (
                  <div key={idx} className={styles.progressSegment}>
                    <div 
                      className={styles.progressFill} 
                      style={{ 
                        width: idx <= currentPostIndex ? '100%' : '0%' 
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Tap Zones for Navigation */}
            {posts.length > 1 && (
              <div className={styles.tapZones}>
                <div className={styles.tapLeft} onClick={handleTapLeft} />
                <div className={styles.tapRight} onClick={handleTapRight} />
              </div>
            )}

            <img 
              src={activePost.image} 
              alt="Featured Initiative Post" 
              className={styles.postImage} 
              fetchpriority="high"
            />
            {/* Scroll Prompt visible on mobile */}
            <div className={styles.scrollPrompt}>
              Swipe Up to Read More ↑
            </div>
          </div>
          <div className={styles.textContainer}>
            {activePost.text.map((paragraph, idx) => (
              <p key={idx} className={styles.postText}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* The Floating Bubble (visible when closed) */}
      <div 
        className={`${styles.floatingBubble} ${!isOpen ? styles.bubbleVisible : ''} ${styles.bubblePulsate}`} 
        onClick={handleOpen}
      >
        <div className={styles.bubbleImageWrapper}>
          <img src={posts[0].image} alt="Open Featured Post" />
        </div>
      </div>
    </>
  );
}
