import { useEffect, useRef } from "react";
import Link from 'next/link';
import styles from './RollingGallery.module.css';

const CARDS = [
  { img: "/assets/SHOP.png", link: "/shop", alt: "Shop" },
  { img: "/assets/sac.png", link: "/academy", alt: "Academy" },
  { img: "/assets/community.png", link: "/community", alt: "Community" },
];

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  const scrollRef = useRef();
  const intervalRef = useRef();

  // Autoplay scroll
  useEffect(() => {
    if (!autoplay || !scrollRef.current) return;
    const scroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    };
    intervalRef.current = setInterval(scroll, 2200);
    return () => clearInterval(intervalRef.current);
  }, [autoplay]);

  // Pause on hover
  useEffect(() => {
    if (!pauseOnHover || !autoplay || !scrollRef.current) return;
    const el = scrollRef.current;
    const pause = () => clearInterval(intervalRef.current);
    const resume = () => {
      intervalRef.current = setInterval(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }, 2200);
    };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [autoplay, pauseOnHover]);

  return (
    <div className={styles.gallery2dContainer}>
      <div ref={scrollRef} className={styles.gallery2dTrack} tabIndex={0}>
        {CARDS.map((card, i) => (
          <Link key={i} href={card.link} className={styles.gallery2dItem} tabIndex={0}>
            <img src={card.img} alt={card.alt} className={styles.gallery2dImg} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RollingGallery; 