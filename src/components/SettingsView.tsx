import React, { useState } from 'react';
import {
  Copy,
  Check,
  ArrowRight,
  Download,
  CreditCard,
  ShieldCheck,
  Fingerprint,
  Lock,
  ArrowLeft,
  Zap,
  Sparkles,
  Globe,
  CheckCircle2,
  Send,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Platform } from '../types';
import { audioManager } from '../utils/audioManager';

const MotionDiv = motion.div as any;

interface SettingsViewProps {
  onComplete: (userId: string) => void;
  onBack: () => void;
  lang: Language;
  t: any;
  platform: Platform;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onComplete, onBack, lang, t, platform }) => {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ userId?: boolean; userIdLength?: boolean }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStage, setVerificationStage] = useState<'step1' | 'step2' | 'ready'>('step1');

  const platformName = platform === 'linebet_v1' ? 'Greenbet' : 'Winwin';
  const promoCode = platform === 'linebet_v1' ? 'B10' : 'B11';
  const platformImg = platform === 'linebet_v1'
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10'
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10';

  const greenbetDownloadUrl = "https://refpa79184.com/L?tag=d_5848868m_188307c_&site=5848868&ad=188307";
  const xbetDownloadUrl = "https://refpa49781.com/L?tag=d_5953406m_94904c_&site=5953406&ad=94904";
  const downloadUrl = platform === 'linebet_v1' ? greenbetDownloadUrl : xbetDownloadUrl;
  const telegramUrl = "https://t.me/+w3sTqpPkfwE0ZjM0";

  const handleCopy = () => {
    audioManager.playCopy();
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 15) {
      setUserId(val);
      if (val.length >= 10) setErrors({ userId: false, userIdLength: false });
    }
  };

  const validateAndSubmit = () => {
    audioManager.playClick();
    const trimmedId = userId.trim();
    const isLengthValid = trimmedId.length >= 10 && trimmedId.length <= 15;
    const newErrors = { userId: !trimmedId, userIdLength: !isLengthValid };
    setErrors(newErrors);

    if (!newErrors.userId && !newErrors.userIdLength) {
      setIsModalOpen(true);
      setVerificationStage('step1');
      setTimeout(() => setVerificationStage('step2'), 1500);
      setTimeout(() => setVerificationStage('ready'), 3000);
    }
  };

  const handleDownloadAndProceed = () => {
    audioManager.playClick();
    window.open(downloadUrl, '_blank');
    setIsModalOpen(false);
    onComplete(userId.trim());
  };

  const SectionCard: React.FC<{
    number: string;
    label: string;
    title: string;
    icon: React.ElementType;
    accent?: string;
    children: React.ReactNode;
  }> = ({ number, label, title, icon: Icon, accent = 'var(--primary-color)', children }) => (
    <div className="relative bg-black/35 backdrop-blur-xl border border-white/12 rounded-3xl p-4 sm:p-6 shadow-[0_14px_40px_rgba(0,0,0,0.45)] overflow-hidden">
      <div
        className="absolute top-0 right-0 left-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0"
          style={{ borderColor: `${accent}55`, backgroundColor: `${accent}1a` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest block mb-0.5" style={{ color: accent }}>
            {label} ({number})
          </span>
          <h2 className="text-base sm:text-lg font-black text-white leading-tight">{title}</h2>
        </div>
        <span className="text-2xl font-black font-mono text-white/10">{number}</span>
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-transparent font-sans text-white selection:bg-green-500/30" dir="rtl">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-color-rgb),0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col px-3 sm:px-6 pt-4 pb-16 max-w-2xl mx-auto w-full">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:border-green-500/50 hover:text-green-500 transition-all active:scale-95 shadow-md"
            title="رجوع"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_var(--primary-color)]" />
            <span className="text-xs font-black tracking-widest uppercase text-green-500">
              شروط تفعيل {platformName}
            </span>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-5 p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-green-500 animate-pulse shrink-0" />
          <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
            نفّذ الشروط الخمسة بالترتيب من الأعلى للأسفل، ثم أدخل ID حسابك في نهاية الصفحة لتفعيل التوقعات.
          </p>
        </div>

        {/* ALL CONDITIONS STACKED */}
        <div className="flex flex-col gap-4">
          {/* 01 */}
          <SectionCard number="01" label="الشرط الأول" title={t.install_app || "تثبيت التطبيق الرسمي"} icon={Download}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-black/30 border border-white/10 p-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/15 p-1.5 flex items-center justify-center shrink-0">
                  <img src={platformImg} alt={platformName} className="w-7 h-7 object-contain" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  قم بتنزيل وتثبيت تطبيق منصة <span className="text-green-400 font-bold">{platformName}</span> الرسمي لربط الحساب مع سيرفر التوقعات.
                </p>
              </div>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full h-14 rounded-2xl bg-white hover:bg-green-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl group"
              >
                <span>{t.install_btn || "تثبيت التطبيق الآن"}</span>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 02 */}
          <SectionCard number="02" label="الشرط الثاني" title="الاشتراك في قناة التلجرام" icon={Send} accent="#0088cc">
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 border border-white/10 p-4 rounded-2xl">
                انضم إلى القناة الرسمية على التلجرام لمتابعة التحديثات الحصرية واستلام الإشارات الفورية.
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full h-14 rounded-2xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(0,136,204,0.35)] group"
              >
                <span>الانضمام لقناة التلجرام</span>
                <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </SectionCard>

          {/* 03 */}
          <SectionCard number="03" label="الشرط الثالث" title={t.registration || "التسجيل بالبروموكود"} icon={Lock}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 border border-white/10 p-4 rounded-2xl">
                عند إنشاء حسابك الجديد على المنصة، أدخل الرمز الترويجي التالي لتفعيل خصم السيرفر وضمان مزامنة التوقعات:
              </p>
              <div
                onClick={handleCopy}
                className="relative bg-black/40 rounded-2xl border-2 border-dashed border-green-500/50 hover:border-green-500 p-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1 block">كود البروموكود المعتمد</span>
                    <span className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-green-400">{promoCode}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    copied ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-white/10 text-white group-hover:bg-green-500/20'
                  }`}>
                    {copied ? (<><Check className="w-4 h-4" /><span>تم النسخ!</span></>) : (<><Copy className="w-4 h-4" /><span>نسخ الكود</span></>)}
                  </div>
                </div>
                <Sparkles className="absolute top-2 left-2 w-3.5 h-3.5 text-green-500/50" />
              </div>
            </div>
          </SectionCard>

          {/* 04 */}
          <SectionCard number="04" label="الشرط الرابع" title={t.activation_deposit || "إيداع التفعيل الأول"} icon={CreditCard}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 border border-white/10 p-4 rounded-2xl">
                يتطلب تفعيل الخوارزمية إجراء أول عملية إيداع بالحساب للحد الأدنى المطلوب:
              </p>
              <div className="grid grid-cols-2 gap-3" dir="ltr">
                <div className="bg-black/40 border border-white/15 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1">USD ($)</span>
                  <span className="text-2xl font-black text-green-400">$5.00</span>
                </div>
                <div className="bg-black/40 border border-white/15 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1">EGP (L.E)</span>
                  <span className="text-2xl font-black text-green-400">250 L.E</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <Globe className="w-3.5 h-3.5" />
                <span>يتم تأكيد الإيداع تلقائياً عبر السيرفر خلال ثوانٍ.</span>
              </div>
            </div>
          </SectionCard>

          {/* 05 */}
          <SectionCard number="05" label="الشرط الخامس والأخير" title={t.verify_account || "تأكيد ومعرفة ID الحساب"} icon={Fingerprint}>
            <div className="flex flex-col gap-4">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 border border-white/10 p-4 rounded-2xl">
                أدخل رقم معرف حسابك (ID) المكون من 10 إلى 15 رقم للتحقق من المزامنة وبدء التوقعات فوراً:
              </p>

              <div>
                <label className="block text-[10px] text-zinc-300 mb-1.5 uppercase font-black tracking-widest">
                  {t.userid_label || "معرف حسابك (User ID)"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 w-13 flex items-center justify-center border-l border-white/15 px-3">
                    <Fingerprint className={`w-6 h-6 ${userId ? 'text-green-500' : 'text-zinc-500'}`} />
                  </div>
                  <input
                    type="tel"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="مثال: 1234567890"
                    maxLength={15}
                    className={`w-full bg-black/40 border text-white font-mono text-lg pr-16 pl-4 py-3.5 rounded-2xl focus:outline-none transition-all text-right ${
                      errors.userId || errors.userIdLength
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/20 focus:border-green-500'
                    }`}
                  />
                </div>
                {(errors.userId || errors.userIdLength) && (
                  <p className="text-red-400 text-xs font-bold mt-2 mr-1">
                    يرجى إدخال رقم ID صحيح مكون من 10 إلى 15 أرقام.
                  </p>
                )}
              </div>

              <button
                onClick={validateAndSubmit}
                className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-400 text-black font-black text-sm tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-[0.98] uppercase"
              >
                <span>{t.submit_verification || "تأكيد وتفعيل الحساب"}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Footer Info */}
        <div className="mt-5 p-4 bg-black/30 border border-white/10 rounded-2xl flex items-center gap-2 text-[11px] text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>يتم التأكد من صحة البيانات تلقائياً عبر السيرفر الفوري</span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-30">
          <div className="h-px w-10 bg-zinc-800" />
          <span className="text-[7.5px] font-black uppercase tracking-[0.3em] text-center">
            تشفير حماية عالي الأمان | KING BET
          </span>
        </div>
      </div>

      {/* Verification Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className="w-full max-w-sm bg-zinc-900/90 border border-green-500/50 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_40px_rgba(34,197,94,0.3)] relative overflow-hidden"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/20 blur-3xl rounded-full pointer-events-none" />

              {verificationStage === 'step1' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
                    <Fingerprint className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2">جاري التحقق من ID الخاص بك...</h3>
                  <p className="text-xs text-zinc-400 font-mono">ID: {userId}</p>
                </div>
              )}

              {verificationStage === 'step2' && (
                <div className="flex flex-col items-center py-4">
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2">جاري التحقق من حسابك...</h3>
                  <p className="text-xs text-zinc-400">جاري مطابقة كود البروموكود {promoCode} وحالة السيرفر</p>
                </div>
              )}

              {verificationStage === 'ready' && (
                <div className="flex flex-col items-center w-full py-2">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    <CheckCircle2 className="w-9 h-9 text-green-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2">تم التحقق من الحساب بنجاح!</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-bold mb-6">يرجى تحميل المنصة من هنا</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownloadAndProceed}
                    className="w-full py-4 px-6 bg-white hover:bg-zinc-100 text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-black" />
                    <span>تحميل الآن</span>
                  </motion.button>
                </div>
              )}
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsView;
