import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>เข้าสู่ระบบสำหรับผู้ดูแลระบบ</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <InputText id="username" className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">รหัสผ่าน</label>
                    <InputText id="password" type='password' className={styles.input} toggleMask />
                </div>


                <div className={styles.forgotPasswordWrapper}>
                    <Button
                        label="ลืมรหัสผ่าน?"
                        className={`p-button-text ${styles.forgotPassword}`}
                        onClick={() => navigate('/forgot-password')}
                    />
                </div>

                <div className={styles.loginButtonWrapper}>
                    <Button
                        label="เข้าสู่ระบบ"
                        className={styles.loginButton}
                        onClick={() => navigate('/dashboard-admin')}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        label="ย้อนกลับ"
                        className={styles.backButton}
                        severity="secondary"
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
