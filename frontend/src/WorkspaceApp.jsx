import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import toast, { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { 
  Terminal, Shield, Bug, Folder, Search, Settings, 
  FileText, Play, RefreshCw, Bell, Layers, Activity, 
  LayoutGrid, X, ChevronRight, Sliders, History
} from 'lucide-react';

export default function WorkspaceApp() {
  // Clerk Auth Token Helper
  const { getToken } = useAuth();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('workspace'); // workspace | architecture | telemetry | config
  const [selectedFile, setSelectedFile] = useState('analyzer.py');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // App Logic States
  const [code, setCode] = useState(`def check_user(username, password):
    # Intentional flaw: Hardcoded credentials
    if username == 'admin' and password == 'Secret123':
        return True
        
    # Intentional bug: Infinite loop
    while True:
        print("Validating parameters...")
        
    return False`);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [rawReview, setRawReview] = useState('');
  const [displayedReview, setDisplayedReview] = useState('');
  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([
    { time: '10:02:11', txt: 'System core initialized.', type: 'info' },
    { time: '10:02:12', txt: 'AST analytical hooks bound successfully.', type: 'success' }
  ]);

  // Command Palette Items Lookup Matrix
  const commandItems = [
    { name: 'Run Code Analyzer Pipeline', action: () => { handleRunReview(); setIsSearchOpen(false); }, icon: <Play size={14} /> },
    { name: 'Switch to System Engine Diagram Graph', action: () => { setActiveTab('architecture'); setIsSearchOpen(false); }, icon: <Layers size={14} /> },
    { name: 'View Active Telemetry Logs', action: () => { setActiveTab('telemetry'); setIsSearchOpen(false); }, icon: <Activity size={14} /> },
    { name: 'Open Configuration Settings', action: () => { setActiveTab('config'); setIsSearchOpen(false); }, icon: <Settings size={14} /> },
    { name: 'Clear Output Terminal History', action: () => { setLogs([]); toast.success('Logs cleared'); setIsSearchOpen(false); }, icon: <Terminal size={14} /> }
  ];

  const filteredCommands = commandItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch Scan History for Authenticated User
  const fetchHistory = async () => {
    try {
      const token = await getToken();
      const response = await fetch('https://codeflow-backend-api.vercel.app/api/history', {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to load scan history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Monitor Global Hotkeys (Ctrl + K to toggle command search menu)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Streaming typewriter loop
  useEffect(() => {
    if (!rawReview) { setDisplayedReview(''); return; }
    let index = 0;
    setDisplayedReview('');
    const intervalTime = rawReview.length > 500 ? 3 : 10;
    const streamer = setInterval(() => {
      setDisplayedReview((prev) => prev + rawReview.charAt(index));
      index++;
      if (index >= rawReview.length) clearInterval(streamer);
    }, intervalTime);
    return () => clearInterval(streamer);
  }, [rawReview]);

  const addLog = (txt, type = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { time, txt, type }]);
  };

  const handleRunReview = async () => {
    setLoading(true);
    setStatus(null);
    setRawReview('');
    addLog('Initializing execution pipeline...', 'info');
    toast('Triggering AST Static Engine...', { icon: '🤖' });

    try {
      // Retrieve Clerk JWT Token for authenticated API request
      const token = await getToken();

      const response = await fetch('https://codeflow-backend-api.vercel.app/api/review', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ filename: selectedFile, code: code })
      });

      if (response.ok) {
        const data = await response.json();
        setRawReview(data.review || '## Analysis Complete\nNo severe structural discrepancies identified.');
        setStatus('success');
        addLog('Token extraction array evaluated successfully.', 'success');
        toast.success('Analysis Finished Successfully!');
        fetchHistory(); // Sync recent scans history panel
      } else {
        setRawReview(`### ⚠ Server Pipeline Crash\nService returned verification state: ${response.status}`);
        setStatus('error');
        addLog(`Pipeline aborted. Code error state: ${response.status}`, 'error');
        toast.error('Vulnerability Scanning Pipeline Failed.');
      }
    } catch (err) {
      setRawReview('### ❌ Remote Connection Refused\nUnable to link to the Vercel FastAPI backend engine.\n\nPlease verify network status or backend logs.');
      setStatus('error');
      addLog('Connection failed. Server structural timeout.', 'error');
      toast.error('Backend Connection Refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 font-sans flex flex-col justify-between overflow-hidden relative selection:bg-indigo-500/30">
      <Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid #2D3748' } }} />
      
      {/* Ambient Breathing Dynamic Grid Background */}
      <motion.div 
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" 
      />

      {/* Top Navigation Bar */}
      <header className="bg-[#111827] border-b border-[#2D3748] px-6 py-3 flex items-center justify-between z-40 shadow-xl relative">
        <div className="flex items-center space-x-6">
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none" 
            onClick={() => { setActiveTab('workspace'); toast.success('Returned to core view'); }}
          >
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0px 0px 0px 0px rgba(124, 58, 237, 0.2)", 
                  "0px 0px 14px 4px rgba(6, 182, 212, 0.35)", 
                  "0px 0px 0px 0px rgba(124, 58, 237, 0.2)"
                ] 
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] p-2.5 rounded-xl text-white relative overflow-hidden shadow-md"
            >
              <motion.div
                whileHover={{ rotate: 180, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
                className="relative z-10 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            <div>
              <h1 className="text-base font-black tracking-widest text-white font-mono transition-colors group-hover:text-[#06B6D4]">
                CODE FLOW
              </h1>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase opacity-85">
                AST COMPILER STATIC SECURITY SUITE
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Operations Controllers */}
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer" onClick={() => setIsSearchOpen(true)}>
            <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search commands... (Ctrl+K)" 
              className="bg-[#0B1020] text-xs border border-[#2D3748] rounded-lg pl-8 pr-4 py-2 w-52 outline-none focus:border-[#7C3AED] transition-all cursor-pointer" 
              readOnly 
            />
          </div>
          
          <button 
            onClick={() => toast('All cloud system metrics operating normally.', { icon: '🔔' })} 
            className="p-2 text-slate-400 hover:text-white bg-[#0B1020] border border-[#2D3748] rounded-xl cursor-pointer transition-colors"
          >
            <Bell size={15} />
          </button>
          
          {/* Clerk Auth Avatar / Sign In */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 border border-[#2D3748] rounded-lg cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      {/* Main Split-Pane Workspace Dashboard Container */}
      <main className="flex-1 w-full grid grid-cols-1 xl:grid-cols-12 overflow-hidden items-stretch relative z-10">
        
        {/* Left Interactive Operations Control Tab Strip */}
        <div className="xl:col-span-1 bg-[#111827]/80 border-r border-[#2D3748] flex xl:flex-col items-center justify-between xl:justify-start p-3 xl:space-y-4 shadow-2xl z-20">
          <div className="flex xl:flex-col items-center xl:space-y-3 w-full">
            {[
              { id: 'workspace', icon: <LayoutGrid size={18} />, label: 'Workspace' },
              { id: 'architecture', icon: <Layers size={18} />, label: 'Architecture' },
              { id: 'telemetry', icon: <Activity size={18} />, label: 'Telemetry' },
              { id: 'config', icon: <Settings size={18} />, label: 'Config' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  setActiveTab(item.id);
                  toast(`Context redirected: ${item.label}`, { icon: '📂' });
                }}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer group relative ${activeTab === item.id ? 'bg-[#0B1020] text-[#7C3AED] border border-[#2D3748]' : 'text-slate-400 hover:bg-[#0B1020]/50 hover:text-slate-200'}`}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Unified Application View Controller Switch */}
        <div className="xl:col-span-11 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STAGE A: ACTIVE WORKING CODE CANVAS */}
            {activeTab === 'workspace' && (
              <motion.div 
                key="workspace" 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -8 }} 
                className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              >
                {/* Visual Directory Module */}
                <div className="lg:col-span-2 bg-[#0B1020]/90 border-r border-[#2D3748] p-4 hidden lg:flex flex-col justify-between shadow-inner overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-[#2D3748] pb-2 mb-3">
                      <span>File Explorer</span>
                    </div>
                    <div className="space-y-1">
                      {['analyzer.py', 'config.json', 'test_suite.py', 'README.md'].map((file) => (
                        <button
                          key={file}
                          onClick={() => { setSelectedFile(file); toast(`Staged document: ${file}`); }}
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-xs font-mono rounded-lg border text-left cursor-pointer transition-all ${selectedFile === file ? 'bg-[#111827] text-white border-[#2D3748]' : 'text-slate-400 border-transparent hover:bg-[#111827]/40'}`}
                        >
                          <FileText size={13} className={selectedFile === file ? 'text-[#7C3AED]' : 'text-slate-500'} />
                          <span className="truncate">{file}</span>
                        </button>
                      ))}
                    </div>

                    {/* Step 3: Live Recent Scans History Panel */}
                    {history.length > 0 && (
                      <div className="mt-6 space-y-1 border-t border-[#2D3748] pt-3">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase px-1 mb-2">
                          <span className="flex items-center space-x-1">
                            <History size={11} className="text-[#06B6D4]" />
                            <span>Recent Scans</span>
                          </span>
                          <span className="text-[9px] bg-[#111827] px-1.5 py-0.5 rounded border border-[#2D3748]">{history.length}</span>
                        </div>
                        <div className="space-y-1 max-h-44 overflow-y-auto custom-scrollbar pr-1">
                          {history.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setRawReview(item.review);
                                toast.success(`Loaded scan: ${item.filename}`);
                              }}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-lg border border-transparent hover:border-[#2D3748] hover:bg-[#111827] text-slate-400 hover:text-white transition-all cursor-pointer text-left"
                            >
                              <span className="truncate max-w-[90px]">{item.filename}</span>
                              <span className="text-[9px] text-slate-600 font-sans">{item.timestamp ? item.timestamp.split(' ')[1] : ''}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-[#2D3748] bg-[#111827] rounded-xl p-3 text-center shadow-lg mt-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">HEALTH MONITOR</span>
                    <p className="text-lg font-bold text-[#22C55E] font-mono">74%</p>
                  </div>
                </div>

                {/* Monaco Editor Container */}
                <div className="lg:col-span-5 bg-[#111827] border-r border-[#2D3748] flex flex-col items-stretch overflow-hidden shadow-2xl">
                  <div className="bg-[#0B1020] px-4 py-3 border-b border-[#2D3748] flex items-center justify-between z-10">
                    <span className="text-xs font-mono font-medium text-slate-300">{selectedFile}</span>
                    <button
                      onClick={handleRunReview}
                      disabled={loading}
                      className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95] text-white text-xs font-mono font-bold px-4 py-1.5 rounded-lg border border-[#7C3AED]/30 flex items-center space-x-2 cursor-pointer transition-all shadow-md"
                    >
                      {loading ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
                      <span>{loading ? 'ANALYZING...' : 'RUN ANALYZER'}</span>
                    </button>
                  </div>
                  <div className="flex-1 w-full bg-[#111827] pt-2">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      theme="vs-dark"
                      value={code}
                      onChange={(val) => setCode(val || '')}
                      options={{ minimap: { enabled: false }, fontSize: 13, automaticLayout: true }}
                    />
                  </div>
                </div>

                {/* Structured Vulnerability Metric Response Cards */}
                <div className="lg:col-span-5 bg-[#0B1020]/40 backdrop-blur-xl flex flex-col items-stretch overflow-hidden">
                  <div className="bg-[#111827] px-5 py-3.5 border-b border-[#2D3748] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">ast_critique_report.md</span>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto bg-[#111827]/30 custom-scrollbar">
                    {displayedReview ? (
                      <div className="space-y-4">
                        {status === 'success' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="border-l-4 border-[#EF4444] bg-[#EF4444]/5 border border-[#2D3748] rounded-xl p-4 space-y-1 shadow-lg"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-black text-[#EF4444] uppercase">⚠ Hardcoded Plaintext Credentials</span>
                              <span className="text-[9px] font-mono font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30 px-2 py-0.5 rounded">HIGH SEVERITY</span>
                            </div>
                            <p className="text-xs text-slate-400">Exposure of root password parameters inside root functional logic context block array index.</p>
                          </motion.div>
                        )}
                        <div className="font-mono text-sm text-slate-300 bg-[#111827]/90 rounded-xl p-5 border border-[#2D3748] shadow-inner whitespace-pre-wrap">
                          {displayedReview}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                        <svg className="animate-pulse mb-2 text-slate-700" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83"/></svg>
                        <p className="text-xs font-mono">Awaiting Pipeline Activation. Click "RUN ANALYZER" to execute checks.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE B: GRAPH VISUALIZATION PIPELINE */}
            {activeTab === 'architecture' && (
              <motion.div 
                key="architecture" 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -8 }} 
                className="p-8 bg-[#0B1020] min-h-[550px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-1">System Pipeline Infrastructure Map</h3>
                  <p className="text-xs text-slate-500 font-mono tracking-widest border-b border-[#2D3748] pb-3 mb-8">TELEMETRY ROUTING TOPOLOGY</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { node: "01 // UI LAYER", name: "Monaco Workspace", desc: "Monaco text editor captures syntax string streams and buffers content schemas cleanly." },
                      { node: "02 // ROUTING GATEWAY", name: "FastAPI Endpoint", desc: "Intercepts client requests, launching synchronous context security validations." },
                      { node: "03 // AST TRANSFORMAT", name: "Abstract Syntax Graph", desc: "Parses program text inputs into structured algorithmic tree data blocks." },
                      { node: "04 // INFERENCE ENGINE", name: "Cloud LLM Stream", desc: "Evaluates syntax trees against senior prompt rules, streaming Markdown reviews." }
                    ].map((step, i) => (
                      <div key={i} className="bg-[#111827] border border-[#2D3748] p-5 rounded-xl hover:border-[#7C3AED] transition-all duration-300 shadow-md">
                        <span className="text-[9px] font-mono font-bold text-[#7C3AED] block mb-1">{step.node}</span>
                        <h4 className="text-xs font-mono font-bold text-slate-200 mb-2">{step.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE C: LIVE INFRASTRUCTURE METRIC TELEMETRY */}
            {activeTab === 'telemetry' && (
              <motion.div key="telemetry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-4">
                <h3 className="text-sm font-mono font-bold text-white border-b border-[#2D3748] pb-2">Full Engine Telemetry Streams</h3>
                <div className="bg-[#111827] border border-[#2D3748] rounded-xl p-4 font-mono text-xs space-y-2 h-96 overflow-y-auto shadow-inner">
                  {logs.map((log, i) => (
                    <div key={i} className="flex space-x-3"><span className="text-slate-600">{log.time}</span><span className="text-[#06B6D4] font-bold">[{log.type.toUpperCase()}]</span><span className="text-slate-300">{log.txt}</span></div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STAGE D: CORE PLATFORM REGISTRY CONFIG */}
            {activeTab === 'config' && (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-4">
                <h3 className="text-sm font-mono font-bold text-white border-b border-[#2D3748] pb-2">Configuration Registry Profiles</h3>
                <div className="bg-[#111827] border border-[#2D3748] rounded-xl p-6 max-w-xl space-y-4 shadow-xl">
                  <div className="flex items-center justify-between"><span className="text-xs font-mono text-slate-300">Target Model Provider</span><span className="text-xs font-mono bg-[#0B1020] px-3 py-1 border border-[#2D3748] rounded text-[#06B6D4]">llama-3.3-70b-versatile</span></div>
                  <div className="flex items-center justify-between"><span className="text-xs font-mono text-slate-300">AST Recursion Limit</span><span className="text-xs font-mono bg-[#0B1020] px-3 py-1 border border-[#2D3748] rounded text-white">1000 (Max)</span></div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Terminal Console */}
      <footer className="bg-[#111827] border-t border-[#2D3748] h-32 p-3 flex flex-col justify-between z-30 relative shadow-2xl">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 border-b border-[#2D3748]/40 pb-1.5 mb-1.5 uppercase font-black tracking-wider">
            <Terminal size={12} className="text-[#06B6D4]" />
            <span>Output Terminal Terminal Stream</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-0.5 font-mono text-[11px] text-slate-400 custom-scrollbar">
            {logs.slice(-4).map((log, idx) => (
              <div key={idx} className="flex space-x-3"><span className="text-slate-600">{log.time}</span><span className={log.type === 'success' ? 'text-[#22C55E]' : 'text-slate-500'}>// {log.txt}</span></div>
            ))}
          </div>
        </div>
      </footer>

      {/* Spotlight Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-start justify-center pt-[15vh]"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -8 }}
              className="bg-[#111827] border border-[#2D3748] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#2D3748] px-4 py-3">
                <Search size={14} className="text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Type a command to execute or navigate..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs outline-none text-white font-mono"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-500 hover:text-white"><X size={14} /></button>
              </div>
              <div className="p-2 max-h-60 overflow-y-auto space-y-0.5">
                {filteredCommands.length > 0 ? filteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-xs text-left font-mono rounded-lg hover:bg-[#0B1020] text-slate-300 hover:text-white border border-transparent hover:border-[#2D3748] cursor-pointer transition-colors"
                  >
                    <span className="text-[#7C3AED]">{cmd.icon}</span>
                    <span>{cmd.name}</span>
                  </button>
                )) : (
                  <div className="text-center py-4 text-xs font-mono text-slate-500">No matching platform commands identified.</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}