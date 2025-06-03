import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { showAutoCloseError, showAutoCloseSuccess, showConfirmCancel } from '../../utils/dialog/alertDialog';

const API_URL = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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


    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่านให้ครบถ้วน');
            return;
        }

        if (password !== confirmPassword) {
            showAutoCloseError('ข้อผิดพลาด', 'รหัสผ่านไม่ตรงกัน');
            return;
        }

        const email = localStorage.getItem('otpEmail');
        if (!email) {
            showAutoCloseError('ข้อผิดพลาด', 'ไม่พบอีเมลผู้ใช้งาน');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/reset-password/setnew-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                showAutoCloseError('เกิดข้อผิดพลาด', message || 'ไม่สามารถตั้งค่ารหัสผ่านได้');
                return;
            }

            showAutoCloseSuccess('สำเร็จ', 'ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว');
            localStorage.removeItem('otpEmail');
            navigate('/login');
        } catch (error) {
            showAutoCloseError('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    };

    // ฟังก์ชันสำหรับปุ่มยกเลิก
    const handleCancel = () => {
        showConfirmCancel(
            'ยกเลิกการตั้งค่ารหัสผ่านใหม่',
            'คุณต้องการที่จะยกเลิกการตั้งค่ารหัสผ่านใหม่ใช่หรือไม่?',
            () => {
                localStorage.removeItem('otpEmail');
                navigate('/login');
            }
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>ตั้งค่ารหัสผ่านใหม่</h2>

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

export default ResetPassword;
