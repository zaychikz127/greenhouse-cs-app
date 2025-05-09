import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>กรอกอีเมลเพื่อรับรหัส OTP</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">อีเมลของคุณ</label>
                    <InputText id="email" type='email' className={styles.input} />
                </div>

                <div className={styles.submitButtonWrapper}>
                    <Button
                        label="ส่งรหัส OTP"
                        className={styles.submitButton}
                        onClick={() => navigate('/input-otp')}
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
