import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true); 

    const API_URL = process.env.REACT_APP_API_URL;

    // ✅ ตรวจสอบ token ถ้ามีให้ redirect ไป dashboard-admin
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard-admin');
        } else {
            setCheckingAuth(false);
        }
    }, [navigate]);

    const handleLogin = async () => {
        // ✅ ตรวจสอบก่อนยิง API
        if (!username || !password) {
            showAutoCloseError('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/api/login`, {
                username,
                password,
            });

            // ✅ บันทึก token
            localStorage.setItem('token', res.data.token);

            showAutoCloseSuccess('เข้าสู่ระบบสำเร็จ', 'ยินดีต้อนรับสู่แดชบอร์ดผู้ดูแลระบบ');
            navigate('/dashboard-admin', { replace: true });

        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message || 'ไม่สามารถเข้าสู่ระบบได้';

            console.error('Login failed:', message);

            // ✅ แสดงข้อความให้หลากหลายตามสถานะ
            if (status === 400) {
                showAutoCloseError('ข้อมูลไม่ครบถ้วน', message); // เช่น: กรุณากรอกชื่อผู้ใช้และรหัสผ่าน
            } else if (status === 401) {
                showAutoCloseError('เข้าสู่ระบบล้มเหลว', message); // เช่น: ไม่พบผู้ใช้, รหัสผ่านผิด
            } else if (status === 500) {
                showAutoCloseError('ข้อผิดพลาดของระบบ', 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่ภายหลัง');
            } else {
                showAutoCloseError('ไม่สามารถเข้าสู่ระบบได้', message);
            }
        }
    };

    if (checkingAuth) {
        return null; 
    }

    return (
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
