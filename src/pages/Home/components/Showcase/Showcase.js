import React, { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import styles from './Showcase.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const Showcase = () => {
  const [images, setImages] = useState([]);
  const [homeContent, setHomeContent] = useState({ title: '', description: '' });

  useEffect(() => {
    // โหลดรูปภาพทั้งหมด
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/image-home/images`);
        const data = await res.json();
        const formatted = data.map(img => ({
          itemImageSrc: `${API_URL}${img.image_path}`,
          alt: `Image ${img.id}`,
          description: img.description || '',
        }));
        setImages(formatted);
      } catch (error) {
        console.error('โหลดรูปภาพไม่สำเร็จ:', error);
      }
    };

    // โหลดข้อมูล title และ description
    const fetchHomeContent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/home-content`);
        const data = await res.json();
        setHomeContent(data);
      } catch (error) {
        console.error('โหลดข้อมูลเนื้อหาไม่สำเร็จ:', error);
      }
    };

    fetchImages();
    fetchHomeContent();
  }, []);

  const itemTemplate = (item) => {
    return (
      <div className={styles.imageContainer}>
        <img src={item.itemImageSrc} alt={item.alt} className={styles.image} />
        {item.description && (
          <p className={styles.imageDescription}>{item.description}</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>
        {homeContent.title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h2>

      <Galleria
        value={images}
        item={itemTemplate}
        showThumbnails={false}
        circular
        // showItemNavigators
        autoPlay                
        transitionInterval={3000} // เปลี่ยนทุก 3 วินาที
        style={{ width: '100%' }}
        className={styles.galleriaWrapper}
      />

      <p className={styles.description}>{homeContent.description}</p>

    </div>
  );
};

export default Showcase;
