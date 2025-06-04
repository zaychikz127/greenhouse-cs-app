import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ForgotPassword.module.css';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    const handleSendOTP = async () => {
        if (!email) {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกอีเมล');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/reset-password`, { email });

            if (response.status === 200) {
                const startTime = Date.now().toString();
                localStorage.setItem('otpStartTime', startTime);
                localStorage.setItem('otpEmail', email);
                showAutoCloseSuccess('สำเร็จ', 'ส่งรหัส OTP ไปยังอีเมลของคุณเรียบร้อยแล้ว');
                navigate('/input-otp', { state: { email } });
            }
        } catch (error) {
            const errMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดในการส่ง OTP';
            showAutoCloseError('ไม่สามารถส่ง OTP ได้', errMessage);
            console.error('OTP Error:', errMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>กรอกอีเมลเพื่อรับรหัส OTP</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">อีเมลของคุณ</label>
                    <InputText
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.submitButtonWrapper}>
                    <Button
                        label={loading ? 'กำลังส่ง...' : 'ส่งรหัส OTP'}
                        className={styles.submitButton}
                        onClick={handleSendOTP}
                        disabled={loading}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        label="ยกเลิก"
                        className={styles.backButton}
                        severity="secondary"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
