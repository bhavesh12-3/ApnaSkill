import React, { useState } from 'react';
import { Search, Filter, X, Clock, BookOpen, ArrowRight, Star, Bookmark } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { COURSE_CATEGORIES, EDUCATION_LEVELS } from '../data/initialData';

export function CourseCataloguePage({ onCourseSelect, onStartAssessment, onOpenPaymentModal }) {
  const { courses, toggleBookmark, isBookmarked } = useCourses();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const published = courses.filter(c => c.status === 'published');

  const filtered = published.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDesc?.toLowerCase().includes(search.toLowerCase()) ||
      c.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchLevel = !selectedLevel || c.targetLevel?.includes(selectedLevel);
    const matchDifficulty = !selectedDifficulty || c.difficulty === selectedDifficulty;
    return matchSearch && matchCategory && matchLevel && matchDifficulty;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  const hasFilters = selectedCategory !== 'All' || selectedLevel || selectedDifficulty || search;
  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedLevel('');
    setSelectedDifficulty('');
  };

  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge mb-4">📚 Course Catalogue</div>
          <h1 className="text-4xl font-display font-black text-gray-900 mb-2">All Crash Courses</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            {published.length} courses available · All marked as <strong>Demo Courses</strong> until live content is published.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={onStartAssessment} className="btn-primary text-xs py-2 px-4">
              Take Free Assessment to Get Recommendations →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search courses…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Category</h3>
              <div className="space-y-1">
                {COURSE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === cat ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-violet-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Education Level */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Education Level</h3>
              <div className="space-y-1">
                <button onClick={() => setSelectedLevel('')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${!selectedLevel ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  All Levels
                </button>
                {EDUCATION_LEVELS.map(l => (
                  <button key={l.id} onClick={() => setSelectedLevel(l.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${selectedLevel === l.id ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Difficulty</h3>
              <div className="space-y-1">
                {['', 'Beginner', 'Intermediate', 'Advanced'].map(d => (
                  <button key={d} onClick={() => setSelectedDifficulty(d)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${selectedDifficulty === d ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {d || 'All Difficulties'}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50">
                <X className="w-3.5 h-3.5" /> Clear All Filters
              </button>
            )}
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort + Count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <strong className="text-gray-900">{sorted.length}</strong> courses
                {hasFilters && <span className="ml-1 text-violet-600">(filtered)</span>}
              </p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs font-medium border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="popular">Most Popular</option>
                <option value="new">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search terms.</p>
                <button onClick={clearFilters} className="btn-primary text-xs">Clear Filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map(course => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover shadow-card group cursor-pointer"
                    onClick={() => onCourseSelect(course.id)}
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'; }}
                      />
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        {course.isNew && <span className="px-2 py-0.5 text-[9px] font-bold bg-green-500 text-white rounded-full">NEW</span>}
                        {course.isPopular && <span className="px-2 py-0.5 text-[9px] font-bold bg-violet-600 text-white rounded-full">🔥</span>}
                        {course.demoLabel && <span className="px-2 py-0.5 text-[9px] font-medium bg-white/90 text-gray-600 rounded-full border border-gray-200">{course.demoLabel}</span>}
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleBookmark(course.id); }}
                        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow transition-all ${
                          isBookmarked(course.id)
                            ? 'bg-violet-600 text-white'
                            : 'bg-white/90 text-gray-400 hover:text-violet-600'
                        }`}
                        title={isBookmarked(course.id) ? 'Remove bookmark' : 'Bookmark course'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked(course.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">{course.category}</span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-lg ${difficultyColor[course.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-gray-900 text-sm mb-1.5 line-clamp-2 group-hover:text-violet-700">{course.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.totalLessons || '?'} lessons</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-base font-display font-black text-violet-600">₹{course.price}</span>
                        <button
                          onClick={e => { e.stopPropagation(); onOpenPaymentModal(course); }}
                          className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-[10px] font-bold hover:bg-violet-700 transition-colors"
                        >
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
