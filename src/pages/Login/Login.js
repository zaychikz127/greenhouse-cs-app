import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';
import NavbarBack from './components/NavbarBack/NavbarBack';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);


    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            showAutoCloseSuccess('เข้าสู่ระบบสำเร็จ', 'ยินดีต้อนรับสู่แดชบอร์ดผู้ดูแลระบบ');
            navigate('/dashboard-admin');
        } else {
            setCheckingAuth(false);
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!username || !password) {
            showAutoCloseError('ไม่สามารถเข้าสู่ระบบได้', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            return;
        }

        setIsLoggingIn(true);

        try {
            const res = await axios.post(`${API_URL}/api/login`, {
                username,
                password,
            });

            localStorage.setItem('token', res.data.token);

            showAutoCloseSuccess('เข้าสู่ระบบสำเร็จ', 'ยินดีต้อนรับสู่แดชบอร์ดผู้ดูแลระบบ');
            navigate('/dashboard-admin', { replace: true });

        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';

            console.error('Login failed:', message);

            if (status === 400 || status === 401 || status === 500) {
                showAutoCloseError('ไม่สามารถเข้าสู่ระบบได้', message);
            } else {
                showAutoCloseError('ไม่สามารถเข้าสู่ระบบได้', 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์');
            }

        } finally {
            setIsLoggingIn(false);
        }
    };

    if (checkingAuth) {
        return null;
    }

    return (
        <>
            <NavbarBack />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>เข้าสู่ระบบสำหรับผู้ดูแลระบบ</h2>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <InputText
                            id="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">รหัสผ่าน</label>
                        <div className={styles.passwordWrapper}>
                            <InputText
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className={`${styles.eyeIcon} pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></span>
                        </div>
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
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
