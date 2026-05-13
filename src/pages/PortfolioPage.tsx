import { motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Globe, 
  Code, 
  Download, 
  Cpu, 
  Network, 
  Database, 
  Construction, 
  ArrowUpRight, 
  Send,
  CheckCircle2,
  Verified
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PortfolioPage() {
  const [terminalText, setTerminalText] = useState('');
  const fullText = "whoami\nSazid Hasan: Architect, Developer, Lifelong Learner. Currently building the future of distributed systems in London/Remote.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 space-y-32">
      {/* Global Background Auroras */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary aurora-blur rounded-full opacity-10" />
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[60%] bg-tertiary/20 aurora-blur rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-secondary/10 aurora-blur rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex flex-col justify-center items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-white/5 text-secondary font-medium text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            Available for freelance projects
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">Sazid Hasan</span><br />
            <span className="text-on-surface">Software Engineer</span>
          </h1>
          
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">
            Building the future of digital experiences with a focus on performance, aesthetics, and user-centric architecture.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              View Work
            </button>
            <button className="glass-card bg-white/5 hover:bg-white/10 text-on-surface font-bold px-8 py-4 rounded-xl transition-all active:scale-95">
              Contact Me
            </button>
          </div>

          <div className="flex justify-center gap-6 pt-8 text-on-surface-variant">
            <TerminalIcon className="w-8 h-8 hover:text-primary transition-colors cursor-pointer" />
            <Globe className="w-8 h-8 hover:text-primary transition-colors cursor-pointer" />
            <Code className="w-8 h-8 hover:text-primary transition-colors cursor-pointer" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 space-y-6"
        >
          <h2 className="text-4xl font-bold text-primary">About Me</h2>
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <p className="text-lg leading-relaxed text-on-surface-variant">
              I'm a digital craftsman obsessed with the intersection of elegant code and functional design. Based in the cloud, I spend my days orchestrating complex backend systems and sculpting pixel-perfect frontends.
            </p>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              When I'm not pushing commits, I'm usually exploring the latest in distributed systems or deep-diving into WebAssembly.
            </p>
            <div className="pt-4">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-mono text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Currently Learning: Next.js 15 & TS
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative h-full w-full rounded-3xl overflow-hidden glass-card">
            <img 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoxT1RxPegbdBHOSVii76BruM5W-9KVlTQ9wrctcsivNsaECBHi2xUaTbj1tm5icqH-QpTqyxcOXTB4PaSB5y83pkdzyw_eBQeC5km4jXkn3Wsn2phk9v4YjayWJjxzyjp_dS9igJFtiVGYNKySXeBXjZwPriTM8blau9MiKku5ryN5yGGmEjdBUw0JSxuPTMyiyUNpFdOiTivkngfvnsqwALywh_qtanxTAGw5zHauEKjHmtaoFHi1OyANew_WMjpgUtSXjNpY0c" 
              alt="Workspace" 
            />
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="space-y-8">
        <h2 className="text-4xl font-bold text-secondary">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          <div className="md:col-span-2 md:row-span-1 glass-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <Cpu className="text-primary w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Frontend Architecture</h3>
              <p className="text-on-surface-variant text-sm">React,Next.js,Tailwind CSS, TypeScript</p>
            </div>
            <div className="mt-6 h-2 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '95%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary" 
              />
            </div>
          </div>
          
          <div className="md:col-span-1 md:row-span-1 glass-card p-6 rounded-3xl">
            <Network className="text-secondary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Backend</h3>
            <p className="text-on-surface-variant text-sm">Node.js,MongoDb,Express.js</p>
          </div>

          <div className="md:col-span-1 md:row-span-2 glass-card p-6 rounded-3xl relative overflow-hidden group">
            <Construction className="text-tertiary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-4">Tools & DevOps</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary" /> Docker & Kubernetes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary" /> AWS & Vercel</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary" /> Git & CI/CD</li>
            </ul>
          </div>

          <div className="md:col-span-1 md:row-span-1 glass-card p-6 rounded-3xl">
            <Database className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Data</h3>
            <p className="text-on-surface-variant text-sm">PostgreSQL, Firebase, Redis</p>
          </div>

          <div className="md:col-span-2 md:row-span-1 glass-card p-6 rounded-3xl flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                <Verified className="text-secondary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Latest Certifications</h3>
                <p className="text-on-surface-variant text-sm">AWS Certified Solutions Architect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="work" className="space-y-12">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-bold text-tertiary">Featured Projects</h2>
          <button className="text-primary hover:underline flex items-center gap-2 font-medium">
            View Archive <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard 
            title="Nova Analytics Suite"
            desc="Real-time data processing platform with 3D visualization engine for enterprise-level logistics."
            tags={['Next.js', 'Three.js']}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVgkUDFS0sfMqY2EyrdnrfmJ90FY45l6dn67LKxweWlIZ1-VGgSIFs65bzMm-JM08X-bLKRD3DCbZ4tR6bHXIS0kR-4Yn2vJy1_ZtpR-BWdsW4PRZ5WmKSStWU2-PDxRIAPHEuAPycEfbsCutHQ9E5LApjYMYDJI4UmvczYSDAyt7BbZTnXOvHesWcOlE_cZq8tjyqf9whf1iJgnMsm0Dazq0kWh7nDFa1azp02Retq1E_OrlOO9z8kuerl6iXQkYv0xjVZS-1O4"
          />
          <ProjectCard 
            title="SyncCode Pro"
            desc="A collaborative pair-programming environment with zero-latency synchronization and integrated video."
            tags={['PostgreSQL', 'WebRTC']}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuC4aiHm-R8Upm0_8RyktG6lS2rTDu1Vul6IHEC8m9UbFTmIU_4VyTimWqTnzk5-LC8TbZmxaVtvVyFcJXLjNbosql56xY-qY1fpJuO0sNUeai4VT0AU-YPxrai-qGxDtAqtwyllqgSHRd--ll0G2iYKO_iw4-I_ZIt-KgdnMDJ5J-ciIjm7EwfHSCRp0lRq3Y4oPtPS2jlYV86B4McapyBcAW2iJULPDKC56GUUGr54slRhulTCsmByW_-Tx0Xji2Lee1hgFWw6Cds"
          />
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-primary">Journey</h2>
        <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pb-12">
          <TimelineItem 
            period="2024 — Present"
            title="B.Sc in CSE @ Bangladesh University of Business and Technology (BUBT)"
            desc="Specialized in Algorithms and Machine Learning. Published paper on efficient neural network pruning techniques."
            color="bg-primary"
          />
          <TimelineItem 
            period="2023 — 2024"
            title="Software Engineer Intern @ European IT Solutions"
            desc="Developed internal tooling for automated testing and CI/CD pipelines, reducing deployment times by 40%."
            color="bg-tertiary"
          />
           <TimelineItem 
            period="2019 — 2023"
            title="Diploma in CSE @ Naogaon Polytechnic Institute"
            desc="Leading the transition from monolithic architecture to a distributed microservices ecosystem using Go and Kubernetes."
            color="bg-secondary"
          />
        </div>
      </section>

      {/* Terminal */}
      <section className="max-w-4xl mx-auto">
        <div className="rounded-t-xl bg-surface-container-highest px-4 py-2 flex items-center justify-between border border-white/10 border-b-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-mono text-on-surface-variant">terminal — sazid@portfolio</span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-b-xl border border-white/10 font-mono text-primary shadow-2xl min-h-[160px]">
          <p className="mb-2 text-on-surface-variant">Welcome to Sazid-Shell v4.2.0-stable</p>
          <div className="flex gap-2 items-start">
            <span className="text-secondary whitespace-nowrap">➜ ~</span>
            <pre className="text-on-surface whitespace-pre-wrap font-mono">{terminalText}</pre>
            <span className="animate-pulse w-2 h-5 bg-primary mt-1" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-2xl mx-auto space-y-8 pb-32">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-on-surface">Let's Build Something</h2>
          <p className="text-on-surface-variant">Currently open to new opportunities and interesting collaborations.</p>
        </div>
        <form className="glass-card p-8 rounded-3xl border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface-variant px-1">Name</label>
              <input type="text" placeholder="name" className="w-full bg-surface-variant/30 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all text-on-surface outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-on-surface-variant px-1">Email</label>
              <input type="email" placeholder="email" className="w-full bg-surface-variant/30 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all text-on-surface outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface-variant px-1">Message</label>
            <textarea placeholder="Tell me about your project..." rows={5} className="w-full bg-surface-variant/30 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all text-on-surface outline-none" />
          </div>
          <button type="submit" className="cursor-pointer w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
            Send Message
            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </section>
    </div>
  );
}

function ProjectCard({ title, desc, tags, image }: { title: string; desc: string; tags: string[]; image: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10">
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={image} alt={title} />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button className="bg-primary text-on-primary p-3 rounded-full hover:scale-110 transition-transform"><ArrowUpRight /></button>
          <button className="glass-card p-3 rounded-full hover:scale-110 transition-transform"><Code /></button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{tag}</span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-on-surface">{title}</h3>
        <p className="text-on-surface-variant">{desc}</p>
      </div>
    </motion.div>
  );
}

function TimelineItem({ period, title, desc, color }: { period: string; title: string; desc: string; color: string }) {
  return (
    <div className="relative pl-10">
      <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full ${color} border-4 border-surface`} />
      <div className="glass-card p-6 rounded-2xl space-y-2">
        <span className="text-secondary font-mono text-sm">{period}</span>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-on-surface-variant">{desc}</p>
      </div>
    </div>
  );
}
