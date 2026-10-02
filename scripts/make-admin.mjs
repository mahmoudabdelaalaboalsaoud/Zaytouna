// الاستخدام: node scripts/make-admin.mjs <uid>
// يتطلب متغير GOOGLE_APPLICATION_CREDENTIALS يشير لملف Service Account (لا ترفعه على GitHub)
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
initializeApp({ credential: applicationDefault() });
await getAuth().setCustomUserClaims(process.argv[2], { admin: true });
console.log('تم منح صلاحية الإدارة');
