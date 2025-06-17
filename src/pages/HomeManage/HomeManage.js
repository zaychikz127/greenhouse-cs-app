import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import styles from './HomeManage.module.css';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';

const API_URL = process.env.REACT_APP_API_URL;

const HomeManage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/home-content`);
                const data = await response.json();
                if (response.ok && data.title && data.description) {
                    setTitle(data.title);
                    setDescription(data.description);
                } else {
                    showAutoCloseError('ไม่พบข้อมูล', 'ข้อมูลหน้าแรกไม่สมบูรณ์');
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดขณะดึงข้อมูลหน้าแรก:', error);
                showAutoCloseError('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้');
            }
        };

        fetchHomeContent();
    }, []);

    const handleSave = async () => {
        try {
            const response = await fetch(`${API_URL}/api/home-content`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            const data = await response.json();
            if (response.ok) {
                showAutoCloseSuccess('บันทึกสำเร็จ', 'ข้อมูลหน้าแรกถูกอัปเดตแล้ว');
            } else {
                showAutoCloseError('บันทึกไม่สำเร็จ', data.message || 'โปรดลองใหม่อีกครั้ง');
            }
        } catch (error) {
            console.error('บันทึกข้อมูลล้มเหลว:', error);
            showAutoCloseError('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>จัดการหน้าแรก</h2>

                    <div className={styles.inputGroup}>
                        <label htmlFor="title">ชื่อหัวข้อ</label>
                        <InputText
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description">คำอธิบาย</label>
                        <InputTextarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.saveButtonWrapper}>
                        <Button
                            label="บันทึก"
                            className={styles.saveButton}
                            onClick={handleSave}
                        />
                    </div>

                    <div className={styles.ImageButtonWarpper}>
                        <Button
                            severity="success"
                            label="จัดการรูปภาพ"
                            icon="pi pi-images"
                            className={styles.imageButton}
                            onClick={() => navigate('/home-image-manage')}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default HomeManage;
