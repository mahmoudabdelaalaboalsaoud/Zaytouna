# زيتونة — منصة زيت الزيتون

واجهة ثابتة في `public/` + دالة الذكاء الاصطناعي في `functions/api/assistant.js` (Cloudflare Pages Functions).

## الإعداد
1. **Cloudflare Pages**: اربط مستودع GitHub، اترك أمر البناء فارغاً وحدّد مجلد الإخراج `public`. أضف في Settings ← Variables سراً باسم `ANTHROPIC_API_KEY`. (اختياري: `MODEL`، الافتراضي Haiku 4.5 لخفض التكلفة.)
2. **Firebase**: فعّل Authentication (هاتف/إيميل) وFirestore، ثم الصق `firestore.rules` في تبويب Rules. لمنح نفسك صلاحية الإدارة: `npm i` ثم `node scripts/make-admin.mjs <uid>`.
3. **Supabase**: أنشئ Bucket عام للقراءة باسم `products` للصور، وفعّل Authentication ← Third-party ← Firebase ليتمكن التاجر من الرفع بحسابه.
4. أضف حماية Rate Limiting على مسار `/api/assistant` من لوحة Cloudflare لمنع استنزاف الرصيد.

## نموذج البيانات
- `merchants/{uid}`: name, phone, city, plan, status (trial|active|expired), endsAt
- `products/{id}`: merchantId, name, origin, acidity, liters, price, wholesale, imageUrl, active
- `orders/{id}`: buyerId, merchantId, items, total, status (new|confirmed|delivered|cancelled)، الدفع عند الاستلام

## قواعد الأمان الأساسية
التاجر يبدأ بتجربة 90 يوماً ولا يستطيع تفعيل اشتراكه بنفسه؛ التفعيل من الإدارة بعد التواصل واتساب. إضافة المنتجات مرهونة بحالة الاشتراك داخل القواعد نفسها.
