import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-[#EDEEF3] font-sans relative overflow-x-hidden selection:bg-[#8B7CF6]/30">
      {/* Background Glow */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px circle at 15% 8%, rgba(139,124,246,0.10), transparent 60%),
            radial-gradient(500px circle at 85% 0%, rgba(52,211,153,0.05), transparent 60%)
          `
        }}
      />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0A0B0F]/75 backdrop-blur-md border-b border-[#1B1E29]">
        <div className="max-w-[1180px] mx-auto px-8 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-mono font-semibold text-[17px]">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B7CF6] to-[#6C5CE7] flex items-center justify-center font-mono text-xs font-bold text-white shadow-sm">
              $
            </div>
            Code Flow
          </div>

          <div className="hidden md:flex gap-8 text-sm text-[#9195A8]">
            <a href="#features" className="hover:text-[#EDEEF3] transition-colors">Product</a>
            <a href="#how" className="hover:text-[#EDEEF3] transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-[#EDEEF3] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#EDEEF3] transition-colors">Docs</a>
          </div>

          <div className="flex items-center gap-3.5">
            <Link to="/app" className="px-4.5 py-2 rounded-lg text-sm font-medium border border-[#242737] hover:bg-[#161923] transition-all">
              Sign in
            </Link>
            <Link to="/app" className="px-4.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-[#8B7CF6] to-[#6C5CE7] text-white shadow-md hover:-translate-y-0.5 transition-all">
              Start free scan
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16">
        <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-[#8B7CF6] bg-[#8B7CF6]/10 border border-[#8B7CF6]/25 px-3 py-1 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CF6] animate-pulse" />
              AST-based static analysis, in real time
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5 font-sans">
              Ship code that already<br />passed the <span className="bg-gradient-to-r from-[#8B7CF6] to-[#C4B5FD] bg-clip-text text-transparent">audit</span>.
            </h1>

            <p className="text-base text-[#9195A8] max-w-[440px] mb-8 leading-relaxed">
              Code Flow parses your codebase into an AST and flags credential leaks, unsafe defaults, and logic flaws before they reach review — with fixes suggested inline.
            </p>

            <div className="flex gap-3.5 mb-9">
              <Link to="/app" className="px-[18px] py-2.5 rounded-lg text-sm font-medium bg-gradient-to-br from-[#8B7CF6] to-[#6C5CE7] text-white shadow-md hover:-translate-y-0.5 transition-all">
                Connect a repo
              </Link>
              <Link to="/app" className="px-[18px] py-2.5 rounded-lg text-sm font-medium border border-[#242737] hover:bg-[#161923] transition-all">
                Watch a 90s demo
              </Link>
            </div>

            <div className="text-xs text-[#5D6072]">
              Free for public repos · No card required
            </div>
          </div>

          {/* Interactive Demo Preview Panel */}
          <div className="relative bg-[#101219] border border-[#242737] rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1B1E29] bg-[#161923]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#242737]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#242737]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#242737]" />
              <span className="ml-2 font-mono text-xs text-[#9195A8]">analyzer.py</span>
            </div>

            <div className="p-5 font-mono text-[12.5px] text-[#9195A8] leading-relaxed relative">
              {/* Scanline Animation */}
              <div className="absolute left-0 right-0 h-6 bg-gradient-to-b from-transparent via-[#8B7CF6]/20 to-transparent animate-scan pointer-events-none" />

              <div><span className="text-[#5D6072] inline-block w-5 select-none">1</span>import json</div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">2</span></div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">3</span><span className="text-[#C4B5FD]">def</span> <span className="text-[#7DD3FC]">append_user_log</span>(user_id, action, log_history=[]):</div>
              <div className="bg-[#F0525C]/10 border border-[#F0525C]/30 rounded px-1 py-0.5 my-0.5">
                <span className="text-[#5D6072] inline-block w-5 select-none">4</span>&nbsp;&nbsp;root_pw = <span className="text-[#86EFAC]">&quot;admin_2024!&quot;</span>
              </div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">5</span>&nbsp;&nbsp;log_history.append(&#123;<span className="text-[#86EFAC]">&quot;user_id&quot;</span>: user_id&#125;)</div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">6</span>&nbsp;&nbsp;file_handle = <span className="text-[#7DD3FC]">open</span>(<span className="text-[#86EFAC]">&quot;activity_logs.json&quot;</span>, <span className="text-[#86EFAC]">&quot;w&quot;</span>)</div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">7</span>&nbsp;&nbsp;json.dump(log_history, file_handle)</div>
              <div><span className="text-[#5D6072] inline-block w-5 select-none">8</span>&nbsp;&nbsp;<span className="text-[#C4B5FD]">return</span> log_history</div>

              {/* Finding Card */}
              <div className="flex gap-2.5 items-start bg-[#161923] border border-[#242737] border-l-2 border-l-[#F0525C] rounded-lg p-3.5 mt-4">
                <div className="w-5 h-5 rounded bg-[#F0525C]/20 text-[#F0525C] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  !
                </div>
                <div>
                  <div className="font-sans text-xs font-semibold text-[#EDEEF3]">Hardcoded plaintext credential</div>
                  <div className="font-sans text-[11.5px] text-[#5D6072] mt-0.5">Line 4 · exposes a static admin password in source</div>
                </div>
                <div className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-[#F0525C]/20 text-[#F0525C] px-2 py-0.5 rounded-full">
                  High
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="border-y border-[#1B1E29] bg-[#101219]">
        <div className="max-w-[1180px] mx-auto px-8 py-9 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-[#EDEEF3]">40+</div>
            <div className="text-xs text-[#5D6072] mt-1">languages parsed</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#EDEEF3]">6,200</div>
            <div className="text-xs text-[#5D6072] mt-1">vulnerability patterns</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#EDEEF3]">1.8s</div>
            <div className="text-xs text-[#5D6072] mt-1">avg scan per 10k LOC</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#EDEEF3]">99.95%</div>
            <div className="text-xs text-[#5D6072] mt-1">uptime SLA</div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section id="features" className="py-24">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="max-w-[560px] mx-auto mb-14 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8B7CF6] mb-3">Built for teams, not just repos</div>
            <h2 className="text-3xl font-bold mb-3">Everything a security-conscious engineering org needs</h2>
            <p className="text-[#9195A8] text-base">Code Flow scales from a solo scan to an org-wide gate, without leaving your existing workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1B1E29] border border-[#1B1E29] rounded-2xl overflow-hidden">
            {[
              { title: "CI/CD gating", desc: "Block merges on high-severity findings with native GitHub Actions, GitLab CI, and Bitbucket Pipelines checks.", icon: "◆", color: "text-[#8B7CF6]", bg: "bg-[#8B7CF6]/10" },
              { title: "PR review bot", desc: "Inline comments on the exact diff lines that introduced a flaw, with a one-click suggested patch.", icon: "◈", color: "text-[#34D399]", bg: "bg-[#34D399]/10" },
              { title: "Secret & credential scanning", desc: "Catches hardcoded keys, tokens, and passwords across history — not just the current branch.", icon: "◇", color: "text-[#F0525C]", bg: "bg-[#F0525C]/10" },
              { title: "Team workspaces & RBAC", desc: "Org, team, and repo-level roles. SSO/SAML for enterprise identity providers.", icon: "▣", color: "text-[#8B7CF6]", bg: "bg-[#8B7CF6]/10" },
              { title: "Trend dashboard", desc: "Track mean-time-to-remediate, findings by severity, and per-repo risk score over time.", icon: "▤", color: "text-[#34D399]", bg: "bg-[#34D399]/10" },
              { title: "Alerts & API", desc: "Slack, Teams, and webhook alerts on new critical findings, plus a full REST/GraphQL API.", icon: "▥", color: "text-[#F5A623]", bg: "bg-[#F5A623]/10" },
            ].map((f, idx) => (
              <div key={idx} className="bg-[#101219] p-7 hover:bg-[#161923] transition-colors">
                <div className={`w-9 h-9 rounded-lg ${f.bg} ${f.color} flex items-center justify-center font-bold mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-xs text-[#9195A8] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0A0B0F]">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="max-w-[560px] mx-auto mb-14 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8B7CF6] mb-3">Pricing</div>
            <h2 className="text-3xl font-bold mb-3">Start free, scale with your org</h2>
            <p className="text-[#9195A8] text-base">All plans include unlimited public repo scans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Solo */}
            <div className="bg-[#101219] border border-[#242737] rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="text-xs text-[#9195A8] mb-2">Solo</div>
              <div className="text-4xl font-extrabold mb-1">$0<span className="text-sm font-normal text-[#5D6072]">/mo</span></div>
              <div className="text-xs text-[#5D6072] mb-6">For individual developers and open source.</div>
              <ul className="text-xs text-[#9195A8] space-y-3 mb-7 border-t border-[#1B1E29] pt-4">
                <li>✓ 3 private repos</li>
                <li>✓ Core vulnerability rules</li>
                <li>✓ Community support</li>
              </ul>
              <Link to="/app" className="w-full block text-center py-2.5 rounded-lg border border-[#242737] text-xs font-semibold hover:bg-[#161923] transition-all">
                Get started
              </Link>
            </div>

            {/* Team */}
            <div className="bg-[#101219] border-2 border-[#8B7CF6] rounded-2xl p-8 relative hover:-translate-y-1 transition-all shadow-xl">
              <span className="absolute -top-3 left-7 bg-[#8B7CF6] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Most popular
              </span>
              <div className="text-xs text-[#9195A8] mb-2">Team</div>
              <div className="text-4xl font-extrabold mb-1">$29<span className="text-sm font-normal text-[#5D6072]">/seat/mo</span></div>
              <div className="text-xs text-[#5D6072] mb-6">For teams shipping to production weekly.</div>
              <ul className="text-xs text-[#9195A8] space-y-3 mb-7 border-t border-[#1B1E29] pt-4">
                <li>✓ Unlimited private repos</li>
                <li>✓ PR bot + CI/CD gating</li>
                <li>✓ Trend dashboard</li>
                <li>✓ Slack & webhook alerts</li>
              </ul>
              <Link to="/app" className="w-full block text-center py-2.5 rounded-lg bg-gradient-to-br from-[#8B7CF6] to-[#6C5CE7] text-white text-xs font-semibold shadow-md transition-all">
                Start free trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-[#101219] border border-[#242737] rounded-2xl p-8 hover:-translate-y-1 transition-all">
              <div className="text-xs text-[#9195A8] mb-2">Enterprise</div>
              <div className="text-4xl font-extrabold mb-1">Custom</div>
              <div className="text-xs text-[#5D6072] mb-6">For orgs with compliance and scale needs.</div>
              <ul className="text-xs text-[#9195A8] space-y-3 mb-7 border-t border-[#1B1E29] pt-4">
                <li>✓ SSO / SAML</li>
                <li>✓ SOC 2 & audit reports</li>
                <li>✓ On-prem / VPC deploy</li>
                <li>✓ Dedicated support</li>
              </ul>
              <Link to="/app" className="w-full block text-center py-2.5 rounded-lg border border-[#242737] text-xs font-semibold hover:bg-[#161923] transition-all">
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1B1E29] py-10 text-xs text-[#5D6072]">
        <div className="max-w-[1180px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono font-semibold text-sm text-[#EDEEF3]">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#8B7CF6] to-[#6C5CE7] flex items-center justify-center text-[10px] text-white">
              $
            </div>
            Code Flow
          </div>
          <div>© 2026 Code Flow. AST Compiler Static Security Suite.</div>
        </div>
      </footer>
    </div>
  );
}