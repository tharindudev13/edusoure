import  { useState } from "react";
import { 
  FileText, Calendar, ShieldCheck, Scale, Eye, Edit2, Trash2, 
  Package, Slash, AlertCircle, Mail, Globe, MapPin, Clock, Info, CheckCircle 
} from "lucide-react";

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState("#s1");

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tableOfContents = [
    { id: "#s1", num: "01", label: "Introduction" },
    { id: "#s2", num: "02", label: "Information We Collect" },
    { id: "#s3", num: "03", label: "How We Use Your Information" },
    { id: "#s4", num: "04", label: "How We Share Information" },
    { id: "#s5", num: "05", label: "Cookies & Tracking" },
    { id: "#s6", num: "06", label: "Children's Privacy" },
    { id: "#s7", num: "07", label: "Data Security" },
    { id: "#s8", num: "08", label: "Data Retention" },
    { id: "#s9", num: "09", label: "Your Rights" },
    { id: "#s10", num: "10", label: "Third-Party Links" },
    { id: "#s11", num: "11", label: "Changes to This Policy" },
    { id: "#s12", num: "12", label: "Contact Us" },
  ];

  const rightsGrid = [
    { icon: <Eye size={20} className="text-blue-400" />, title: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
    { icon: <Edit2 size={20} className="text-blue-400" />, title: "Right to Correct", desc: "Update or correct inaccurate personal information in your account." },
    { icon: <Trash2 size={20} className="text-blue-400" />, title: "Right to Delete", desc: "Request deletion of your account and associated personal data." },
    { icon: <Package size={20} className="text-blue-400" />, title: "Right to Portability", desc: "Request your data in a structured, machine-readable format." },
    { icon: <Slash size={20} className="text-blue-400" />, title: "Right to Object", desc: "Opt out of marketing communications or certain data processing activities." },
    { icon: <Clock size={20} className="text-blue-400" />, title: "Right to Restrict", desc: "Request that we limit how we process your data in certain circumstances." },
  ];

  return (
    <div className="min-h-screen bg-[#0B1320] text-slate-300 font-sans selection:bg-blue-600/30">
      
      {/* HERO HERO MODULE */}
      <section className="relative bg-[#111C2E] py-20 px-6 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_100%,rgba(56,189,248,0.06)_0%,transparent_65%),radial-gradient(ellipse_40%_50%_at_100%_0%,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/60 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
            <FileText size={12} /> Legal Framework Matrix
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            Privacy <span className="text-blue-500 italic">Policy</span>
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-800/60">
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider">Effective Date</span>
              <span className="text-xs md:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5"><Calendar size={12} className="text-blue-500" /> 01 June 2026</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider">Last Updated</span>
              <span className="text-xs md:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5"><Clock size={12} className="text-blue-500" /> 30 May 2026</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider">Engine Version</span>
              <span className="text-xs md:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5"><ShieldCheck size={12} className="text-blue-500" /> v1.0 Production</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider">Jurisdiction</span>
              <span className="text-xs md:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5"><Scale size={12} className="text-blue-500" /> Sri Lanka (GOSL)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE LAYOUT INNER WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        
        {/* SIDEBAR NAVIGATION GRID */}
        <aside className="lg:sticky lg:top-24 hidden lg:block bg-[#111C2E]/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest pb-2.5 border-b border-slate-800/60 font-semibold">
            Table of Contents
          </div>
          <ul className="space-y-1">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left flex items-center gap-2.5 text-xs px-3 py-2 rounded-lg font-medium transition-all duration-150 ${
                    activeTab === item.id 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/50 translate-x-1" 
                      : "text-slate-400 hover:bg-[#152238]/60 hover:text-slate-200"
                  }`}
                >
                  <span className={`font-mono text-[9px] font-bold ${activeTab === item.id ? "text-blue-200" : "text-slate-700"}`}>
                    {item.num}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* POLICY BODY COMPONENT STREAM */}
        <main className="lg:col-span-3 space-y-14 min-w-0">
          
          <div className="bg-[#152238]/40 border border-slate-800 border-l-4 border-l-blue-500 rounded-r-xl p-6 text-xs md:text-sm text-slate-400 leading-relaxed shadow-lg">
            At <strong className="text-blue-400 font-semibold">EduSource.lk</strong>, your privacy is not an afterthought — it is a core part of how we build. This Privacy Policy explains what personal information we collect, how we use it, and the rights you have over your data. By using our platform, you agree to the practices described in this policy. If you do not agree, please discontinue use of the platform.
          </div>

          {/* SECTION 1 */}
          <section id="s1" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 01</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Introduction</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              EduSource.lk ("we", "us", "our") is an education technology platform operated in Sri Lanka. Our platform is accessible via <strong className="text-slate-300 font-medium">edusource.lk</strong> and connects students (Grade 1–13), parents, and private tutors through a unified digital marketplace.
            </p>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              This Privacy Policy applies to all users of the EduSource.lk website, mobile applications, and any related services (collectively, the "Platform"). It governs how we collect, use, store, and protect your personal information.
            </p>
            <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 flex gap-3.5 items-start">
              <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed m-0">
                This policy was prepared in accordance with the personal data protection principles applicable in Sri Lanka. We are committed to handling your data responsibly and transparently.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 02</div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Information We Collect</h2>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs md:text-sm font-semibold tracking-wide text-blue-400 uppercase">2.1 Information You Provide Directly</h3>
              <div className="overflow-x-auto border border-slate-800/80 rounded-xl shadow-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#111C2E] border-b border-slate-800 text-slate-300 font-mono text-[10px] tracking-wider uppercase">
                      <th className="p-4 font-semibold">Data Type</th>
                      <th className="p-4 font-semibold">Examples</th>
                      <th className="p-4 font-semibold">Who Provides</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 bg-[#111C2E]/20">
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Account Information</td><td className="p-4 text-slate-400">Full name, email address, secure crypt hash password</td><td className="p-4 text-slate-400">All users</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Profile Details</td><td className="p-4 text-slate-400">Grade level, subject preferences, geographic location (district)</td><td className="p-4 text-slate-400">Students</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Tutor Profile</td><td className="p-4 text-slate-400">Subject specializations, class times, fees, contact number, bio</td><td className="p-4 text-slate-400">Tutors</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Uploaded Content</td><td className="p-4 text-slate-400">Notes, documents, study materials uploaded to the cloud portal</td><td className="p-4 text-slate-400">Students</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Reviews &amp; Ratings</td><td className="p-4 text-slate-400">Text reviews, star evaluation metrics submitted for tutors</td><td className="p-4 text-slate-400">Students</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Payment Information</td><td className="p-4 text-slate-400">Transaction records for premium plans (processed via gateway tokens)</td><td className="p-4 text-slate-400">Premium users</td></tr>
                    <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Communications</td><td className="p-4 text-slate-400">Support tickets and messages sent via mail or forms</td><td className="p-4 text-slate-400">All users</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs md:text-sm font-semibold tracking-wide text-blue-400 uppercase">2.2 Information Collected Automatically</h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none pl-0">
                {["Device context metadata (browser variant, operational engine, system build configuration)", "IP coordinates mapping and general rough localization matrices", "Target telemetry track (page view durations, navigation links executed)", "Automated testing framework quiz results metrics and score timelines", "Referring platform coordinates or source redirect parameters that routed traffic"].map((li, i) => (
                  <li key={i} className="flex gap-2.5 items-center"><span className="text-blue-500 text-lg leading-0">&bull;</span> {li}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs md:text-sm font-semibold tracking-wide text-blue-400 uppercase">2.3 Information from Third Parties</h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none pl-0">
                {["OAuth federation assets via Google / Facebook pools (binds name, email, and reference media URL tokens)", "Integrated payment processor webhook transaction confirmations"].map((li, i) => (
                  <li key={i} className="flex gap-2.5 items-center"><span className="text-blue-500 text-lg leading-0">&bull;</span> {li}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 03</div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">How We Use Your Information</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">We use collected information for the following purposes only:</p>
            
            <div className="overflow-x-auto border border-slate-800/80 rounded-xl shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#111C2E] border-b border-slate-800 text-slate-300 font-mono text-[10px] tracking-wider uppercase">
                    <th className="p-4 font-semibold">Purpose</th>
                    <th className="p-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 bg-[#111C2E]/20">
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Account Management</td><td className="p-4 text-slate-400">Creating and managing your user account credentials on the active platform tables.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Platform Functionality</td><td className="p-4 text-slate-400">Enabling tutor search indexes, class registration timelines, quiz calculations, and download caches.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">AI Recommendations</td><td className="p-4 text-slate-400">Providing personalized tutor and pipeline suggestions tailored to your grade, subjects, and analytics tracking.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Communication Flow</td><td className="p-4 text-slate-400">Dispatching system transactions alert alerts, lifecycle updates, and context inquiries answers.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Tutor Onboarding</td><td className="p-4 text-slate-400">Verifying qualifications profiles and routing node-to-node relational student-tutor interfaces.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Analytics Optimization</td><td className="p-4 text-slate-400">Mapping interface usage analytics logs to update software features and pipeline performance.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Marketing Controls (Optional)</td><td className="p-4 text-slate-400">Delivering platform promotion updates only to explicit opt-in queues — user parameters can pull subscription flags out instantly.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Legal Requirements</td><td className="p-4 text-slate-400">Complying with statutory laws and local legal discovery request requests.</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#152238] border border-blue-900/40 rounded-xl p-4 flex gap-3.5 items-start">
              <CheckCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed m-0">
                <strong className="text-white font-medium">We do not sell your personal data.</strong> We do not share your personal information with advertisers for their independent marketing purposes.
              </p>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 04</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">How We Share Your Information</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              EduSource.lk does not sell, rent, or trade your personal information. We share data only in the following limited circumstances:
            </p>

            <h3 className="text-xs md:text-sm font-semibold text-slate-200 pt-2">4.1 With Tutors (When You Register for a Class)</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              When you submit an inquiry or register for a tutor's class, your name and contact details are shared with that specific tutor to facilitate the booking.
            </p>

            <h3 className="text-xs md:text-sm font-semibold text-slate-200 pt-2">4.2 With Service Providers</h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none pl-0">
              {["Cloud cluster platform structures (AWS, Vercel) for microservice pipelines", "Secure electronic clearing payment gateways for premium checkout validations", "Aggregated analytical engines (e.g., Google Analytics) tracking product interfaces", "Email transactional dispatch relays ensuring notification deliveries"].map((li, i) => (
                <li key={i} className="flex gap-2.5 items-center"><span className="text-blue-500 text-lg leading-0">&bull;</span> {li}</li>
              ))}
            </ul>
            <p className="text-xs md:text-sm text-slate-500 italic">
              All service providers are contractually required to protect your data and use it only for the services they provide to us.
            </p>

            <h3 className="text-xs md:text-sm font-semibold text-slate-200 pt-2">4.3 Public Profile Information</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Tutor profiles, including names, subject areas, ratings, and reviews, are publicly visible on the platform. Students who submit reviews should be aware their review content (but not their contact details) is displayed publicly.
            </p>

            <h3 className="text-xs md:text-sm font-semibold text-slate-200 pt-2">4.4 Legal Requirements</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              We may disclose your information if required by law, court order, or governmental authority in Sri Lanka, or when we believe disclosure is necessary to protect our rights or the safety of users.
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 05</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Cookies &amp; Tracking Technologies</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              EduSource.lk uses cookies and similar tracking technologies to enhance your experience on the platform.
            </p>

            <div className="overflow-x-auto border border-slate-800/80 rounded-xl shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#111C2E] border-b border-slate-800 text-slate-300 font-mono text-[10px] tracking-wider uppercase">
                    <th className="p-4 font-semibold">Cookie Type</th>
                    <th className="p-4 font-semibold">Purpose</th>
                    <th className="p-4 font-semibold">Can Be Disabled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 bg-[#111C2E]/20">
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Essential Cookies</td><td className="p-4 text-slate-400">Required for secure authentication token tracking and core functionality context states.</td><td className="p-4 text-rose-400 font-semibold uppercase font-mono tracking-wide text-[10px]">No Matrix Override</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Preference Cookies</td><td className="p-4 text-slate-400">Retaining user settings UI parameters (locale options, targeted age metrics).</td><td className="p-4 text-blue-400 font-semibold uppercase font-mono tracking-wide text-[10px]">Yes allowed</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Analytics Cookies</td><td className="p-4 text-slate-400">Mapping visitor metrics data and page tracking models using raw anonymized strings.</td><td className="p-4 text-blue-400 font-semibold uppercase font-mono tracking-wide text-[10px]">Yes allowed</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Marketing Cookies</td><td className="p-4 text-slate-400">Displaying platform dynamic notifications and recommended listing pointers.</td><td className="p-4 text-blue-400 font-semibold uppercase font-mono tracking-wide text-[10px]">Yes allowed</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              You can manage or delete cookies through your browser settings at any time. Disabling non-essential cookies will not affect your ability to access free resources on the platform.
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 06</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Children's Privacy</h2>
            
            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 flex gap-3.5 items-start">
              <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-xs block font-medium mb-1">Special Compliance Guardrail:</strong>
                <p className="text-xs text-slate-400 leading-relaxed m-0">
                  EduSource.lk serves students from Grade 1 onwards, which includes children under the age of 16. We take children's privacy seriously and have implemented additional safeguards.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none pl-0 pt-2">
              {[
                "Children under 16 may use the platform to access free resources and quizzes without creating an account.",
                "Account registration for users under 16 requires parental or guardian consent verification models.",
                "We do not knowingly collect unnecessary personal data or context attributes from child users.",
                "Parents or guardians can pull user records down or request system logs inspection targets at any point.",
                "We do not deploy targeting behavior tracking algorithms or advertising tracking pools to minors parameters.",
                "Student reviews and uploaded document files from minor users are routed to moderation filters before live injection."
              ].map((li, i) => (
                <li key={i} className="flex gap-2.5 items-center"><span className="text-blue-500 text-lg leading-0">&bull;</span> {li}</li>
              ))}
            </ul>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              If you believe a child has provided personal information without appropriate consent, please contact us immediately at <strong className="text-blue-400 font-medium">support@edusource.lk</strong> and we will take prompt action.
            </p>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 07</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Data Security</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              We implement industry-standard technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or disclosure.
            </p>

            <h3 className="text-xs md:text-sm font-semibold tracking-wide text-blue-400 uppercase pt-2">Security Measures We Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {[
                "HTTPS encryption for all data transmitted between your device and our servers",
                "Encrypted password storage using bcrypt hashing algorithms",
                "Secure cloud infrastructure hosted on AWS with regular security audits",
                "Access controls ensuring only authorized personnel can access user data",
                "Firebase real-time database security rules restricting data entry loops",
                "Regular database structural snapshot backups to prevent accidental loss"
              ].map((item, idx) => (
                <div key={idx} className="bg-[#111C2E] border border-slate-800/60 p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 flex gap-3.5 items-start mt-4">
              <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed m-0">
                While we employ strong security measures, no system is completely immune to breaches. In the event of a data breach affecting your information, we will notify you promptly and take appropriate remediation steps.
              </p>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 08</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Data Retention</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law.
            </p>

            <div className="overflow-x-auto border border-slate-800/80 rounded-xl shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#111C2E] border-b border-slate-800 text-slate-300 font-mono text-[10px] tracking-wider uppercase">
                    <th className="p-4 font-semibold">Data Type</th>
                    <th className="p-4 font-semibold">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 bg-[#111C2E]/20">
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Active account data</td><td className="p-4 text-slate-400">For the active lifespans duration of your registration.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Deleted account data</td><td className="p-4 text-slate-400">Up to 30 collection days after database request, then purged permanently.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Transaction records</td><td className="p-4 text-slate-400">7 system ledger years (mandatory finance audit compliance rules).</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Analytics data logs</td><td className="p-4 text-slate-400">26 tracking lifecycle months (fully anonymized strings logs).</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Support communications</td><td className="p-4 text-slate-400">3 years post-resolution closure.</td></tr>
                  <tr className="hover:bg-[#152238]/20 transition-colors"><td className="p-4 font-semibold text-white">Uploaded asset content</td><td className="p-4 text-slate-400">Until user trigger removal execution or moderator sweep flags delete.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 09</div>
              <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Your Rights</h2>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">As a user of EduSource.lk, you have the following rights regarding your personal information:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rightsGrid.map((right, idx) => (
                <div key={idx} className="bg-[#111C2E] border border-slate-800/80 rounded-xl p-5 hover:border-blue-500/30 transition-colors cursor-default">
                  <div className="mb-3 p-2 bg-[#0B1320] border border-slate-800/60 rounded-lg max-w-max">
                    {right.icon}
                  </div>
                  <h4 className="font-bold text-xs text-white tracking-wide mb-1.5">{right.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{right.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed pt-2">
              To exercise any of these rights, please contact us at <strong className="text-blue-400 font-medium">support@edusource.lk</strong>. We will respond to all valid requests within <strong className="text-white font-medium">30 days</strong>.
            </p>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 10</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Third-Party Links</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              The EduSource.lk platform may contain links to external websites, including tutor social media profiles, educational YouTube channels, or resource repositories. These third-party sites have their own privacy policies, and we are not responsible for their content or data practices.
            </p>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              We encourage you to review the privacy policy of any third-party website you visit through links on our platform.
            </p>
          </section>

          {/* SECTION 11 */}
          <section id="s11" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 11</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Changes to This Policy</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will:
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-slate-400 list-none pl-0">
              {["Update the 'Last Updated' configuration index tracking parameter at the top of this layout", "Notify registered data profiles via system email distribution arrays for material parameter changes", "Display a persistent modal notice on the dashboard home component layer for 30 consecutive days"].map((li, i) => (
                <li key={i} className="flex gap-2.5 items-center"><span className="text-blue-500 text-lg leading-0">&bull;</span> {li}</li>
              ))}
            </ul>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Your continued use of EduSource.lk after changes are posted constitutes your acceptance of the updated policy. If you disagree with any updates, you may delete your account and discontinue use.
            </p>
          </section>

          {/* SECTION 12 */}
          <section id="s12" className="scroll-mt-24 space-y-4">
            <div className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Section 12</div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif pb-3.5 border-b border-slate-800/60">Contact Us</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please reach out to us:
            </p>

            {/* CONTACT METADATA GRID CONTAINER */}
            <div className="bg-[#111C2E] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 max-w-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-blue-600 to-sky-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">EduSource.lk — Privacy Team</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-[#0B1320] border border-slate-800/60 p-3.5 rounded-xl">
                  <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase text-slate-500 tracking-wider">Secure Email Terminal</div>
                    <div className="text-xs md:text-sm text-white font-medium mt-0.5"><a href="mailto:support@edusource.lk" className="text-blue-400 hover:underline">support@edusource.lk</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#0B1320] border border-slate-800/60 p-3.5 rounded-xl">
                  <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase text-slate-500 tracking-wider">Web Portal Coordinates</div>
                    <div className="text-xs md:text-sm text-white font-medium mt-0.5"><a href="https://edusource.lk" className="text-blue-400 hover:underline">edusource.lk</a></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#0B1320] border border-slate-800/60 p-3.5 rounded-xl">
                  <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase text-slate-500 tracking-wider">Operational Jurisdiction</div>
                    <div className="text-xs md:text-sm text-slate-300 font-medium mt-0.5">Democratic Socialist Republic of Sri Lanka</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#0B1320] border border-slate-800/60 p-3.5 rounded-xl">
                  <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase text-slate-500 tracking-wider">Maximum SLA Response Evaluation Frame</div>
                    <div className="text-xs md:text-sm text-slate-300 font-medium mt-0.5">Within 30 business operational calendar days</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}