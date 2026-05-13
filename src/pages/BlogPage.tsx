import { motion } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../constants/blogPosts';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const categories = ['All Posts', 'Performance', 'Next.js', 'Animations', 'AI Tools'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      {/* Background Aurora Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 aurora-blur -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/10 aurora-blur translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <header className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black mb-4 text-on-surface tracking-tighter"
        >
          Digital Crafts.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-on-surface-variant max-w-2xl text-lg"
        >
          Deep dives into software architecture, UI engineering, and the subtle art of pixel perfection.
        </motion.p>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-white/10 rounded-full py-3 pl-12 pr-6 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all border ${
                activeCategory === cat 
                ? 'bg-primary text-on-primary border-primary' 
                : 'bg-surface-container border-white/5 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {featuredPost && (
          <motion.article 
            layoutId={`post-${featuredPost.id}`}
            className="md:col-span-8 glass-card rounded-[2rem] overflow-hidden group cursor-pointer"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider">
                  {featuredPost.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-on-surface-variant text-sm mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight">
                {featuredPost.title}
              </h2>
              <p className="text-on-surface-variant mb-8 line-clamp-2">{featuredPost.excerpt}</p>
              <button className="inline-flex items-center gap-2 text-secondary font-bold group/link">
                Read Breakdown 
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.article>
        )}

        {/* The Vertical Card from mockup (Next.js post) */}
        {otherPosts.length > 0 && otherPosts[0].category === 'Next.js' && (
          <motion.article 
            layoutId={`post-${otherPosts[0].id}`}
            className="md:col-span-4 glass-card rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer border-secondary/20"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-secondary/20 backdrop-blur-md text-secondary text-xs font-bold uppercase tracking-wider mb-6 inline-block">
                {otherPosts[0].category}
              </span>
              <h2 className="text-2xl font-bold text-on-surface mb-4 leading-tight group-hover:text-secondary transition-colors">
                {otherPosts[0].title}
              </h2>
              <p className="text-on-surface-variant text-sm mb-6">{otherPosts[0].excerpt}</p>
            </div>
            <div className="mt-4">
              <div className="text-on-surface-variant text-sm mb-6">{otherPosts[0].readTime}</div>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </motion.article>
        )}

        {/* Small Post 1 */}
        {otherPosts.length > 1 && (
          <motion.article 
            layoutId={`post-${otherPosts[1].id}`}
            className="md:col-span-4 glass-card rounded-[2rem] p-6 group cursor-pointer"
          >
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <img src={otherPosts[1].image} alt={otherPosts[1].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-xs font-bold text-tertiary mb-2 block uppercase tracking-wider">{otherPosts[1].category}</span>
            <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-tertiary transition-colors">{otherPosts[1].title}</h3>
            <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{otherPosts[1].excerpt}</p>
            <div className="text-xs text-on-surface-variant/60">{otherPosts[1].readTime}</div>
          </motion.article>
        )}

        {/* Small Post 2 */}
        {otherPosts.length > 2 && (
          <motion.article 
            layoutId={`post-${otherPosts[2].id}`}
            className="md:col-span-4 glass-card rounded-[2rem] p-6 group cursor-pointer"
          >
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
               <img src={otherPosts[2].image} alt={otherPosts[2].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">{otherPosts[2].category}</span>
            <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{otherPosts[2].title}</h3>
            <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{otherPosts[2].excerpt}</p>
            <div className="text-xs text-on-surface-variant/60">{otherPosts[2].readTime}</div>
          </motion.article>
        )}

        {/* Newsletter Bento Tile */}
        <div className="md:col-span-4 bg-primary-container/20 rounded-[2rem] p-8 border border-primary/20 flex flex-col justify-center">
          <h3 className="text-2xl text-primary font-bold mb-4">Stay Synchronized</h3>
          <p className="text-on-surface-variant text-sm mb-6">Monthly digest of technical breakthroughs and curated developer resources. No spam, just code.</p>
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="email@example.com" 
              className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
            <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
