import React, { useState, useEffect } from 'react';

// --- THEME CONSTANTS ---
const THEME = {
  colors: {
    bg: '#000000',           // Pure OLED Black
    surface: '#1C1C1E',      // Apple System Gray 6 (Dark)
    surfaceHighlight: '#2C2C2E', // Lighter Gray for interactions
    textMain: '#FFFFFF',
    textMuted: '#98989F',    // Slightly lighter for readability
    primary: '#0A84FF',      // <--- NEW ELECTRIC BLUE (Apple System Blue Dark Mode)
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
  Sparkles: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  // FIXED: Added the missing Edit icon here
  Edit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
};

// --- DATA HELPERS ---
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

// --- STYLES ---
const styles = {
  // 1. The Global Reset is handled in the Render return via <style> tag
  
  // 2. Viewport: Handles the gray background on Desktop, Black on Mobile
  viewport: {
    backgroundColor: '#000000',
    color: THEME.colors.textMain,
    minHeight: '100dvh', // Use dynamic viewport height for mobile browsers
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Critical: Prevents cutting off top on scroll
    width: '100%',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased'
  },
  
  // 3. Mobile Frame: The "Phone" container
  mobileFrame: {
    width: '100%',
    maxWidth: THEME.layout.maxWidth,
    minHeight: '100dvh', // Ensures bg color stretches
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: THEME.colors.bg,
    boxShadow: '0 0 40px rgba(255,255,255,0.05)' // Subtle glow on desktop
  },
  
  // 4. Header: Fixed with Safe Area support
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly more transparent
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    borderBottom: `0.5px solid ${THEME.colors.border}`,
    paddingTop: 'env(safe-area-inset-top)', // Notch support
  },
  
  headerInner: {
    padding: `12px ${THEME.layout.padding}`, 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '54px', // Standard iOS nav height
  },
  
  // 5. Body: Scrollable area
  body: {
    flex: 1, // Takes remaining space
    padding: THEME.layout.padding,
    paddingBottom: 'calc(120px + env(safe-area-inset-bottom))', // Space for floating button + home indicator
    display: 'flex',
    flexDirection: 'column',
    gap: '16px' 
  },
  
  // 6. Components
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.layout.borderRadius,
    padding: '20px',
    width: '100%', // Works now because of box-sizing global reset
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    border: `0.5px solid ${THEME.colors.border}`, // Adds definition against black
    transition: 'transform 0.2s ease',
    cursor: 'pointer'
  },
  
  primaryBtn: {
    backgroundColor: THEME.colors.primary,
    color: '#000',
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
    backgroundColor: priority === 'Urgent' ? 'rgba(255, 69, 58, 0.15)' : priority === 'High' ? 'rgba(255, 159, 10, 0.15)' : 'rgba(255, 255, 255, 0.1)',
    color: priority === 'Urgent' ? THEME.colors.danger : priority === 'High' ? THEME.colors.primary : THEME.colors.textMuted,
    border: `1px solid ${priority === 'Urgent' ? 'rgba(255, 69, 58, 0.2)' : priority === 'High' ? 'rgba(255, 159, 10, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`
  }),

  // Inputs
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
    appearance: 'none' // Removes default iOS styles
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
  
  // Modal
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
  }
};

// --- COMPONENTS ---

const ProjectCard = ({ project, onClick }) => {
  const completed = project.tasks.filter(t => t.status === 'done').length;
  const total = project.tasks.length;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  const totalCost = project.tasks.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);

  return (
    <div style={styles.card} onClick={() => onClick(project.id)}>
      {/* Header Row */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
        <span style={styles.tag(project.priority)}>{project.priority}</span>
        {project.startDate && <div style={{display:'flex', gap:'6px', alignItems:'center', fontSize:'13px', color:THEME.colors.textMuted}}>
          <Icons.Calendar /> {project.startDate}
        </div>}
      </div>
      
      {/* Title & Cost */}
      <h3 style={{ margin: '0 0 6px 0', fontSize: '21px', color: 'white', fontWeight: '700', letterSpacing: '-0.5px' }}>{project.name}</h3>
      <div style={{ fontSize: '15px', color: THEME.colors.textMuted, marginBottom: '24px', fontWeight: '500' }}>
        {totalCost > 0 ? formatCurrency(totalCost) : 'No Budget Set'}
      </div>

      {/* Progress Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: THEME.colors.textMuted, fontWeight: '600' }}>
        <span style={{ color: progress === 100 ? THEME.colors.success : THEME.colors.primary }}>
          {Math.round(progress)}% Complete
        </span>
        <span>
          {completed} <span style={{opacity: 0.3}}>/</span> {total} Tasks
        </span>
      </div>

      {/* Bar */}
      <div style={{ height: '6px', background: '#2C2C2E', borderRadius: '10px', width: '100%', marginTop: '12px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: progress === 100 ? THEME.colors.success : THEME.colors.primary, width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }} />
      </div>
    </div>
  );
};

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => (
  <div style={{ ...styles.card, flexDirection: 'row', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: '#131313', border: `1px solid ${THEME.colors.border}` }}>
    {/* Checkbox Touch Target */}
    <div onClick={(e) => { e.stopPropagation(); onToggle(task.id); }} style={{ cursor: 'pointer', paddingTop: '2px' }}>
      <Icons.Check checked={task.status === 'done'} />
    </div>
    
    <div style={{ flex: 1, minWidth: 0 }} onClick={() => onEdit(task)}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', color: task.status === 'done' ? THEME.colors.textMuted : 'white', textDecoration: task.status === 'done' ? 'line-through' : 'none', fontWeight: '500', lineHeight: '1.4' }}>
          {task.name}
        </h4>
        
        {/* FIXED: Better button spacing and layout */}
        <div style={{ display: 'flex', gap: '4px' }}>
             {/* EDIT BUTTON */}
             <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} style={{ background:'none', border:'none', padding: '8px', cursor:'pointer', color: THEME.colors.textMuted }}>
                <Icons.Edit />
             </button>
             {/* DELETE BUTTON */}
             <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} style={{ background:'none', border:'none', padding: '8px', marginRight: '-8px', cursor:'pointer' }}>
                <Icons.Trash />
             </button>
        </div>
      </div>
      
      {/* Subtitle */}
      {task.subtitle && <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: THEME.colors.textMuted, lineHeight: '1.4' }}>{task.subtitle}</p>}
      
      {/* Metadata Chips */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {task.priority && <span style={styles.tag(task.priority)}>{task.priority}</span>}
        {task.budget > 0 && <span style={{ fontSize: '12px', color: THEME.colors.success, fontWeight: '700', backgroundColor: 'rgba(48, 209, 88, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{formatCurrency(task.budget)}</span>}
        {task.goalDate && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color: THEME.colors.textMuted }}><Icons.Calendar /> {task.goalDate}</span>}
      </div>
      
      {/* Notes */}
      {task.notes && (
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#202022', borderRadius: '8px', fontSize: '14px', color: '#E5E5EA', lineHeight: '1.5' }}>
          {task.notes}
        </div>
      )}
    </div>
  </div>
);

// --- MAIN APP LOGIC ---
export default function App() {
  // 1. CHARGEMENT DIRECT (Lazy Initialization)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('scope_v5_fixed');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('dashboard');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null, initialData: null });

  // 2. SAUVEGARDE AUTOMATIQUE
  useEffect(() => {
    localStorage.setItem('scope_v5_fixed', JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  // Logic Handlers
  
  // SAVE PROJECT (Create OR Update)
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

    if (isEditing) {
      setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
    } else {
      setProjects([projectData, ...projects]);
    }
    setModal({ open: false, type: null, initialData: null });
  };

  // SAVE TASK (Create OR Update)
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
      subtasks: isEditing ? modal.initialData.subtasks : []
    };

    const updatedProjects = projects.map(p => {
      if (p.id !== activeProjectId) return p;
      
      let newTasks;
      if (isEditing) {
        newTasks = p.tasks.map(t => t.id === taskData.id ? taskData : t);
      } else {
        newTasks = [...p.tasks, taskData];
      }
      return { ...p, tasks: newTasks };
    });

    setProjects(updatedProjects);
    setModal({ open: false, type: null, initialData: null });
  };

  const toggleTask = (taskId) => {
    setProjects(projects.map(p => p.id === activeProjectId ? { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'todo' ? 'done' : 'todo' } : t) } : p));
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      setProjects(projects.map(p => p.id === activeProjectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p));
    }
  };

  const aiStub = () => alert("AI Rephrase would trigger here.");

  // View Renders
  const renderDashboard = () => (
    <div style={styles.mobileFrame}>
      {/* Sticky Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>Scope</h1>
        </div>
      </div>
      
      {/* Body */}
      <div style={styles.body}>
        {projects.length === 0 ? (
          <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.6, textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>No projects yet.</h2>
            <p style={{ color: THEME.colors.textMuted, margin: 0 }}>Tap + to create one.</p>
          </div>
        ) : (
          projects.map(p => <ProjectCard key={p.id} project={p} onClick={(id) => { setActiveProjectId(id); setView('project'); }} />)
        )}
      </div>

      <button style={styles.primaryBtn} onClick={() => setModal({ open: true, type: 'project' })}>
        <Icons.Plus /> New Project
      </button>
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
            <div onClick={() => setView('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: THEME.colors.primary, cursor: 'pointer', marginLeft: '-8px', padding: '8px' }}>
              <Icons.Back /> <span style={{fontSize: '17px', fontWeight: '500'}}>Back</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '17px' }}>Details</span>
            <button onClick={() => setModal({ open: true, type: 'project', initialData: activeProject })} style={{ background: 'none', border: 'none', color: THEME.colors.primary, cursor: 'pointer' }}>
              <span style={{ fontSize: '17px', fontWeight: '500' }}>Edit</span>
            </button> 
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
            <div style={{ padding: '32px', textAlign: 'center', color: THEME.colors.textMuted, border: '2px dashed #2C2C2E', borderRadius: '16px', margin: '0 4px' }}>
              No tasks added yet.
            </div>
          ) : (
            activeProject.tasks.map(t => <TaskCard key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} onEdit={(task) => setModal({ open: true, type: 'task', initialData: task })} />)
          )}
        </div>

        <button style={styles.primaryBtn} onClick={() => setModal({ open: true, type: 'task' })}>
          <Icons.Plus /> New Task
        </button>
      </div>
    );
  };

  const renderModal = () => {
    if (!modal.open) return null;
    const isProject = modal.type === 'project';
    const data = modal.initialData || {}; 

    return (
      <div style={styles.modalOverlay} onClick={() => setModal({ open: false, type: null })}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>
              {modal.initialData ? 'Edit' : 'New'} {isProject ? 'Project' : 'Task'}
            </h2>
            <button onClick={() => setModal({ open: false, type: null })} style={{ background:'none', border:'none', fontSize: '17px', color: THEME.colors.primary, fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          </div>

          {/* KEY IMPORTANT: Forces form reset when switching modes */}
          <form key={modal.initialData ? 'edit' : 'new'} onSubmit={isProject ? saveProject : saveTask}>
            <label style={styles.label}>Title</label>
            <input name="name" style={styles.input} required autoFocus defaultValue={data.name} placeholder={isProject ? "Project Name" : "Task Name"} />

            {!isProject && (
              <>
                <label style={styles.label}>Subtitle</label>
                <input name="subtitle" style={styles.input} defaultValue={data.subtitle} placeholder="Brief description" />
                <button type="button" onClick={aiStub} style={{ ...styles.input, textAlign: 'left', display: 'flex', gap: '8px', color: '#FFD60A', background: 'rgba(255, 214, 10, 0.15)', cursor: 'pointer', border: '1px solid rgba(255, 214, 10, 0.3)' }}><Icons.Sparkles /> Use AI to Rephrase</button>
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

            <button type="submit" style={{ ...styles.primaryBtn, position: 'relative', transform: 'none', left: 0, width: '100%', marginTop: '12px', bottom: 'auto' }}>
              {modal.initialData ? 'Save Changes' : 'Create'}
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
      
      {view === 'dashboard' ? renderDashboard() : renderProjectDetail()}
      {renderModal()}
    </div>
  );
}