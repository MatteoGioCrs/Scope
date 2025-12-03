import React, { useState, useEffect } from 'react';

// --- THEME CONSTANTS ---
const THEME = {
  colors: {
    bg: '#000000',           // Pure OLED Black
    surface: '#1C1C1E',      // Apple System Gray 6 (Dark)
    surfaceHighlight: '#2C2C2E', // Lighter Gray for interactions
    textMain: '#FFFFFF',
    textMuted: '#98989F',    // Slightly lighter for readability
    primary: '#0A84FF',      // Electric Blue
    danger: '#FF453A',       // Apple System Red
    success: '#30D158',      // Apple System Green
    border: '#38383A'        // Subtle border
  },
  layout: {
    padding: '20px',
    maxWidth: '600px',
    borderRadius: '18px'
  }
};

// --- ICONS ---
const Icons = {
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  Check: ({ checked }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={checked ? THEME.colors.success : 'none'} stroke={checked ? THEME.colors.success : '#3A3A3C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {checked ? <polyline points="20 6 9 17 4 12"></polyline> : <circle cx="12" cy="12" r="10"></circle>}
    </svg>
  ),
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={THEME.colors.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Sparkles: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5AC8FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  Edit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Pause: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Printer: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
};

// --- DATA HELPERS ---
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m < 10 ? '0'+m : m}m ${s < 10 ? '0'+s : s}s`;
};

// --- STYLES ---
const styles = {
  viewport: {
    backgroundColor: '#000000',
    color: THEME.colors.textMain,
    minHeight: '100dvh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased'
  },
  mobileFrame: {
    width: '100%',
    maxWidth: THEME.layout.maxWidth,
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: THEME.colors.bg,
    boxShadow: '0 0 40px rgba(255,255,255,0.05)'
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    borderBottom: `0.5px solid ${THEME.colors.border}`,
    paddingTop: 'env(safe-area-inset-top)',
  },
  headerInner: {
    padding: `12px ${THEME.layout.padding}`, 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '54px',
  },
  body: {
    flex: 1,
    padding: THEME.layout.padding,
    paddingBottom: 'calc(120px + env(safe-area-inset-bottom))',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px' 
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.layout.borderRadius,
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    border: `0.5px solid ${THEME.colors.border}`,
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  },
  primaryBtn: {
    backgroundColor: THEME.colors.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '50px',
    padding: '16px 32px',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
    position: 'fixed',
    bottom: 'calc(30px + env(safe-area-inset-bottom))',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 8px 25px rgba(10, 132, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1000,
    minWidth: '180px',
    justifyContent: 'center'
  },
  tag: (priority) => ({
    padding: '4px 10px', 
    borderRadius: '6px', 
    fontSize: '11px', 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: '0.5px',
    backgroundColor: priority === 'Urgent' ? 'rgba(255, 69, 58, 0.15)' : priority === 'High' ? 'rgba(10, 132, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
    color: priority === 'Urgent' ? THEME.colors.danger : priority === 'High' ? THEME.colors.primary : THEME.colors.textMuted,
    border: `1px solid ${priority === 'Urgent' ? 'rgba(255, 69, 58, 0.2)' : priority === 'High' ? 'rgba(10, 132, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`
  }),
  input: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    border: `1px solid ${THEME.colors.border}`,
    color: 'white',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '17px',
    marginBottom: '24px',
    outline: 'none',
    fontFamily: 'inherit',
    appearance: 'none'
  },
  label: { 
    fontSize: '13px', 
    color: THEME.colors.textMuted, 
    marginBottom: '8px', 
    display: 'block', 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    letterSpacing: '0.5px',
    marginLeft: '4px' 
  },
  modalOverlay: {
    position: 'fixed', 
    inset: 0, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    zIndex: 2000, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    backdropFilter: 'blur(8px)'
  },
  modalContent: {
    backgroundColor: '#151515', 
    width: '100%', 
    maxWidth: '600px', 
    borderTopLeftRadius: '28px', 
    borderTopRightRadius: '28px', 
    padding: '32px 24px', 
    paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)', 
    maxHeight: '85dvh', 
    overflowY: 'auto', 
    borderTop: `1px solid ${THEME.colors.border}`,
    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
  },
  // New Styles for Contacts
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #2C2C2E'
  },
  actionBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    color: THEME.colors.primary,
    border: 'none',
    cursor: 'pointer'
  },
  // Time Tracker Styles
  timerBox: { backgroundColor: '#101010', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: `1px solid ${THEME.colors.border}`, marginBottom: '24px' },
  timerDisplay: { fontSize: '42px', fontWeight: '700', fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px', marginBottom: '16px' },
  timerBtn: (active) => ({ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: active ? 'rgba(255, 69, 58, 0.2)' : 'rgba(10, 132, 255, 0.2)', color: active ? THEME.colors.danger : THEME.colors.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }),
  
  // --- INVOICE STYLES (CORRECTED & CLEAN) ---
  invoiceFrame: { 
    backgroundColor: 'white', 
    color: '#010101', 
    minHeight: '100dvh', // Prend toute la hauteur
    fontFamily: "'Poppins', sans-serif", 
    position: 'relative',
    fontSize: '12px' // Taille de base réduite pour tout faire tenir
  },
  
  // Header Noir avec diagonale
  invoiceHeaderBg: { 
    backgroundColor: '#000000', 
    color: 'white', 
    padding: '40px 40px 70px 40px', // Padding réduit
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)', 
    WebkitPrintColorAdjust: 'exact', 
    printColorAdjust: 'exact',
    marginBottom: '10px'
  },
  
  // Typographie Logo
  invoiceLogo: { fontFamily: "'Poppins', sans-serif", fontSize: '48px', fontWeight: '900', fontStyle: 'italic', color: '#ffd000', lineHeight: '1', margin: '0 0 20px 0', letterSpacing: '-1px' },
  
  // Colonnes du Header
  invoiceColTitle: { fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' },
  invoiceColText: { fontSize: '11px', lineHeight: '1.4', fontWeight: '400', color: '#ffffff' },
  
  // Tableau "Grille"
  invoiceTable: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '11px' },
  invoiceHeaderCell: { padding: '8px 10px', textAlign: 'center', fontWeight: '800', textTransform: 'uppercase', border: '1px solid #ddd' },
  invoiceCell: { padding: '10px', textAlign: 'left', border: '1px solid #ddd', verticalAlign: 'middle' },
  
  // Boite Total
  invoiceTotalContainer: { display: 'flex', justifyContent: 'flex-end', marginTop: '-1px' }, // -1px pour coller au tableau
  invoiceTotalBox: { width: '200px', border: '1px solid #ddd' },
  invoiceTotalRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 10px', fontSize: '11px' },
  
  // Footer
  invoiceFooter: { textAlign: 'center', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', marginTop: '40px', paddingBottom: '20px' }

}
// --- COMPONENTS ---

const ProjectCard = ({ project, onClick }) => {
  const completed = project.tasks.filter(t => t.status === 'done').length;
  const total = project.tasks.length;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  const totalCost = project.tasks.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);

  return (
    <div style={styles.card} onClick={() => onClick(project.id)}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
        <span style={styles.tag(project.priority)}>{project.priority}</span>
        {project.startDate && <div style={{display:'flex', gap:'6px', alignItems:'center', fontSize:'13px', color:THEME.colors.textMuted}}>
          <Icons.Calendar /> {project.startDate}
        </div>}
      </div>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '21px', color: 'white', fontWeight: '700', letterSpacing: '-0.5px' }}>{project.name}</h3>
      <div style={{ fontSize: '15px', color: THEME.colors.textMuted, marginBottom: '24px', fontWeight: '500' }}>
        {totalCost > 0 ? formatCurrency(totalCost) : 'No Budget Set'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: THEME.colors.textMuted, fontWeight: '600' }}>
        <span style={{ color: progress === 100 ? THEME.colors.success : THEME.colors.primary }}>
          {Math.round(progress)}% Complete
        </span>
        <span>{completed} <span style={{opacity: 0.3}}>/</span> {total} Tasks</span>
      </div>
      <div style={{ height: '6px', background: '#2C2C2E', borderRadius: '10px', width: '100%', marginTop: '12px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: progress === 100 ? THEME.colors.success : THEME.colors.primary, width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
      </div>
    </div>
  );
};

// Updated TaskCard: Now clicking it triggers onView instead of onEdit
const TaskCard = ({ task, onToggle, onDelete, onView }) => (
  <div style={{ ...styles.card, flexDirection: 'row', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: '#131313', border: `1px solid ${THEME.colors.border}` }}>
    <div onClick={(e) => { e.stopPropagation(); onToggle(task.id); }} style={{ cursor: 'pointer', paddingTop: '2px' }}>
      <Icons.Check checked={task.status === 'done'} />
    </div>
    
    <div style={{ flex: 1, minWidth: 0 }} onClick={() => onView(task)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', color: task.status === 'done' ? THEME.colors.textMuted : 'white', textDecoration: task.status === 'done' ? 'line-through' : 'none', fontWeight: '500', lineHeight: '1.4' }}>
          {task.name}
        </h4>
      </div>
      {task.subtitle && <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: THEME.colors.textMuted, lineHeight: '1.4' }}>{task.subtitle}</p>}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {task.priority && <span style={styles.tag(task.priority)}>{task.priority}</span>}
        {task.budget > 0 && <span style={{ fontSize: '12px', color: THEME.colors.success, fontWeight: '700', backgroundColor: 'rgba(48, 209, 88, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{formatCurrency(task.budget)}</span>}
        {task.goalDate && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color: THEME.colors.textMuted }}><Icons.Calendar /> {task.goalDate}</span>}
        {task.contacts && task.contacts.length > 0 && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color: THEME.colors.textMuted }}><Icons.User /> {task.contacts.length}</span>}
      </div>
    </div>
  </div>
);

// --- MAIN APP LOGIC ---
export default function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('scope_v6_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('dashboard'); // dashboard, project, task-detail
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null, initialData: null });
  const [ticker, setTicker] = useState(0);
  // Fait avancer l'horloge toutes les secondes
  useEffect(() => { const interval = setInterval(() => setTicker(t => t + 1), 1000); return () => clearInterval(interval); }, []);

  useEffect(() => {
    localStorage.setItem('scope_v6_contacts', JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeTask = activeProject?.tasks.find(t => t.id === activeTaskId);

  // Logic Handlers
  const saveProject = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const isEditing = modal.initialData;
    const projectData = {
      id: isEditing ? modal.initialData.id : generateId(),
      name: fd.get('name'),
      startDate: fd.get('startDate'),
      endDate: fd.get('endDate'),
      priority: fd.get('priority'),
      tasks: isEditing ? modal.initialData.tasks : [],
      createdAt: isEditing ? modal.initialData.createdAt : new Date().toISOString()
    };
    if (isEditing) setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
    else setProjects([projectData, ...projects]);
    setModal({ open: false, type: null, initialData: null });
  };

  const saveTask = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const isEditing = modal.initialData;
    const taskData = {
      id: isEditing ? modal.initialData.id : generateId(),
      name: fd.get('name'),
      subtitle: fd.get('subtitle'),
      notes: fd.get('notes'),
      budget: parseFloat(fd.get('budget')) || 0,
      priority: fd.get('priority'),
      goalDate: fd.get('goalDate'),
      status: isEditing ? modal.initialData.status : 'todo',
      subtasks: isEditing ? modal.initialData.subtasks : [],
      contacts: isEditing ? modal.initialData.contacts : [] // Preserve contacts!
    };
    const updatedProjects = projects.map(p => {
      if (p.id !== activeProjectId) return p;
      let newTasks;
      if (isEditing) newTasks = p.tasks.map(t => t.id === taskData.id ? taskData : t);
      else newTasks = [...p.tasks, taskData];
      return { ...p, tasks: newTasks };
    });
    setProjects(updatedProjects);
    setModal({ open: false, type: null, initialData: null });
  };

  const saveContact = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newContact = { 
        id: generateId(), 
        name: fd.get('contactName'), 
        role: fd.get('contactRole'), 
        phone: fd.get('contactPhone'), 
        email: fd.get('contactEmail'),
        // Ajout des nouveaux champs
        address: fd.get('contactAddress'),
        siret: fd.get('contactSiret')
    };

    // Deep update to add contact to specific task
    const updatedProjects = projects.map(p => {
      if (p.id !== activeProjectId) return p;
      const updatedTasks = p.tasks.map(t => {
        if (t.id !== activeTaskId) return t;
        const currentContacts = t.contacts || [];
        return { ...t, contacts: [...currentContacts, newContact] };
      });
      return { ...p, tasks: updatedTasks };
    });

    setProjects(updatedProjects);
    setModal({ open: false, type: null });
  };

  const toggleTimer = (taskId) => {
    const updatedProjects = projects.map(p => {
      if (p.id !== activeProjectId) return p;
      const updatedTasks = p.tasks.map(t => { 
        if (t.id !== taskId) return t; 
        const now = new Date(); 
        if (t.timerStart) { 
          // STOP TIMER
          const elapsed = (now.getTime() - new Date(t.timerStart).getTime()) / 1000; 
          return { ...t, timerStart: null, timeSpent: (t.timeSpent || 0) + elapsed }; 
        } else { 
          // START TIMER
          return { ...t, timerStart: now.toISOString() }; 
        } 
      });
      return { ...p, tasks: updatedTasks };
    });
    setProjects(updatedProjects);
  };

  const toggleTask = (taskId) => {
    setProjects(projects.map(p => p.id === activeProjectId ? { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'todo' ? 'done' : 'todo' } : t) } : p));
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      setProjects(projects.map(p => p.id === activeProjectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p));
      if (activeTaskId === taskId) { setView('project'); setActiveTaskId(null); }
    }
  };

  const aiStub = () => alert("AI Rephrase would trigger here.");

  // --- NOUVELLE FONCTION : Génère le numéro de facture (ex: 2025-001) ---
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    // On cherche tous les numéros de facture existants dans toutes les tâches
    let maxNum = 0;
    projects.forEach(p => {
      p.tasks.forEach(t => {
        if (t.invoiceNumber && t.invoiceNumber.startsWith(`${year}-`)) {
          const num = parseInt(t.invoiceNumber.split('-')[1]);
          if (num > maxNum) maxNum = num;
        }
      });
    });
    // On incrémente (ex: 001)
    const nextNum = (maxNum + 1).toString().padStart(3, '0');
    return `${year}-${nextNum}`;
  };

  // --- MODIFICATION : Quand on ouvre la facture, on génère le numéro si besoin ---
  const openInvoice = (task) => {
    if (!task.invoiceNumber) {
      // Si la tâche n'a pas encore de numéro, on en crée un et on sauvegarde
      const newInvoiceNumber = generateInvoiceNumber();
      const updatedTask = { ...task, invoiceNumber: newInvoiceNumber, invoiceDate: new Date().toLocaleDateString('fr-FR') };
      
      // Mise à jour du state (sauvegarde)
      const updatedProjects = projects.map(p => {
        if (p.id !== activeProjectId) return p;
        const updatedTasks = p.tasks.map(t => t.id === task.id ? updatedTask : t);
        return { ...p, tasks: updatedTasks };
      });
      setProjects(updatedProjects);
      // On met à jour la vue active avec les nouvelles données
      // Attention: il faut attendre que le state se mette à jour, ou utiliser l'objet local
      // Pour faire simple ici, on force la vue invoice
    }
    setView('invoice');
  };

  // VIEWS
  const renderDashboard = () => (
    <div style={styles.mobileFrame}>
      <div style={styles.header}><div style={styles.headerInner}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>Scope</h1>
      </div></div>
      <div style={styles.body}>
        {projects.length === 0 ? <div style={{textAlign:'center', padding:'40px', color:THEME.colors.textMuted}}>No projects. Tap +</div> : projects.map(p => <ProjectCard key={p.id} project={p} onClick={(id) => { setActiveProjectId(id); setView('project'); }} />)}
      </div>
      <button style={styles.primaryBtn} onClick={() => setModal({ open: true, type: 'project' })}><Icons.Plus /> New Project</button>
    </div>
  );

  const renderProjectDetail = () => {
    if (!activeProject) return null;
    const completed = activeProject.tasks.filter(t => t.status === 'done').length;
    const totalCost = activeProject.tasks.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);

    return (
      <div style={styles.mobileFrame}>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            {/* Bouton Retour */}
            <div onClick={() => setView('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: THEME.colors.primary, cursor: 'pointer', marginLeft: '-8px', padding: '8px' }}>
              <Icons.Back /> <span style={{fontSize: '17px', fontWeight: '500'}}>Back</span>
            </div>
            
            <span style={{ fontWeight: '600', fontSize: '17px' }}>Project</span>
            
            {/* NOUVEAU : Groupe de boutons (Imprimante + Edit) */}
            <div style={{ display: 'flex', gap: '12px' }}>
               <button onClick={() => setView('invoice')} style={{ background: 'none', border: 'none', color: THEME.colors.primary, cursor: 'pointer', padding: '4px' }}>
                  <Icons.Printer />
               </button>
               <button onClick={() => setModal({ open: true, type: 'project', initialData: activeProject })} style={{ background: 'none', border: 'none', color: THEME.colors.primary, cursor: 'pointer', fontSize:'17px', fontWeight:'500' }}>
                  Edit
               </button> 
            </div>
          </div>
        </div>

        <div style={styles.body}>
          <div style={{ marginBottom: '16px', padding: '0 4px' }}>
            <h2 style={{ fontSize: '34px', margin: '0 0 8px 0', fontWeight: '800', letterSpacing: '-0.5px' }}>{activeProject.name}</h2>
            <div style={{ color: THEME.colors.textMuted, fontSize: '15px', fontWeight: '500' }}>
               {formatCurrency(totalCost)} &bull; {completed}/{activeProject.tasks.length} Done
            </div>
          </div>
          {activeProject.tasks.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: THEME.colors.textMuted, border: '2px dashed #2C2C2E', borderRadius: '16px' }}>No tasks added yet.</div>
          ) : (
            activeProject.tasks.map(t => <TaskCard key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} onView={(task) => { setActiveTaskId(task.id); setView('task-detail'); }} />)
          )}
        </div>
        <button style={styles.primaryBtn} onClick={() => setModal({ open: true, type: 'task' })}><Icons.Plus /> New Task</button>
      </div>
    );
  };

  // NEW VIEW: Task Detail Page
  const renderTaskDetail = () => {
    if (!activeTask) return null;
    const contacts = activeTask.contacts || [];
    const isRunning = !!activeTask.timerStart;
    const currentSeconds = (activeTask.timeSpent || 0) + (isRunning ? (Date.now() - new Date(activeTask.timerStart).getTime()) / 1000 : 0);
    const hourlyRate = (activeTask.budget > 0 && currentSeconds > 60) ? (activeTask.budget / (currentSeconds / 3600)) : 0;

    return (
      <div style={styles.mobileFrame}>
        <div style={styles.header}><div style={styles.headerInner}>
          <div onClick={() => setView('project')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: THEME.colors.primary, cursor: 'pointer', marginLeft: '-8px', padding: '8px' }}>
            <Icons.Back /> <span style={{fontSize: '17px', fontWeight: '500'}}>Project</span>
          </div>
          <span style={{ fontWeight: '600', fontSize: '17px' }}>Task</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => openInvoice(activeTask)} style={{ background: 'none', border: 'none', color: THEME.colors.primary, cursor: 'pointer', padding:'4px' }}>
                <Icons.Printer />
            </button>
            <button onClick={() => setModal({ open: true, type: 'task', initialData: activeTask })} style={{ background: 'none', border: 'none', color: THEME.colors.primary, cursor: 'pointer', fontSize:'17px', fontWeight:'500' }}>
                Edit
            </button> 
          </div> 
        </div></div>

        <div style={styles.body}>
          {/* Main Info */}
          <div style={{ padding: '0 4px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
               {activeTask.priority && <span style={styles.tag(activeTask.priority)}>{activeTask.priority}</span>}
               <span style={styles.tag(activeTask.status === 'done' ? 'Done' : 'Todo')}>{activeTask.status === 'done' ? 'Completed' : 'To Do'}</span>
            </div>
            <h2 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '700', lineHeight: '1.2' }}>{activeTask.name}</h2>
            {activeTask.subtitle && <p style={{ fontSize: '17px', color: THEME.colors.textMuted, marginTop: 0 }}>{activeTask.subtitle}</p>}
          </div>

          {/* TIMER BOX */}
          <div style={styles.timerBox}>
            <div style={{ fontSize: '13px', color: THEME.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Time Tracked</div>
            <div style={styles.timerDisplay}>{formatTime(currentSeconds)}</div>
            <div style={{ display:'flex', gap:'24px', alignItems:'center', width:'100%', justifyContent:'center' }}>
              <button onClick={() => toggleTimer(activeTask.id)} style={styles.timerBtn(isRunning)}>
                {isRunning ? <Icons.Pause /> : <Icons.Play />}
              </button>
              {activeTask.budget > 0 && (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ fontSize: '12px', color: THEME.colors.textMuted }}>Effective Hourly Rate</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: hourlyRate < 30 ? THEME.colors.danger : THEME.colors.success }}>
                    {formatCurrency(hourlyRate)}/h
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Box */}
          <div style={{ backgroundColor: '#1C1C1E', borderRadius: '14px', padding: '0 16px' }}>
            <div style={styles.contactRow}>
              <span style={{ color: THEME.colors.textMuted }}>Goal Date</span>
              <span style={{ fontWeight: '500' }}>{activeTask.goalDate || 'Not set'}</span>
            </div>
            <div style={{ ...styles.contactRow, borderBottom: 'none' }}>
              <span style={{ color: THEME.colors.textMuted }}>Budget</span>
              <span style={{ fontWeight: '500', color: THEME.colors.success }}>{formatCurrency(activeTask.budget)}</span>
            </div>
          </div>

          {/* Notes */}
          {activeTask.notes && (
            <div>
              <label style={styles.label}>NOTES</label>
              <div style={{ backgroundColor: '#1C1C1E', borderRadius: '14px', padding: '16px', fontSize: '16px', lineHeight: '1.5', color: '#E5E5EA' }}>
                {activeTask.notes}
              </div>
            </div>
          )}

          {/* CONTACTS SECTION */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
               <label style={{...styles.label, marginBottom:0}}>CONTACTS & RESOURCES</label>
               <button onClick={() => setModal({ open: true, type: 'contact' })} style={{ background: 'none', border: 'none', color: THEME.colors.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>+ Add</button>
            </div>
            
            <div style={{ backgroundColor: '#1C1C1E', borderRadius: '14px', overflow: 'hidden' }}>
              {contacts.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: THEME.colors.textMuted, fontSize: '15px' }}>No contacts linked.</div>
              ) : (
                contacts.map((c, i) => (
                  <div key={c.id} style={{ ...styles.contactRow, padding: '16px', borderBottom: i === contacts.length - 1 ? 'none' : '1px solid #2C2C2E' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '16px' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: THEME.colors.textMuted }}>{c.role}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {c.phone && <a href={`tel:${c.phone}`} style={styles.actionBtn}><Icons.Phone /></a>}
                      {c.email && <a href={`mailto:${c.email}`} style={styles.actionBtn}><Icons.Mail /></a>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

           {/* Delete Zone */}
           <div style={{ marginTop: '20px' }}>
             <button onClick={() => deleteTask(activeTask.id)} style={{ width: '100%', padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(255, 69, 58, 0.1)', color: THEME.colors.danger, border: 'none', fontSize: '17px', fontWeight: '600', cursor: 'pointer' }}>
               Delete Task
             </button>
           </div>
        </div>
      </div>
    );
  };

  const renderInvoice = () => {
    if (!activeTask) return null;
    
    const client = (activeTask.contacts && activeTask.contacts.length > 0) ? activeTask.contacts[0] : {};
    const invoiceNum = activeTask.invoiceNumber || "2025-001";
    const invoiceDate = activeTask.invoiceDate || new Date().toLocaleDateString('fr-FR');
    const totalAmount = activeTask.budget || 0;

    // Générer des lignes vides pour remplir le tableau visuellement (comme sur ton image)
    const emptyRows = Math.max(0, 8 - 1); // 8 lignes au total moins la ligne de la tâche

    return (
      <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '20px' }}>
         
         {/* Toolbar Flottante (Ne s'imprime pas) */}
         <div className="no-print" style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', padding: '8px 16px', background: '#000', borderRadius: '50px', display: 'flex', gap: '16px', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <button onClick={() => setView('task-detail')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}>Fermer</button>
            <div style={{ width: 1, background: '#333' }}></div>
            <button onClick={() => window.print()} style={{ background: 'none', border: 'none', color: '#ffd000', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <Icons.Printer /> IMPRIMER
            </button>
         </div>

         {/* --- PAGE A4 --- */}
         <div id="invoice-page" style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            {/* Styles d'impression stricts */}
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');
              @media print { 
                .no-print { display: none !important; } 
                body { background-color: white; margin: 0; padding: 0; }
                #invoice-page { width: 100% !important; height: 100% !important; boxShadow: none !important; margin: 0 !important; }
                @page { size: A4; margin: 0; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              } 
            `}</style>

            {/* HEADER NOIR */}
            <div style={styles.invoiceHeaderBg}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* GAUCHE: LOGO & INFO */}
                    <div style={{ width: '55%' }}>
                        <h1 style={styles.invoiceLogo}>ETHER.</h1>
                        
                        <div style={styles.invoiceColTitle}>AUTO ENTREPRISE</div>
                        <div style={styles.invoiceColText}>Visionary Collective</div>
                        <div style={styles.invoiceColText}>SIRET : 98 74 98 888 000 13</div>
                        <div style={styles.invoiceColText}>27 Impasse Coste</div>
                        <div style={styles.invoiceColText}>13600, La Ciotat</div>
                        <div style={{ ...styles.invoiceColText, marginTop: '8px' }}>+33 7 82 91 74 63</div>
                        <div style={{ ...styles.invoiceColText, textDecoration: 'underline' }}>etherstudiocom@gmail.com</div>
                    </div>

                    {/* DROITE: CLIENT & FACTURE */}
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* BLOC FACTURE (En haut à droite) */}
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '2px', marginBottom: '4px' }}>FACTURE</div>
                            <div style={styles.invoiceColText}><span style={{ opacity: 0.7 }}>FACTURE N°</span> <span style={{ fontWeight: '700' }}>{invoiceNum}</span></div>
                            <div style={styles.invoiceColText}><span style={{ opacity: 0.7 }}>DATE :</span> <span style={{ fontWeight: '700' }}>{invoiceDate}</span></div>
                        </div>

                        {/* BLOC CLIENT (Juste en dessous) */}
                        <div style={{ textAlign: 'right', marginTop: '10px' }}>
                            <div style={styles.invoiceColTitle}>À :</div>
                            <div style={{ fontSize: '14px', fontWeight: '800', marginBottom: '2px' }}>{client.name || "NOM DU CLIENT"}</div>
                            {client.company && <div style={styles.invoiceColText}>{client.company}</div>}
                            {client.siret && <div style={styles.invoiceColText}>SIRET : {client.siret}</div>}
                            {client.address && <div style={styles.invoiceColText}>{client.address}</div>}
                            {client.email && <div style={{...styles.invoiceColText, textDecoration: 'underline'}}>{client.email}</div>}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '30px', fontSize: '9px', opacity: 0.6 }}>
                    TVA non applicable, art. 293 B du CGI
                </div>
            </div>

            {/* CONTENU BLANC */}
            <div style={{ padding: '0 40px', flex: 1 }}>
                
                {/* TABLEAU */}
                <table style={styles.invoiceTable}>
                   <thead>
                      <tr>
                         <th style={{ ...styles.invoiceHeaderCell, width: '15%' }}>QUANTITÉ</th>
                         <th style={{ ...styles.invoiceHeaderCell, width: '55%', textAlign: 'left' }}>DESCRIPTION</th>
                         <th style={{ ...styles.invoiceHeaderCell, width: '15%' }}>PRIX UNITAIRE</th>
                         <th style={{ ...styles.invoiceHeaderCell, width: '15%' }}>TOTAL</th>
                      </tr>
                   </thead>
                   <tbody>
                         {/* Ligne de la tâche */}
                         <tr>
                            <td style={{ ...styles.invoiceCell, textAlign: 'center' }}>1</td>
                            <td style={styles.invoiceCell}>
                                <div style={{ fontWeight: '600' }}>{activeTask.name}</div>
                                {activeTask.subtitle && <div style={{ fontSize: '10px', color: '#666' }}>{activeTask.subtitle}</div>}
                            </td>
                            <td style={{ ...styles.invoiceCell, textAlign: 'center' }}>{formatCurrency(totalAmount)}</td>
                            <td style={{ ...styles.invoiceCell, textAlign: 'center', fontWeight: '700' }}>{formatCurrency(totalAmount)}</td>
                         </tr>
                         
                         {/* Lignes vides pour remplir le tableau */}
                         {[...Array(emptyRows)].map((_, i) => (
                             <tr key={i}>
                                 <td style={{ ...styles.invoiceCell, height: '30px' }}></td>
                                 <td style={styles.invoiceCell}></td>
                                 <td style={styles.invoiceCell}></td>
                                 <td style={styles.invoiceCell}></td>
                             </tr>
                         ))}
                   </tbody>
                </table>

                {/* TOTAUX */}
                <div style={styles.invoiceTotalContainer}>
                    <div style={styles.invoiceTotalBox}>
                        <div style={{ ...styles.invoiceTotalRow, borderBottom: '1px solid #ddd' }}>
                            <span>SOUS-TOTAL</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                        <div style={{ ...styles.invoiceTotalRow, fontWeight: '800', backgroundColor: '#f9f9f9' }}>
                            <span>TOTAL DÛ</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={styles.invoiceFooter}>
                    NOUS VOUS REMERCIONS DE VOTRE CONFIANCE.
                </div>
            </div>
         </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!modal.open) return null;
    const isProject = modal.type === 'project';
    const isContact = modal.type === 'contact';
    const data = modal.initialData || {}; 

    return (
      <div style={styles.modalOverlay} onClick={() => setModal({ open: false, type: null })}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>
              {isContact ? 'New Contact' : (modal.initialData ? 'Edit ' : 'New ') + (isProject ? 'Project' : 'Task')}
            </h2>
            <button onClick={() => setModal({ open: false, type: null })} style={{ background:'none', border:'none', fontSize: '17px', color: THEME.colors.primary, fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          </div>

          <form key={modal.initialData ? 'edit' : 'new'} onSubmit={isContact ? saveContact : (isProject ? saveProject : saveTask)}>
            
            {isContact ? (
              <>
                <label style={styles.label}>Name</label>
                <input name="contactName" style={styles.input} required placeholder="Client or Contractor Name" />
                <label style={styles.label}>Role / Description</label>
                <input name="contactRole" style={styles.input} placeholder="e.g. Electrician" />
                <label style={styles.label}>Address</label>
                <input name="contactAddress" style={styles.input} placeholder="123 Street..." />
                <label style={styles.label}>SIRET</label>
                <input name="contactSiret" style={styles.input} placeholder="000 000 000 00000" />
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                     <label style={styles.label}>Phone</label>
                     <input name="contactPhone" type="tel" style={styles.input} placeholder="+1..." />
                  </div>
                  <div style={{ flex: 1 }}>
                     <label style={styles.label}>Email</label>
                     <input name="contactEmail" type="email" style={styles.input} placeholder="@..." />
                  </div>
                </div>
              </>
            ) : (
              // EXISTING PROJECT/TASK FORM
              <>
                <label style={styles.label}>Title</label>
                <input name="name" style={styles.input} required autoFocus defaultValue={data.name} placeholder="Name" />
                {!isProject && (
                  <>
                    <label style={styles.label}>Subtitle</label>
                    <input name="subtitle" style={styles.input} defaultValue={data.subtitle} placeholder="Description" />
                    <button type="button" onClick={aiStub} style={{ ...styles.input, textAlign: 'left', display: 'flex', gap: '8px', color: '#5AC8FA', background: 'rgba(90, 200, 250, 0.15)', cursor: 'pointer', border: '1px solid rgba(90, 200, 250, 0.3)' }}><Icons.Sparkles /> Use AI to Rephrase</button>
                    <label style={styles.label}>Notes</label>
                    <textarea name="notes" style={{ ...styles.input, height: '100px', resize: 'none' }} defaultValue={data.notes} placeholder="Details..." />
                  </>
                )}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Priority</label>
                    <select name="priority" style={styles.input} defaultValue={data.priority || 'Low'}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  {!isProject && (
                    <div style={{ flex: 1 }}>
                        <label style={styles.label}>Budget</label>
                        <input name="budget" type="number" step="0.01" style={styles.input} defaultValue={data.budget} placeholder="0.00" />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Start</label>
                    <input name="startDate" type="date" style={styles.input} defaultValue={data.startDate} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>End</label>
                    <input name={isProject ? "endDate" : "goalDate"} type="date" style={styles.input} defaultValue={isProject ? data.endDate : data.goalDate} />
                  </div>
                </div>
              </>
            )}

            <button type="submit" style={{ ...styles.primaryBtn, position: 'relative', transform: 'none', left: 0, width: '100%', marginTop: '12px', bottom: 'auto' }}>
              Save {isContact ? 'Contact' : 'Changes'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.viewport}>
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; background-color: #000000; font-family: -apple-system, sans-serif; overscroll-behavior-y: none; }
        input, select, textarea { font-family: -apple-system, sans-serif; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>
      
      {view === 'dashboard' ? renderDashboard() : view === 'project' ? renderProjectDetail() : view === 'invoice' ? renderInvoice() : renderTaskDetail()}
      {renderModal()}
    </div>
  );
}