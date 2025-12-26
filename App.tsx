import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RecipeCard } from './components/RecipeCard';
import { 
  User, 
  Search, 
  Camera, 
  Image as ImageIcon, 
  X, 
  FileDown, 
  Cpu, 
  Sparkles, 
  Loader2,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Recipe, User as UserType, ViewState, SearchMode, Algorithm, HistoryItem, Language } from './types';
import { getMockRecipes, INITIAL_HISTORY, TRANSLATIONS } from './constants';

const App: React.FC = () => {
  // --- State Management ---
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchMode>(SearchMode.TEXT);
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>(Algorithm.DSH);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Use a function to initialize to ensure we get correct language initially
  const [recipes, setRecipes] = useState<Recipe[]>(getMockRecipes('en'));
  
  const [likedRecipeIds, setLikedRecipeIds] = useState<Set<string>>(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Translation Helper
  const t = TRANSLATIONS[language];

  // Update recipes when language changes
  useEffect(() => {
    // Only reset recipes if we aren't mid-search results or if we want to translate current results
    // For simplicity, we reload default mock data in the new language
    // In a real app, you would re-fetch or translate existing results
    setRecipes(getMockRecipes(language));
  }, [language]);

  // --- Handlers ---

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setUser({
        id: 'u1',
        name: 'Chef Gordon',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
        email: 'chef@hashrecipe.com'
      });
      setIsLoginModalOpen(false);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewState.HOME);
  };

  const toggleLike = (id: string) => {
    setLikedRecipeIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery && !imageFile) return;

    setIsSearching(true);
    setTimeout(() => {
      const mockData = getMockRecipes(language);
      let results = mockData;
      if (activeTab === SearchMode.TEXT && searchQuery) {
        results = mockData.filter(r => 
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          r.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      } else if (activeTab === SearchMode.IMAGE) {
        results = [...mockData].sort(() => 0.5 - Math.random()).slice(0, 3);
      }

      setRecipes(results);
      
      const newHistory: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US'),
        query: activeTab === SearchMode.TEXT ? searchQuery : (imageFile?.name || (language === 'zh' ? '上传图片' : 'Uploaded Image')),
        type: activeTab,
        algorithm: selectedAlgo,
        resultsCount: results.length
      };
      setSearchHistory(prev => [newHistory, ...prev]);
      
      setIsSearching(false);
    }, 1200);
  };

  const handleExportHistory = () => {
    const headers = Object.values(t.history.headers);
    const rows = searchHistory.map(h => [h.id, h.timestamp, h.query, h.type, h.algorithm, h.resultsCount].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `search_history_${language}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // --- Sub-Components ---

  const LoginModal = () => {
    if (!isLoginModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)}></div>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="h-32 bg-gradient-to-r from-brand-400 to-brand-600 flex items-center justify-center">
             <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                <User size={48} className="text-white" />
             </div>
          </div>
          <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.auth.welcome}</h2>
              <p className="text-gray-500 text-sm">{t.auth.subtitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.auth.email}</label>
              <input type="email" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="chef@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.auth.password}</label>
              <input type="password" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
              {t.auth.signIn}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const RecipeDetailModal = () => {
    if (!selectedRecipe) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedRecipe(null)}></div>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-10 duration-300 flex flex-col md:flex-row">
          <button 
            onClick={() => setSelectedRecipe(null)} 
            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full backdrop-blur-md transition-all text-gray-800"
          >
            <X size={20} />
          </button>

          {/* Image Side */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
               <h2 className="text-3xl font-bold text-white mb-2">{selectedRecipe.title}</h2>
               <div className="flex items-center gap-3 text-white/90 font-mono text-xs">
                  <span className="bg-white/20 px-2 py-1 rounded">{t.modal.hashId}: {selectedRecipe.hashCode.substring(0, 12)}...</span>
                  <span>{t.modal.id}: {selectedRecipe.id}</span>
               </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 bg-white">
             <div className="flex items-center gap-6 mb-8 text-sm text-gray-600 border-b border-gray-100 pb-6">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gray-900 text-lg">{selectedRecipe.calories}</span>
                  <span>{t.modal.calories}</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gray-900 text-lg">{selectedRecipe.timeMinutes}m</span>
                  <span>{t.modal.cookTime}</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gray-900 text-lg">{selectedRecipe.ingredients.length}</span>
                  <span>{t.modal.ingredientsCount}</span>
                </div>
             </div>

             <div className="mb-6">
               <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                 <span className="bg-brand-100 text-brand-600 p-1 rounded">🥗</span> {t.modal.ingredientsLabel}
               </h3>
               <ul className="space-y-2">
                 {selectedRecipe.ingredients.map((ing, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-700">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div>
                     {ing}
                   </li>
                 ))}
               </ul>
             </div>

             <div>
               <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                 <span className="bg-brand-100 text-brand-600 p-1 rounded">🍳</span> {t.modal.instructionsLabel}
               </h3>
               <ol className="space-y-4">
                 {selectedRecipe.instructions.map((step, i) => (
                   <li key={i} className="flex gap-4">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                     <p className="text-gray-600 leading-relaxed">{step}</p>
                   </li>
                 ))}
               </ol>
             </div>
             
             <button className="w-full mt-8 bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg">
               {t.modal.startCooking}
             </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Views ---

  const HomeView = () => (
    <div className="pb-20">
      {/* Hero Search Section */}
      <div className="relative bg-white border-b border-gray-200 shadow-sm pt-12 pb-16 px-4">
         <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              {t.hero.titleStart} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-red-600">{t.hero.titleEnd}</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* Search Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 mt-8 max-w-3xl mx-auto overflow-hidden">
               {/* Tabs */}
               <div className="flex p-1 gap-1 bg-gray-100/50 rounded-xl mb-3">
                 <button 
                   onClick={() => setActiveTab(SearchMode.TEXT)}
                   className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === SearchMode.TEXT ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   <Search size={16} /> {t.hero.tabText}
                 </button>
                 <button 
                   onClick={() => setActiveTab(SearchMode.IMAGE)}
                   className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === SearchMode.IMAGE ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   <Camera size={16} /> {t.hero.tabImage}
                 </button>
               </div>

               {/* Inputs */}
               <div className="px-2 pb-2">
                 <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      {activeTab === SearchMode.TEXT ? (
                        <input 
                          type="text" 
                          placeholder={t.hero.placeholderText} 
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-gray-800 placeholder:text-gray-400"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      ) : (
                        <div className="relative h-12 group">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 bg-gray-50 group-hover:bg-brand-50 group-hover:border-brand-300 transition-colors">
                            <ImageIcon size={18} />
                            <span className="text-sm">{imageFile ? imageFile.name : t.hero.placeholderImage}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Controls */}
                    <div className="flex gap-2">
                      <select 
                        className="h-12 pl-3 pr-8 rounded-xl border border-gray-200 bg-gray-50 text-xs font-mono text-gray-600 focus:border-brand-500 outline-none cursor-pointer"
                        value={selectedAlgo}
                        onChange={(e) => setSelectedAlgo(e.target.value as Algorithm)}
                      >
                        <option value={Algorithm.DSH}>{t.hero.algoDSH}</option>
                        <option value={Algorithm.CLIP}>{t.hero.algoCLIP}</option>
                      </select>
                      <button 
                        onClick={() => handleSearch()}
                        disabled={isSearching}
                        className="h-12 px-8 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-500/30 flex items-center gap-2"
                      >
                        {isSearching ? <Loader2 className="animate-spin" /> : t.hero.searchBtn}
                      </button>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </div>

      {/* Results Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {isSearching ? t.feed.retrieving : t.feed.recommended}
              {!isSearching && <span className="text-xs font-normal text-gray-500 px-2 py-1 bg-gray-100 rounded-full">{recipes.length} {t.feed.results}</span>}
            </h3>
         </div>

         {isSearching ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
               <div key={i} className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
             ))}
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {recipes.map(recipe => (
               <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isLiked={likedRecipeIds.has(recipe.id)} 
                  onToggleLike={toggleLike}
                  onClick={setSelectedRecipe}
                  labels={t.card}
               />
             ))}
           </div>
         )}
      </div>
    </div>
  );

  const ProfileView = () => {
    const savedCount = likedRecipeIds.size;
    // We filter MOCK_RECIPES by ID, but we need to display the currently localized version of those recipes.
    // The recipes state contains the localized recipes.
    const savedRecipes = recipes.filter(r => likedRecipeIds.has(r.id));

    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
           <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-900 relative">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
           </div>
           <div className="px-8 pb-8 relative">
              <div className="absolute -top-16 left-8 p-1 bg-white rounded-full">
                <img src={user?.avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white" />
              </div>
              <div className="pt-20 flex justify-between items-end">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-gray-500">{user?.email}</p>
                 </div>
                 <div className="flex gap-4 text-center">
                    <div className="bg-orange-50 px-6 py-3 rounded-2xl">
                       <p className="text-2xl font-bold text-brand-600">{savedCount}</p>
                       <p className="text-xs text-brand-800 uppercase font-bold tracking-wider">{t.profile.collections}</p>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 rounded-2xl">
                       <p className="text-2xl font-bold text-gray-800">128</p>
                       <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{t.profile.searches}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
           <Sparkles className="text-brand-500" /> {t.profile.myCollections}
        </h3>
        
        {savedCount === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
             <Heart className="mx-auto text-gray-300 mb-4" size={48} />
             <p className="text-gray-500">{t.profile.empty}</p>
             <button onClick={() => setCurrentView(ViewState.HOME)} className="mt-4 text-brand-600 font-semibold hover:underline">{t.profile.startExploring}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {savedRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isLiked={true} 
                  onToggleLike={toggleLike}
                  onClick={setSelectedRecipe}
                  labels={t.card}
               />
             ))}
          </div>
        )}
      </div>
    );
  };

  const HistoryView = () => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t.history.title}</h2>
          <p className="text-gray-500 mt-1">{t.history.subtitle}</p>
        </div>
        <button 
          onClick={handleExportHistory}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
        >
          <FileDown size={18} /> {t.history.export}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">{t.history.headers.timestamp}</th>
                <th className="px-6 py-4">{t.history.headers.query}</th>
                <th className="px-6 py-4">{t.history.headers.modality}</th>
                <th className="px-6 py-4">{t.history.headers.algorithm}</th>
                <th className="px-6 py-4">{t.history.headers.results}</th>
                <th className="px-6 py-4">{t.history.headers.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {searchHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                       {item.type === 'IMAGE' ? <ImageIcon size={14} className="text-brand-500" /> : <Search size={14} className="text-blue-500" />}
                       {item.query}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${item.type === 'TEXT' ? 'bg-blue-50 text-blue-600' : 'bg-brand-50 text-brand-600'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    <Cpu size={14} /> {item.algorithm === Algorithm.DSH ? 'DSH' : 'CLIP'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.resultsCount} {t.history.found}</td>
                  <td className="px-6 py-4">
                     <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full w-fit">
                        <CheckCircle2 size={12} /> {t.history.success}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {searchHistory.length === 0 && (
          <div className="p-12 text-center text-gray-400">{t.history.empty}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
        onViewChange={setCurrentView}
        currentView={currentView}
        language={language}
        onLanguageToggle={handleLanguageToggle}
      />
      
      <main className="animate-in fade-in duration-500">
        {currentView === ViewState.HOME && <HomeView />}
        {currentView === ViewState.PROFILE && <ProfileView />}
        {currentView === ViewState.HISTORY && <HistoryView />}
      </main>

      <LoginModal />
      <RecipeDetailModal />
      
      {/* Decorative Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2024 {t.footer.copyright}</p>
            <div className="flex gap-4 mt-4 md:mt-0 font-mono text-xs">
               <span>REACT</span>
               <span>TAILWIND</span>
               <span>DEEP-HASHING</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
