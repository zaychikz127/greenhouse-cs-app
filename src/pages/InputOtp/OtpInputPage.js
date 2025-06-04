import React, { useState, useEffect } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';
import styles from './OtpInputPage.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const OtpInputPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [countdown, setCountdown] = useState(300); // 300

    useEffect(() => {
        const startTime = localStorage.getItem('otpStartTime');

        // ✅ ถ้าไม่มี otpStartTime → redirect กลับไปหน้า login
        if (!startTime) {
            navigate('/login', { replace: true });
            return;
        }

        // ✅ ถ้ามี otpStartTime → ให้เริ่มนับเวลาต่อเนื่องตามเวลาที่เก็บไว้
        const startTimestamp = parseInt(startTime, 10);
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimestamp) / 1000);

        const remainingTime = 300 - elapsedSeconds; // 300 = 5 นาที

        if (remainingTime <= 0) {
            localStorage.removeItem('otpStartTime');
            localStorage.removeItem('otpEmail');
            showAutoCloseError('หมดเวลา', 'รหัส OTP หมดอายุแล้ว');
            navigate('/login', { replace: true });
            return;
        }

        setEmail(localStorage.getItem('otpEmail') || '');
        setCountdown(remainingTime);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        if (countdown === 0) {
            localStorage.removeItem('otpEmail');
            localStorage.removeItem('otpStartTime');
            showAutoCloseError('หมดเวลา', 'รหัส OTP หมดอายุแล้ว');
            navigate('/login');
        }
    }, [countdown, navigate]);


    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            showAutoCloseError('ข้อผิดพลาด', 'กรุณากรอกรหัส OTP ให้ครบ 6 หลัก');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/reset-password/verify-otp`, {
                email,
                otp,
            });

            if (response.status === 200) {
                localStorage.removeItem('otpStartTime');
                showAutoCloseSuccess('สำเร็จ', 'ยืนยันรหัส OTP สำเร็จ');
                navigate('/reset-password');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการตรวจสอบ OTP';

            if (message.includes('หมดอายุ')) {
                showAutoCloseError('หมดเวลา', 'รหัส OTP หมดอายุแล้ว');
                navigate('/login');
            } else if (message.includes('ไม่ถูกต้อง')) {
                showAutoCloseError('ไม่ถูกต้อง', 'รหัส OTP ไม่ถูกต้อง');
            } else {
                showAutoCloseError('ข้อผิดพลาด', message);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>กรอกรหัส OTP</h2>

                <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="otp">ตรวจสอบรหัส OTP ในอีเมลของคุณ</label>
                        <InputOtp
                            id="otp"
                            name="oneTimeCode"
                            length={6}
                            className={styles.input}
                            integerOnly
                            value={otp}
                            onChange={(e) => setOtp(e.value)}
                            autoComplete="off"
                        />
                    </div>

                    <p className={styles.countdown}>
                        เวลาที่เหลือ: <strong>{formatCountdown()}</strong>
                    </p>

                    <div className={styles.submitButtonWrapper}>
                        <Button
                            label="ยืนยัน"
                            className={styles.submitButton}
                            onClick={handleVerify}
                            disabled={countdown <= 0}
                        />
                    </div>

                    <div className={styles.footer}>
                        <Button
                            label="ยกเลิก"
                            className={styles.backButton}
                            severity="secondary"
                            onClick={() => {
                                localStorage.removeItem('otpEmail');
                                localStorage.removeItem('otpStartTime');
                                navigate('/login');
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpInputPage;
