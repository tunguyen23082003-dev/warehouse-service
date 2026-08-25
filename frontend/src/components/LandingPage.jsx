import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showExplore, setShowExplore] = useState(false);
  const exploreRef = useRef(null);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [showExplore]);

  const handleExploreClick = () => {
    setShowExplore(true);
    setTimeout(() => {
      exploreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCloseExplore = () => {
    setShowExplore(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen text-white bg-[#0b1120]">
      {/* Hero */}
      <header className="relative w-full" style={{ minHeight: '90vh' }}>
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          loading="lazy"
          src="https://media.istockphoto.com/id/2177135894/vi/anh/b%C3%AAn-trong-m%E1%BB%99t-trung-t%C3%A2m-%C4%91i%E1%BB%81u-ph%E1%BB%91i-kho-l%C3%A0m-vi%E1%BB%87c.jpg?s=612x612&w=0&k=20&c=wpG3ejikZLlBPnGps4UcKjl2sFKa6lXzf5iFzF8cMN8=" 
          alt="Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a1628]"></div>
        
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-3">
            <i data-lucide="warehouse" className="w-8 h-8 text-cyan-400"></i> 
            <span className="font-bold text-2xl">SmartKho</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 backdrop-blur-md">
            <a className="rounded-full px-4 py-2 text-base font-medium transition hover:bg-white/10 hover:text-cyan-300" href="#overview">Tổng quan</a> 
            <a className="rounded-full px-4 py-2 text-base font-medium transition hover:bg-white/10 hover:text-cyan-300" href="#features">Tính năng</a> 
            <a className="rounded-full px-4 py-2 text-base font-medium transition hover:bg-white/10 hover:text-cyan-300" href="#contact">Liên hệ</a>
            
            {/* Auth Buttons */}
            <div className="border-l border-white/20 pl-4 ml-2 flex gap-3">
              <button 
                onClick={() => navigate('/auth')}
                className="text-base font-medium px-5 py-2.5 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition"
              >
                Đăng ký / Đăng nhập
              </button>
            </div>
          </div>
        </nav>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-28 md:pt-32 md:pb-40">
          <h1 className="font-bold max-w-4xl fade-up text-5xl md:text-6xl leading-tight">Hệ Thống Kho Thông Minh</h1>
          <p className="max-w-3xl mt-6 fade-up fade-up-d1 text-xl text-slate-300">
            Giải pháp quản lý kho hàng tự động hoá toàn diện — tối ưu không gian, tăng tốc vận hành, giảm thiểu sai sót với công nghệ AI & IoT.
          </p>
          <button 
            onClick={handleExploreClick}
            className="mt-10 px-10 py-4 text-lg rounded-xl font-bold transition hover:scale-105 fade-up fade-up-d2 bg-cyan-500 text-slate-900 hover:bg-cyan-400"
          >
            Khám phá ngay
          </button>
        </div>
      </header>

      {/* Explore Section */}
      {showExplore && (
        <section ref={exploreRef} id="explore" className="w-full px-6 py-24 bg-[#0a1628] border-b border-white/5 animate-[fadeUp_0.5s_ease_forwards]">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">
            <div className="relative rounded-2xl overflow-hidden glow-border order-2 md:order-1">
              <img 
                className="w-full h-96 object-cover" 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800" 
                alt="Explore Warehouse Tech"
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1628]/60 to-transparent"></div>
            </div>
            
            <div className="order-1 md:order-2 px-4">
              <p className="uppercase tracking-widest text-sm font-bold mb-3 text-cyan-400">Công Nghệ Cốt Lõi</p>
              <h2 className="font-bold text-4xl mb-6">Khám phá cách hệ thống vận hành</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                SmartKho ứng dụng nền tảng Trí tuệ nhân tạo (AI) kết hợp vạn vật kết nối (IoT) để tự động hóa toàn bộ quy trình lưu trữ, từ khâu nhập hàng, điều hướng robot đến khi xuất hàng. Mọi thứ được đồng bộ trong thời gian thực.
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="bg-slate-800/50 rounded-xl p-5 glow-border">
                  <div className="flex items-center gap-3">
                    <i data-lucide="bot" className="w-6 h-6 text-cyan-400"></i>
                    <p className="font-bold text-lg">Robot tự hành (AGV)</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-5 glow-border">
                  <div className="flex items-center gap-3">
                    <i data-lucide="cpu" className="w-6 h-6 text-emerald-400"></i>
                    <p className="font-bold text-lg">Băng chuyền AI</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleCloseExplore}
                className="mt-10 px-8 py-3 bg-transparent border border-slate-500 text-slate-300 rounded-lg font-semibold transition hover:bg-slate-800 hover:text-white"
              >
                Thu gọn
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Overview Section */}
      <section id="overview" className="w-full py-24 px-6 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <p className="uppercase tracking-widest text-sm font-bold mb-3 text-cyan-400">Chỉ số nổi bật</p>
            <h2 className="font-bold text-4xl">Hiệu suất vận hành kho</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Các chỉ số được đo lường thực tế từ các doanh nghiệp đã áp dụng hệ thống.</p>
          </div>
          
          <div className="overview-grid items-center fade-up fade-up-d1">
            {/* Left: Image */}
            <div className="relative rounded-2xl overflow-hidden glow-border">
              <img 
                className="w-full h-96 lg:h-[450px] object-cover" 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800" 
                alt="Overview" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent"></div>
            </div>
            
            {/* Right: Metrics */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6 glow-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <i data-lucide="target" className="w-6 h-6 text-cyan-400"></i>
                  </div>
                  <div>
                    <p className="font-bold text-base text-slate-300">Độ chính xác tồn kho</p>
                    <p className="text-3xl font-bold text-white">99.8%</p>
                  </div>
                </div>
                <div className="metric-bar">
                  <div className="metric-bar-fill" style={{ width: '99.8%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 glow-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <i data-lucide="zap" className="w-6 h-6 text-emerald-400"></i>
                  </div>
                  <div>
                    <p className="font-bold text-base text-slate-300">Tốc độ xử lý đơn</p>
                    <p className="text-3xl font-bold text-white">3x</p>
                  </div>
                </div>
                <div className="metric-bar">
                  <div className="metric-bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 glow-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <i data-lucide="shield-check" className="w-6 h-6 text-violet-400"></i>
                  </div>
                  <div>
                    <p className="font-bold text-base text-slate-300">Giám sát liên tục</p>
                    <p className="text-3xl font-bold text-white">24/7</p>
                  </div>
                </div>
                <div className="metric-bar">
                  <div className="metric-bar-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 glow-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <i data-lucide="trending-down" className="w-6 h-6 text-amber-400"></i>
                  </div>
                  <div>
                    <p className="font-bold text-base text-slate-300">Chi phí vận hành</p>
                    <p className="text-3xl font-bold text-white">-40%</p>
                  </div>
                </div>
                <div className="metric-bar">
                  <div className="metric-bar-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <main id="features" className="w-full px-6 py-24 bg-[#0b1120]">
        <h2 className="text-center font-bold text-4xl fade-up">Tính năng nổi bật</h2>
        <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-10">
          <article className="bg-slate-900 rounded-2xl overflow-hidden card-hover fade-up fade-up-d2">
            <img 
              className="w-full h-64 object-cover" 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800" 
              alt="Feature 1" 
            />
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-3 text-white">Theo dõi hàng hoá realtime</h3>
              <p className="mt-2 text-base text-slate-400 leading-relaxed">Quét mã vạch, RFID và camera AI giúp cập nhật vị trí hàng hoá tức thì trên bản đồ kho.</p>
            </div>
          </article>
          
          <article className="bg-slate-900 rounded-2xl overflow-hidden card-hover fade-up fade-up-d3">
            <img 
              className="w-full h-64 object-cover" 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" 
              alt="Feature 2" 
            />
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-3 text-white">Phân tích & dự báo</h3>
              <p className="mt-2 text-base text-slate-400 leading-relaxed">Dashboard trực quan, dự báo nhu cầu tồn kho và cảnh báo sớm giúp ra quyết định chính xác.</p>
            </div>
          </article>
          
          <article className="bg-slate-900 rounded-2xl overflow-hidden card-hover fade-up fade-up-d4">
            <img 
              className="w-full h-64 object-cover" 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" 
              alt="Feature 3" 
            />
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-3 text-white">Tự động hoá vận hành</h3>
              <p className="mt-2 text-base text-slate-400 leading-relaxed">Robot AGV, cánh tay tự động và hệ thống băng chuyền thông minh vận hành 24/7 không ngừng nghỉ.</p>
            </div>
          </article>
        </div>
      </main>

      {/* Contact Section */}
      <footer id="contact" className="w-full bg-[#050a14] border-t border-white/10 pt-24 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-16 items-start">
          {/* Contact Info */}
          <div className="fade-up">
            <h2 className="text-4xl font-bold mb-6 text-white">Liên hệ với chúng tôi</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Bạn cần tư vấn giải pháp chuyển đổi số cho hệ thống kho? Hãy để lại thông tin, chuyên gia của SmartKho sẽ hỗ trợ bạn ngay lập tức.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">
                    Địa chỉ: <span className="font-normal text-slate-400 text-lg ml-2">826 Sư Vạn Hạnh, Phường 13, Quận 10, Thành Phố Hồ Chí Minh</span>
                  </h4>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">
                    Điện thoại: <span className="font-normal text-slate-400 text-lg ml-2">0329651939</span>
                  </h4>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/20 text-violet-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">
                    Email: <span className="font-normal text-slate-400 text-lg ml-2">nguyenminhtu20030@gmail.com</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-slate-900/50 p-8 md:p-10 rounded-2xl border border-white/10 fade-up fade-up-d2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold mb-8 text-white">Gửi thông tin trực tuyến</h3>
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Đã gửi thông tin liên hệ thành công!"); }}>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Họ và tên</label>
                <input type="text" className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="Nhập tên của bạn" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Số điện thoại</label>
                <input type="tel" className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition" placeholder="Nhập số điện thoại" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Nội dung hỗ trợ</label>
                <textarea rows="4" className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 transition resize-none" placeholder="Bạn cần tư vấn vấn đề gì?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Gửi yêu cầu ngay
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 pb-4 text-center">
          <p className="text-slate-500 text-sm">© 2026 SmartKho — Hệ Thống Kho Thông Minh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
