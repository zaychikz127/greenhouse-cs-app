import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';
import { showAutoCloseError, showAutoCloseSuccess, showConfirmCancel } from '../../utils/dialog/alertDialog';

const API_URL = process.env.REACT_APP_API_URL;

const ChangePassword = () => {
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[\x21-\x7E]*$/.test(value)) {
            setPassword(value);
        } else {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่านอังกฤษหรือตัวเลขเท่านั้น');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (/^[\x21-\x7E]*$/.test(value)) {
            setConfirmPassword(value);
        } else {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่านภาษาอังกฤษหรือตัวเลขเท่านั้น');
        }
    };

    const handleSubmit = () => {
        if (!oldPassword || !password || !confirmPassword) {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่านให้ครบถ้วน');
            return;
        }

        if (password !== confirmPassword) {
            showAutoCloseError('ข้อผิดพลาด', 'รหัสผ่านใหม่ไม่ตรงกัน');
            return;
        }

        showConfirmCancel('ยืนยันการเปลี่ยนรหัสผ่าน', 'คุณต้องการเปลี่ยนรหัสผ่านใช่หรือไม่?', async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${API_URL}/api/change-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ oldPassword, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    if (data.message === 'รหัสผ่านเดิมไม่ถูกต้อง') {
                        showAutoCloseError('ข้อผิดพลาด', 'รหัสผ่านเดิมไม่ถูกต้อง');
                    } else {
                        showAutoCloseError('เกิดข้อผิดพลาด', data.message || 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
                    }
                    return;
                }

                showAutoCloseSuccess('สำเร็จ', 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
                navigate('/dashboard-admin');

            } catch (error) {
                showAutoCloseError('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
            }
        });
    };

    // ฟังก์ชันสำหรับปุ่มยกเลิก
    const handleCancel = () => {
        navigate('/dashboard-admin');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>เปลี่ยนรหัสผ่าน</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="oldPassword">รหัสผ่านเดิม</label>
                    <div className={styles.passwordWrapper}>
                        <InputText
                            id="oldPassword"
                            type={showOldPassword ? 'text' : 'password'}
                            className={styles.input}
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                        />
                        <span
                            className={`${styles.eyeIcon} pi ${showOldPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        ></span>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">รหัสผ่านใหม่</label>
                    <div className={styles.passwordWrapper}>
                        <InputText
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span
                            className={`${styles.eyeIcon} pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></span>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="ConfirmPassword">กรอกรหัสผ่านใหม่อีกครั้ง</label>
                    <div className={styles.passwordWrapper}>
                        <InputText
                            id="ConfirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={styles.input}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <span
                            className={`${styles.eyeIcon} pi ${showConfirmPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></span>
                    </div>
                </div>

                <div className={styles.submitButtonWrapper}>
                    <Button
                        label="ยืนยัน"
                        className={styles.submitButton}
                        onClick={handleSubmit}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        label="ยกเลิก"
                        className={styles.backButton}
                        severity="secondary"
                        onClick={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
