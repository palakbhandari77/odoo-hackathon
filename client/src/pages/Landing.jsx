import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, 
  FileText, Users, BarChart3, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Custom Smooth Scroll Function for the Navbar links
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // 64px is the height of our h-16 navbar, so we offset the scroll by that amount
      const navHeight = 64; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 font-sans selection:bg-brand-600 selection:text-white overflow-hidden">
      
      {/* 1. Modern Frosted Glass Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-surface-200 top-0 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center font-bold text-white text-lg shadow-sm">
              V
            </div>
            {/* FIX: Changed xs:block to sm:block to properly show the brand name */}
            <span className="font-bold text-xl text-surface-900 tracking-tight hidden sm:block">VendorBridge</span>
          </div>
          
          {/* Center Links with Smooth Scroll Triggers */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-sm font-medium text-surface-muted hover:text-brand-600 transition-colors cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#workflow" 
              onClick={(e) => scrollToSection(e, 'workflow')}
              className="text-sm font-medium text-surface-muted hover:text-brand-600 transition-colors cursor-pointer"
            >
              How it Works
            </a>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/login" className="text-sm font-medium text-surface-900 hover:text-brand-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 transition-colors shadow-sm">
              Vendor Sign Up
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 2. Expanded Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
            
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium mb-8 border border-brand-100">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
              </span>
              <span>Odoo Hackathon Edition</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-surface-900 tracking-tight max-w-4xl leading-tight sm:leading-tight">
              Modernize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-teal">procurement</span> operations.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-surface-muted max-w-2xl px-2">
              VendorBridge is a centralized ERP platform that digitizes RFQs, manages vendor bids, and automates purchase order generation with enterprise-grade security.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
              <Link to="/login" className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 text-base font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 shadow-sm transition-all group">
                Access Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 text-base font-medium text-surface-900 bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-all shadow-sm">
                Become a Vendor
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* 3. Feature Highlights */}
      <section id="features" className="py-20 bg-white border-y border-surface-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900">Enterprise-grade capabilities</h2>
            <p className="mt-4 text-surface-muted max-w-2xl mx-auto">Everything you need to manage the entire procurement lifecycle from a single pane of glass.</p>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-surface-50 border border-surface-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white text-brand-600 rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900">Lightning Fast RFQs</h3>
              <p className="mt-3 text-surface-muted leading-relaxed">Draft requests for quotations with itemized details and distribute them to your verified vendor network instantly.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-surface-50 border border-surface-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white text-brand-teal rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900">Role-Based Security</h3>
              <p className="mt-3 text-surface-muted leading-relaxed">Strict RBAC ensures procurement officers can create RFQs, but only authorized managers can approve financial Purchase Orders.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-surface-50 border border-surface-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white text-brand-600 rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900">Automated Financials</h3>
              <p className="mt-3 text-surface-muted leading-relaxed">Convert approved quotations directly into official Purchase Orders and automatically generate tax-compliant invoices.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. How it Works (Workflow) */}
      <section id="workflow" className="py-24 bg-surface-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900">The VendorBridge Workflow</h2>
            <p className="mt-4 text-surface-muted max-w-2xl mx-auto">A seamless, end-to-end process designed to eliminate email threads and lost spreadsheets.</p>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative"
          >
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-200 -z-10 -translate-y-12"></div>

            {[
              { step: "01", title: "Create RFQ", icon: FileText, desc: "Procurement drafts an RFQ with product requirements and deadlines." },
              { step: "02", title: "Vendor Bidding", icon: Users, desc: "Invited vendors submit their lowest prices and delivery timelines." },
              { step: "03", title: "Manager Approval", icon: CheckCircle2, desc: "Review comparison matrices and approve the winning quotation." },
              { step: "04", title: "PO & Invoice", icon: Globe, desc: "System auto-generates the Purchase Order and final Invoice." }
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-surface-50">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-brand-600 mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to streamline your supply chain?</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="px-8 py-3.5 bg-white text-brand-600 font-bold rounded-lg hover:bg-surface-50 transition-colors shadow-lg">
              Sign In to ERP
            </Link>
            <Link to="/register" className="px-8 py-3.5 bg-brand-700 text-white border border-brand-500 font-bold rounded-lg hover:bg-brand-800 transition-colors">
              Register as Vendor
            </Link>
          </div>
        </div>
      </section>

     {/* 6. Professional "Fat" Footer */}
      <footer className="bg-surface-900 py-16 text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
            
            {/* Branding Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-white text-lg">
                  V
                </div>
                <span className="font-bold text-xl text-white tracking-tight">VendorBridge</span>
              </div>
              <p className="text-sm max-w-sm mb-6 leading-relaxed text-white/70">
                The next-generation ERP platform built to streamline your supply chain, automate financials, and secure your procurement lifecycle.
              </p>
              <div className="text-xs border border-white/20 inline-block px-3 py-1.5 rounded-full text-white/80">
                Built for the Odoo Hackathon
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-white transition-colors cursor-pointer">
                    Platform Features
                  </a>
                </li>
                <li>
                  <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')} className="hover:text-white transition-colors cursor-pointer">
                    How it Works
                  </a>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-white transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vendor Agreement</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2026 VendorBridge ERP. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-white/50 text-xs uppercase tracking-wider">System Status: All Systems Operational</span>
            </div>
          </div>

        </div>
      </footer>
      
    </div>
  );
};

export default Landing;