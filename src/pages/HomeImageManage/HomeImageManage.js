import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import styles from './HomeImageManage.module.css';
import NavbarBack from './components/NavbarBack/NavbarBack';
import { showAutoCloseError, showAutoCloseSuccess, showConfirmCancel } from '../../utils/dialog/alertDialog';

const API_URL = process.env.REACT_APP_API_URL;

const HomeImageManage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileUploadRef = useRef(null);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/image-home/images`);
            setImages(res.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async ({ files }) => {
        if (images.length >= 5) {
            showAutoCloseError('ข้อผิดพลาด', 'สามารถอัปโหลดได้สูงสุด 5 รูปภาพ');
            return;
        }

        const file = files[0];
        const formData = new FormData();
        const newFile = new File(
            [file],
            `${uuidv4()}${file.name.slice(file.name.lastIndexOf('.'))}`,
            { type: file.type }
        );
        formData.append('image', newFile);

        try {
            setUploading(true);
            await axios.post(`${API_URL}/api/image-home/images`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showAutoCloseSuccess('เพิ่มรูปภาพสำเร็จ');
            fetchImages();
            fileUploadRef.current.clear();
        } catch (error) {
            console.error('Error uploading image:', error);
            fileUploadRef.current.clear();
            showAutoCloseError('เพิ่มรูปภาพไม่สำเร็จ', 'กรุณาลองใหม่');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        showConfirmCancel('ยืนยันการลบรูปภาพ', 'คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้?', async () => {
            try {
                await axios.delete(`${API_URL}/api/image-home/images/${id}`);
                fetchImages();
                showAutoCloseSuccess('ลบรูปภาพสำเร็จ');
            } catch (error) {
                console.error('Error deleting image:', error);
                showAutoCloseError('เกิดข้อผิดพลาด', 'ไม่สามารถลบรูปภาพได้');
            }
        });
    };

    return (
        <>
            <NavbarBack />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>จัดการรูปภาพหน้าแรก</h2>

                    <div className={styles.uploadSection}>
                        <FileUpload
                            ref={fileUploadRef}
                            name="image"
                            accept="image/*"
                            auto
                            mode="basic"
                            maxFileSize={20971520} // 20MB
                            chooseLabel="อัปโหลดรูปภาพ"
                            disabled={uploading || images.length >= 5}
                            customUpload
                            uploadHandler={handleUpload}
                        />
                    </div>

                    {loading ? (
                        <div className={styles.overlay}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <div className={styles.imageGrid}>
                            {images.map((img) => (
                                <Card key={img.id} className={styles.imageCard}>
                                    <img
                                        src={`${API_URL}${img.image_path}`}
                                        alt="home"
                                        className={styles.image}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className={styles.deleteButton}
                                        severity="danger"
                                        onClick={() => handleDelete(img.id)}
                                    />
                                </Card>
                            ))}
                        </div>
                    )}

                    {uploading && (
                        <div className={styles.overlay}>
                            <ProgressSpinner />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomeImageManage;
