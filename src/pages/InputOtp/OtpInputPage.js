import React from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './OtpInputPage.module.css';

const OtpInputPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>กรอกรหัส OTP</h2>

                <div className={styles.inputGroup}>
                    <InputOtp id="otp" length={6} className={styles.input} integerOnly/>
                </div>

                <div className={styles.submitButtonWrapper}>
                    <Button
                        label="ตรวจสอบ"
                        className={styles.submitButton}
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

export default OtpInputPage;
