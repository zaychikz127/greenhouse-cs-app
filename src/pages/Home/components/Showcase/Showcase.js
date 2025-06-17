import React from 'react';
import { Galleria } from 'primereact/galleria';
import styles from './Showcase.module.css';

const Showcase = () => {
  const images = [
    {
      itemImageSrc: '/assets/images/showcase/1.jpg',
      alt: 'Image 1',
    },
    {
      itemImageSrc: '/assets/images/showcase/2.jpg',
      alt: 'Image 2',
    },
  ];

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} className={styles.image} />;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.description}>ยินดีต้อนรับสู่ระบบจัดการการปลูกพืชแบบ Aeroponic</h2>
      <Galleria
        value={images}
        item={itemTemplate}
        showThumbnails={false}
        circular
        showItemNavigators
        style={{ width: '100%' }}
        className={styles.galleriaWrapper}
      />
    </div>
  );
};

export default Showcase;
