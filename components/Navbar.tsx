import React from 'react';
import { ChefHat, User, LogOut, History, Languages } from 'lucide-react';
import { User as UserType, ViewState, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  user: UserType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onViewChange: (view: ViewState) => void;
  currentView: ViewState;
  language: Language;
  onLanguageToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onLoginClick, 
  onLogoutClick, 
  onViewChange, 
  currentView,
  language,
  onLanguageToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language].navbar;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onViewChange(ViewState.HOME)}
          >
            <div className="bg-brand-500 p-2 rounded-lg text-white group-hover:bg-brand-600 transition-colors">
              <ChefHat size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">
                {language === 'en' ? (
                  <>Hash<span className="text-brand-500">Recipe</span></>
                ) : (
                  <>{t.title}</>
                )}
              </h1>
              <span className="text-[10px] text-gray-500 font-mono tracking-wider hidden sm:block">
                {t.subtitle}
              </span>
            </div>
          </div>

          {/* Tech Metrics - Visible on Desktop */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] text-gray-400 font-mono bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
            <span>{t.metrics.index}: <b className="text-gray-700">1.2M+</b></span>
            <span className="w-px h-3 bg-gray-300"></span>
            <span>{t.metrics.hash}: <b className="text-gray-700">64-BIT</b></span>
            <span className="w-px h-3 bg-gray-300"></span>
            <span>{t.metrics.latency}: <b className="text-brand-600">12ms</b></span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Language Toggle */}
            <button 
              onClick={onLanguageToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-brand-600 transition-colors"
              title="Switch Language"
            >
              <Languages size={14} />
              <span>{language === 'en' ? 'EN' : '简'}</span>
            </button>

            {/* User Actions */}
            {!user ? (
              <button
                onClick={onLoginClick}
                className="text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {t.login}
              </button>
            ) : (
              <div className="relative">
                <div 
                  className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors pr-3"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full border-2 border-brand-200 object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800 leading-tight">{user.name}</p>
                    <p className="text-xs text-brand-600 font-medium">Pro Chef</p>
                  </div>
                </div>

                {isMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-40 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t.account}</p>
                      </div>
                      
                      <button 
                        onClick={() => { onViewChange(ViewState.PROFILE); setIsMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-brand-50 transition-colors ${currentView === ViewState.PROFILE ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}
                      >
                        <User size={16} />
                        {t.profile}
                      </button>
                      
                      <button 
                        onClick={() => { onViewChange(ViewState.HISTORY); setIsMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-brand-50 transition-colors ${currentView === ViewState.HISTORY ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}
                      >
                        <History size={16} />
                        {t.history}
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button 
                        onClick={() => { onLogoutClick(); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        {t.logout}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
