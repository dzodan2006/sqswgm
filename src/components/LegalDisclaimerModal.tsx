import React, { useState } from 'react';
import { Scale, ShieldCheck, AlertCircle, X, Sparkles, BookOpen, Globe2, Landmark, CheckCircle2 } from 'lucide-react';

interface LegalDisclaimerModalProps {
  onClose: () => void;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'us' | 'eu' | 'intl'>('all');

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-5 select-none overflow-y-auto animate-fade-in">
      <div className="bg-[#0c1514] border-4 border-black rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative flex flex-col my-auto max-h-[92vh] overflow-y-auto text-slate-200">
        
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-t-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-xl bg-slate-900 border-2 border-black text-slate-300 hover:text-white hover:bg-slate-800 shadow transition active:scale-95 z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <div className="flex items-center space-x-1.5 bg-amber-400 text-black border-2 border-black px-3 py-1 rounded-xl font-cartoon font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Scale className="w-4 h-4 fill-black" />
            <span>LEGAL DISCLAIMER & STATUTORY FAIR USE SHIELD</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded-lg">
            ✓ 100% NON-COMMERCIAL & PARODY PROTECTED
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-cartoon font-black text-white mt-3 uppercase tracking-tight leading-tight drop-shadow">
          STATUTORY GROUNDS, INTERNATIONAL TREATIES & PARODY DEFENSE
        </h2>

        <p className="text-xs sm:text-sm text-yellow-300/90 font-medium mt-1">
          This application is a 100% non-commercial, transformative artistic parody and satirical fan-made project protected under United States federal law, European Union directives, and international conventions.
        </p>

        {/* Tab Navigation Filter */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
              activeTab === 'all'
                ? 'bg-amber-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            All Doctrines
          </button>
          <button
            onClick={() => setActiveTab('us')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
              activeTab === 'us'
                ? 'bg-amber-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            🇺🇸 US Law & Case Law
          </button>
          <button
            onClick={() => setActiveTab('eu')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
              activeTab === 'eu'
                ? 'bg-amber-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            🇪🇺 EU Law & Directives
          </button>
          <button
            onClick={() => setActiveTab('intl')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
              activeTab === 'intl'
                ? 'bg-amber-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            🌐 International Treaties
          </button>
        </div>

        {/* Fundamental Declaration Banner */}
        <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-2xl p-3 sm:p-4 my-3 text-xs leading-relaxed space-y-2.5">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-xs sm:text-sm">
                1. Transformative Parody & Satirical Caricatures (Transformative Fair Use):
              </strong>
              <p className="text-slate-300 mt-0.5 text-[11px] sm:text-xs">
                All players, trading cards, alter-ego aliases, oversized bobblehead caricature artworks, fictitious quotes, and in-game attributes are <strong>substantially transformed original works of satire, parody, and caricature</strong>. Under binding international copyright jurisprudence, the addition of novel creative expression, caricature, and humorous commentary negates any claim of copyright infringement.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5 pt-2 border-t border-slate-800">
            <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-xs sm:text-sm">
                2. Non-Commercial Status & Complete Absence of Consumer Confusion:
              </strong>
              <p className="text-slate-300 mt-0.5 text-[11px] sm:text-xs">
                This game is <strong>100% free of charge to the public</strong>, containing no in-game purchases, paywalls, advertisements, cryptocurrency tokens, or sale of physical merchandise. The game does not deceive or mislead consumers into believing it is an official release, licensee, or endorsement of FIFA, UEFA, FIFPRO, national football associations, or sports leagues (satisfying the <em>Rogers v. Grimaldi</em> test and the Lanham Act non-confusion requirements).
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Statutory Sections */}
        <div className="space-y-3 my-1">
          <div className="flex items-center space-x-2 text-xs font-cartoon font-black text-amber-400 uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            <span>STATUTORY CITATIONS, PRECEDENTS & GOVERNING DOCTRINES:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">

            {/* US Cardtoons Landmark */}
            {(activeTab === 'all' || activeTab === 'us') && (
              <div className="bg-black/70 border-2 border-amber-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-300 font-mono text-xs">
                    ⚖️ Cardtoons, L.C. v. MLBPA
                  </span>
                  <span className="text-[9px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded border border-amber-700 font-mono">
                    95 F.3d 959 (10th Cir. 1996)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Primary Landmark Precedent for Sports Parody Trading Cards</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  <strong>United States Federal Appeals Court Holding:</strong> Parody sports trading cards featuring player caricatures and satirical names are core expressive speech protected under the First Amendment of the U.S. Constitution. The court held that First Amendment protection <strong>categorically overrides any celebrity Right of Publicity or commercial likeness claims</strong> by athletes or players' associations.
                </p>
              </div>
            )}

            {/* 17 U.S.C. § 107 Fair Use */}
            {(activeTab === 'all' || activeTab === 'us') && (
              <div className="bg-black/70 border-2 border-sky-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sky-300 font-mono text-xs">
                    📜 17 U.S.C. § 107 — Fair Use Doctrine
                  </span>
                  <span className="text-[9px] bg-sky-950 text-sky-400 px-1.5 py-0.5 rounded border border-sky-700 font-mono">
                    Campbell v. Acuff-Rose (510 U.S. 569)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">U.S. Supreme Court — Statutory Four-Factor Fair Use Test</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  The Supreme Court established that transformative parody that creates new aesthetic expression, meaning, and commentary constitutes non-infringing Fair Use. Because parodies fulfill different expressive functions, operate non-commercially, and do not supplant the market for licensed merchandise, copyright infringement claims fail as a matter of law.
                </p>
              </div>
            )}

            {/* Lanham Act 15 U.S.C. § 1125(c)(3) */}
            {(activeTab === 'all' || activeTab === 'us') && (
              <div className="bg-black/70 border-2 border-indigo-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-indigo-300 font-mono text-xs">
                    🛡️ 15 U.S.C. § 1125(c)(3) — Lanham Act
                  </span>
                  <span className="text-[9px] bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-700 font-mono">
                    Trademark Dilution Exemption
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Statutory Defense for Parody, Criticism & Satire</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  Federal trademark statute explicitly provides that any non-commercial fair use identifying and parodying, criticizing, or commenting upon a famous mark, celebrity name, or good <strong>shall not be actionable as trademark dilution or infringement</strong>, precluding trademark-based liability.
                </p>
              </div>
            )}

            {/* First Amendment & Transformative Work */}
            {(activeTab === 'all' || activeTab === 'us') && (
              <div className="bg-black/70 border-2 border-cyan-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-cyan-300 font-mono text-xs">
                    🎨 Transformative Work Test
                  </span>
                  <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-700 font-mono">
                    Comedy III v. Gary Saderup (2001)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">First Amendment Protection over Right of Publicity</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  When creative expressions add significant creative elements beyond a literal depiction (such as caricature deformation, comic attributes, game balance numbers, and parody identities), the First Amendment provides an affirmative defense against all right of publicity causes of action.
                </p>
              </div>
            )}

            {/* EU Directive 2019/790 Article 17(7) */}
            {(activeTab === 'all' || activeTab === 'eu') && (
              <div className="bg-black/70 border-2 border-rose-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-rose-300 font-mono text-xs">
                    🇪🇺 EU Directive 2019/790 — Article 17(7)
                  </span>
                  <span className="text-[9px] bg-rose-950 text-rose-400 px-1.5 py-0.5 rounded border border-rose-700 font-mono">
                    Binding European Law
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Mandatory Exception for Caricature, Parody & Pastiche</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  European Union law requires all EU Member States to guarantee that users and creators may freely utilize content for <strong>caricature, parody, or pastiche</strong>. Rights holders and collective management organizations cannot legally prohibit or license-restrict this statutory exception.
                </p>
              </div>
            )}

            {/* CJEU Case C-201/13 Deckmyn */}
            {(activeTab === 'all' || activeTab === 'eu') && (
              <div className="bg-black/70 border-2 border-purple-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-purple-300 font-mono text-xs">
                    ⚖️ CJEU Judgment in Deckmyn (Case C-201/13)
                  </span>
                  <span className="text-[9px] bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded border border-purple-700 font-mono">
                    Autonomous EU Parody Concept
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Court of Justice of the European Union</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  The Court of Justice established that parody in European law requires only two criteria: that it evokes an existing work while being noticeably different from it, and that it expresses humor or mockery. <strong>No consent of the original author or rights holder is required, nor is attribution mandatory.</strong>
                </p>
              </div>
            )}

            {/* UK CDPA Section 30A */}
            {(activeTab === 'all' || activeTab === 'eu' || activeTab === 'intl') && (
              <div className="bg-black/70 border-2 border-blue-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-300 font-mono text-xs">
                    🇬🇧 UK CDPA 1988 — Section 30A
                  </span>
                  <span className="text-[9px] bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-700 font-mono">
                    Fair Dealing Defense
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Statutory Defense for Caricature, Parody and Pastiche</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  The United Kingdom Copyright, Designs and Patents Act specifically provides that fair dealing with a work for the purpose of caricature, parody, or pastiche does not infringe any copyright in the work.
                </p>
              </div>
            )}

            {/* Berne Convention & International Conventions */}
            {(activeTab === 'all' || activeTab === 'intl') && (
              <div className="bg-black/70 border-2 border-teal-500/40 rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <span className="font-black text-teal-300 font-mono text-xs">
                    🌐 Berne Convention (Articles 9(2) & 10)
                  </span>
                  <span className="text-[9px] bg-teal-950 text-teal-400 px-1.5 py-0.5 rounded border border-teal-700 font-mono">
                    WIPO International Treaty
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">International Three-Step Test for Copyright Exceptions</span>
                <p className="text-slate-300 mt-1.5 leading-snug">
                  International copyright law codifies sovereign rights to implement special exceptions that do not conflict with the normal commercial exploitation of the work and do not unreasonably prejudice the legitimate interests of the author.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-yellow-300 text-xs">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
            <span className="leading-tight font-medium text-[11px] sm:text-xs">
              All proprietary rights to original software code, caricature assets, and gameplay design reserved. 100% Non-commercial, protected parody work.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-cartoon font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 shrink-0 transition"
          >
            I Understand & Acknowledge ➔
          </button>
        </div>

      </div>
    </div>
  );
};
