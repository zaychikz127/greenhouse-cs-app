import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import styles from './HomeManage.module.css';

const HomeManage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Saved:', { title, description });
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

                    <div className={styles.ImageButtonWarpper}>
                        <Button 
                            severity="success"
                            label="จัดการรูปภาพ"
                            icon="pi pi-images"
                            className={styles.imageButton}
                            onClick={() => navigate('/home-image-manage')}
                        />
                    </div>

                    <div className={styles.loginButtonWrapper}>
                        <Button
                            label="บันทึก"
                            className={styles.loginButton}
                            onClick={handleSave}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default HomeManage;
