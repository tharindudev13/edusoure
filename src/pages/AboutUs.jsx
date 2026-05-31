import { useEffect, useRef } from "react";
import { Award, Target, Eye, Globe, Search, Users, Rocket, Lightbulb, Shield, BookOpen, CheckSquare, Upload, Star, Cpu } from "lucide-react";
import { Link } from "react-router";

export default function AboutUs() {
  const revealsRef = useRef([]);

  useEffect(() => {
    const reveals = revealsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-[22px]");
            }, 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  const coreValues = [
    { icon: <Globe size={24} className="text-blue-500" />, title: "Equal Access", desc: "Every student — from Jaffna to Galle — deserves the same shot at excellence. Geography should never limit potential." },
    { icon: <Search size={24} className="text-blue-500" />, title: "Transparency", desc: "Open tutor ratings, honest reviews, and clear pricing. No hidden agendas. Students deserve to make informed decisions." },
    { icon: <Users size={24} className="text-blue-500" />, title: "Community Power", desc: "Knowledge grows when shared. Our peer-upload system turns every student into a contributor to Sri Lanka's collective learning." },
    { icon: <Rocket size={24} className="text-blue-500" />, title: "Innovation", desc: "We use AI and modern technology not for the sake of it — but to solve real problems that Sri Lankan students face every day." },
    { icon: <Lightbulb size={24} className="text-blue-500" />, title: "Student First", desc: "Every feature, every decision, every line of code is built with one question in mind: does this make life easier for the student?" },
    { icon: <Shield size={24} className="text-blue-500" />, title: "Excellence", desc: "We hold tutors, content, and ourselves to the highest standard. Sri Lankan students deserve the best — and we deliver it." }
  ];

  const offers = [
    { num: "01", icon: <BookOpen size={20} className="text-blue-400" />, title: "Free Resource Library", desc: "Notes, mind maps & past papers for Grade 1–13. No login required." },
    { num: "02", icon: <Search size={20} className="text-blue-400" />, title: "Verified Tutor Directory", desc: "Find and compare tutors by subject, grade, area, and real student ratings." },
    { num: "03", icon: <CheckSquare size={20} className="text-blue-400" />, title: "Online Quiz Engine", desc: "Timed MCQ quizzes mapped to the Sri Lankan curriculum with performance tracking." },
    { num: "04", icon: <Upload size={20} className="text-blue-400" />, title: "Student Note Upload Portal", desc: "Share your notes with the community. Learn from peers across Sri Lanka." },
    { num: "05", icon: <Star size={20} className="text-blue-400" />, title: "Tutor Rating & Review System", desc: "Verified student reviews that hold tutors accountable and reward quality teaching." },
    { num: "06", icon: <Cpu size={20} className="text-blue-400" />, title: "AI Tutor Matching", desc: "Smart recommendations that connect you to the right tutor for your goals." }
  ];

  return (
    <div className="min-h-screen bg-[#0B1320] text-slate-300 font-sans selection:bg-blue-600/30 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-[#0B1320] pt-15 overflow-hidden">
        {/* Deep Dark Blue Tech Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_100%,rgba(56,189,248,0.08)_0%,transparent_65%),radial-gradient(ellipse_50%_50%_at_100%_0%,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Geometric Accent Circles aligned to admin theme dashboards */}
        <div className="absolute -right-45 top-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-slate-800/40 shadow-[0_0_0_60px_rgba(255,255,255,0.003),0_0_0_120px_rgba(255,255,255,0.001)] hidden md:block pointer-events-none">
          <div className="absolute inset-15 rounded-full border border-blue-500/5" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-blue-400 font-semibold bg-blue-950/40 border border-blue-900/60 px-3 py-1.5 rounded-md max-w-max animate-pulse">
              ABOUT EDUSOURCE.LK
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              We're Changing How Sri Lanka <span className="text-blue-500 italic font-serif">Learns.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg">
              Two university students. One bold mission — to make quality education accessible to every Sri Lankan student, from Grade 1 to Grade 13, regardless of where they live or what they can afford.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="font-serif text-3xl font-bold text-blue-500">4.2M</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Students We Serve</div>
              </div>
              <div className="w-px bg-slate-800/60 h-10 self-center" />
              <div>
                <div className="font-serif text-3xl font-bold text-blue-500">G1–13</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">All Grade Levels</div>
              </div>
              <div className="w-px bg-slate-800/60 h-10 self-center" />
              <div>
                <div className="font-serif text-3xl font-bold text-blue-500">2026</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Founded Year</div>
              </div>
            </div>
          </div>

          <div>
            {/* The Quote Card - Matching Admin Section Elevations */}
            <div className="bg-[#111C2E] border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden before:content-['“'] before:absolute before:-top-6 before:left-4 before:font-serif before:text-[140px] before:text-blue-500/5 before:line-height-1 before:pointer-events-none">
              <blockquote className="font-serif text-base md:text-lg italic text-slate-200 leading-relaxed relative z-10 mb-6">
                "We are two university students who believe every Sri Lankan child deserves access to quality education. EduSource.lk is our commitment to making that possible."
              </blockquote>
              
              <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-sky-500 rounded-full flex items-center justify-center font-serif text-xs font-bold text-white">K</div>
                  <div>
                    <div className="text-xs font-bold text-white">Kavindu Heshan</div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Co-Founder / Business</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-sky-500 rounded-full flex items-center justify-center font-serif text-xs font-bold text-white">T</div>
                  <div>
                    <div className="text-xs font-bold text-white">Tharindu Devinda</div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Co-Founder / Tech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SYSTEM ORIGIN / STORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out md:sticky md:top-24 space-y-3">
          <div className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-semibold">Our Story</div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">Born in a Lecture Hall</h2>
          <div className="w-10 h-1 bg-blue-500 rounded" />
        </div>
        
        <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out md:col-span-2 space-y-6 text-sm md:text-base text-slate-400 leading-relaxed">
          <p>
            It started with a simple frustration. As university students ourselves, we watched thousands of O/L and A/L students struggle every year — not because they lacked talent, but because they couldn't find the right tutor, or couldn't afford scattered study materials.
          </p>
          <p>
            <strong className="text-white font-semibold">Sri Lanka's private tutoring industry is worth billions of rupees.</strong> Yet there was no single, reliable platform where a student from Matara could find the same quality resources as a student in Colombo 7. No transparent system. No student voice. No verified tutor listings.
          </p>
          <p>
            So we decided to build one. With a background in <strong className="text-blue-400 font-medium">Accounting from USJ</strong> and <strong className="text-blue-400 font-medium">Artificial Intelligence from UOM</strong>, we combined our skills to create EduSource.lk — a platform that puts students first, always.
          </p>
          
          <div className="bg-[#152238] border border-slate-800/80 rounded-xl p-6 shadow-xl">
            <p className="font-serif italic text-sm md:text-base text-slate-200 leading-relaxed">
              "Quality education is not a privilege for the few. It is a <span className="text-blue-400 font-semibold not-italic">right for every Sri Lankan child.</span> EduSource.lk exists to bridge that gap — one student, one tutor, one resource at a time."
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-[#111C2E] border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out bg-[#152238] border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-blue-500/30">
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-blue-600" />
            <div className="w-10 h-10 rounded-xl bg-[#0B1320] border border-slate-800/60 flex items-center justify-center mb-5">
              <Target size={18} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-3 font-serif">Our Mission</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              To democratize quality education in Sri Lanka by providing every student — Grade 1 to Grade 13 — with free access to learning resources, verified tutors, and interactive tools that inspire academic excellence.
            </p>
          </div>

          <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out bg-[#0B1320] border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden group hover:border-blue-500/30">
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-sky-500" />
            <div className="w-10 h-10 rounded-xl bg-[#111C2E] border border-slate-800/60 flex items-center justify-center mb-5">
              <Eye size={18} className="text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-3 font-serif">Our Vision</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              To become Sri Lanka's #1 EdTech platform by 2030 — empowering every student, from village to city, with equal access to quality education and the tools to unlock their full potential.
            </p>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-12">
        <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out text-center max-w-md mx-auto space-y-2">
          <div className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-semibold">What We Stand For</div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => (
            <div 
              key={idx} 
              ref={addToRefs}
              className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out bg-[#111C2E] border border-slate-800/80 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl"
            >
              <div className="mb-4 p-2.5 bg-[#0B1320] border border-slate-800/60 rounded-xl max-w-max">
                {value.icon}
              </div>
              <h4 className="font-bold text-sm text-white tracking-wide mb-2">{value.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS METADATA SECTION */}
      <section className="bg-[#111C2E] relative overflow-hidden py-24 border-y border-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(29,78,216,0.06)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_80%,rgba(56,189,248,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-12">
          <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out space-y-2">
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">The People Behind It</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">Meet the Founders</h2>
            <div className="w-10 h-1 bg-blue-500 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Founder 1 */}
            <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out bg-[#152238]/60 border border-slate-800 rounded-2xl p-8 hover:bg-[#152238]/90 hover:border-blue-500/20">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-600 to-sky-500 flex items-center justify-center font-serif text-xl font-bold text-white border-2 border-blue-500/20 mb-5">
                <img src="https://scontent.fcmb11-3.fna.fbcdn.net/v/t39.30808-1/696303822_1453467789851127_659267145442573207_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeGXjB3_dnPyLvVroGWW0bPt_THu7f8Pw3r9Me7t_w_DekvjIer5vZMF2HPNqlkQzvNKYjxoqAeSq4FYPJGsF2Nz&_nc_ohc=lLGt0odXdWMQ7kNvwFRbF6I&_nc_oc=AdqaK1BL9dfIi_Uggv9ekIuVNqn7XD9UUKYQtKxYaKV_xFYuhCMsrwXUUgs-hT_MldQw5hnMUKFu4a_iEUYf3l0W&_nc_zt=24&_nc_ht=scontent.fcmb11-3.fna&_nc_gid=fqnbss1Y4Sn6er62rZK85Q&_nc_ss=7b2a8&oh=00_Af9ucLsWY1LHASlcmAdqQMM7HBIZ5i_mbnP4rvK_e28fgA&oe=6A224B15" alt="Kavindu Heshan" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide font-serif">Kavindu Heshan</h3>
              <div className="inline-block bg-blue-950/60 border border-blue-900 text-blue-400 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full mt-1.5 mb-4">
                Co-Founder · Business Lead
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-5">
                The business mind behind EduSource.lk. Kavindu brings financial discipline, strategic thinking, and a deep understanding of the Sri Lankan education landscape to the founding team.
              </p>
              <div className="bg-[#0B1320] border border-slate-800/60 rounded-xl p-4 mb-5 font-mono text-[11px] text-slate-400 leading-normal space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium"><Award size={12} className="text-blue-500" /> BSc (Hons) Accounting</div>
                <div>University of Sri Jayewardenepura</div>
                <div className="text-slate-500 text-[10px]">A/L 2024 Commerce — A3 | District Rank 08</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Business Strategy", "Financial Planning", "Marketing", "Tutor Onboarding"].map((s, i) => (
                  <span key={i} className="bg-blue-950/30 border border-blue-900/40 text-blue-300 px-2.5 py-1 rounded-full text-[10px] font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Founder 2 */}
            <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out bg-[#152238]/60 border border-slate-800 rounded-2xl p-8 hover:bg-[#152238]/90 hover:border-blue-500/20">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-600 to-sky-500 flex items-center justify-center font-serif text-xl font-bold text-white border-2 border-blue-500/20 mb-5">
                <img src="https://scontent.fcmb12-1.fna.fbcdn.net/v/t39.30808-6/706199594_1554397376304756_3362391568709033043_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEWgwx-qz1FH7Y6E6pkbjE0iRtFYM4XgtmJG0VgzheC2SDKKH2Y3GwkEZOyXKRkvkwoiofShYJbny_ZjIVdsNpp&_nc_ohc=mhlTeCwod2wQ7kNvwHHPDKu&_nc_oc=AdpNaseT_gOMpG8QfAPguzYneN1zweGcPOcx4Sgc2-aS2TCrkg702iNT64moWqmB_cbgoug0toPq639wNUpxWL8s&_nc_zt=23&_nc_ht=scontent.fcmb12-1.fna&_nc_gid=gNTNYiZomyzCQyOBZi6vXw&_nc_ss=7b2a8&oh=00_Af-dAJeHuGb1mvMNamus-rafrJlb3sdxCBv_aPq54ViAkg&oe=6A2237A8" alt="Tharindu Devinda" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide font-serif">Tharindu Devinda</h3>
              <div className="inline-block bg-blue-950/60 border border-blue-900 text-blue-400 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full mt-1.5 mb-4">
                Co-Founder · Technology Lead
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-5">
                The technical architect of EduSource.lk. Tharindu brings cutting-edge AI knowledge and full-stack development expertise, building the platform from the ground up with scalability and intelligence at its core.
              </p>
              <div className="bg-[#0B1320] border border-slate-800/60 rounded-xl p-4 mb-5 font-mono text-[11px] text-slate-400 leading-normal space-y-1">
                <div className="flex items-center gap-1.5 text-white font-medium"><Award size={12} className="text-blue-500" /> BSc (Hons) Artificial Intelligence</div>
                <div>University of Moratuwa</div>
                <div className="text-slate-500 text-[10px]">AI & Full-Stack Development Expert</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Full-Stack Dev", "AI & ML"].map((s, i) => (
                  <span key={i} className="bg-blue-950/30 border border-blue-900/40 text-blue-300 px-2.5 py-1 rounded-full text-[10px] font-medium">{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES / SERVICES VALUE CHAIN */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-12">
        <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out space-y-2">
          <div className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-semibold">What We Offer</div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">Everything a Student Needs</h2>
          <div className="w-10 h-1 bg-blue-500 rounded" />
        </div>

        <div className="bg-[#111C2E] border border-slate-800/80 rounded-xl overflow-hidden divide-y divide-slate-800/60">
          {offers.map((offer, idx) => (
            <div 
              key={idx}
              ref={addToRefs}
              className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out p-5 md:p-6 flex items-center gap-6 hover:bg-[#152238]/30 group cursor-default"
            >
              <div className="font-mono text-slate-600 text-[11px] w-6 shrink-0 font-bold">{offer.num}</div>
              <div className="w-10 h-10 rounded-lg bg-[#0B1320] border border-slate-800/60 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-colors">
                {offer.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{offer.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{offer.desc}</p>
              </div>
              <div className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all text-sm hidden sm:block font-mono">
                &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTION INTERACTION CALL PANEL */}
      <div className="bg-[#111C2E] border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
          <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out text-[10px] font-mono tracking-widest text-blue-500 uppercase font-semibold">Join Us</div>
          <h2 ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out text-3xl md:text-4xl font-bold tracking-tight text-white font-serif">
            Ready to Elevate Your Learning?
          </h2>
          <p ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Whether you're a student looking for resources, or a tutor wanting to reach more students — EduSource.lk is built for you.
          </p>
          <div ref={addToRefs} className="opacity-0 translate-y-5.5 transition-all duration-700 ease-out flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/classes" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg shadow-blue-950/50 transition-all duration-200 hover:-translate-y-0.5">
              Find a Tutor
            </Link>
            <Link to="/materials" className="border border-blue-500/40 hover:border-blue-500 hover:bg-blue-600/5 text-blue-400 hover:text-blue-300 text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5">
              Browse Free Resources
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}