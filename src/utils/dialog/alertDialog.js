import Swal from 'sweetalert2';

// ใช้แสดง error ชั่วคราว ปิดอัตโนมัติ
export const showAutoCloseError = (title = 'เกิดข้อผิดพลาด', text = '', duration = 2000) => {
    Swal.fire({
        icon: 'error',
        title,
        text,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: false,
        width: '450px',
    });
};

// อีกตัวอย่างสำหรับ success
export const showAutoCloseSuccess = (title = 'สำเร็จ', text = '', duration = 2000) => {
    Swal.fire({
        icon: 'success',
        title,
        text,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: false,
        width: '450px',
    });
};

// แสดง confirm dialog พร้อมรับ title, text และ callback เมื่อกดตกลง
export const showConfirmCancel = (title, text, onConfirm) => {
    Swal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        width: '500px',
        reverseButtons: true, 
        customClass: {
            confirmButton: 'swal2-confirm-blue', 
            cancelButton: 'swal2-cancel-gray',   
        },
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
};


