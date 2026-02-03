import React, { useMemo, useState, useEffect, useRef } from 'react';
import { 
  Activity,
  BadgeDollarSign,
  Database,
  History,
  MousePointerClick,
  Percent,
  Search, 
  Plus, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  DollarSign, 
  Target, 
  Briefcase, 
  User, 
  Users,
  UserCircle,
  X, 
  Edit2,
  Save,
  LogOut,
  FileSpreadsheet,
  Table,
  ShieldAlert,
  ShieldCheck,
  Menu,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  List,
  Bug,
  Check,
  FileJson,
  Filter,
  CheckSquare,
  Square,
  Play,
  Pause,
  XSquare,
  RefreshCw,
  ShoppingBag,
  Star,
  TrendingUp,
  ChevronDown,
  ArrowRight,
  Eye
} from './lucide-react';
import MetaRiskEmbed from './MetaRiskEmbed';

// --- CSS STYLES (Vanilla CSS) ---
const STYLES = `
  /* Reset & Base - Force Full Screen on HTML/Body/Root */
  :root {
    --bg-dark: #000000;
    --bg-panel: rgba(15, 23, 42, 0.6);
    --bg-panel-strong: rgba(15, 23, 42, 0.85);
    --border-color: #1e293b;
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --accent-primary: #ff5d00;
    --accent-hover: #ff7b00;
    --logo-bg: #1a1a1a;
    --glass-border: 1px solid rgba(255, 255, 255, 0.08);
    --shadow-soft: 0 20px 40px rgba(0, 0, 0, 0.35);
  }
  html, body, #root { 
    margin: 0; 
    padding: 0; 
    width: 100%; 
    height: 100%; 
    overflow: hidden; /* Prevent scroll on body, handle inside app */
  }

  /* Universal Box Sizing */
  *, *::before, *::after { 
    box-sizing: border-box; 
  }

  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
    background-color: var(--bg-dark); 
    color: var(--text-primary); 
  }
  
  /* Layout Containers - Force conformance to edges */
  .app-container { 
    display: flex; 
    width: 100vw; 
    height: 100vh; 
    height: 100dvh; /* Mobile support */
    overflow: hidden; 
    background-color: var(--bg-dark); 
    position: fixed; /* Fixed to viewport edges */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .sidebar { 
    width: 260px; 
    background-color: #000; 
    color: var(--text-primary); 
    display: flex; 
    flex-direction: column; 
    flex-shrink: 0; 
    transition: transform 0.3s ease; 
    z-index: 40; 
    height: 100%; 
  }

  .main-content { 
    flex: 1; 
    height: 100%; 
    overflow-y: auto; 
    padding: 0 2rem 2rem; 
    position: relative; 
    background-color: var(--bg-dark); 
    width: 100%; /* Ensure it fills remaining flex space */
  }

  .main-content.meta-risk {
    padding: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .main-content.meta-risk > div {
    flex: 1;
    min-height: 0;
  }
  
  /* Sidebar Elements */
  .sidebar-header { padding: 1.5rem; border-bottom: 1px solid var(--border-color); }
  .brand { display: flex; align-items: center; gap: 0.75rem; }
  .brand-text { display: flex; flex-direction: column; gap: 0.15rem; }
  .brand-name { font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-primary); }
  .brand-subtitle { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; color: var(--text-secondary); }
  .brand-logo-image { 
    width: 40px; 
    height: 40px; 
    display: block; 
    object-fit: contain; 
  }
  .brand-accent { color: var(--accent-primary); }
  .nav-menu { flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; }
  .nav-item { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; background: transparent; text-align: left; font-size: 0.95rem; color: var(--text-secondary); }
  .nav-item:hover { color: white; background-color: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.08); }
  .nav-item.active { background-color: rgba(255, 93, 0, 0.12); color: white; border-color: rgba(255, 93, 0, 0.35); box-shadow: 0 12px 22px rgba(255, 93, 0, 0.2); }
  .sidebar-footer { padding: 1rem; border-top: 1px solid var(--border-color); background-color: rgba(15, 23, 42, 0.45); }
  
  /* Import Section */
  .import-section { padding: 1rem; border-top: 1px solid var(--border-color); background-color: rgba(15, 23, 42, 0.45); }
  .section-title { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; padding-left: 0.5rem; }
  .import-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem; }
  .import-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.6rem; border-radius: 0.75rem; background-color: rgba(15, 23, 42, 0.8); color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.06); cursor: pointer; transition: all 0.2s; }
  .import-btn:hover { background-color: rgba(255, 93, 0, 0.15); color: white; border-color: rgba(255, 93, 0, 0.4); }
  .import-label { font-size: 10px; margin-top: 4px; }

  /* Header */
  .header-area { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; position: sticky; top: 0; z-index: 25; background-color: rgba(0, 0, 0, 0.85); padding: 1rem 0; backdrop-filter: blur(12px); }
  .page-title { font-size: 1.875rem; font-weight: 800; color: var(--text-primary); margin: 0; letter-spacing: -0.02em; }
  .page-subtitle { color: var(--text-secondary); margin-top: 0.25rem; font-size: 0.95rem; }
  
  /* Controls */
  .controls { display: flex; gap: 1rem; width: 100%; max-width: 900px; flex-wrap: wrap; align-items: center; }
  .risk-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; width: 100%; }
  .risk-filter-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.85rem; border-radius: 0.85rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 12px 25px -20px rgba(0, 0, 0, 0.6); }
  .risk-filter-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .risk-filter-meta { display: flex; flex-direction: column; gap: 0.25rem; min-width: 140px; }
  .risk-filter-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.75rem; border-radius: 999px; background-color: rgba(255, 93, 0, 0.15); color: var(--accent-primary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(255, 93, 0, 0.35); }
  
  /* Custom Select */
  .custom-select-wrapper { position: relative; display: flex; align-items: center; }
  .custom-select { appearance: none; -webkit-appearance: none; padding: 0.75rem 2.5rem 0.75rem 1rem; border-radius: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.1); background-color: rgba(15, 23, 42, 0.7); outline: none; font-size: 0.95rem; color: var(--text-primary); cursor: pointer; min-width: 160px; font-weight: 600; transition: border-color 0.2s, box-shadow 0.2s; height: 3.125rem; }
  .custom-select:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.18); }
  .custom-select-arrow { position: absolute; right: 1rem; pointer-events: none; color: var(--text-secondary); }

  .search-wrapper { position: relative; flex: 1; min-width: 200px; }
  .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
  .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(15, 23, 42, 0.6); box-shadow: inset 0 0 0 1px transparent; outline: none; transition: box-shadow 0.2s, border-color 0.2s; font-size: 1rem; height: 3.125rem; color: var(--text-primary); }
  .search-input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.2); }

  .controls-actions { display: flex; align-items: center; gap: 0.75rem; margin-left: auto; flex-wrap: wrap; }
  
  .btn-primary { background-color: var(--accent-primary); color: white; padding: 0.75rem 1.5rem; border-radius: 0.85rem; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 12px 25px rgba(255, 93, 0, 0.25); transition: transform 0.1s, box-shadow 0.2s, background-color 0.2s; white-space: nowrap; height: 3.125rem; }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:hover { background-color: var(--accent-hover); box-shadow: 0 18px 30px rgba(255, 93, 0, 0.35); }
  
  .btn-secondary { background-color: rgba(15, 23, 42, 0.65); color: var(--text-primary); padding: 0.75rem 1.25rem; border-radius: 0.85rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: background 0.1s, border-color 0.2s; white-space: nowrap; height: 3.125rem; }
  .btn-secondary:hover { background-color: rgba(15, 23, 42, 0.9); border-color: rgba(255, 255, 255, 0.2); }

  .btn-stripe { background: linear-gradient(135deg, #635bff 0%, #7a73ff 45%, #917bff 100%); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 20px -12px rgba(99, 91, 255, 0.6); transition: transform 0.1s, box-shadow 0.2s; white-space: nowrap; height: 3.125rem; }
  .btn-stripe:hover { box-shadow: 0 10px 26px -14px rgba(99, 91, 255, 0.75); }
  .btn-stripe:active { transform: scale(0.98); }
  
  .btn-bulk-delete { background-color: rgba(248, 113, 113, 0.12); color: #f87171; border-color: rgba(248, 113, 113, 0.3); }
  .btn-bulk-delete:hover { background-color: rgba(248, 113, 113, 0.2); }

  /* Grid */
  .client-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem; padding-bottom: 5rem; }
  
  /* Cards */
  .card { background: var(--bg-panel); border-radius: 1rem; padding: 1.5rem; border: var(--glass-border); box-shadow: var(--shadow-soft); cursor: pointer; transition: all 0.2s ease; position: relative; backdrop-filter: blur(12px); }
  .card:hover { transform: translateY(-2px); box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4); border-color: rgba(255, 93, 0, 0.35); }
  .card.selected { border: 2px solid rgba(255, 93, 0, 0.6); background-color: rgba(255, 93, 0, 0.08); }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
  .icon-box { width: 3rem; height: 3rem; border-radius: 0.75rem; background-color: rgba(255, 93, 0, 0.15); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); transition: all 0.2s; }
  .card:hover .icon-box { background-color: var(--accent-primary); color: white; }
  .card-select-checkbox { width: 1.5rem; height: 1.5rem; border-radius: 0.35rem; border: 2px solid rgba(148, 163, 184, 0.4); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; background: rgba(15, 23, 42, 0.5); color: white; }
  .card-select-checkbox.checked { background-color: var(--accent-primary); border-color: var(--accent-primary); color: white; }
  .budget-badge { background-color: rgba(148, 163, 184, 0.15); color: var(--text-secondary); font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(148, 163, 184, 0.2); }
  .status-indicator { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-left: auto; margin-right: 0.5rem; padding: 0.25rem 0.5rem; border-radius: 999px; border: 1px solid transparent; }
  .status-active { color: #4ade80; background-color: rgba(22, 163, 74, 0.15); border-color: rgba(22, 163, 74, 0.3); }
  .status-paused { color: #facc15; background-color: rgba(234, 179, 8, 0.15); border-color: rgba(234, 179, 8, 0.3); }
  .status-cancelled { color: #f87171; background-color: rgba(248, 113, 113, 0.15); border-color: rgba(248, 113, 113, 0.3); }
  .card-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card-contact { color: var(--text-secondary); font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; }
  .info-stack { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .info-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); }
  .info-icon { color: var(--accent-primary); flex-shrink: 0; }
  .text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .additional-section { margin-top: 1.25rem; }
  .additional-controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
  .additional-add-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.75rem; border: 1px dashed rgba(148, 163, 184, 0.5); background-color: rgba(15, 23, 42, 0.5); color: var(--text-secondary); font-weight: 600; cursor: pointer; }
  .additional-add-btn:hover { border-color: rgba(255, 93, 0, 0.5); color: var(--accent-primary); background-color: rgba(255, 93, 0, 0.1); }
  .additional-select { min-width: 160px; height: 2.5rem; padding: 0.5rem 2.25rem 0.5rem 0.75rem; font-size: 0.9rem; }
  .card-footer { padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; }
  .service-tag { font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); }
  .view-link { color: var(--accent-primary); font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; border: none; background: none; cursor: pointer; transition: transform 0.2s; }
  .card:hover .view-link { transform: translateX(4px); }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1rem; z-index: 50; animation: fadeIn 0.2s ease-out; }
  /* Updated Modal Width: Increased max-width to 64rem (approx 1024px) for better breathing room */
  .modal-content { background: var(--bg-panel-strong); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.55); width: 100%; max-width: 64rem; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease-out; border: 1px solid rgba(255, 255, 255, 0.08); }
  .close-btn { position: absolute; right: 1rem; top: 1rem; padding: 0.5rem; color: var(--text-secondary); border-radius: 9999px; cursor: pointer; border: none; background: transparent; transition: all 0.2s; z-index: 10; }
  .close-btn:hover { background-color: rgba(255, 255, 255, 0.08); color: var(--text-primary); }
  .modal-body { padding: 2rem; }
  
  /* Modal Typography & Form */
  .modal-title { font-size: 1.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; word-break: break-word; }
  .tag-group { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .tag-primary { background-color: rgba(255, 93, 0, 0.15); color: var(--accent-primary); padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: 1px solid rgba(255, 93, 0, 0.35); }
  .tag-secondary { background-color: rgba(148, 163, 184, 0.15); color: var(--text-secondary); padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; border: 1px solid rgba(148, 163, 184, 0.2); }
  .tag-risk { background-color: rgba(248, 113, 113, 0.15); color: #f87171; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700; display: flex; align-items: center; gap: 0.35rem; border: 1px solid rgba(248, 113, 113, 0.35); text-transform: uppercase; letter-spacing: 0.04em; }
  
  .detail-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 1.5rem; }
  @media (min-width: 768px) { .detail-grid { grid-template-columns: 1fr 1fr; } }
  
  .section-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
  .info-box { background-color: rgba(15, 23, 42, 0.6); padding: 0.75rem; border-radius: 0.5rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; word-break: break-all; border: 1px solid rgba(255, 255, 255, 0.08); }
  .info-box-text { font-weight: 500; color: var(--text-primary); }
  .info-box-link { font-weight: 500; color: var(--text-primary); text-decoration: none; transition: color 0.2s; }
  .info-box-link:hover { color: var(--accent-primary); }
  
  .content-box { background-color: rgba(15, 23, 42, 0.55); padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1rem; }
  .box-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--text-primary); font-weight: 600; }
  .box-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap; }
  .dark-box { background-color: #0b1220; color: #cbd5e1; padding: 1rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.875rem; border: 1px solid rgba(255, 255, 255, 0.08); }
  .dark-box-header { color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-family: sans-serif; font-weight: 600; }
  
  /* Inputs in Edit Mode */
  .edit-input-lg { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; width: 100%; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(15, 23, 42, 0.7); padding: 0.5rem; border-radius: 0.65rem; outline: none; }
  .edit-input-lg:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 1px var(--accent-primary); }
  .edit-input-sm { background-color: rgba(15, 23, 42, 0.7); color: var(--text-primary); padding: 0.375rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.12); outline: none; width: 48%; }
  .edit-input-sm:focus { border-color: var(--accent-primary); }
  .edit-input-plain { background-color: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 0.375rem; padding: 0.375rem 0.5rem; outline: none; width: 100%; font-weight: 500; color: var(--text-primary); }
  .edit-input-plain:focus { border-color: var(--accent-primary); }
  .edit-textarea { width: 100%; background: rgba(15, 23, 42, 0.7); padding: 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.875rem; outline: none; font-family: inherit; color: var(--text-primary); line-height: 1.5; }
  .edit-textarea:focus { border-color: var(--accent-primary); }
  .edit-input-dark { width: 100%; background: #0b1220; color: white; border: 1px solid rgba(255, 255, 255, 0.12); padding: 0.5rem; border-radius: 0.375rem; outline: none; font-family: monospace; margin-bottom: 0.5rem; }
  .edit-input-dark:focus { border-color: var(--accent-primary); }
  
  /* Modal Actions */
  .modal-actions { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end; gap: 0.75rem; }
  .btn-ghost { background: transparent; color: var(--text-secondary); padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; border: 1px solid transparent; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { background-color: rgba(255, 255, 255, 0.08); color: var(--text-primary); border-color: rgba(255, 255, 255, 0.12); }
  .btn-danger { color: #f87171; background: transparent; padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; border: 1px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-danger:hover { background-color: rgba(248, 113, 113, 0.15); border-color: rgba(248, 113, 113, 0.35); }
  .btn-edit { background-color: rgba(15, 23, 42, 0.6); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.08); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-edit:hover { background-color: rgba(15, 23, 42, 0.85); border-color: rgba(255, 255, 255, 0.16); }
  .btn-sync { background: rgba(99, 91, 255, 0.2); color: #c7d2fe; padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; border: 1px solid rgba(99, 91, 255, 0.4); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-sync:hover { background-color: rgba(99, 91, 255, 0.32); }
  .btn-sync:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Delete Confirmation Styles */
  .delete-confirm-container { text-align: center; padding: 2rem 1rem; }
  .delete-icon-wrapper { width: 4rem; height: 4rem; background-color: rgba(248, 113, 113, 0.15); color: #f87171; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; border: 1px solid rgba(248, 113, 113, 0.35); }
  .delete-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
  .delete-desc { color: var(--text-secondary); margin-bottom: 2rem; max-width: 24rem; margin-left: auto; margin-right: auto; line-height: 1.5; }
  .delete-actions { display: flex; justify-content: center; gap: 1rem; }
  .btn-cancel-lg { padding: 0.75rem 2rem; background-color: rgba(15, 23, 42, 0.7); color: var(--text-primary); border-radius: 0.85rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.12); cursor: pointer; transition: background 0.2s, border-color 0.2s; }
  .btn-cancel-lg:hover { background-color: rgba(15, 23, 42, 0.9); border-color: rgba(255, 255, 255, 0.2); }
  .btn-delete-lg { padding: 0.75rem 2rem; background-color: #ef4444; color: white; border-radius: 0.85rem; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 0.5rem; }
  .btn-delete-lg:hover { background-color: #dc2626; }

  /* Import Review Styles */
  .import-review-container { padding: 1rem; }
  .import-review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .review-tabs { display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem; }
  .review-tab { padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; color: var(--text-secondary); background: transparent; border: 1px solid transparent; }
  .review-tab:hover { background-color: rgba(255, 255, 255, 0.08); }
  .review-tab.active { background-color: rgba(255, 93, 0, 0.15); color: var(--accent-primary); border-color: rgba(255, 93, 0, 0.35); }
  
  .review-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
  .review-table th { text-align: left; padding: 0.75rem; background-color: rgba(15, 23, 42, 0.8); color: var(--text-secondary); font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.08); white-space: nowrap; }
  .review-table td { padding: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: var(--text-primary); vertical-align: top; }
  .review-table tr:hover { background-color: rgba(255, 255, 255, 0.03); }
  .status-valid { display: flex; align-items: center; gap: 0.25rem; color: #16a34a; font-weight: 600; white-space: nowrap; }
  .status-error { display: flex; align-items: center; gap: 0.25rem; color: #ef4444; font-weight: 600; white-space: nowrap; }
  .error-text { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; }
  .review-actions { margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1rem; }
  .action-btn-mini { padding: 0.25rem 0.5rem; border-radius: 0.35rem; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(255, 93, 0, 0.35); cursor: pointer; display: flex; align-items: center; gap: 0.25rem; background-color: rgba(255, 93, 0, 0.15); color: var(--accent-primary); transition: all 0.2s; margin-top: 0.25rem; }
  .action-btn-mini:hover { background-color: rgba(255, 93, 0, 0.25); }

  /* Stripe Sync */
  .stripe-modal { display: flex; flex-direction: column; gap: 1.5rem; height: 100%; min-height: 0; }
  .stripe-modal-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
  .stripe-subtitle { color: var(--text-secondary); margin-top: 0.35rem; font-size: 0.95rem; max-width: 34rem; }
  .stripe-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; border-radius: 999px; background-color: rgba(99, 91, 255, 0.18); color: #a5b4fc; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid rgba(99, 91, 255, 0.35); }
  .stripe-stepper { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .stripe-step { padding: 0.5rem 0.75rem; border-radius: 0.75rem; background-color: rgba(15, 23, 42, 0.7); color: var(--text-secondary); font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem; border: 1px solid rgba(255, 255, 255, 0.08); }
  .stripe-step.active { background-color: rgba(99, 91, 255, 0.2); color: #c7d2fe; border-color: rgba(99, 91, 255, 0.5); }
  .stripe-step.complete { background-color: rgba(22, 163, 74, 0.18); color: #4ade80; border-color: rgba(22, 163, 74, 0.35); }
  .stripe-connect-card { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; padding: 1.5rem; display: grid; gap: 1.25rem; background: rgba(15, 23, 42, 0.6); }
  .stripe-feature-grid { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .stripe-feature { background-color: rgba(15, 23, 42, 0.6); border-radius: 0.75rem; padding: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 0.6rem; align-items: flex-start; }
  .stripe-feature-icon { width: 2rem; height: 2rem; border-radius: 0.65rem; background-color: rgba(99, 91, 255, 0.2); color: #c7d2fe; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stripe-key-input { width: 100%; padding: 0.85rem 1rem; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.95rem; font-family: inherit; background-color: rgba(15, 23, 42, 0.7); color: var(--text-primary); }
  .stripe-key-input:focus { outline: none; border-color: #635bff; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2); }
  .stripe-loading { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; padding: 2rem; text-align: center; background-color: rgba(15, 23, 42, 0.6); color: var(--text-secondary); }
  .stripe-loading-bar { height: 8px; border-radius: 999px; background: linear-gradient(90deg, #635bff, #a78bfa); margin-top: 1rem; overflow: hidden; position: relative; }
  .stripe-loading-bar::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.7), rgba(255,255,255,0.2)); animation: loadingSlide 1.2s infinite; }
  .stripe-results { display: flex; flex-direction: column; gap: 1rem; min-height: 0; flex: 1; }
  .stripe-results-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
  .stripe-results-meta { color: var(--text-secondary); font-size: 0.9rem; }
  .stripe-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; background-color: transparent; }
  .stripe-table th { text-align: left; padding: 0.75rem; background-color: rgba(15, 23, 42, 0.8); color: var(--text-secondary); font-weight: 700; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  .stripe-table td { padding: 0.85rem 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); vertical-align: top; color: var(--text-primary); }
  .stripe-table tr:hover { background-color: rgba(255, 255, 255, 0.03); }
  .stripe-match-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.5rem; border-radius: 999px; background-color: rgba(255, 93, 0, 0.15); color: #ff8c42; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0.35rem 0.35rem 0; border: 1px solid rgba(255, 93, 0, 0.35); }
  .stripe-customer-card { display: grid; gap: 0.2rem; }
  .stripe-customer-title { font-weight: 700; color: var(--text-primary); }
  .stripe-customer-sub { font-size: 0.8rem; color: var(--text-secondary); }
  .stripe-verify { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.6rem; border-radius: 0.6rem; background-color: rgba(22, 163, 74, 0.18); color: #4ade80; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(22, 163, 74, 0.35); }
  .stripe-review-actions { display: flex; justify-content: flex-end; gap: 0.75rem; flex-wrap: wrap; }
  .stripe-select-all { background: rgba(15, 23, 42, 0.7); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.4rem 0.75rem; border-radius: 0.6rem; font-weight: 600; cursor: pointer; }
  .stripe-select-all:hover { background-color: rgba(15, 23, 42, 0.9); }
  .stripe-row-disabled { opacity: 0.6; }
  .stripe-row-disabled .card-select-checkbox { cursor: not-allowed; }
  .stripe-row-disabled .stripe-verify { background-color: rgba(15, 23, 42, 0.6); color: var(--text-secondary); border-color: rgba(255, 255, 255, 0.1); }
  .stripe-summary-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.6rem; border-radius: 999px; background-color: rgba(148, 163, 184, 0.15); color: var(--text-secondary); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid rgba(148, 163, 184, 0.2); }
  .stripe-customer-badges { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .stripe-subscription-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.55rem; border-radius: 999px; background-color: rgba(99, 91, 255, 0.2); color: #c7d2fe; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(99, 91, 255, 0.35); }
  .stripe-no-match { color: var(--text-secondary); font-size: 0.8rem; font-style: italic; }
  .stripe-table-wrapper { flex: 1; min-height: 0; overflow: auto; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 23, 42, 0.55); }
  .stripe-merge-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); align-items: stretch; flex: 1; min-height: 0; }
  .stripe-merge-card { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; padding: 1.25rem; background: rgba(15, 23, 42, 0.6); display: flex; flex-direction: column; gap: 1rem; min-height: 0; }
  .stripe-merge-card h4 { margin: 0; font-size: 1rem; color: var(--text-primary); }
  .stripe-merge-note { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }
  .stripe-merge-actions { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
  .stripe-merge-search { min-width: min(320px, 100%); }
  .stripe-search-input { width: 100%; padding: 0.6rem 0.85rem; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.9rem; background-color: rgba(15, 23, 42, 0.6); color: var(--text-primary); }
  .stripe-search-input:focus { outline: none; border-color: #635bff; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15); }

  .stripe-modal-content { max-width: 90rem; width: min(96vw, 90rem); max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; }
  .stripe-modal-content .modal-body { flex: 1; overflow: hidden; }
  .stripe-modal { height: 100%; min-height: 0; }

  /* Aircall Login */
  .login-page { min-height: 100vh; background: var(--bg-dark); display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .login-card { width: min(520px, 100%); background: rgba(15, 23, 42, 0.6); border-radius: 1.5rem; padding: 2.5rem; box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.8); border: 1px solid var(--border-color); backdrop-filter: blur(14px); }
  .login-logo { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .login-logo img { width: 64px; height: 64px; background: var(--logo-bg); border-radius: 16px; padding: 0.45rem; box-shadow: 0 10px 15px -3px rgba(255, 93, 0, 0.4); }
  .login-title { font-size: 2.25rem; font-weight: 900; color: var(--text-primary); margin: 0 0 0.25rem; letter-spacing: -0.03em; }
  .login-subtitle { color: var(--text-secondary); margin: 0 0 1.5rem; line-height: 1.5; }
  .login-form { display: grid; gap: 1rem; }
  .login-input { width: 100%; padding: 0.95rem 1rem; border-radius: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.12); background-color: rgba(0, 0, 0, 0.35); font-size: 1rem; color: var(--text-primary); }
  .login-input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.2); }
  .login-textarea { width: 100%; min-height: 220px; padding: 1rem; border-radius: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.12); background-color: rgba(0, 0, 0, 0.35); font-size: 0.95rem; color: var(--text-primary); font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; line-height: 1.6; resize: vertical; }
  .login-textarea:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.2); }
  .login-instructions { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }
  .login-format { margin: 0.35rem 0 0; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; white-space: pre-line; }
  .login-helper { font-size: 0.85rem; color: var(--text-muted); }
  .login-card .form-label { color: var(--text-secondary); }
  .login-btn { position: relative; overflow: hidden; width: 100%; border: none; border-radius: 0.9rem; background: linear-gradient(135deg, #ff5d00 0%, #ff7a1a 100%); color: white; font-weight: 700; padding: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 18px 30px rgba(255, 93, 0, 0.35); }
  .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .login-btn-loading-bar { position: absolute; left: 0; bottom: 0; height: 4px; background-color: rgba(255, 255, 255, 0.75); animation: loadingSlide 1s infinite linear; }

  /* Global Loading Bar */
  .global-loading { position: sticky; top: 0; z-index: 30; background-color: rgba(15, 23, 42, 0.8); border-radius: 999px; overflow: hidden; height: 6px; margin-bottom: 1rem; border: 1px solid rgba(255, 255, 255, 0.08); }
  .global-loading-bar { height: 100%; background: linear-gradient(90deg, #ff5d00, #ffd08a); transition: width 0.3s ease; }
  .global-loading-label { font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.35rem; }

  /* Notifications */
  .toast-container { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 100; display: flex; flex-direction: column; gap: 0.75rem; }
  .toast { min-width: 260px; max-width: 360px; padding: 0.85rem 1rem; border-radius: 0.85rem; box-shadow: 0 15px 30px -15px rgba(0, 0, 0, 0.45); background: var(--bg-panel-strong); border-left: 4px solid #64748b; animation: slideInRight 0.25s ease; border: 1px solid rgba(255, 255, 255, 0.08); }
  .toast.success { border-left-color: #16a34a; }
  .toast.error { border-left-color: #ef4444; }
  .toast-title { font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
  .toast-message { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; }

  /* Detail Tabs */
  .detail-tabs { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  .detail-tab { padding: 0.5rem 1rem; border-radius: 0.75rem 0.75rem 0 0; background: transparent; border: none; font-weight: 700; color: var(--text-secondary); cursor: pointer; }
  .detail-tab.active { color: var(--accent-primary); border-bottom: 3px solid var(--accent-primary); background: rgba(255, 93, 0, 0.12); }

  .activity-tabs { display: flex; gap: 0.65rem; margin: 1rem 0 1.5rem; flex-wrap: wrap; }
  .activity-tab { padding: 0.45rem 0.95rem; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 23, 42, 0.6); color: var(--text-secondary); font-size: 0.8rem; font-weight: 700; cursor: pointer; }
  .activity-tab.active { background: rgba(255, 93, 0, 0.2); border-color: rgba(255, 93, 0, 0.4); color: var(--accent-primary); }
  .activity-section { margin-bottom: 2rem; }
  .activity-section-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .activity-section-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .activity-section-meta { color: var(--text-secondary); font-size: 0.8rem; }
  .email-card, .billing-card { background-color: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.08); display: grid; gap: 0.5rem; }
  .email-card-header, .billing-card-header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
  .email-card-title, .billing-card-title { font-weight: 700; color: var(--text-primary); }
  .email-card-meta, .billing-card-meta { color: var(--text-secondary); font-size: 0.85rem; display: grid; gap: 0.35rem; }
  .email-status { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.6rem; border-radius: 999px; background: rgba(22, 163, 74, 0.16); color: #4ade80; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid rgba(22, 163, 74, 0.35); }
  .billing-status { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.6rem; border-radius: 999px; background: rgba(99, 91, 255, 0.18); color: #c7d2fe; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid rgba(99, 91, 255, 0.35); }
  .billing-empty { background: rgba(15, 23, 42, 0.45); padding: 1.5rem; border-radius: 0.85rem; border: 1px dashed rgba(255, 255, 255, 0.16); color: var(--text-secondary); }

  .meta-panel { border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 23, 42, 0.6); padding: 1.5rem; box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35); }
  .meta-panel-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .meta-panel-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .meta-panel-helper { color: var(--text-secondary); font-size: 0.9rem; }
  .meta-source-pill { display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 999px; padding: 0.35rem 0.75rem; background: rgba(255, 93, 0, 0.12); border: 1px solid rgba(255, 93, 0, 0.35); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-primary); font-weight: 700; }
  .meta-form { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0.75rem; align-items: end; margin-top: 1rem; }
  .meta-input { height: 3rem; }
  .meta-submit { height: 3rem; padding: 0 1.25rem; }
  .meta-subtabs { display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); margin: 1.5rem 0 1rem; flex-wrap: wrap; }
  .meta-subtab { padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; }
  .meta-subtab.active { color: var(--accent-primary); border-color: rgba(255, 93, 0, 0.5); background: rgba(255, 93, 0, 0.16); }
  .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
  .meta-card { padding: 1rem; border-radius: 0.85rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); }
  .meta-card-label { color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 0.35rem; }
  .meta-card-value { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
  .meta-list { display: grid; gap: 0.75rem; }
  .meta-list-item { padding: 0.85rem 1rem; border-radius: 0.85rem; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); }
  .meta-list-title { font-weight: 700; margin-bottom: 0.25rem; }
  .meta-list-meta { color: var(--text-secondary); font-size: 0.85rem; display: grid; gap: 0.25rem; }
  .meta-error { margin-top: 1rem; padding: 1rem; border-radius: 0.85rem; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #fecaca; font-size: 0.85rem; }
  .meta-log { margin-top: 0.75rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.75rem; color: var(--text-secondary); white-space: pre-wrap; }
  .meta-range-pill { margin-top: 0.75rem; display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 999px; padding: 0.35rem 0.75rem; background: rgba(59, 130, 246, 0.14); border: 1px solid rgba(59, 130, 246, 0.3); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; font-weight: 700; }
  .meta-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
  .meta-lookup { border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 23, 42, 0.6); padding: 1.25rem; box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35); flex: 1; min-width: 280px; }
  .meta-lookup.compact { padding: 0.85rem 1rem; }
  .meta-lookup-title-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
  .meta-lookup-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .meta-lookup-helper { color: var(--text-secondary); font-size: 0.85rem; margin: 0.35rem 0 0; }
  .meta-lookup-form { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0.75rem; align-items: end; }
  .meta-tab-group { margin-top: 0.5rem; margin-bottom: 1.5rem; }

  .grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; width: 100%; margin-bottom: 2rem; }
  .glass-panel { background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35); }
  .text-small { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); font-weight: 700; }

  .tab-group { display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; width: 100%; }
  .tab-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: 0.85rem 1.35rem;
    font-weight: 700;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .tab-btn:hover { color: #fff; border-bottom-color: #3b82f6; background: rgba(59, 130, 246, 0.08); }
  .tab-btn.active { color: #fff; border-bottom-color: var(--accent-primary); background: rgba(255, 93, 0, 0.05); }

  .date-picker { display: flex; gap: 0.5rem; flex-wrap: wrap; background: rgba(0, 0, 0, 0.3); padding: 0.5rem; border-radius: 0.75rem; border: 1px solid var(--border-color); }
  .date-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
  }
  .date-btn.active { background: var(--accent-primary); color: white; }

  .data-table-wrapper { width: 100%; overflow-x: auto; }
  .data-table { width: 100%; border-collapse: collapse; text-align: left; }
  .data-table th {
    background: #000;
    padding: 1rem 1.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }
  .data-table td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.85rem;
    color: #cbd5e1;
    vertical-align: top;
  }
  .data-table tr:hover { background: rgba(255, 255, 255, 0.02); }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    text-transform: uppercase;
  }
  .badge-active { background: rgba(22, 163, 74, 0.1); color: #4ade80; border-color: rgba(22, 163, 74, 0.2); }
  .badge-paused { background: rgba(234, 179, 8, 0.1); color: #facc15; border-color: rgba(234, 179, 8, 0.2); }
  .badge-closed { background: rgba(255, 93, 0, 0.1); color: #ff8c42; border-color: rgba(255, 93, 0, 0.2); }
  .badge-main {
    background: rgba(234, 179, 8, 0.15);
    color: #facc15;
    border: 1px solid rgba(234, 179, 8, 0.3);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.6rem;
    font-weight: 800;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 8px;
  }

  .google-panel { border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(15, 23, 42, 0.6); padding: 1.5rem; box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35); }
  .google-panel-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .google-panel-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
  .google-panel-helper { color: var(--text-secondary); font-size: 0.9rem; }
  .google-source-pill { display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 999px; padding: 0.35rem 0.75rem; background: rgba(59, 130, 246, 0.16); border: 1px solid rgba(59, 130, 246, 0.35); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; font-weight: 700; }
  .google-form { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0.75rem; align-items: end; margin-top: 1rem; }
  .google-input { height: 3rem; }
  .google-submit { height: 3rem; padding: 0 1.25rem; }
  .google-subtabs { display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); margin: 1.5rem 0 1rem; flex-wrap: wrap; }
  .google-subtab { padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; }
  .google-subtab.active { color: #bfdbfe; border-color: rgba(59, 130, 246, 0.5); background: rgba(59, 130, 246, 0.18); }
  .google-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
  .google-card { padding: 1rem; border-radius: 0.85rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); }
  .google-card-label { color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 0.35rem; }
  .google-card-value { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
  .google-list { display: grid; gap: 0.75rem; }
  .google-list-item { padding: 0.85rem 1rem; border-radius: 0.85rem; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); }
  .google-list-title { font-weight: 700; margin-bottom: 0.25rem; }
  .google-list-meta { color: var(--text-secondary); font-size: 0.85rem; display: grid; gap: 0.25rem; }
  .google-error { margin-top: 1rem; padding: 1rem; border-radius: 0.85rem; background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.3); color: #fecaca; font-size: 0.85rem; }
  .google-log { margin-top: 0.75rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); font-family: ui-monospace, SFMono-Regular, monospace; font-size: 0.75rem; color: var(--text-secondary); white-space: pre-wrap; }
  .google-range-pill { margin-top: 0.75rem; display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 999px; padding: 0.35rem 0.75rem; background: rgba(59, 130, 246, 0.14); border: 1px solid rgba(59, 130, 246, 0.3); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; font-weight: 700; }

  /* Services Tab */
  .services-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .services-meta { font-size: 0.85rem; color: var(--text-secondary); }
  .services-grid { display: grid; gap: 1rem; }
  .service-card { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0.9rem; padding: 1rem; background: rgba(15, 23, 42, 0.6); box-shadow: 0 18px 30px -24px rgba(0, 0, 0, 0.6); display: grid; gap: 0.75rem; }
  .service-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
  .service-name { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
  .service-plan { font-size: 0.85rem; color: var(--text-secondary); }
  .service-status { padding: 0.25rem 0.55rem; border-radius: 999px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: rgba(22, 163, 74, 0.15); color: #4ade80; border: 1px solid rgba(22, 163, 74, 0.3); }
  .service-meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.5rem 1rem; font-size: 0.85rem; color: var(--text-secondary); }
  .service-chip-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .service-chip { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.6rem; border-radius: 999px; background-color: rgba(255, 93, 0, 0.15); color: #ff8c42; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(255, 93, 0, 0.35); }
  .service-empty { text-align: center; padding: 2rem 1rem; color: var(--text-secondary); background: rgba(15, 23, 42, 0.6); border-radius: 0.85rem; border: 1px dashed rgba(255, 255, 255, 0.12); }

  /* Recent Activity */
  .activity-summary { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .activity-list { display: grid; gap: 0.75rem; }
  .activity-card { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0.85rem; padding: 1rem; background: rgba(15, 23, 42, 0.6); display: grid; gap: 0.5rem; }
  .activity-header { display: flex; justify-content: space-between; gap: 0.5rem; align-items: center; }
  .activity-title { font-weight: 700; color: var(--text-primary); }
  .activity-meta { font-size: 0.85rem; color: var(--text-secondary); display: grid; gap: 0.25rem; }
  .activity-actions { display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem; flex-wrap: wrap; }
  .activity-btn { border: none; border-radius: 0.75rem; padding: 0.65rem 1rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; background: var(--accent-primary); color: white; }
  .activity-btn.secondary { background: rgba(15, 23, 42, 0.7); color: var(--text-primary); border: 1px solid rgba(255, 255, 255, 0.08); }
  .activity-empty { text-align: center; padding: 2rem 1rem; color: var(--text-secondary); background: rgba(15, 23, 42, 0.6); border-radius: 0.85rem; border: 1px dashed rgba(255, 255, 255, 0.12); }

  /* Error Grouping Styles */
  .error-group { margin-bottom: 1.5rem; border: 1px solid rgba(248, 113, 113, 0.35); border-radius: 0.5rem; overflow: hidden; }
  .error-group-header { background-color: rgba(248, 113, 113, 0.15); padding: 0.75rem 1rem; font-weight: 700; color: #f87171; display: flex; align-items: center; gap: 0.5rem; }
  .error-list { list-style: none; padding: 0; margin: 0; }
  .error-list-item { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(248, 113, 113, 0.2); background-color: rgba(15, 23, 42, 0.6); color: #fecaca; font-size: 0.875rem; display: flex; justify-content: space-between; }
  .error-list-item:last-child { border-bottom: none; }

  /* Form Inputs */
  .form-group { margin-bottom: 1rem; }
  .form-label { display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem; }
  .form-input { width: 100%; padding: 0.75rem; background-color: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 0.5rem; outline: none; transition: border 0.2s; color: var(--text-primary); }
  .form-input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 1px var(--accent-primary); }
  .full-width { grid-column: 1 / -1; }
  .btn-submit { width: 100%; background-color: var(--accent-primary); color: white; padding: 0.75rem; border-radius: 0.85rem; font-weight: 700; font-size: 1.125rem; border: none; cursor: pointer; box-shadow: 0 18px 30px rgba(255, 93, 0, 0.35); display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.2s; }
  .btn-submit:hover { background-color: var(--accent-hover); }

  /* Utilities & Mobile */
  .mobile-toggle { position: absolute; top: 1rem; right: 1rem; z-index: 50; padding: 0.5rem; background-color: rgba(15, 23, 42, 0.8); color: white; border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; box-shadow: 0 8px 20px -12px rgba(0, 0, 0, 0.6); }
  .hidden-on-desktop { display: none; }
  .empty-state { text-align: center; padding: 5rem 1rem; color: var(--text-secondary); }
  
  @media (max-width: 768px) {
    .hidden-on-desktop { display: block; }
    .sidebar { position: absolute; height: 100%; transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-content { padding: 0 1rem 1rem; }
    .controls { flex-direction: column; max-width: 100%; }
    .search-wrapper { width: 100%; }
    .btn-primary span { display: inline; }
    .import-grid { grid-template-columns: 1fr 1fr 1fr; }
    .modal-content { max-height: 85vh; }
    .review-table { display: block; overflow-x: auto; }
  }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes loadingSlide { 0% { width: 0; } 100% { width: 100%; } }
  @keyframes slideInRight { from { transform: translateX(12px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
`;

const AIRCALL_APP_ID = '827d006737dd9e69aaa89d6300a1a9f8';
const AIRCALL_BASE_URL = 'https://api.aircall.io/v1';
const AIRCALL_TEAM_NAME = 'Account Management';
const META_ACCESS_TOKEN_KEY = 'metaAccessToken';
const STRIPE_API_KEY_KEY = 'stripeApiKey';
const META_GRAPH_VERSION = 'v19.0';
const META_BASE_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}`;
const META_LOGO_URL = 'https://i.imgur.com/QjjDjuU.png';
const GOOGLE_ACCESS_TOKEN_KEY = 'googleAdsAccessToken';
const GOOGLE_DEVELOPER_TOKEN_KEY = 'googleAdsDeveloperToken';
const GOOGLE_LOGIN_CUSTOMER_ID_KEY = 'googleAdsLoginCustomerId';
const GOOGLE_ADS_BASE_URL = 'https://googleads.googleapis.com/v14';
const DEFAULT_GOOGLE_DEVELOPER_TOKEN = import.meta.env.VITE_GOOGLE_ADS_DEVELOPER_TOKEN || '';
const DEFAULT_GOOGLE_LOGIN_CUSTOMER_ID = import.meta.env.VITE_GOOGLE_ADS_LOGIN_CUSTOMER_ID || '';
const BRISBANE_TIME_ZONE = 'Australia/Brisbane';

// --- Seed Data ---
const SEED_DATA = [
  {
    id: '1',
    businessName: 'Chiswick Concrete Coating',
    contactName: 'Dean Chiswick',
    phone: '0426-329-1143',
    email: 'chiswickconcretecoatings@gmail.com',
    service: 'Epoxy Flooring, Concrete Resurfacing',
    location: 'NSW border to Southern Brisbane',
    budget: '$50/day',
    goals: 'Wants to retire in 2 years. Put on workers.',
    notes: 'Needs more work. Google Ads.',
    website: 'weebly.com',
    access: 'User: chiswickconcretecoatings@gmail.com',
    status: 'Active'
  },
  {
    id: '2',
    businessName: 'Northlakes District Towing',
    contactName: 'Tyson',
    phone: '0422 789 257',
    email: 'Tyson@brisra.com.au',
    service: 'Towing',
    location: 'North Lakes to Noosa',
    budget: '$100/day',
    goals: 'Wants the right calls to open door moving south.',
    notes: 'Schedule: 7.30AM to 12AM. Google Ads.',
    website: 'northlakestowing.com.au',
    access: 'cPanel available',
    status: 'Active'
  },
  {
    id: '3',
    businessName: 'Epoxy Creations',
    contactName: 'Shane Norman',
    phone: '0418 735 046',
    email: 'epoxycreations10@gmail.com',
    service: 'Epoxy Flooring',
    location: 'Gold Coast',
    budget: '$50/day',
    goals: 'Wants solid work to give ability to scale.',
    notes: 'Currently doing 2-3 per week.',
    website: 'epoxy-creations.com.au',
    access: 'WP Admin available',
    status: 'Active'
  },
  {
    id: '4',
    businessName: 'SPM Group Pty Ltd',
    contactName: 'Graham Bennett',
    phone: '0413 647 881',
    email: 'graham@spmgroup.com.au',
    service: 'Modular Buildings',
    location: 'Eastern Seaboard',
    budget: '$50/day',
    goals: 'Wants more enquiry',
    notes: 'Google Ads & SEO',
    website: 'spmgroup.com.au',
    access: 'WP Admin available',
    status: 'Active'
  },
  {
    id: '5',
    businessName: 'Affordable Tree & Stump',
    contactName: 'Jason',
    phone: '0475 185 296',
    email: 'jasondavidthomas1984@gmail.com',
    service: 'Arborist',
    location: 'South Adelaide',
    budget: '$50/day',
    goals: 'Wants more enquiry',
    notes: 'Can take more work. Google Ads.',
    website: 'Wordpress',
    access: 'GoDaddy access available',
    status: 'Active'
  },
  {
    id: '6',
    businessName: 'Alternative Direction',
    contactName: 'Bruce',
    phone: '0401 139 552',
    email: 'bruce_laing@hotmail.com',
    service: 'Psychologist',
    location: 'South West Brisbane',
    budget: '$50/day',
    goals: 'Needs more bums in seats',
    notes: 'Needs more work. Google Ads.',
    website: 'Wordpress',
    access: 'WP available',
    status: 'Active'
  },
  {
    id: '7',
    businessName: 'Cotewell',
    contactName: 'Jacob',
    phone: '0437 906 153',
    email: 'jacobh@cotewell.com.au',
    service: 'Industrial Flooring',
    location: 'Eastern Seaboard QLD and Inland',
    budget: '$75/day',
    goals: 'Needs more enquiry',
    notes: 'Google Ads.',
    website: 'cotewell.com.au',
    access: 'WP & Cpanel available',
    status: 'Active'
  },
  {
    id: '8',
    businessName: 'BTTD Plumbing',
    contactName: 'Michael',
    phone: '0434 686 954',
    email: 'admin@bttd.au',
    service: 'Plumbing',
    location: 'South Brisbane (Excl Ipswich/Logan)',
    budget: '$300/day',
    goals: 'Wants to grow',
    notes: 'SEO, Google Ads',
    website: 'bttd.au',
    access: 'WP Admin available',
    status: 'Active'
  },
  {
    id: '9',
    businessName: 'Auto Pro Finish',
    contactName: 'Bryan',
    phone: '0490 082 285',
    email: 'autoprofinish@outlook.com',
    service: 'Car Wraps',
    location: 'All of Melbourne',
    budget: '$100/day',
    goals: 'Wants to grow',
    notes: 'Google Ads.',
    website: 'review.testflight.com.au',
    access: 'Dashboard available',
    status: 'Active'
  },
  {
    id: '10',
    businessName: 'Shorefinish',
    contactName: 'Gemma & Simon',
    phone: '0468 438 842',
    email: 'gemma@shorefinish.com.au',
    service: 'Painting Domestic',
    location: 'Geelong',
    budget: '$100/day',
    goals: 'Wants to grow',
    notes: 'Google Ads.',
    website: 'shorefinish.com.au',
    access: 'WP Admin available',
    status: 'Active'
  },
  {
    id: '11',
    businessName: 'The Monogram Shop',
    contactName: 'Jonathan',
    phone: '02 9756 0981',
    email: 'Unavailable',
    service: 'Custom embroided robes',
    location: 'All Of Australia',
    budget: '$150/day',
    goals: 'Wants to optimise the account',
    notes: 'Can take on more. Google Ads.',
    website: 'monogramshop.com.au',
    access: 'Admin Dashboard available',
    status: 'Active'
  },
  {
    id: '12',
    businessName: 'Coastwide Gazebos',
    contactName: 'Paul',
    phone: '0422 295 900',
    email: 'office@coastwidegazebos.com.au',
    service: 'Gazebo and Bali Huts',
    location: 'Lake Macquarie and surrounding',
    budget: '$50/day',
    goals: 'Wants more work',
    notes: 'Google Ads. Old campaigns were unstable.',
    website: 'coastwidegazebos.com.au',
    access: 'User Admin available',
    status: 'Active'
  },
  {
    id: '13',
    businessName: 'Nick Brand Photography',
    contactName: 'Nick',
    phone: '0403 835 467',
    email: 'nick@nickbrandphotography.com',
    service: 'Photography (Corp, Pets, Dating)',
    location: 'Sydney and surrounds',
    budget: '$50/day',
    goals: 'Wants more work, optimise account',
    notes: 'Started new campaign.',
    website: 'nickbrandphotography.squarespace.com',
    access: 'Squarespace',
    status: 'Active'
  },
  {
    id: '14',
    businessName: 'Vision Grind & Polish',
    contactName: 'Sim',
    phone: '0422 730 522',
    email: 'sim@visiongrindandpolish.com',
    service: 'Concrete and Epoxy',
    location: 'Adelaide and most of SA',
    budget: '$50/day',
    goals: 'Wants more work, optimise account',
    notes: 'Started new campaign.',
    website: 'Not Listed',
    access: 'Not Listed',
    status: 'Active'
  },
  {
    id: '15',
    businessName: 'King Fish Glass',
    contactName: 'Jake',
    phone: '0422 616 923',
    email: 'jake@kingfishglass.com.au',
    service: 'Fencing / Pool Fencing',
    location: 'Victoria',
    budget: '$100/day',
    goals: 'Wants more work',
    notes: 'Google Ads.',
    website: 'kingfishglass.com.au',
    access: 'WP Admin',
    status: 'Active'
  },
  {
    id: '16',
    businessName: 'Oceanside Roof Painting',
    contactName: 'Sean',
    phone: '0449 155 564',
    email: 'Not Listed',
    service: 'Roof Painting/Repairs',
    location: 'Victoria/Geelong to Anglesea/Lara',
    budget: '$70/day',
    goals: 'Wants more work',
    notes: 'Started new campaign.',
    website: 'Not Listed',
    access: 'Not Listed',
    status: 'Active'
  },
  {
    id: '17',
    businessName: 'Water Damage Cleanup',
    contactName: 'Dan',
    phone: '0481 034 895',
    email: 'dan@rezor.com.au',
    service: 'Water damage cleanup',
    location: 'Rockhampton to Byron Bay',
    budget: '$150/day',
    goals: 'Wants more work',
    notes: 'Google Ads.',
    website: 'waterdamagecleanup.com.au',
    access: 'WP Admin',
    status: 'Active'
  },
  {
    id: '18',
    businessName: 'Clean Freaks AU',
    contactName: 'Jonathan',
    phone: '0461 408 960',
    email: 'info@cleanfreaks.au',
    service: 'Cleaner (Deep/End of lease)',
    location: 'All of Melbourne',
    budget: '$150/day Res | 50/day Comm',
    goals: 'Wants to sell the business',
    notes: 'Restructured existing campaigns.',
    website: 'Not Listed',
    access: 'Not Listed',
    status: 'Active'
  },
  {
    id: '19',
    businessName: 'Supreme Quilts',
    contactName: 'Shane Grimwade',
    phone: '0433 690 344',
    email: 'supreme_quilts_enquiries@email.com',
    service: 'Bedding Supplies',
    location: 'Aus, USA, Malaysia, Philippines',
    budget: '$1200/day',
    goals: 'Wants more sales, break into USA',
    notes: 'Restructured existing campaigns.',
    website: 'Not Listed',
    access: 'Not Listed',
    status: 'Active'
  },
  {
    id: '20',
    businessName: 'Brisbane Car Centre',
    contactName: 'Mohammed',
    phone: '0451 122 518',
    email: 'info@brisbanecarcentre.com.au',
    service: 'Buys and sells cars',
    location: 'All of Brisbane',
    budget: '$50/day',
    goals: 'Wants more work',
    notes: 'Made New Campaign in Prudent ads account',
    website: 'brisbanecarcentre.com.au',
    access: 'WP Admin',
    status: 'Active'
  }
];

// --- Components ---

const Modal = ({ isOpen, onClose, children, className = '' }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`.trim()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  // State
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('purgeClients');
      return saved ? JSON.parse(saved) : SEED_DATA;
    } catch {
      return SEED_DATA;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [riskFilterDraft, setRiskFilterDraft] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientIds, setSelectedClientIds] = useState(new Set());
  const [bulkActionType, setBulkActionType] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStripeSyncOpen, setIsStripeSyncOpen] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState(() => localStorage.getItem(STRIPE_API_KEY_KEY) || '');
  const [stripeSyncStage, setStripeSyncStage] = useState('review');
  const [stripeMatches, setStripeMatches] = useState([]);
  const [stripeMatchSelection, setStripeMatchSelection] = useState(new Set());
  const [stripeMergeSelection, setStripeMergeSelection] = useState({
    stripeCustomerId: '',
    clientId: ''
  });
  const [stripeCustomerMergeSearch, setStripeCustomerMergeSearch] = useState('');
  const [stripeClientMergeSearch, setStripeClientMergeSearch] = useState('');
  const [stripeSyncStats, setStripeSyncStats] = useState({
    source: '',
    total: 0,
    matched: 0,
    unmatched: 0
  });
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('Clients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Edit & Delete Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const fileInputRef = useRef(null);

  // Aircall Auth & Activity
  const [aircallToken, setAircallToken] = useState(() => localStorage.getItem('aircallToken') || '');
  const [aircallAppId, setAircallAppId] = useState(() => localStorage.getItem('aircallAppId') || AIRCALL_APP_ID);
  const [loginCredentialsInput, setLoginCredentialsInput] = useState('');
  const [aircallTokenInput, setAircallTokenInput] = useState('');
  const [aircallAppIdInput, setAircallAppIdInput] = useState(() => localStorage.getItem('aircallAppId') || AIRCALL_APP_ID);
  const [isAircallLoggedIn, setIsAircallLoggedIn] = useState(() => Boolean(localStorage.getItem('aircallToken')));
  const [metaAccessToken, setMetaAccessToken] = useState(() => localStorage.getItem(META_ACCESS_TOKEN_KEY) || '');
  const [metaTokenInput, setMetaTokenInput] = useState(() => localStorage.getItem(META_ACCESS_TOKEN_KEY) || '');
  const [isMetaLoggedIn, setIsMetaLoggedIn] = useState(() => Boolean(localStorage.getItem(META_ACCESS_TOKEN_KEY)));
  const [googleAccessToken, setGoogleAccessToken] = useState(() => localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY) || '');
  const [googleTokenInput, setGoogleTokenInput] = useState(() => localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY) || '');
  const [googleDeveloperToken, setGoogleDeveloperToken] = useState(
    () => localStorage.getItem(GOOGLE_DEVELOPER_TOKEN_KEY) || DEFAULT_GOOGLE_DEVELOPER_TOKEN
  );
  const [googleDeveloperTokenInput, setGoogleDeveloperTokenInput] = useState(
    () => localStorage.getItem(GOOGLE_DEVELOPER_TOKEN_KEY) || DEFAULT_GOOGLE_DEVELOPER_TOKEN
  );
  const [googleLoginCustomerId, setGoogleLoginCustomerId] = useState(
    () => localStorage.getItem(GOOGLE_LOGIN_CUSTOMER_ID_KEY) || DEFAULT_GOOGLE_LOGIN_CUSTOMER_ID
  );
  const [googleLoginCustomerIdInput, setGoogleLoginCustomerIdInput] = useState(
    () => localStorage.getItem(GOOGLE_LOGIN_CUSTOMER_ID_KEY) || DEFAULT_GOOGLE_LOGIN_CUSTOMER_ID
  );
  const [isSubmittingAircallToken, setIsSubmittingAircallToken] = useState(false);
  const [aircallActivity, setAircallActivity] = useState({});
  const [toast, setToast] = useState(null);
  const [clientDetailTab, setClientDetailTab] = useState('overview');
  const [clientActivityTab, setClientActivityTab] = useState('contact');
  const [clientMetaTab, setClientMetaTab] = useState('overview');
  const [metaAccountInput, setMetaAccountInput] = useState('');
  const [metaDateRange, setMetaDateRange] = useState({ label: '30 Days', days: 30 });
  const [metaByClient, setMetaByClient] = useState({});
  const [clientGoogleTab, setClientGoogleTab] = useState('overview');
  const [googleAccountInput, setGoogleAccountInput] = useState('');
  const [googleByClient, setGoogleByClient] = useState({});
  const [stripeClientSyncing, setStripeClientSyncing] = useState(false);

  // Import Review State
  const [isImportReviewOpen, setIsImportReviewOpen] = useState(false);
  const [importReviewTab, setImportReviewTab] = useState('list'); // 'list' or 'errors'
  const [importReviewStep, setImportReviewStep] = useState('review'); // 'phone_check' | 'review'
  const [pendingImports, setPendingImports] = useState([]);
  const [phoneFormatSelection, setPhoneFormatSelection] = useState(new Set());

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('purgeClients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (selectedClient) {
      setClientDetailTab('overview');
      setClientActivityTab('contact');
      setClientMetaTab('overview');
      setClientGoogleTab('overview');
      const storedMeta = metaByClient[selectedClient.id];
      setMetaAccountInput(storedMeta?.accountId || selectedClient.metaAccountId || '');
      const storedGoogle = googleByClient[selectedClient.id];
      setGoogleAccountInput(storedGoogle?.accountId || selectedClient.googleAccountId || '');
    }
  }, [googleByClient, metaByClient, selectedClient]);


  // Form State
  const [newClient, setNewClient] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    service: '',
    location: '',
    budget: '',
    goals: '',
    notes: '',
    website: '',
    access: '',
    status: 'Active'
  });

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  const metaDateOptions = useMemo(() => ([
    { label: 'Today', days: 1 },
    { label: '7 Days', days: 7 },
    { label: '30 Days', days: 30 },
    { label: 'All Time', days: 'all' }
  ]), []);

  const isValueMissing = (value) => {
    if (value === null || value === undefined) return true;
    const trimmed = String(value).trim();
    return trimmed === '' || trimmed.toLowerCase() === 'not listed' || trimmed.toLowerCase() === 'unavailable';
  };

  const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) return 'Unknown duration';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const formatDateTime = (value) => {
    if (!value) return 'Unknown date';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleString('en-AU', {
      timeZone: BRISBANE_TIME_ZONE,
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const normalizePhoneNumber = (phone) => {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
  };

  const normalizeValue = (value) => (value || '').toString().trim().toLowerCase();
  const normalizeEmail = (email) => normalizeValue(email);

  const formatCurrency = (amount, currency = 'usd') => {
    if (amount === null || amount === undefined || Number.isNaN(amount)) return '—';
    const safeCurrency = currency ? currency.toUpperCase() : 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: safeCurrency
    }).format(amount / 100);
  };

  const formatDateShort = (value) => {
    if (!value) return 'Unknown date';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleDateString('en-AU', {
      timeZone: BRISBANE_TIME_ZONE
    });
  };

  const buildSentEmailActivity = (client) => {
    if (!client) return [];
    if (Array.isArray(client.sentEmails) && client.sentEmails.length > 0) {
      return client.sentEmails;
    }
    const baseEmail = !isValueMissing(client.email)
      ? client.email
      : `hello@${(client.businessName || 'client').toLowerCase().replace(/\s+/g, '')}.com`;
    const today = new Date();
    return [
      {
        id: `${client.id}-email-1`,
        subject: 'Monthly performance recap',
        to: baseEmail,
        preview: 'Shared campaign highlights, lead quality, and proposed next steps.',
        status: 'Sent',
        sentAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 9, 15).toISOString()
      },
      {
        id: `${client.id}-email-2`,
        subject: 'Creative approvals needed',
        to: baseEmail,
        preview: 'Awaiting feedback on the latest creative assets before launch.',
        status: 'Sent',
        sentAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 16, 45).toISOString()
      }
    ];
  };

  const normalizeMetaError = (error) => {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return String(error);
    }
  };

  const normalizeGoogleError = (error) => {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.error?.message) return error.error.message;
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return String(error);
    }
  };

  const buildClientMetaSnapshot = (client) => {
    if (!client) return null;
    const overview = client.metaOverview || client.overview || client.metaRiskOverview || null;
    const metrics = client.metaMetrics || client.metrics || client.performance || null;
    const team = Array.isArray(client.metaTeam) ? client.metaTeam : Array.isArray(client.team) ? client.team : [];
    const changeHistory = Array.isArray(client.metaChangeHistory)
      ? client.metaChangeHistory
      : Array.isArray(client.changeHistory)
        ? client.changeHistory
        : [];
    if (!overview && !metrics && team.length === 0 && changeHistory.length === 0) return null;
    return { overview, metrics, team, changeHistory };
  };

  const buildClientGoogleSnapshot = (client) => {
    if (!client) return null;
    const overview = client.googleOverview || client.googleAdsOverview || client.overview || null;
    const metrics = client.googleMetrics || client.googleAdsMetrics || client.performance || null;
    const team = Array.isArray(client.googleTeam) ? client.googleTeam : Array.isArray(client.team) ? client.team : [];
    const changeHistory = Array.isArray(client.googleChangeHistory)
      ? client.googleChangeHistory
      : Array.isArray(client.changeHistory)
        ? client.changeHistory
        : [];
    if (!overview && !metrics && team.length === 0 && changeHistory.length === 0) return null;
    return { overview, metrics, team, changeHistory };
  };

  const isMetaSnapshotComplete = (snapshot) => {
    if (!snapshot) return false;
    const hasOverview = snapshot.overview && Object.keys(snapshot.overview).length > 0;
    const hasMetrics = snapshot.metrics && Object.keys(snapshot.metrics).length > 0;
    const hasTeam = Array.isArray(snapshot.team) && snapshot.team.length > 0;
    const hasChangeHistory = Array.isArray(snapshot.changeHistory) && snapshot.changeHistory.length > 0;
    return hasOverview && hasMetrics && hasTeam && hasChangeHistory;
  };

  const isGoogleSnapshotComplete = (snapshot) => {
    if (!snapshot) return false;
    const hasOverview = snapshot.overview && Object.keys(snapshot.overview).length > 0;
    const hasMetrics = snapshot.metrics && Object.keys(snapshot.metrics).length > 0;
    const hasTeam = Array.isArray(snapshot.team) && snapshot.team.length > 0;
    const hasChangeHistory = Array.isArray(snapshot.changeHistory) && snapshot.changeHistory.length > 0;
    return hasOverview && hasMetrics && hasTeam && hasChangeHistory;
  };

  const mergeMetaSnapshots = (primary, fallback) => {
    if (!primary) return fallback;
    if (!fallback) return primary;
    return {
      overview: primary.overview || fallback.overview,
      metrics: primary.metrics || fallback.metrics,
      team: primary.team?.length ? primary.team : fallback.team || [],
      changeHistory: primary.changeHistory?.length ? primary.changeHistory : fallback.changeHistory || []
    };
  };

  const mergeGoogleSnapshots = (primary, fallback) => {
    if (!primary) return fallback;
    if (!fallback) return primary;
    return {
      overview: primary.overview || fallback.overview,
      metrics: primary.metrics || fallback.metrics,
      team: primary.team?.length ? primary.team : fallback.team || [],
      changeHistory: primary.changeHistory?.length ? primary.changeHistory : fallback.changeHistory || []
    };
  };

  const parseGoogleAdsStream = (payload) => {
    if (!Array.isArray(payload)) return [];
    return payload.flatMap(chunk => chunk?.results || []);
  };

  const formatGoogleMicros = (micros, currency) => {
    const numeric = Number(micros);
    if (!Number.isFinite(numeric)) return 'Unavailable';
    const amount = numeric / 1_000_000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const formatGoogleRate = (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 'Unavailable';
    return `${(numeric * 100).toFixed(2)}%`;
  };

  const callMetaAPI = async (endpoint, params = {}) => {
    if (!metaAccessToken) {
      throw new Error('Meta access token is missing. Please connect Meta from the login screen.');
    }
    const queryParams = new URLSearchParams({ access_token: metaAccessToken, ...params });
    const response = await fetch(`${META_BASE_URL}${endpoint}?${queryParams.toString()}`);
    const data = await response.json();
    if (!response.ok || data?.error) {
      throw data?.error || new Error('Meta API request failed.');
    }
    return data;
  };

  const fetchMetaSnapshot = async (accountId) => {
    const errorLogs = [];
    let overview = null;
    let metrics = null;
    let changeHistory = [];
    let team = [];

    try {
      overview = await callMetaAPI(`/${accountId}`, {
        fields: 'name,account_id,account_status,currency,amount_spent,balance,business_name,timezone_name,created_time'
      });
    } catch (error) {
      errorLogs.push(`Overview error: ${normalizeMetaError(error)}`);
    }

    try {
      const insights = await callMetaAPI(`/${accountId}/insights`, {
        fields: 'spend,impressions,clicks,ctr,cpc,cpm,actions',
        date_preset: 'last_30d',
        limit: 1
      });
      metrics = insights?.data?.[0] || null;
    } catch (error) {
      errorLogs.push(`Metrics error: ${normalizeMetaError(error)}`);
    }

    try {
      const activity = await callMetaAPI(`/${accountId}/activities`, {
        fields: 'event_time,event_type,actor_id,actor_name,object_name,object_type,translated_event_type,application_name',
        limit: 50
      });
      changeHistory = activity?.data || [];
      const uniqueMembers = new Map();
      changeHistory.forEach((log, index) => {
        const key = log.actor_id || log.actor_name || `actor-${index}`;
        if (!uniqueMembers.has(key)) {
          uniqueMembers.set(key, {
            id: log.actor_id || `actor-${index}`,
            name: log.actor_name || 'Unknown user',
            role: log.application_name || 'Meta',
            accessLabels: [log.translated_event_type || log.event_type || 'Change history']
          });
        }
      });
      team = Array.from(uniqueMembers.values());
    } catch (error) {
      errorLogs.push(`Change history error: ${normalizeMetaError(error)}`);
    }

    const snapshot = { overview, metrics, team, changeHistory };
    const missingFields = [];
    if (!overview) missingFields.push('overview');
    if (!metrics) missingFields.push('metrics');
    if (!team.length) missingFields.push('team');
    if (!changeHistory.length) missingFields.push('changeHistory');
    if (missingFields.length > 0) {
      errorLogs.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return { snapshot, errorLogs };
  };

  const callGoogleAdsAPI = async (customerId, query) => {
    if (!googleAccessToken) {
      throw new Error('Google Ads access token is missing. Add it from the login screen to continue.');
    }
    if (!googleDeveloperToken) {
      throw new Error('Google Ads developer token is missing. Add it from the login screen to continue.');
    }
    const headers = {
      Authorization: `Bearer ${googleAccessToken}`,
      'developer-token': googleDeveloperToken,
      'Content-Type': 'application/json'
    };
    if (googleLoginCustomerId) {
      headers['login-customer-id'] = googleLoginCustomerId;
    }
    const response = await fetch(`${GOOGLE_ADS_BASE_URL}/customers/${customerId}/googleAds:searchStream`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    if (!response.ok || data?.error) {
      throw data?.error || new Error('Google Ads API request failed.');
    }
    return data;
  };

  const fetchGoogleSnapshot = async (customerId) => {
    const errorLogs = [];
    let overview = null;
    let metrics = null;
    let changeHistory = [];
    let team = [];

    try {
      const payload = await callGoogleAdsAPI(
        customerId,
        'SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.status FROM customer LIMIT 1'
      );
      const results = parseGoogleAdsStream(payload);
      const customer = results?.[0]?.customer || null;
      overview = customer
        ? {
            id: customer.id,
            name: customer.descriptive_name,
            currency_code: customer.currency_code,
            time_zone: customer.time_zone,
            status: customer.status
          }
        : null;
    } catch (error) {
      errorLogs.push(`Overview error: ${normalizeGoogleError(error)}`);
    }

    try {
      const payload = await callGoogleAdsAPI(
        customerId,
        'SELECT metrics.impressions, metrics.clicks, metrics.ctr, metrics.average_cpc, metrics.average_cpm, metrics.cost_micros FROM customer WHERE segments.date DURING LAST_30_DAYS'
      );
      const results = parseGoogleAdsStream(payload);
      metrics = results?.[0]?.metrics || null;
    } catch (error) {
      errorLogs.push(`Metrics error: ${normalizeGoogleError(error)}`);
    }

    try {
      const payload = await callGoogleAdsAPI(
        customerId,
        'SELECT change_event.change_date_time, change_event.user_email, change_event.change_resource_name, change_event.change_resource_type, change_event.resource_name, change_event.client_type FROM change_event WHERE change_event.change_date_time DURING LAST_30_DAYS LIMIT 50'
      );
      const results = parseGoogleAdsStream(payload);
      changeHistory = results.map(item => item.changeEvent).filter(Boolean);
      const uniqueMembers = new Map();
      changeHistory.forEach((log, index) => {
        const key = log.userEmail || `user-${index}`;
        if (!uniqueMembers.has(key)) {
          uniqueMembers.set(key, {
            id: key,
            name: log.userEmail || 'Unknown user',
            role: log.changeResourceType || 'Google Ads',
            accessLabels: [log.clientType || 'Account access']
          });
        }
      });
      team = Array.from(uniqueMembers.values());
    } catch (error) {
      errorLogs.push(`Change history error: ${normalizeGoogleError(error)}`);
    }

    try {
      const payload = await callGoogleAdsAPI(
        customerId,
        'SELECT customer_user_access.user_id, customer_user_access.user_email, customer_user_access.access_role FROM customer_user_access'
      );
      const results = parseGoogleAdsStream(payload);
      const accessRows = results.map(item => item.customerUserAccess).filter(Boolean);
      if (accessRows.length > 0) {
        team = accessRows.map((row, index) => ({
          id: row.userId || row.userEmail || `member-${index}`,
          name: row.userEmail || 'Unknown user',
          role: row.accessRole || 'Google Ads access',
          accessLabels: [row.accessRole || 'Access role']
        }));
      }
    } catch (error) {
      errorLogs.push(`Team access error: ${normalizeGoogleError(error)}`);
    }

    const snapshot = { overview, metrics, team, changeHistory };
    const missingFields = [];
    if (!overview) missingFields.push('overview');
    if (!metrics) missingFields.push('metrics');
    if (!team.length) missingFields.push('team');
    if (!changeHistory.length) missingFields.push('changeHistory');
    if (missingFields.length > 0) {
      errorLogs.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return { snapshot, errorLogs };
  };

  const parseAircallTimestamp = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') {
      return value < 1e12 ? value * 1000 : value;
    }
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      const numeric = Number(value);
      return numeric < 1e12 ? numeric * 1000 : numeric;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.getTime();
  };

  const getBrisbaneNow = () => {
    const now = new Date();
    const brisbaneString = now.toLocaleString('en-AU', { timeZone: BRISBANE_TIME_ZONE });
    return new Date(brisbaneString);
  };

  const getBrisbaneRange = (daysBack) => {
    const end = getBrisbaneNow();
    const start = new Date(end);
    start.setDate(start.getDate() - daysBack);
    return { start, end };
  };

  const getMonthlyRecurringRevenue = (subscriptions = []) => subscriptions.reduce((total, subscription) => {
    const amount = subscription.amount || 0;
    const quantity = subscription.quantity || 1;
    const interval = subscription.interval || 'month';
    let monthlyAmount = amount;
    if (interval === 'year') {
      monthlyAmount = amount / 12;
    } else if (interval === 'week') {
      monthlyAmount = amount * 4;
    } else if (interval === 'day') {
      monthlyAmount = amount * 30;
    }
    return total + monthlyAmount * quantity;
  }, 0);

  const buildStripeFixtureCustomers = () => {
    const planCatalog = [
      { name: 'Growth Retainer', amount: 150000, interval: 'month' },
      { name: 'Performance Plus', amount: 245000, interval: 'month' },
      { name: 'Enterprise Scale', amount: 480000, interval: 'month' },
      { name: 'Local SEO Boost', amount: 99000, interval: 'month' }
    ];

    const statusPool = ['active', 'trialing', 'past_due', 'canceled', 'paused'];

    const addDays = (date, days) => {
      const next = new Date(date);
      next.setDate(next.getDate() + days);
      return next;
    };

    const today = new Date();
    const baseCustomers = clients.slice(0, 8).map((client, index) => {
      const subscriptionCount = (index % 2) + 1;
      const subscriptions = Array.from({ length: subscriptionCount }).map((_, subIndex) => {
        const plan = planCatalog[(index + subIndex) % planCatalog.length];
        const status = statusPool[(index + subIndex) % statusPool.length];
        return {
          id: `sub_fixture_${client.id}_${subIndex}`,
          status,
          product: plan.name,
          amount: plan.amount,
          currency: 'usd',
          interval: plan.interval,
          quantity: subIndex + 1,
          startedAt: addDays(today, -90 - subIndex * 30).toISOString(),
          currentPeriodEnd: addDays(today, 15 + subIndex * 15).toISOString(),
          cancelAt: status === 'canceled' ? addDays(today, -5).toISOString() : null,
          pausedAt: status === 'paused' ? addDays(today, -3).toISOString() : null
        };
      });

      return {
        id: `cus_fixture_${client.id}`,
        name: client.contactName || `Billing - ${client.businessName}`,
        company: client.businessName,
        phone: client.phone,
        email: client.email || `billing@${client.businessName.toLowerCase().replace(/\s+/g, '')}.com`,
        currency: 'usd',
        created: Math.floor(addDays(today, -365 - index * 12).getTime() / 1000),
        subscriptions
      };
    });

    const extraCustomers = [
      {
        id: 'cus_fixture_renewal',
        name: 'Kayla Pearson',
        company: 'Renewal Plumbing Co',
        phone: '+61 412 993 441',
        email: 'kayla@renewalplumbing.com',
        currency: 'usd',
        created: Math.floor(addDays(today, -420).getTime() / 1000),
        subscriptions: [
          {
            id: 'sub_fixture_renewal_1',
            status: 'canceled',
            product: 'Emergency Response',
            amount: 185000,
            currency: 'usd',
            interval: 'month',
            quantity: 1,
            startedAt: addDays(today, -120).toISOString(),
            currentPeriodEnd: addDays(today, 10).toISOString(),
            cancelAt: addDays(today, -8).toISOString()
          }
        ]
      },
      {
        id: 'cus_fixture_lumina',
        name: 'Liam Rogers',
        company: 'Lumina Events',
        phone: '+61 400 221 815',
        email: 'billing@luminaevents.com',
        currency: 'usd',
        created: Math.floor(addDays(today, -280).getTime() / 1000),
        subscriptions: [
          {
            id: 'sub_fixture_lumina_1',
            status: 'paused',
            product: 'Launch Accelerator',
            amount: 125000,
            currency: 'usd',
            interval: 'month',
            quantity: 1,
            startedAt: addDays(today, -60).toISOString(),
            currentPeriodEnd: addDays(today, 22).toISOString(),
            pausedAt: addDays(today, -4).toISOString()
          }
        ]
      },
      {
        id: 'cus_fixture_idle',
        name: 'Marisol Drake',
        company: 'Harbor & Co Events',
        phone: '+61 412 333 222',
        email: 'accounts@harborco.com',
        currency: 'usd',
        created: Math.floor(addDays(today, -190).getTime() / 1000),
        subscriptions: []
      }
    ];

    return [...baseCustomers, ...extraCustomers];
  };

  const buildStripeCustomerRecords = (customers = [], subscriptions = []) => {
    const byCustomer = new Map();
    customers.forEach(customer => {
      if (!customer?.id) return;
      byCustomer.set(customer.id, {
        id: customer.id,
        name: customer.name || customer.description || customer.email || 'Unnamed customer',
        company: customer.name || customer.description || '',
        phone: customer.phone || '',
        email: customer.email || '',
        currency: customer.currency || 'usd',
        subscriptions: []
      });
    });

    subscriptions.forEach(subscription => {
      const customer = typeof subscription.customer === 'string' ? { id: subscription.customer } : subscription.customer || {};
      if (!customer.id) return;
      const existing = byCustomer.get(customer.id) || {
        id: customer.id,
        name: customer.name || customer.description || 'Unnamed customer',
        company: customer.name || customer.description || '',
        phone: customer.phone || '',
        email: customer.email || '',
        currency: subscription.currency || 'usd',
        subscriptions: []
      };
      existing.subscriptions.push({
        id: subscription.id,
        status: subscription.status,
        product: subscription.plan?.nickname || subscription.plan?.product || subscription.plan?.id || 'Subscription',
        amount: subscription.plan?.amount || subscription.items?.data?.[0]?.plan?.amount || 0,
        currency: subscription.currency || subscription.plan?.currency || 'usd',
        interval: subscription.plan?.interval || subscription.items?.data?.[0]?.plan?.interval || 'month',
        quantity: subscription.quantity || subscription.items?.data?.[0]?.quantity || 1,
        startedAt: subscription.start_date ? new Date(subscription.start_date * 1000).toISOString() : null,
        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
        canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
        pauseBehavior: subscription.pause_collection?.behavior || null
      });
      byCustomer.set(customer.id, existing);
    });

    return Array.from(byCustomer.values());
  };

  const buildStripeBillingActivity = (subscriptions = [], invoices = [], billingEmail = '') => {
    const subscriptionItems = subscriptions.map(subscription => ({
      id: subscription.id,
      type: 'Subscription',
      title: subscription.product || 'Subscription',
      status: subscription.status || 'active',
      product: subscription.product || 'Subscription',
      amount: subscription.amount || 0,
      currency: subscription.currency || 'usd',
      interval: subscription.interval || 'month',
      quantity: subscription.quantity || 1,
      date: subscription.startedAt || subscription.currentPeriodEnd || null,
      email: billingEmail || ''
    }));

    const invoiceItems = invoices.map(invoice => {
      const firstLine = invoice.lines?.data?.[0] || {};
      const lineProduct = firstLine.price?.product?.name || firstLine.description || 'Invoice item';
      const invoiceAmount = invoice.amount_paid ?? invoice.amount_due ?? invoice.total ?? 0;
      return {
        id: invoice.id,
        type: 'Invoice',
        title: invoice.number ? `Invoice ${invoice.number}` : 'Invoice',
        status: invoice.status || 'open',
        amount: invoiceAmount,
        currency: invoice.currency || 'usd',
        interval: null,
        quantity: 1,
        date: invoice.created ? new Date(invoice.created * 1000).toISOString() : null,
        email: invoice.customer_email || billingEmail || '',
        product: lineProduct
      };
    });

    return [...invoiceItems, ...subscriptionItems].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  };

  const mergeStripeBillingActivity = (existing = [], incoming = []) => {
    const merged = new Map();
    existing.forEach(item => {
      if (item?.id) merged.set(item.id, item);
    });
    incoming.forEach(item => {
      if (item?.id && !merged.has(item.id)) {
        merged.set(item.id, item);
      }
    });
    return Array.from(merged.values());
  };

  const fetchStripeCustomerDetails = async (apiKey, customerId) => {
    const fallbackCustomers = buildStripeFixtureCustomers();
    const fixtureCustomer = fallbackCustomers.find(customer => customer.id === customerId);
    const fallback = {
      customer: fixtureCustomer || {
        id: customerId,
        name: '',
        email: '',
        phone: '',
        company: '',
        currency: 'usd'
      },
      subscriptions: fixtureCustomer?.subscriptions || [],
      invoices: [],
      source: 'Sample data',
      warning: 'Stripe API calls are blocked in the browser. Showing sample Stripe billing activity.'
    };

    if (!apiKey?.trim()) {
      return fallback;
    }

    try {
      const headers = {
        Authorization: `Bearer ${apiKey}`
      };
      const [customerResponse, subscriptionsResponse, invoicesResponse] = await Promise.all([
        fetch(`https://api.stripe.com/v1/customers/${customerId}`, { headers }),
        fetch(`https://api.stripe.com/v1/subscriptions?customer=${customerId}&status=all&limit=100&expand[]=data.items.data.price.product`, { headers }),
        fetch(`https://api.stripe.com/v1/invoices?customer=${customerId}&limit=25&expand[]=data.lines.data.price.product`, { headers })
      ]);

      if (!customerResponse.ok) {
        throw new Error(`Stripe API error: ${customerResponse.status}`);
      }
      if (!subscriptionsResponse.ok) {
        throw new Error(`Stripe API error: ${subscriptionsResponse.status}`);
      }
      if (!invoicesResponse.ok) {
        throw new Error(`Stripe API error: ${invoicesResponse.status}`);
      }

      const customer = await customerResponse.json();
      const subscriptionsPayload = await subscriptionsResponse.json();
      const invoicesPayload = await invoicesResponse.json();

      return {
        customer,
        subscriptions: subscriptionsPayload.data || [],
        invoices: invoicesPayload.data || [],
        source: 'Stripe API'
      };
    } catch (error) {
      return fallback;
    }
  };

  const fetchStripeCustomers = async (apiKey) => {
    const fallbackCustomers = buildStripeFixtureCustomers();
    const fallback = {
      customers: fallbackCustomers,
      source: 'Sample data',
      warning: 'Stripe API calls are blocked in the browser. Showing sample Stripe customers.'
    };

    try {
      const customersUrl = new URL('https://api.stripe.com/v1/customers');
      customersUrl.searchParams.set('limit', '100');
      const subscriptionsUrl = new URL('https://api.stripe.com/v1/subscriptions');
      subscriptionsUrl.searchParams.set('status', 'all');
      subscriptionsUrl.searchParams.set('limit', '100');
      subscriptionsUrl.searchParams.append('expand[]', 'data.customer');

      const [customersResponse, subscriptionsResponse] = await Promise.all([
        fetch(customersUrl.toString(), {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }),
        fetch(subscriptionsUrl.toString(), {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        })
      ]);

      if (!customersResponse.ok) {
        throw new Error(`Stripe API error: ${customersResponse.status}`);
      }
      if (!subscriptionsResponse.ok) {
        throw new Error(`Stripe API error: ${subscriptionsResponse.status}`);
      }

      const customersPayload = await customersResponse.json();
      const subscriptionsPayload = await subscriptionsResponse.json();
      const customers = buildStripeCustomerRecords(customersPayload.data || [], subscriptionsPayload.data || []);
      return {
        customers,
        source: 'Stripe API'
      };
    } catch (error) {
      return fallback;
    }
  };

  const findStripeClientMatch = (stripeCustomer) => {
    let bestMatch = null;
    let bestReasons = [];
    clients.forEach(client => {
      const reasons = [];
      if (stripeCustomer.email && normalizeEmail(client.email) === normalizeEmail(stripeCustomer.email)) {
        reasons.push('Email');
      }
      if (stripeCustomer.phone && normalizePhoneNumber(client.phone) === normalizePhoneNumber(stripeCustomer.phone)) {
        reasons.push('Phone');
      }
      if (stripeCustomer.company && normalizeValue(client.businessName) === normalizeValue(stripeCustomer.company)) {
        reasons.push('Company');
      }
      if (stripeCustomer.name && normalizeValue(client.contactName) === normalizeValue(stripeCustomer.name)) {
        reasons.push('Contact');
      }

      if (reasons.length > bestReasons.length) {
        bestMatch = client;
        bestReasons = reasons;
      }
    });

    return { client: bestMatch, reasons: bestReasons };
  };

  const buildStripeMatches = (stripeCustomers) => stripeCustomers.map(customer => {
    const { client, reasons } = findStripeClientMatch(customer);
    const canSync = Boolean(client);
    const confidence = reasons.length >= 2 ? 'High confidence' : reasons.length === 1 ? 'Likely match' : 'No match';
    return {
      id: `${customer.id}-${client?.id || 'unmatched'}`,
      client,
      stripeCustomer: customer,
      matchReasons: reasons,
      confidence,
      canSync
    };
  });

  const mergeStripeCustomerIntoClient = (client, stripeCustomer, options = {}) => {
    const existingSubscriptions = Array.isArray(client.stripeSubscriptions) ? client.stripeSubscriptions : [];
    const existingIds = new Set(existingSubscriptions.map(subscription => subscription.id));
    const incomingSubscriptions = Array.isArray(stripeCustomer.subscriptions) ? stripeCustomer.subscriptions : [];
    const newSubscriptions = incomingSubscriptions.filter(subscription => !existingIds.has(subscription.id));
    const stripeProfile = client.stripeProfile || {};
    const customerSince = options.customerSince || stripeCustomer.customerSince || stripeProfile.customerSince || null;
    const billingActivity = Array.isArray(options.billingActivity) ? options.billingActivity : [];
    const existingBillingActivity = Array.isArray(client.stripeBillingActivity) ? client.stripeBillingActivity : [];
    const resolvedBillingActivity = billingActivity.length
      ? mergeStripeBillingActivity(existingBillingActivity, billingActivity)
      : existingBillingActivity;

    return {
      updatedClient: {
        ...client,
        businessName: isValueMissing(client.businessName)
          ? stripeCustomer.company || stripeCustomer.name || client.businessName
          : client.businessName,
        contactName: isValueMissing(client.contactName)
          ? stripeCustomer.name || client.contactName
          : client.contactName,
        email: isValueMissing(client.email)
          ? stripeCustomer.email || client.email
          : client.email,
        phone: isValueMissing(client.phone)
          ? stripeCustomer.phone || client.phone
          : client.phone,
        stripeProfile: {
          ...stripeProfile,
          customerId: stripeProfile.customerId ?? stripeCustomer.id,
          name: stripeProfile.name ?? stripeCustomer.name,
          email: stripeProfile.email ?? stripeCustomer.email,
          phone: stripeProfile.phone ?? stripeCustomer.phone,
          company: stripeProfile.company ?? stripeCustomer.company,
          currency: stripeProfile.currency ?? stripeCustomer.currency,
          customerSince: stripeProfile.customerSince ?? customerSince
        },
        stripeSubscriptions: [...existingSubscriptions, ...newSubscriptions],
        stripeBillingActivity: resolvedBillingActivity
      },
      appendedCount: newSubscriptions.length
    };
  };

  const hasActiveStripeSubscriptions = (client) => (
    Array.isArray(client.stripeSubscriptions)
    && client.stripeSubscriptions.some(subscription => subscription.status === 'active')
  );

  const openStripeSync = () => {
    if (!stripeApiKey.trim()) {
      showToast('error', 'Stripe key required', 'Add your Stripe API key on the login screen to sync Stripe data.');
      return;
    }
    if (stripeMatches.length === 0) {
      showToast('error', 'Stripe sync not initialized', 'Initialize the workspace to pull Stripe customers before syncing.');
      return;
    }
    setStripeMatchSelection(new Set(stripeMatches.filter(match => match.canSync).map(match => match.id)));
    setStripeMergeSelection({
      stripeCustomerId: '',
      clientId: ''
    });
    setStripeCustomerMergeSearch('');
    setStripeClientMergeSearch('');
    setStripeSyncStage('review');
    setIsStripeSyncOpen(true);
  };

  const closeStripeSync = () => {
    setIsStripeSyncOpen(false);
    setStripeSyncStage('review');
  };

  const prepareStripeSync = async (apiKey) => {
    if (!apiKey.trim()) {
      showToast('error', 'Stripe key required', 'Enter your Stripe secret key to start syncing.');
      return;
    }
    setStripeSyncStage('loading');
    const { customers, source, warning } = await fetchStripeCustomers(apiKey.trim());
    const matches = buildStripeMatches(customers);
    const matchedCount = matches.filter(match => match.canSync).length;
    const unmatchedCount = matches.length - matchedCount;
    setStripeMatches(matches);
    setStripeMatchSelection(new Set(matches.filter(match => match.canSync).map(match => match.id)));
    setStripeSyncStats({
      source,
      total: matches.length,
      matched: matchedCount,
      unmatched: unmatchedCount
    });
    setStripeSyncStage('review');
    if (warning) {
      showToast('error', 'Stripe API fallback', warning);
    } else {
      showToast('success', 'Stripe sync ready', `Pulled ${matches.length} Stripe customers.`);
    }
  };

  const handleStripeClientSync = async () => {
    if (!selectedClient) return;
    const customerId = selectedClient.stripeProfile?.customerId;
    if (!customerId) {
      showToast('error', 'Stripe customer ID missing', 'Add a Stripe customer ID before syncing this client.');
      return;
    }
    setStripeClientSyncing(true);
    const { customer, subscriptions, invoices, warning } = await fetchStripeCustomerDetails(stripeApiKey, customerId);
    const stripeCustomerRecord = buildStripeCustomerRecords(customer ? [customer] : [], subscriptions)[0];
    const resolvedStripeCustomer = stripeCustomerRecord || {
      id: customerId,
      name: customer?.name || '',
      company: customer?.name || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      currency: customer?.currency || 'usd',
      subscriptions: []
    };
    const billingEmail = resolvedStripeCustomer.email || selectedClient.email || '';
    const billingActivity = buildStripeBillingActivity(
      resolvedStripeCustomer.subscriptions || [],
      invoices,
      billingEmail
    );
    const customerSince = customer?.created ? new Date(customer.created * 1000).toISOString() : null;
    const { updatedClient } = mergeStripeCustomerIntoClient(selectedClient, resolvedStripeCustomer, {
      billingActivity,
      customerSince
    });
    setClients(prev => prev.map(client => (client.id === updatedClient.id ? updatedClient : client)));
    setSelectedClient(updatedClient);
    if (warning) {
      showToast('error', 'Stripe sync fallback', warning);
    } else {
      showToast('success', 'Stripe sync complete', `Synced ${billingActivity.length} billing items for ${updatedClient.businessName}.`);
    }
    setStripeClientSyncing(false);
  };

  const toggleStripeMatch = (id) => {
    const match = stripeMatches.find(item => item.id === id);
    if (match && !match.canSync) return;
    setStripeMatchSelection(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllStripeMatches = () => {
    const selectableIds = stripeMatches.filter(match => match.canSync).map(match => match.id);
    if (stripeMatchSelection.size === selectableIds.length) {
      setStripeMatchSelection(new Set());
    } else {
      setStripeMatchSelection(new Set(selectableIds));
    }
  };

  const confirmStripeMatches = () => {
    const selectedMatches = stripeMatches.filter(match => match.canSync && stripeMatchSelection.has(match.id));
    let appendedSubscriptions = 0;
    const updatedClients = clients.map(client => {
      const match = selectedMatches.find(selected => selected.client?.id === client.id);
      if (!match) return client;
      const { updatedClient, appendedCount } = mergeStripeCustomerIntoClient(client, match.stripeCustomer);
      appendedSubscriptions += appendedCount;
      return updatedClient;
    });
    setClients(updatedClients);
    if (selectedClient) {
      const refreshedClient = updatedClients.find(client => client.id === selectedClient.id);
      if (refreshedClient) {
        setSelectedClient(refreshedClient);
      }
    }
    const matchedClientIds = new Set(stripeMatches.filter(match => match.client).map(match => match.client.id));
    const hasUnmatchedStripe = stripeMatches.some(match => !match.client);
    const hasUnmatchedClients = updatedClients.some(client => !matchedClientIds.has(client.id));
    setStripeSyncStage(hasUnmatchedStripe || hasUnmatchedClients ? 'merge' : 'complete');
    showToast(
      'success',
      'Stripe sync confirmed',
      `Updated ${selectedMatches.length} clients and appended ${appendedSubscriptions} subscriptions.`
    );
  };

  const stripeMatchedClientIds = new Set(stripeMatches.filter(match => match.client).map(match => match.client.id));
  const stripeUnmatchedCustomers = stripeMatches.filter(match => !match.client);
  const stripeUnmatchedClients = clients.filter(client => !stripeMatchedClientIds.has(client.id));

  const normalizedStripeCustomerSearch = stripeCustomerMergeSearch.trim().toLowerCase();
  const normalizedStripeClientSearch = stripeClientMergeSearch.trim().toLowerCase();
  const stripeCustomerSearchMatches = (value) => value?.toLowerCase().includes(normalizedStripeCustomerSearch);
  const stripeClientSearchMatches = (value) => value?.toLowerCase().includes(normalizedStripeClientSearch);
  const filteredStripeUnmatchedCustomers = stripeUnmatchedCustomers.filter(match => (
    !normalizedStripeCustomerSearch
    || stripeCustomerSearchMatches(match.stripeCustomer?.name)
    || stripeCustomerSearchMatches(match.stripeCustomer?.company)
    || stripeCustomerSearchMatches(match.stripeCustomer?.email)
    || stripeCustomerSearchMatches(match.stripeCustomer?.phone)
  ));
  const filteredStripeUnmatchedClients = stripeUnmatchedClients.filter(client => (
    !normalizedStripeClientSearch
    || stripeClientSearchMatches(client.businessName)
    || stripeClientSearchMatches(client.contactName)
    || stripeClientSearchMatches(client.email)
    || stripeClientSearchMatches(client.phone)
    || stripeClientSearchMatches(client.location)
  ));

  const handleStripeMergeSelection = (type, id) => {
    setStripeMergeSelection(prev => ({
      ...prev,
      [type]: prev[type] === id ? '' : id
    }));
  };

  const handleStripeManualMerge = () => {
    if (!stripeMergeSelection.stripeCustomerId || !stripeMergeSelection.clientId) {
      return;
    }
    const stripeMatch = stripeMatches.find(match => match.stripeCustomer.id === stripeMergeSelection.stripeCustomerId);
    const client = clients.find(item => item.id === stripeMergeSelection.clientId);
    if (!stripeMatch || !client) return;
    const { updatedClient, appendedCount } = mergeStripeCustomerIntoClient(client, stripeMatch.stripeCustomer);
    const updatedClients = clients.map(item => (item.id === client.id ? updatedClient : item));
    setClients(updatedClients);
    if (selectedClient?.id === client.id) {
      setSelectedClient(updatedClient);
    }
    setStripeMatches(prev => prev.map(match => {
      if (match.stripeCustomer.id !== stripeMatch.stripeCustomer.id) return match;
      return {
        ...match,
        client: updatedClient,
        matchReasons: ['Manual'],
        confidence: 'Manual match',
        canSync: true
      };
    }));
    setStripeMergeSelection({
      stripeCustomerId: '',
      clientId: ''
    });
    showToast(
      'success',
      'Manual merge complete',
      `Merged ${stripeMatch.stripeCustomer.name} into ${updatedClient.businessName} and added ${appendedCount} subscriptions.`
    );
  };

  const handleStripeCreateClient = () => {
    if (!stripeMergeSelection.stripeCustomerId) {
      return;
    }
    const stripeMatch = stripeMatches.find(match => match.stripeCustomer.id === stripeMergeSelection.stripeCustomerId);
    if (!stripeMatch) return;
    const stripeCustomer = stripeMatch.stripeCustomer;
    const newClientId = `stripe-${stripeCustomer.id}-${Date.now()}`;
    const newClient = {
      id: newClientId,
      businessName: stripeCustomer.company || stripeCustomer.name || 'Stripe customer',
      contactName: stripeCustomer.name || '',
      phone: stripeCustomer.phone || '',
      email: stripeCustomer.email || '',
      service: '',
      location: '',
      budget: '',
      goals: '',
      notes: '',
      website: '',
      access: '',
      status: 'Paused',
      stripeProfile: {
        customerId: stripeCustomer.id,
        name: stripeCustomer.name || '',
        email: stripeCustomer.email || '',
        phone: stripeCustomer.phone || '',
        company: stripeCustomer.company || '',
        currency: stripeCustomer.currency || 'usd'
      },
      stripeSubscriptions: stripeCustomer.subscriptions || []
    };
    setClients(prev => [newClient, ...prev]);
    setStripeMatches(prev => prev.map(match => {
      if (match.stripeCustomer.id !== stripeCustomer.id) return match;
      return {
        ...match,
        client: newClient,
        matchReasons: ['New client'],
        confidence: 'Created',
        canSync: true
      };
    }));
    setStripeMergeSelection({
      stripeCustomerId: '',
      clientId: ''
    });
    showToast(
      'success',
      'Client added',
      `${newClient.businessName} was added from Stripe with a paused status.`
    );
  };

  const buildAircallAuthHeader = (tokenOverride, appIdOverride) => {
    const credentials = btoa(`${appIdOverride}:${tokenOverride}`);
    return `Basic ${credentials}`;
  };

  const updateAircallActivity = (clientId, updates) => {
    setAircallActivity(prev => ({
      ...prev,
      [clientId]: {
        ...(prev[clientId] || {
          items: [],
          loading: false,
          error: null,
          nextPage: 1,
          hasMore: false,
          hasRisk: false,
          lastUpdated: null
        }),
        ...updates
      }
    }));
  };

  const fetchAircallTeamUsers = async (token) => {
    const headers = {
      Authorization: buildAircallAuthHeader(token, aircallAppId)
    };
    const normalizeTeamName = (name) => normalizeValue(name);

    const teamsResponse = await fetch(`${AIRCALL_BASE_URL}/teams`, { headers });
    if (!teamsResponse.ok) {
      const errorText = await teamsResponse.text();
      throw new Error(errorText || `Aircall teams request failed with ${teamsResponse.status}`);
    }
    const teamsData = await teamsResponse.json();
    const teams = teamsData.teams || teamsData.data || [];
    const targetTeam = teams.find(team => normalizeTeamName(team.name) === normalizeTeamName(AIRCALL_TEAM_NAME));

    let users = targetTeam?.users || [];
    if (!users.length) {
      const usersResponse = await fetch(`${AIRCALL_BASE_URL}/users`, { headers });
      if (!usersResponse.ok) {
        const errorText = await usersResponse.text();
        throw new Error(errorText || `Aircall users request failed with ${usersResponse.status}`);
      }
      const usersData = await usersResponse.json();
      const allUsers = usersData.users || usersData.data || [];
      if (targetTeam?.id) {
        users = allUsers.filter(user => (user.teams || []).some(team => team.id === targetTeam.id));
      } else {
        users = allUsers.filter(user => (user.teams || []).some(team => normalizeTeamName(team.name) === normalizeTeamName(AIRCALL_TEAM_NAME)));
      }
    }

    const cleanedUsers = users.map(user => ({
      id: user.id,
      name: user.name || user.email || user.username || `User ${user.id}`
    }));

    if (!cleanedUsers.length) {
      throw new Error(`No users found in the ${AIRCALL_TEAM_NAME} team.`);
    }
    return cleanedUsers;
  };

  const fetchAircallInteractions = async (client, options = {}) => {
    if (!client) return;
    const {
      notify = true,
      token = aircallToken,
      daysBack = 14,
      perPage = 25,
      maxResults = 5
    } = options;
    if (!token || !aircallAppId) {
      updateAircallActivity(client.id, { error: 'Aircall credentials missing.', loading: false });
      if (notify) {
        showToast('error', 'Aircall credentials missing', 'Add your Aircall App ID and API token to load activity.');
      }
      return { count: 0, error: 'Aircall credentials missing.' };
    }

    const phoneNumber = normalizePhoneNumber(client.phone);
    if (!phoneNumber) {
      updateAircallActivity(client.id, { error: 'No phone number on file.', loading: false });
      if (notify) {
        showToast('error', 'Missing phone number', 'This client does not have a phone number to query.');
      }
      return { count: 0, error: 'No phone number on file.' };
    }

    updateAircallActivity(client.id, { loading: true, error: null, hasRisk: false });

    try {
      const { start, end } = getBrisbaneRange(daysBack);
      const toTimestamp = Math.floor(end.getTime() / 1000);
      const fromTimestamp = Math.floor(start.getTime() / 1000);

      const teamUsers = await fetchAircallTeamUsers(token);

      const fetchPage = async (user, pageNumber) => {
        const url = new URL(`${AIRCALL_BASE_URL}/calls`);
        url.searchParams.set('per_page', String(perPage));
        url.searchParams.set('page', String(pageNumber));
        url.searchParams.set('phone_number', phoneNumber);
        url.searchParams.set('user_id', String(user.id));
        url.searchParams.set('from', String(fromTimestamp));
        url.searchParams.set('to', String(toTimestamp));

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: buildAircallAuthHeader(token, aircallAppId)
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Aircall request failed with ${response.status}`);
        }

        return response.json();
      };

      let aggregated = [];

      const responses = await Promise.all(
        teamUsers.map(async (user) => {
          const data = await fetchPage(user, 1);
          const rawCalls = data.calls || data.data || [];
          return rawCalls.map(call => ({
            id: call.id,
            duration: call.duration,
            direction: call.direction,
            status: call.status || call.call_status || call.state,
            disconnectedBy: call.disconnected_by || call.disconnectedBy,
            startedAt: parseAircallTimestamp(call.started_at || call.startedAt || call.created_at || call.createdAt),
            userName: call.user?.name || call.assigned_to?.name || call.user_name || user.name,
            fromNumber: call.from?.phone_number || call.from?.number,
            toNumber: call.to?.phone_number || call.to?.number,
            recordingUrl: call.recording?.url || call.recording_url || call.links?.recording || call.links?.recording_url,
            transcriptionUrl: call.transcription?.url || call.transcription_url || call.links?.transcription || call.links?.transcription_url,
            raw: call
          }));
        })
      );

      aggregated = responses.flat();
      aggregated = aggregated
        .filter(call => call.startedAt)
        .sort((a, b) => b.startedAt - a.startedAt)
        .slice(0, maxResults);

      setAircallActivity(prev => {
        const existing = prev[client.id] || {
          items: [],
          loading: false,
          error: null,
          nextPage: 1,
          hasMore: false,
          hasRisk: false,
          lastUpdated: null
        };

        return {
          ...prev,
          [client.id]: {
            ...existing,
            items: aggregated,
            loading: false,
            error: null,
            nextPage: 1,
            hasMore: false,
            hasRisk: aggregated.length === 0,
            lastUpdated: new Date().toISOString()
          }
        };
      });

      if (notify) {
        showToast('success', 'Aircall activity loaded', `Fetched ${aggregated.length} interactions for ${client.businessName}.`);
      }
      return { count: aggregated.length, error: null };
    } catch (error) {
      updateAircallActivity(client.id, { loading: false, error: error.message });
      if (notify) {
        showToast('error', 'Aircall request failed', error.message);
      }
      return { count: 0, error: error.message };
    }
  };

  const handleMetaLookup = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    if (!selectedClient) return;
    const accountId = metaAccountInput.trim();
    if (!accountId) {
      showToast('error', 'Meta account ID required', 'Enter a Meta Ads account ID to continue.');
      return;
    }

    setMetaByClient(prev => ({
      ...prev,
      [selectedClient.id]: {
        ...(prev[selectedClient.id] || {}),
        accountId,
        status: 'loading',
        error: null,
        logs: [],
        source: null,
        data: null
      }
    }));

    const clientSnapshot = buildClientMetaSnapshot(selectedClient);
    if (isMetaSnapshotComplete(clientSnapshot)) {
      setMetaByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: 'success',
          error: null,
          logs: [],
          source: 'client',
          data: clientSnapshot
        }
      }));
      return;
    }

    try {
      const { snapshot: metaSnapshot, errorLogs } = await fetchMetaSnapshot(accountId);
      const merged = mergeMetaSnapshots(clientSnapshot, metaSnapshot);
      const isComplete = isMetaSnapshotComplete(merged);
      setMetaByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: isComplete ? 'success' : 'error',
          error: isComplete ? null : 'Meta data is incomplete. See logs below.',
          logs: errorLogs,
          source: clientSnapshot ? 'client+meta' : 'meta',
          data: merged
        }
      }));
    } catch (error) {
      const message = normalizeMetaError(error);
      setMetaByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: 'error',
          error: message,
          logs: [message],
          source: 'meta',
          data: clientSnapshot
        }
      }));
    }
  };

  const handleGoogleLookup = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    if (!selectedClient) return;
    const accountId = googleAccountInput.trim();
    if (!accountId) {
      showToast('error', 'Google Ads customer ID required', 'Enter a Google Ads customer ID to continue.');
      return;
    }

    setGoogleByClient(prev => ({
      ...prev,
      [selectedClient.id]: {
        ...(prev[selectedClient.id] || {}),
        accountId,
        status: 'loading',
        error: null,
        logs: [],
        source: null,
        data: null
      }
    }));

    const clientSnapshot = buildClientGoogleSnapshot(selectedClient);
    if (isGoogleSnapshotComplete(clientSnapshot)) {
      setGoogleByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: 'success',
          error: null,
          logs: [],
          source: 'client',
          data: clientSnapshot
        }
      }));
      return;
    }

    try {
      const { snapshot: googleSnapshot, errorLogs } = await fetchGoogleSnapshot(accountId);
      const merged = mergeGoogleSnapshots(clientSnapshot, googleSnapshot);
      const isComplete = isGoogleSnapshotComplete(merged);
      setGoogleByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: isComplete ? 'success' : 'error',
          error: isComplete ? null : 'Google Ads data is incomplete. See logs below.',
          logs: errorLogs,
          source: clientSnapshot ? 'client+google' : 'google',
          data: merged
        }
      }));
    } catch (error) {
      const message = normalizeGoogleError(error);
      setGoogleByClient(prev => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          accountId,
          status: 'error',
          error: message,
          logs: [message],
          source: 'google',
          data: clientSnapshot
        }
      }));
    }
  };

  const handleAircallLogin = async (event) => {
    event.preventDefault();
    const credentialLines = loginCredentialsInput.split(/\r?\n/).map(line => line.trim());
    const [
      trimmedToken = '',
      trimmedAppId = '',
      trimmedMetaToken = '',
      trimmedStripeToken = '',
      trimmedGoogleToken = '',
      trimmedGoogleDeveloperToken = '',
      trimmedGoogleLoginCustomerId = ''
    ] = credentialLines;
    if (!trimmedAppId) {
      showToast('error', 'App ID required', 'Enter your Aircall App ID to continue.');
      return;
    }
    if (!trimmedToken) {
      showToast('error', 'Token required', 'Enter your Aircall API token to continue.');
      return;
    }
    if (!trimmedMetaToken) {
      showToast('error', 'Meta token required', 'Enter your Meta system user token to continue.');
      return;
    }
    if (!trimmedStripeToken) {
      showToast('error', 'Stripe key required', 'Enter your Stripe API token to continue.');
      return;
    }

    setIsSubmittingAircallToken(true);
    try {
      localStorage.setItem('aircallToken', trimmedToken);
      localStorage.setItem('aircallAppId', trimmedAppId);
      localStorage.setItem(META_ACCESS_TOKEN_KEY, trimmedMetaToken);
      localStorage.setItem(STRIPE_API_KEY_KEY, trimmedStripeToken);
      if (trimmedGoogleToken) {
        localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, trimmedGoogleToken);
      } else {
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
      }
      if (trimmedGoogleDeveloperToken) {
        localStorage.setItem(GOOGLE_DEVELOPER_TOKEN_KEY, trimmedGoogleDeveloperToken);
      } else {
        localStorage.removeItem(GOOGLE_DEVELOPER_TOKEN_KEY);
      }
      if (trimmedGoogleLoginCustomerId) {
        localStorage.setItem(GOOGLE_LOGIN_CUSTOMER_ID_KEY, trimmedGoogleLoginCustomerId);
      } else {
        localStorage.removeItem(GOOGLE_LOGIN_CUSTOMER_ID_KEY);
      }
      setAircallToken(trimmedToken);
      setAircallAppId(trimmedAppId);
      setIsAircallLoggedIn(true);
      setMetaAccessToken(trimmedMetaToken);
      setIsMetaLoggedIn(true);
      setStripeApiKey(trimmedStripeToken);
      setGoogleAccessToken(trimmedGoogleToken);
      setGoogleDeveloperToken(trimmedGoogleDeveloperToken);
      setGoogleLoginCustomerId(trimmedGoogleLoginCustomerId);
      setLoginCredentialsInput('');
      setAircallTokenInput('');
      setAircallAppIdInput(trimmedAppId);
      setMetaTokenInput('');
      setGoogleTokenInput('');
      setGoogleDeveloperTokenInput(trimmedGoogleDeveloperToken);
      setGoogleLoginCustomerIdInput(trimmedGoogleLoginCustomerId);
      await prepareStripeSync(trimmedStripeToken);
    } catch (error) {
      showToast('error', 'Aircall login failed', error.message);
    } finally {
      setIsSubmittingAircallToken(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aircallToken');
    localStorage.removeItem('aircallAppId');
    localStorage.removeItem(META_ACCESS_TOKEN_KEY);
    localStorage.removeItem(STRIPE_API_KEY_KEY);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(GOOGLE_DEVELOPER_TOKEN_KEY);
    localStorage.removeItem(GOOGLE_LOGIN_CUSTOMER_ID_KEY);
    setAircallToken('');
    setAircallAppId('');
    setLoginCredentialsInput('');
    setStripeApiKey('');
    setStripeMatches([]);
    setStripeMatchSelection(new Set());
    setStripeMergeSelection({
      stripeCustomerId: '',
      clientId: ''
    });
    setStripeCustomerMergeSearch('');
    setStripeClientMergeSearch('');
    setStripeSyncStats({
      source: '',
      total: 0,
      matched: 0,
      unmatched: 0
    });
    setStripeSyncStage('review');
    setAircallTokenInput('');
    setAircallAppIdInput('');
    setAircallActivity({});
    setSelectedClient(null);
    setIsAircallLoggedIn(false);
    setMetaAccessToken('');
    setMetaTokenInput('');
    setIsMetaLoggedIn(false);
    setGoogleAccessToken('');
    setGoogleDeveloperToken(DEFAULT_GOOGLE_DEVELOPER_TOKEN);
    setGoogleLoginCustomerId(DEFAULT_GOOGLE_LOGIN_CUSTOMER_ID);
    setGoogleTokenInput('');
    setGoogleDeveloperTokenInput(DEFAULT_GOOGLE_DEVELOPER_TOKEN);
    setGoogleLoginCustomerIdInput(DEFAULT_GOOGLE_LOGIN_CUSTOMER_ID);
  };

  const handleRecentActivityClick = () => {
    setClientDetailTab('activity');
    setClientActivityTab('contact');
    if (!selectedClient) return;
    fetchAircallInteractions(selectedClient, {
      notify: false,
      daysBack: 14,
      perPage: 25,
      maxResults: 5
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const client = {
      id: Date.now().toString(),
      ...newClient
    };
    setClients([client, ...clients]);
    setNewClient({
      businessName: '', contactName: '', phone: '', email: '', service: '', location: '', budget: '', goals: '', notes: '', website: '', access: '', status: 'Active'
    });
    setIsAddModalOpen(false);
  };

  const initiateDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  const confirmDelete = () => {
    if (selectedClient) {
      setClients(clients.filter(c => c.id !== selectedClient.id));
      setSelectedClient(null);
      setIsDeleteConfirmOpen(false);
      setIsEditing(false);
    }
  };

  // --- Bulk Selection & Actions ---
  const toggleSelectClient = (id) => {
    const newSelected = new Set(selectedClientIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedClientIds(newSelected);
  };

  // Logic for filtered clients to be used in selectAll
  const getFilteredClients = () => {
    return clients.filter(client => {
      const matchesSearch = client.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  };

  const filteredClients = getFilteredClients();

  const selectAll = () => {
    if (selectedClientIds.size === filteredClients.length) {
      setSelectedClientIds(new Set());
    } else {
      setSelectedClientIds(new Set(filteredClients.map(c => c.id)));
    }
  };

  const applyBulkAction = () => {
    if (!bulkActionType) return;
    if (selectedClientIds.size === 0) return;

    if (bulkActionType === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedClientIds.size} clients?`)) {
        setClients(clients.filter(c => !selectedClientIds.has(c.id)));
        setSelectedClientIds(new Set());
        setBulkActionType('');
      }
    } else {
      setClients(clients.map(c => 
        selectedClientIds.has(c.id) ? { ...c, status: bulkActionType } : c
      ));
      setSelectedClientIds(new Set());
      setBulkActionType('');
    }
  };

  const getLast30DayRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return { start, end };
  };

  const isWithinRange = (value, range) => {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    return date >= range.start && date <= range.end;
  };

  const buildOverviewSnapshot = (client, range) => {
    const overview = client.overview || client.performance || client.metrics || {};
    return {
      totalSpend: overview.totalSpend ?? overview.spend ?? null,
      impressions: overview.impressions ?? null,
      averageCpm: overview.averageCpm ?? overview.avgCpm ?? null,
      range: {
        start: range.start.toISOString(),
        end: range.end.toISOString()
      }
    };
  };

  const buildChangeHistorySnapshot = (client, range) => {
    const history = Array.isArray(client.changeHistory) ? client.changeHistory : [];
    return history.filter(entry => {
      const dateValue = entry.date || entry.timestamp || entry.updatedAt || entry.createdAt;
      return isWithinRange(dateValue, range);
    });
  };

  const buildRecentActivitySnapshot = (client, range) => {
    const activity = aircallActivity[client.id]?.items || [];
    return activity.filter(entry => isWithinRange(entry.startedAt, range));
  };

  // --- Export JSON ---
  const handleExportJSON = () => {
    const range = getLast30DayRange();
    const exportPayload = {
      generatedAt: new Date().toISOString(),
      range: {
        start: range.start.toISOString(),
        end: range.end.toISOString()
      },
      clients: clients.map(client => ({
        ...client,
        overview: buildOverviewSnapshot(client, range),
        team: Array.isArray(client.team) ? client.team : [],
        changeHistory: buildChangeHistorySnapshot(client, range),
        recentActivity: buildRecentActivitySnapshot(client, range)
      }))
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "clients_export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // --- Smart Import Logic (Corrected for Block Format & CSV) ---
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Simple CSV Parser that respects quotes
  const parseCSV = (text) => {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuote = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuote && nextChar === '"') {
          // Escaped quote
          currentCell += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuote = !inQuote;
        }
      } else if ((char === ',' || char === ';') && !inQuote) {
        // End of cell
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuote) {
        // End of row
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++; // Skip \n
      } else if (char === '\r' && !inQuote) {
         // Mac classic line ending? Treat as newline
         currentRow.push(currentCell.trim());
         rows.push(currentRow);
         currentRow = [];
         currentCell = '';
      } else {
        currentCell += char;
      }
    }
    // Push last row if exists
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }
    return rows;
  };

  const processImport = (data, isBinary = false) => {
    let rows = [];
    
    if (isBinary) {
      // Data is already an array of arrays from SheetJS
      rows = data;
    } else {
      // Data is text (CSV)
      rows = parseCSV(data);
    }

    if (rows.length === 0) return;

    // --- DYNAMIC BLOCK PARSER ---
    const clientHeaderIndices = [];
    for (let r = 0; r < rows.length; r++) {
      const cell = String(rows[r][0] || "").trim().toLowerCase();
      // Check for exact match or starts with to be safe, screenshot says "Client:"
      if (cell.startsWith("client")) {
        clientHeaderIndices.push(r);
      }
    }

    if (clientHeaderIndices.length === 0) {
       window.alert("Could not find a 'Client:' header row. Please check file format.");
       return;
    }

    const potentialClients = [];

    // Iterate over each found header index
    for (const i of clientHeaderIndices) {
      if (i + 5 >= rows.length) break;

      const rowData1 = rows[i + 1] || []; // Name, Contact, Billing
      const rowData2 = rows[i + 3] || []; // Service, Capacity, Goals
      const rowData3 = rows[i + 5] || []; // Budget, Additional Info

      // Extract raw values based on columns A=0, B=1, C=2
      const rawBusinessName = rowData1[0] || "";
      const rawContactString = rowData1[1] || "";
      const rawLocation = rowData1[2] || ""; // Billing Details
      
      const rawService = rowData2[0] || "";
      const rawCapacity = rowData2[1] || "";
      const rawGoals = rowData2[2] || "";

      const rawBudget = rowData3[0] || "";
      const rawAdditional = rowData3[1] || "";

      // Skip completely empty blocks
      if (!rawBusinessName && !rawContactString) continue;

      // --- Validation ---
      let validationError = null;
      if (!rawBusinessName) {
        validationError = "Missing Business Name";
      }

      // --- Parsing Phone/Email from Contact String ---
      // "Name: Dean Chiswick\nNumber: ..."
      const phoneRegex = /(?:Number:|Phone:)\s*([0-9\s\+\-\(\)]+)/i;
      const emailRegex = /(?:Email:)\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
      const nameRegex = /(?:Name:)\s*(.*?)(?:\n|$)/i;

      // Try explicit labels first
      let phoneMatch = rawContactString.match(phoneRegex);
      let emailMatch = rawContactString.match(emailRegex);
      let nameMatch = rawContactString.match(nameRegex);

      // Fallback regex (just pattern matching) if labels are missing
      if (!phoneMatch) {
         const fallbackPhone = /(?:04\d{2}[ -]?\d{3}[ -]?\d{3}|0\d[ -]?\d{4}[ -]?\d{4}|\+61\s?\d{1,4}\s?\d{1,4}\s?\d{1,4})/;
         phoneMatch = rawContactString.match(fallbackPhone);
      }
      
      if (!emailMatch) {
         const fallbackEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
         emailMatch = rawContactString.match(fallbackEmail) || rawAdditional.match(fallbackEmail);
      }

      const rawPhone = phoneMatch ? (phoneMatch[1] || phoneMatch[0]).trim() : "";
      const email = emailMatch ? (emailMatch[1] || emailMatch[0]).trim() : "";
      
      let contactName = "";
      if (nameMatch && nameMatch[1]) {
        contactName = nameMatch[1].trim();
      } else {
        // If no "Name:" label, take the first line that isn't a number or email
        const lines = rawContactString.split('\n');
        if (lines.length > 0) contactName = lines[0].replace(phoneRegex, '').replace(emailRegex, '').trim();
      }

      // Combine Capacity and Additional Info into Notes
      let combinedNotes = [];
      if (rawCapacity) combinedNotes.push(`Capacity: ${rawCapacity}`);
      if (rawAdditional) combinedNotes.push(`Additional Info: ${rawAdditional}`);
      
      // Clean Budget String (remove "Budget: " prefix if exists)
      let budget = rawBudget.replace(/^Budget:\s*/i, '').split('\n')[0]; // Take first line usually

      // --- Phone Formatting Logic ---
      let finalPhone = rawPhone;
      let phoneStatus = 'valid'; // 'valid' or 'needs_format'
      let suggestedPhone = '';

      if (rawPhone) {
        // Remove spaces, dashes, parens
        const cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, '');
        
        // Check for various starting patterns that imply Australian mobile/landline
        if (!cleanPhone.startsWith('+61') && !cleanPhone.startsWith('61')) {
           if (cleanPhone.startsWith('0')) {
             // 0412345678 -> +61412345678
             suggestedPhone = '+61' + cleanPhone.substring(1);
             phoneStatus = 'needs_format';
           } else if (['4','2','3','7','8'].includes(cleanPhone[0])) {
             // 412345678 -> +61412345678
             suggestedPhone = '+61' + cleanPhone;
             phoneStatus = 'needs_format';
           }
        }
      }

      const clientObj = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        businessName: rawBusinessName,
        contactName: contactName,
        email: email,
        phone: finalPhone,
        phoneStatus: phoneStatus,
        suggestedPhone: suggestedPhone,
        location: rawLocation === "None Gathered" ? "" : rawLocation, 
        service: rawService,
        goals: rawGoals,
        budget: budget,
        capacity: rawCapacity,
        additionalInfo: rawAdditional,
        notes: combinedNotes.join('\n'),
        website: "", 
        access: rawAdditional, // Also map additional info to Access as per request (cPanel often there)
        status: 'Active', // Default status for imports
        isValid: !validationError,
        error: validationError
      };

      potentialClients.push(clientObj);
    }

    if (potentialClients.length > 300) {
       window.alert(`Warning: Parsed ${potentialClients.length} clients. This exceeds the expected limit of ~300. Please check the file format.`);
    }

    if (potentialClients.length > 0) {
      setPendingImports(potentialClients);
      // Determine initial step based on phone issues
      const hasPhoneIssues = potentialClients.some(c => c.phoneStatus === 'needs_format');
      if (hasPhoneIssues) {
         setImportReviewStep('phone_check');
         setPhoneFormatSelection(new Set()); // Start empty
      } else {
         setImportReviewStep('review');
      }
      setIsImportReviewOpen(true);
      setImportReviewTab('list');
    } else {
      window.alert("No valid client blocks found. Please check the file matches the 8-row block format.");
    }
  };

  // --- Phone Check Helpers ---
  const togglePhoneSelect = (index) => {
    const newSet = new Set(phoneFormatSelection);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setPhoneFormatSelection(newSet);
  };

  const toggleSelectAllPhones = () => {
     // Find all indices that need format
     const indices = pendingImports.map((item, idx) => item.phoneStatus === 'needs_format' ? idx : -1).filter(i => i !== -1);
     if (phoneFormatSelection.size === indices.length) {
        setPhoneFormatSelection(new Set());
     } else {
        setPhoneFormatSelection(new Set(indices));
     }
  };

  const confirmPhoneFormatting = () => {
     const updatedImports = [...pendingImports];
     phoneFormatSelection.forEach(index => {
        if (updatedImports[index] && updatedImports[index].suggestedPhone) {
           updatedImports[index].phone = updatedImports[index].suggestedPhone;
           updatedImports[index].phoneStatus = 'valid'; 
           updatedImports[index].suggestedPhone = '';
        }
     });
     setPendingImports(updatedImports);
     setImportReviewStep('review');
  };

  const approvePhoneFormat = (index) => {
    const updatedImports = [...pendingImports];
    if (updatedImports[index].suggestedPhone) {
      updatedImports[index].phone = updatedImports[index].suggestedPhone;
      updatedImports[index].phoneStatus = 'valid';
      updatedImports[index].suggestedPhone = '';
    }
    setPendingImports(updatedImports);
  };

  const confirmImport = () => {
    // Only import valid clients. We keep the phone number as is (formatted or original)
    const validClients = pendingImports.filter(c => c.isValid).map(({isValid, error, capacity, additionalInfo, phoneStatus, suggestedPhone, ...client}) => client);
    if (validClients.length === 0) {
      window.alert("No valid clients to import.");
      return;
    }
    setClients(prev => [...validClients, ...prev]);
    setIsImportReviewOpen(false);
    setPendingImports([]);
    window.alert(`Successfully imported ${validClients.length} clients.`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();

    if (fileExt === 'xlsx' || fileExt === 'xls') {
      // Load SheetJS dynamically for Excel files
      const script = document.createElement('script');
      script.src = "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      script.onload = () => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = window.XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          // Use header:1 to get raw array of arrays with empty rows preserved
          const json = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
          processImport(json, true); 
        };
        reader.readAsArrayBuffer(file);
      };
      script.onerror = () => {
        window.alert('Failed to load Excel parser. Please check your internet connection.');
      };
      document.body.appendChild(script);
    } else {
      // CSV/Text
      const reader = new FileReader();
      reader.onload = (event) => {
        processImport(event.target.result, false);
      };
      reader.readAsText(file);
    }
    e.target.value = ''; // Reset
  };

  // --- Edit Logic ---
  const startEditing = () => {
    setEditingClient({ ...selectedClient });
    setIsEditing(true);
    setIsDeleteConfirmOpen(false); // reset delete state just in case
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingClient(null);
  };

  const saveEditing = () => {
    const updatedClients = clients.map(c => 
      c.id === editingClient.id ? editingClient : c
    );
    setClients(updatedClients);
    setSelectedClient(editingClient);
    setIsEditing(false);
  };

  // Group errors for display
  const errorGroups = pendingImports.reduce((groups, item) => {
    if (!item.isValid && item.error) {
      if (!groups[item.error]) {
        groups[item.error] = [];
      }
      groups[item.error].push(item);
    }
    return groups;
  }, {});

  const hasErrors = Object.keys(errorGroups).length > 0;
  const selectedActivity = selectedClient
    ? (aircallActivity[selectedClient.id] || {
      items: [],
      loading: false,
      error: null,
      hasMore: false,
      nextPage: 1,
      hasRisk: false,
      lastUpdated: null
    })
    : {
      items: [],
      loading: false,
      error: null,
      hasMore: false,
      nextPage: 1,
      hasRisk: false,
      lastUpdated: null
    };
  const selectedSubscriptions = selectedClient?.stripeSubscriptions || [];
  const selectedStripeProfile = selectedClient?.stripeProfile || null;
  const selectedSentEmails = selectedClient ? buildSentEmailActivity(selectedClient) : [];
  const selectedBillingActivity = selectedClient
    ? (
      Array.isArray(selectedClient.stripeBillingActivity) && selectedClient.stripeBillingActivity.length > 0
        ? selectedClient.stripeBillingActivity
        : buildStripeBillingActivity(
          selectedSubscriptions,
          [],
          selectedStripeProfile?.email || selectedClient.email || ''
        )
    )
    : [];
  const selectedMetaEntry = selectedClient ? metaByClient[selectedClient.id] : null;
  const selectedGoogleEntry = selectedClient ? googleByClient[selectedClient.id] : null;
  const metaTeamRoster = useMemo(() => {
    const changeHistory = selectedMetaEntry?.data?.changeHistory || [];
    const teamRoster = Array.isArray(selectedMetaEntry?.data?.team) ? selectedMetaEntry.data.team : [];
    const teamByName = new Map(teamRoster.map(member => [normalizeValue(member.name), member]));
    const rosterMap = new Map();

    changeHistory.forEach((log) => {
      const actorName = log.actor_name || 'Unknown';
      const actorKey = log.actor_id || normalizeValue(actorName) || 'unknown';
      const existing = rosterMap.get(actorKey);
      const teamMatch = teamByName.get(normalizeValue(actorName));
      if (existing) {
        existing.activityCount += 1;
      } else {
        rosterMap.set(actorKey, {
          id: log.actor_id || actorKey,
          name: actorName,
          role: teamMatch?.role || 'Meta access',
          email: teamMatch?.email || '',
          accessLabels: teamMatch?.accessLabels || [],
          activityCount: 1
        });
      }
    });

    if (rosterMap.size === 0 && teamRoster.length > 0) {
      return teamRoster.map((member, index) => ({
        id: member.id || `${normalizeValue(member.name)}-${index}`,
        name: member.name,
        role: member.role || 'Meta access',
        email: member.email || '',
        accessLabels: member.accessLabels || [],
        activityCount: 0
      }));
    }

    return Array.from(rosterMap.values()).sort((a, b) => b.activityCount - a.activityCount);
  }, [selectedMetaEntry, normalizeValue]);
  const isLoggedIn = isAircallLoggedIn && isMetaLoggedIn;

  return (
    <>
      {/* Inject Styles */}
      <style>{STYLES}</style>

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <div className="toast-title">{toast.title}</div>
            <div className="toast-message">{toast.message}</div>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="login-page">
          <div className="login-card">
            <div className="login-logo">
              <img src={META_LOGO_URL} alt="Purge Digital logo" />
              <div>
                <h1 className="login-title">PurgeDigital CRM</h1>
                <p className="login-subtitle">Connect Aircall, Meta, Stripe, and Google Ads to unlock CRM activity and ad risk insights.</p>
              </div>
            </div>
            <form className="login-form" onSubmit={handleAircallLogin}>
              <div>
                <h2 className="form-label">Paste credentials one per line</h2>
                <p className="login-instructions">Use the exact order below (Google Ads lines are optional).</p>
                <p className="login-format">
                  Aircall API token{'\n'}
                  Aircall ID{'\n'}
                  Meta system user token{'\n'}
                  Stripe API token{'\n'}
                  Google Ads access token{'\n'}
                  Google Ads developer token{'\n'}
                  Google Ads login customer ID
                </p>
              </div>
              <div>
                <label className="form-label" htmlFor="workspaceCredentials">Credentials</label>
                <textarea
                  id="workspaceCredentials"
                  className="login-textarea"
                  value={loginCredentialsInput}
                  onChange={(event) => setLoginCredentialsInput(event.target.value)}
                  placeholder={`Aircall API token\nAircall ID\nMeta system user token\nStripe API token\nGoogle Ads access token (optional)\nGoogle Ads developer token (optional)\nGoogle Ads login customer ID (optional)`}
                />
                <div className="login-helper">Tokens are stored locally in this browser only.</div>
              </div>
              <button className="login-btn" type="submit" disabled={isSubmittingAircallToken}>
                {isSubmittingAircallToken ? 'Initializing workspace…' : 'Initialize Workspace'}
                {isSubmittingAircallToken && (
                  <span className="login-btn-loading-bar" />
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="app-container">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle hidden-on-desktop"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="brand">
              <img className="brand-logo-image" src={META_LOGO_URL} alt="Purge Digital logo" />
              <span className="brand-text">
                <span className="brand-name">Purge Digital</span>
                <span className="brand-subtitle">Master Controller</span>
              </span>
            </div>
          </div>
          
          <nav className="nav-menu">
            <button 
              onClick={() => setActiveTab('Clients')}
              className={`nav-item ${activeTab === 'Clients' ? 'active' : ''}`}
            >
              <Users size={20} />
              Clients
            </button>
            
            <button 
              onClick={() => setActiveTab('Leads')}
              className={`nav-item ${activeTab === 'Leads' ? 'active' : ''}`}
            >
              <Target size={20} />
              Leads
            </button>
            
            <button 
              onClick={() => setActiveTab('Services')}
              className={`nav-item ${activeTab === 'Services' ? 'active' : ''}`}
            >
              <Briefcase size={20} />
              Services
            </button>

            {/* New Tabs */}
            <button 
              onClick={() => setActiveTab('Meta Risk')}
              className={`nav-item ${activeTab === 'Meta Risk' ? 'active' : ''}`}
            >
              <ShieldAlert size={20} />
              Meta Risk
            </button>

            <button 
              onClick={() => setActiveTab('Google Risk')}
              className={`nav-item ${activeTab === 'Google Risk' ? 'active' : ''}`}
            >
              <ShieldCheck size={20} />
              Google Risk
            </button>
          </nav>

          {/* Import Section */}
          <div className="import-section">
            <h4 className="section-title">Data Management</h4>
            <div className="import-grid">
              <button onClick={handleImportClick} title="Import CSV" className="import-btn">
                <FileSpreadsheet size={20} />
                <span className="import-label">CSV</span>
              </button>
              <button onClick={handleExportJSON} title="Export JSON" className="import-btn">
                <FileJson size={20} />
                <span className="import-label">JSON</span>
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv,.txt,.xlsx,.xls" 
              className="hidden" 
            />
          </div>

          <div className="sidebar-footer">
            <button className="nav-item" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`main-content ${activeTab === 'Meta Risk' ? 'meta-risk' : ''}`}>
          
          {/* Header */}
          {activeTab !== 'Meta Risk' && (
            <header className="header-area">
              <div>
                <h2 className="page-title">
                  {activeTab === 'Clients' && 'Client Database'}
                  {activeTab === 'Leads' && 'Lead Management'}
                  {activeTab === 'Services' && 'Service Catalog'}
                  {activeTab === 'Google Risk' && 'Google Risk Assessment'}
                </h2>
                <p className="page-subtitle">
                  {activeTab === 'Clients' ? `${clients.length} Active Accounts` : 'Module Active'}
                </p>
              </div>
              
              <div className="controls">
                {activeTab === 'Clients' && (
                  <>
                    <div className="search-wrapper">
                      <Search className="search-icon" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="controls-actions">
                      {selectedClientIds.size > 0 ? (
                        <>
                          <button onClick={selectAll} className="btn-secondary" title="Select All in View">
                            <CheckSquare size={18} /> Select All
                          </button>
                          <div className="custom-select-wrapper">
                            <select 
                              className="custom-select"
                              style={{ minWidth: '140px' }}
                              value={bulkActionType}
                              onChange={(e) => setBulkActionType(e.target.value)}
                            >
                              <option value="">Bulk Actions...</option>
                              <option value="Active">Set Active</option>
                              <option value="Paused">Set Paused</option>
                              <option value="Cancelled">Set Cancelled</option>
                              <option value="delete">Delete Selected</option>
                            </select>
                            <ChevronDown className="custom-select-arrow" size={16} />
                          </div>
                          <button onClick={applyBulkAction} className="btn-primary" disabled={!bulkActionType}>
                            Submit <ArrowRight size={16} />
                          </button>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', alignSelf: 'center', marginLeft: '0.5rem' }}>
                            {selectedClientIds.size} Selected
                          </span>
                        </>
                      ) : (
                        <button 
                          onClick={() => setIsAddModalOpen(true)}
                          className="btn-primary"
                        >
                          <Plus size={20} />
                          <span>Add New</span>
                        </button>
                      )}
                      <button onClick={openStripeSync} className="btn-stripe">
                        <Play size={18} />
                        <span>Sync with Stripe</span>
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'Google Risk' && (
                  <div className="risk-controls">
                    <button className="btn-secondary">
                      <ShieldCheck size={18} /> Show Risk
                    </button>
                    <div className="risk-filter-card">
                      <div className="risk-filter-meta">
                        <span className="risk-filter-label">Risk Filter</span>
                        <div className="custom-select-wrapper">
                          <select
                            className="custom-select"
                            value={riskFilterDraft}
                            onChange={(e) => setRiskFilterDraft(e.target.value)}
                          >
                            <option value="">Select Filter</option>
                            <option value="CPA">CPA</option>
                            <option value="Creative">Creative</option>
                          </select>
                          <ChevronDown className="custom-select-arrow" size={16} />
                        </div>
                      </div>
                      {riskFilter && (
                        <span className="risk-filter-pill">
                          <Filter size={14} /> {riskFilter}
                        </span>
                      )}
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => setRiskFilter(riskFilterDraft)}
                      disabled={!riskFilterDraft}
                    >
                      Apply <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Tab Content */}
          {activeTab === 'Meta Risk' ? (
            <MetaRiskEmbed accessToken={metaAccessToken} onLogout={handleLogout} />
          ) : activeTab === 'Clients' ? (
            <div className="client-grid">
              {filteredClients.map((client) => {
                const displayStatus = hasActiveStripeSubscriptions(client) ? 'Active' : client.status;
                return (
                  <div 
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client);
                      setIsEditing(false); 
                      setIsDeleteConfirmOpen(false);
                    }}
                    className={`card ${selectedClientIds.has(client.id) ? 'selected' : ''}`}
                  >
                    <div className="card-header">
                      <div className="icon-box">
                        <UserCircle size={24} />
                      </div>
                      
                      {/* Selection Checkbox */}
                      <div 
                        className={`card-select-checkbox ${selectedClientIds.has(client.id) ? 'checked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectClient(client.id);
                        }}
                      >
                        {selectedClientIds.has(client.id) && <Check size={14} />}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <h3 className="card-title" style={{ marginRight: '0.5rem', flex: 1 }}>{client.businessName}</h3>
                      {displayStatus && (
                        <span className={`status-indicator status-${displayStatus.toLowerCase()}`}>
                          {displayStatus}
                        </span>
                      )}
                    </div>

                    <p className="card-contact">
                      <User size={14} /> {client.contactName}
                    </p>

                    <div className="info-stack">
                      <div className="info-row">
                        <Mail size={16} className="info-icon" />
                        <span className="text-truncate">{client.email}</span>
                      </div>
                      <div className="info-row">
                        <Phone size={16} className="info-icon" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="info-row">
                        <MapPin size={16} className="info-icon" />
                        <span className="text-truncate">{client.location}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className="service-tag">{client.service}</span>
                      <button className="view-link">
                        View Details <Eye size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                {activeTab === 'Google Risk' ? <ShieldCheck size={40} color="#ff5d00" /> : 
                 <Briefcase size={40} color="#cbd5e1" />}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>{activeTab} Dashboard</h3>
              <p>This module is currently under development.</p>
            </div>
          )}

          {activeTab === 'Clients' && filteredClients.length === 0 && (
            <div className="empty-state">
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>No clients found.</p>
              <p>Try adjusting your search terms.</p>
            </div>
          )}
        </main>

        {/* STRIPE SYNC MODAL */}
        <Modal isOpen={isStripeSyncOpen} onClose={closeStripeSync} className="stripe-modal-content">
          <div className="modal-body stripe-modal">
            <div className="stripe-modal-header">
              <div>
                <span className="section-label">Stripe Sync</span>
                <h2 className="modal-title">Sync Stripe customers</h2>
                <p className="stripe-subtitle">
                  Review synced Stripe customers, match them to your client database, and merge any remaining records.
                </p>
              </div>
              <span className="stripe-pill">
                <ShieldCheck size={14} /> Secure connection
              </span>
            </div>

            <div className="stripe-stepper">
              <span className={`stripe-step ${stripeSyncStage === 'loading' ? 'active' : stripeSyncStage === 'review' || stripeSyncStage === 'merge' || stripeSyncStage === 'complete' ? 'complete' : ''}`}>
                <Table size={14} /> Pull Stripe Customers
              </span>
              <span className={`stripe-step ${stripeSyncStage === 'review' ? 'active' : stripeSyncStage === 'merge' || stripeSyncStage === 'complete' ? 'complete' : ''}`}>
                <CheckCircle size={14} /> Match Review
              </span>
              <span className={`stripe-step ${stripeSyncStage === 'merge' ? 'active' : stripeSyncStage === 'complete' ? 'complete' : ''}`}>
                <Users size={14} /> Merge
              </span>
            </div>

            {stripeSyncStage === 'loading' && (
              <div className="stripe-loading">
                <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Pulling Stripe customers...</h3>
                <p className="stripe-subtitle">Fetching customers and preparing match suggestions.</p>
                <div className="stripe-loading-bar" />
              </div>
            )}

            {stripeSyncStage === 'review' && (
              <div className="stripe-results">
                <div className="stripe-results-header">
                  <div>
                    <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Review Stripe matches</h3>
                    <p className="stripe-results-meta">
                      {stripeSyncStats.total} Stripe customers pulled
                      {stripeSyncStats.source ? ` · Source: ${stripeSyncStats.source}` : ''}.
                    </p>
                    <div className="stripe-customer-badges" style={{ marginTop: '0.5rem' }}>
                      <span className="stripe-summary-pill">{stripeSyncStats.matched} matched</span>
                      <span className="stripe-summary-pill">{stripeSyncStats.unmatched} unmatched</span>
                    </div>
                  </div>
                  <div>
                    <button className="stripe-select-all" onClick={toggleAllStripeMatches}>
                      {stripeMatchSelection.size === stripeMatches.filter(match => match.canSync).length ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>
                </div>
                <div className="stripe-table-wrapper">
                  <table className="stripe-table">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>Select</th>
                        <th>Stripe Customer</th>
                        <th>Client Database</th>
                        <th>Matched by</th>
                        <th>Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stripeMatches.map((match) => {
                        const isSelected = stripeMatchSelection.has(match.id);
                        const activeSubscriptions = match.stripeCustomer.subscriptions.filter(subscription => subscription.status === 'active');
                        const monthlyValue = getMonthlyRecurringRevenue(activeSubscriptions);
                        return (
                          <tr key={match.id} className={match.canSync ? '' : 'stripe-row-disabled'}>
                            <td>
                              <div
                                className={`card-select-checkbox ${isSelected ? 'checked' : ''}`}
                                onClick={() => toggleStripeMatch(match.id)}
                                style={{ width: '1.25rem', height: '1.25rem', cursor: match.canSync ? 'pointer' : 'not-allowed' }}
                              >
                                {isSelected && <Check size={12} />}
                              </div>
                            </td>
                            <td>
                              <div className="stripe-customer-card">
                                <span className="stripe-customer-title">{match.stripeCustomer.name}</span>
                                <span className="stripe-customer-sub">{match.stripeCustomer.company}</span>
                                <span className="stripe-customer-sub">{match.stripeCustomer.email}</span>
                                <span className="stripe-customer-sub">
                                  {match.stripeCustomer.subscriptions.length} total · {activeSubscriptions.length} active · {formatCurrency(monthlyValue, match.stripeCustomer.currency)}/mo
                                </span>
                                <div className="stripe-customer-badges" style={{ marginTop: '0.35rem' }}>
                                  {match.stripeCustomer.subscriptions.map(subscription => (
                                    <span key={subscription.id} className="stripe-subscription-pill">
                                      {subscription.product}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td>
                              {match.client ? (
                                <div className="stripe-customer-card">
                                  <span className="stripe-customer-title">{match.client.businessName}</span>
                                  <span className="stripe-customer-sub">{match.client.contactName}</span>
                                  <span className="stripe-customer-sub">{match.client.phone}</span>
                                  <span className="stripe-customer-sub">{match.client.location}</span>
                                </div>
                              ) : (
                                <span className="stripe-no-match">No client match found</span>
                              )}
                            </td>
                            <td>
                              {match.matchReasons.length ? (
                                match.matchReasons.map((reason) => (
                                  <span key={reason} className="stripe-match-pill">{reason}</span>
                                ))
                              ) : (
                                <span className="stripe-no-match">Awaiting manual match</span>
                              )}
                            </td>
                            <td>
                              <span className="stripe-verify">{match.confidence}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="stripe-review-actions">
                  <button className="btn-ghost" onClick={closeStripeSync}>Close</button>
                  <button className="btn-primary" onClick={confirmStripeMatches} disabled={stripeMatchSelection.size === 0}>
                    Confirm & Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {stripeSyncStage === 'merge' && (
              <div className="stripe-results">
                <div className="stripe-results-header">
                  <div>
                    <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Merge unmatched records</h3>
                    <p className="stripe-results-meta">
                      {stripeUnmatchedCustomers.length} Stripe customers without a client match · {stripeUnmatchedClients.length} client records without a Stripe match.
                    </p>
                  </div>
                </div>
                <div className="stripe-merge-grid">
                  <div className="stripe-merge-card">
                    <div>
                      <h4>Unmatched Stripe customers</h4>
                      <p className="stripe-merge-note">
                        Select one Stripe customer to pair with a client record or add them as a new client (status stays paused).
                        {normalizedStripeCustomerSearch && (
                          <span className="stripe-merge-note"> Showing {filteredStripeUnmatchedCustomers.length} of {stripeUnmatchedCustomers.length}.</span>
                        )}
                      </p>
                    </div>
                    <div className="stripe-merge-search">
                      <input
                        type="search"
                        placeholder="Search Stripe customers"
                        className="stripe-search-input"
                        value={stripeCustomerMergeSearch}
                        onChange={(event) => setStripeCustomerMergeSearch(event.target.value)}
                      />
                    </div>
                    <div className="stripe-table-wrapper">
                      <table className="stripe-table">
                        <thead>
                          <tr>
                            <th style={{ width: '60px' }}>Select</th>
                            <th>Stripe Customer</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStripeUnmatchedCustomers.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="stripe-no-match">
                                {stripeUnmatchedCustomers.length === 0
                                  ? 'All Stripe customers have a client match.'
                                  : 'No Stripe customers match your search.'}
                              </td>
                            </tr>
                          ) : (
                            filteredStripeUnmatchedCustomers.map(match => (
                              <tr key={match.stripeCustomer.id}>
                                <td>
                                  <div
                                    className={`card-select-checkbox ${stripeMergeSelection.stripeCustomerId === match.stripeCustomer.id ? 'checked' : ''}`}
                                    onClick={() => handleStripeMergeSelection('stripeCustomerId', match.stripeCustomer.id)}
                                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                                  >
                                    {stripeMergeSelection.stripeCustomerId === match.stripeCustomer.id && <Check size={12} />}
                                  </div>
                                </td>
                                <td>
                                  <div className="stripe-customer-card">
                                    <span className="stripe-customer-title">{match.stripeCustomer.name}</span>
                                    <span className="stripe-customer-sub">{match.stripeCustomer.company}</span>
                                    <span className="stripe-customer-sub">{match.stripeCustomer.email}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="stripe-customer-card">
                                    <span className="stripe-customer-sub">{match.stripeCustomer.phone}</span>
                                    <span className="stripe-customer-sub">{match.stripeCustomer.subscriptions.length} subscriptions</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="stripe-merge-card">
                    <div>
                      <h4>Unmatched client records</h4>
                      <p className="stripe-merge-note">
                        Select one client record to merge with the chosen Stripe customer.
                        {normalizedStripeClientSearch && (
                          <span className="stripe-merge-note"> Showing {filteredStripeUnmatchedClients.length} of {stripeUnmatchedClients.length}.</span>
                        )}
                      </p>
                    </div>
                    <div className="stripe-merge-search">
                      <input
                        type="search"
                        placeholder="Search client records"
                        className="stripe-search-input"
                        value={stripeClientMergeSearch}
                        onChange={(event) => setStripeClientMergeSearch(event.target.value)}
                      />
                    </div>
                    <div className="stripe-table-wrapper">
                      <table className="stripe-table">
                        <thead>
                          <tr>
                            <th style={{ width: '60px' }}>Select</th>
                            <th>Client</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStripeUnmatchedClients.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="stripe-no-match">
                                {stripeUnmatchedClients.length === 0
                                  ? 'All clients have a Stripe match.'
                                  : 'No client records match your search.'}
                              </td>
                            </tr>
                          ) : (
                            filteredStripeUnmatchedClients.map(client => (
                              <tr key={client.id}>
                                <td>
                                  <div
                                    className={`card-select-checkbox ${stripeMergeSelection.clientId === client.id ? 'checked' : ''}`}
                                    onClick={() => handleStripeMergeSelection('clientId', client.id)}
                                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                                  >
                                    {stripeMergeSelection.clientId === client.id && <Check size={12} />}
                                  </div>
                                </td>
                                <td>
                                  <div className="stripe-customer-card">
                                    <span className="stripe-customer-title">{client.businessName}</span>
                                    <span className="stripe-customer-sub">{client.contactName}</span>
                                    <span className="stripe-customer-sub">{client.email}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="stripe-customer-card">
                                    <span className="stripe-customer-sub">{client.phone}</span>
                                    <span className="stripe-customer-sub">{client.location}</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="stripe-merge-actions" style={{ marginTop: '1.5rem' }}>
                  <button className="btn-ghost" onClick={() => setStripeSyncStage('review')}>Back</button>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn-secondary"
                      onClick={handleStripeManualMerge}
                      disabled={!stripeMergeSelection.stripeCustomerId || !stripeMergeSelection.clientId}
                    >
                      Merge Selected
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={handleStripeCreateClient}
                      disabled={!stripeMergeSelection.stripeCustomerId}
                    >
                      Add as new client
                    </button>
                    <button className="btn-primary" onClick={() => setStripeSyncStage('complete')}>
                      Finish Sync <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {stripeSyncStage === 'complete' && (
              <div className="stripe-loading">
                <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Sync queued successfully</h3>
                <p className="stripe-subtitle">
                  Stripe customer data has been synced. Subscription services are now available in each client’s Services tab.
                </p>
                <div className="modal-actions" style={{ justifyContent: 'center' }}>
                  <button className="btn-primary" onClick={closeStripeSync}>Done</button>
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* IMPORT REVIEW MODAL */}
        <Modal isOpen={isImportReviewOpen} onClose={() => setIsImportReviewOpen(false)}>
          {/* START: Phone Number Formatting Review Step */}
          {importReviewStep === 'phone_check' && (
            <div className="import-review-container">
               <div className="import-review-header">
                  <h2 className="modal-title">Phone Number Formatting</h2>
                  <button className="close-btn" onClick={() => setIsImportReviewOpen(false)}><X size={24} /></button>
               </div>
               <p className="box-text" style={{ marginBottom: '1rem' }}>
                 The following numbers were detected without a country code. Select the ones you want to format to +61.
               </p>
               
               {/* Controls: Select All */}
               <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn-secondary" onClick={toggleSelectAllPhones} style={{height: '2.5rem', padding: '0 1rem'}}>
                     <CheckSquare size={16} /> {phoneFormatSelection.size > 0 && phoneFormatSelection.size === pendingImports.filter(i => i.phoneStatus === 'needs_format').length ? "Deselect All" : "Select All"}
                  </button>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{phoneFormatSelection.size} selected</span>
               </div>

               <div style={{ maxHeight: '50vh', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                  <table className="review-table">
                     <thead>
                        <tr>
                           <th style={{ width: '40px' }}>Select</th>
                           <th>Name</th>
                           <th>Original Number</th>
                           <th>Suggested Format</th>
                        </tr>
                     </thead>
                     <tbody>
                        {pendingImports.map((item, idx) => {
                           if (item.phoneStatus !== 'needs_format') return null;
                           const isSelected = phoneFormatSelection.has(idx);
                           return (
                              <tr key={idx} onClick={() => togglePhoneSelect(idx)} style={{ cursor: 'pointer', backgroundColor: isSelected ? '#fff7ed' : 'transparent' }}>
                                 <td>
                                    <div className={`card-select-checkbox ${isSelected ? 'checked' : ''}`} style={{ width: '1.25rem', height: '1.25rem' }}>
                                       {isSelected && <Check size={12} />}
                                    </div>
                                 </td>
                                 <td>{item.businessName || item.contactName}</td>
                                 <td style={{ color: '#ef4444', textDecoration: 'line-through' }}>{item.phone}</td>
                                 <td style={{ color: '#16a34a', fontWeight: 600 }}>{item.suggestedPhone}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>

               <div className="review-actions">
                  <button onClick={() => setImportReviewStep('review')} className="btn-ghost">Skip Formatting</button>
                  <button onClick={confirmPhoneFormatting} className="btn-primary">
                     Confirm & Continue <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          )}
          {/* END: Phone Number Formatting Review Step */}

          {importReviewStep === 'review' && (
          <div className="import-review-container">
            <div className="import-review-header">
              <h2 className="modal-title">Review Import Data</h2>
              <button className="close-btn" onClick={() => setIsImportReviewOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <p className="box-text" style={{ marginBottom: '1rem' }}>
              We found <strong>{pendingImports.length}</strong> client entries in your file. 
              Please review them below before importing. 
              Entries with errors will be skipped.
            </p>

            <div className="review-tabs">
              <button 
                className={`review-tab ${importReviewTab === 'list' ? 'active' : ''}`}
                onClick={() => setImportReviewTab('list')}
              >
                <List size={16} style={{ display: 'inline', marginRight: '6px' }} />
                All Entries ({pendingImports.length})
              </button>
              {hasErrors && (
                <button 
                  className={`review-tab ${importReviewTab === 'errors' ? 'active' : ''}`}
                  onClick={() => setImportReviewTab('errors')}
                >
                  <Bug size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Error Log ({pendingImports.filter(i => !i.isValid).length})
                </button>
              )}
            </div>

            <div style={{ maxHeight: '55vh', overflowY: 'auto', overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: 'white' }}>
              
              {importReviewTab === 'list' ? (
                <table className="review-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Business Name</th>
                      <th>Contact</th>
                      <th>Number</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Capacity</th>
                      <th>Goals</th>
                      <th>Budget/Schedule</th>
                      <th>Billing Details</th>
                      <th>Additional Info</th>
                      <th>Issues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingImports.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item.isValid ? (
                            <span className="status-valid"><CheckCircle size={16} /> Valid</span>
                          ) : (
                            <span className="status-error"><XCircle size={16} /> Error</span>
                          )}
                        </td>
                        <td>{item.businessName || <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Missing</span>}</td>
                        <td>{item.contactName || '-'}</td>
                        <td>
                          {item.phone || '-'}
                          {item.phoneStatus === 'needs_format' && (
                            <button 
                              className="action-btn-mini"
                              onClick={() => approvePhoneFormat(idx)}
                              title={`Change to ${item.suggestedPhone}`}
                            >
                              <Check size={12} /> Format (+61)
                            </button>
                          )}
                        </td>
                        <td>{item.email || '-'}</td>
                        <td>{item.service || '-'}</td>
                        <td>{item.capacity || '-'}</td>
                        <td>{item.goals || '-'}</td>
                        <td>{item.budget || '-'}</td>
                        <td>{item.location || '-'}</td>
                        <td>{item.additionalInfo || '-'}</td>
                        <td>
                          {item.error ? (
                            <div className="error-text"><AlertCircle size={12} style={{ display:'inline', marginRight:'2px' }} /> {item.error}</div>
                          ) : (
                            <span style={{ color: '#cbd5e1' }}>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '1rem' }}>
                  {Object.keys(errorGroups).length === 0 ? (
                    <div className="empty-state" style={{ padding: '2rem' }}>No errors found!</div>
                  ) : (
                    Object.entries(errorGroups).map(([errorType, items]) => (
                      <div key={errorType} className="error-group">
                        <div className="error-group-header">
                          <AlertTriangle size={18} />
                          {errorType} ({items.length})
                        </div>
                        <ul className="error-list">
                          {items.map((item, idx) => (
                            <li key={idx} className="error-list-item">
                              <span><strong>ID:</strong> {item.id}</span>
                              <span style={{ color: '#64748b' }}>Data: {item.contactName || "Unknown Contact"} | {item.service || "No Service"}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="review-actions">
              <button onClick={() => setIsImportReviewOpen(false)} className="btn-ghost">
                Cancel
              </button>
              <button onClick={confirmImport} className="btn-primary">
                <Save size={18} />
                Import {pendingImports.filter(i => i.isValid).length} Valid Clients
              </button>
            </div>
          </div>
          )}
        </Modal>

        {/* Client Detail Modal */}
        <Modal isOpen={!!selectedClient} onClose={() => setSelectedClient(null)}>
          {selectedClient && (
            <div className="modal-body">
              {/* DELETE CONFIRMATION SCREEN */}
              {isDeleteConfirmOpen ? (
                <div className="delete-confirm-container">
                  <div className="delete-icon-wrapper">
                    <Trash2 size={32} />
                  </div>
                  <h3 className="delete-title">Delete this client?</h3>
                  <p className="delete-desc">
                    You are about to permanently delete <strong>{selectedClient.businessName}</strong>. This action cannot be undone.
                  </p>
                  <div className="delete-actions">
                    <button onClick={cancelDelete} className="btn-cancel-lg">
                      Cancel
                    </button>
                    <button onClick={confirmDelete} className="btn-delete-lg">
                      <Trash2 size={18} />
                      Yes, Delete
                    </button>
                  </div>
                </div>
              ) : (
                /* NORMAL DETAILS SCREEN */
                <>
                  {/* Header / Edit Toggle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    {!isEditing ? (
                      <div style={{ flex: 1 }}>
                        <h2 className="modal-title">{selectedClient.businessName}</h2>
                        <div className="tag-group">
                          <span className="tag-primary">
                            {selectedClient.service}
                          </span>
                          {selectedActivity.hasRisk && !selectedActivity.loading && !selectedActivity.error && (
                            <span className="tag-risk">
                              <ShieldAlert size={14} /> Risk
                            </span>
                          )}
                          <span className="tag-secondary">
                            <DollarSign size={14} /> {selectedClient.budget}
                          </span>
                          {selectedClient.status && (
                            <span className={`status-indicator status-${selectedClient.status.toLowerCase()}`}>
                              {selectedClient.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                       <div style={{ width: '100%' }}>
                        <label className="section-label">Business Name</label>
                        <input 
                          className="edit-input-lg"
                          value={editingClient.businessName}
                          onChange={(e) => setEditingClient({...editingClient, businessName: e.target.value})}
                        />
                        <div className="tag-group">
                           <input 
                              className="edit-input-sm"
                              value={editingClient.service}
                              onChange={(e) => setEditingClient({...editingClient, service: e.target.value})}
                              placeholder="Service"
                            />
                            <input 
                              className="edit-input-sm"
                              value={editingClient.budget}
                              onChange={(e) => setEditingClient({...editingClient, budget: e.target.value})}
                              placeholder="Budget"
                            />
                            <select
                              className="edit-input-sm"
                              value={editingClient.status}
                              onChange={(e) => setEditingClient({...editingClient, status: e.target.value})}
                            >
                              <option value="Active">Active</option>
                              <option value="Paused">Paused</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                       </div>
                    )}
                  </div>

                  <div className="detail-tabs">
                    <button
                      className={`detail-tab ${clientDetailTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setClientDetailTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`detail-tab ${clientDetailTab === 'activity' ? 'active' : ''}`}
                      onClick={handleRecentActivityClick}
                    >
                      Recent Activity
                    </button>
                    <button
                      className={`detail-tab ${clientDetailTab === 'services' ? 'active' : ''}`}
                      onClick={() => setClientDetailTab('services')}
                    >
                      Services
                    </button>
                    <button
                      className={`detail-tab ${clientDetailTab === 'meta' ? 'active' : ''}`}
                      onClick={() => setClientDetailTab('meta')}
                    >
                      Meta
                    </button>
                    <button
                      className={`detail-tab ${clientDetailTab === 'google' ? 'active' : ''}`}
                      onClick={() => setClientDetailTab('google')}
                    >
                      Google Ads
                    </button>
                  </div>

                  {clientDetailTab === 'overview' && (
                    <>
                    {/* Content Body */}
                    <div className="detail-grid">
                    
                    {/* --- Left Column: Contact --- */}
                    <div>
                      <h3 className="section-label">Contact Details</h3>
                      
                      {!isEditing ? (
                        <>
                          <div className="info-box">
                            <User className="info-icon" />
                            <span className="info-box-text">{selectedClient.contactName}</span>
                          </div>
                          <div className="info-box">
                            <Phone className="info-icon" />
                            <a href={`tel:${selectedClient.phone}`} className="info-box-link">{selectedClient.phone}</a>
                          </div>
                          <div className="info-box">
                            <Mail className="info-icon" />
                            <a href={`mailto:${selectedClient.email}`} className="info-box-link text-truncate">{selectedClient.email}</a>
                          </div>
                          <div className="info-box">
                            <MapPin className="info-icon" />
                            <span className="info-box-text">{selectedClient.location}</span>
                          </div>
                          {selectedStripeProfile?.customerSince && (
                            <div className="info-box">
                              <Calendar className="info-icon" />
                              <span className="info-box-text">
                                Customer since {formatDateShort(selectedStripeProfile.customerSince)}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="info-box">
                            <User className="info-icon" />
                            <input 
                              className="edit-input-plain"
                              value={editingClient.contactName}
                              onChange={(e) => setEditingClient({...editingClient, contactName: e.target.value})}
                              placeholder="Contact Name"
                            />
                          </div>
                           <div className="info-box">
                            <Phone className="info-icon" />
                            <input 
                              className="edit-input-plain"
                              value={editingClient.phone}
                              onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                              placeholder="Phone"
                            />
                          </div>
                           <div className="info-box">
                            <Mail className="info-icon" />
                            <input 
                              className="edit-input-plain"
                              value={editingClient.email}
                              onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                              placeholder="Email"
                            />
                          </div>
                           <div className="info-box">
                            <MapPin className="info-icon" />
                            <input 
                              className="edit-input-plain"
                              value={editingClient.location}
                              onChange={(e) => setEditingClient({...editingClient, location: e.target.value})}
                              placeholder="Location"
                            />
                          </div>
                        </>
                      )}

                      <div className="additional-section">
                        <h3 className="section-label">Additional</h3>
                        <div className="additional-controls">
                          <button type="button" className="additional-add-btn">
                            <Plus size={16} />
                            Add details
                          </button>
                          <div className="custom-select-wrapper">
                            <select className="custom-select additional-select" defaultValue="">
                              <option value="">Select icon</option>
                              <option value="note">Note</option>
                              <option value="link">Link</option>
                              <option value="flag">Flag</option>
                            </select>
                            <ChevronDown className="custom-select-arrow" size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- Right Column: Strategy --- */}
                    <div>
                      <h3 className="section-label">Strategy & Access</h3>
                      
                      <div className={`content-box ${isEditing ? 'editing' : ''}`}>
                        <div className="box-header">
                          <Target size={18} className="info-icon" />
                          Goals
                        </div>
                        {!isEditing ? (
                          <p className="box-text">{selectedClient.goals}</p>
                        ) : (
                          <textarea 
                            className="edit-textarea"
                            rows={3}
                            value={editingClient.goals}
                            onChange={(e) => setEditingClient({...editingClient, goals: e.target.value})}
                          />
                        )}
                      </div>

                      <div className={`content-box ${isEditing ? 'editing' : ''}`}>
                        <div className="box-header">
                          <Edit2 size={18} className="info-icon" />
                          Notes
                        </div>
                        {!isEditing ? (
                           <p className="box-text">{selectedClient.notes}</p>
                        ) : (
                          <textarea 
                            className="edit-textarea"
                            rows={3}
                            value={editingClient.notes}
                            onChange={(e) => setEditingClient({...editingClient, notes: e.target.value})}
                          />
                        )}
                      </div>

                      <div className="dark-box">
                        <div className="dark-box-header">
                          <Globe size={18} />
                          Website Access
                        </div>
                        {!isEditing ? (
                          <>
                            <div className="text-truncate">URL: {selectedClient.website}</div>
                            <div className="text-truncate" style={{ marginTop: '0.25rem' }}>{selectedClient.access}</div>
                          </>
                        ) : (
                          <>
                             <input 
                              className="edit-input-dark"
                              value={editingClient.website}
                              onChange={(e) => setEditingClient({...editingClient, website: e.target.value})}
                              placeholder="Website URL"
                            />
                            <textarea 
                              className="edit-input-dark"
                              rows={2}
                              value={editingClient.access}
                              onChange={(e) => setEditingClient({...editingClient, access: e.target.value})}
                              placeholder="Access Details"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    {!isEditing ? (
                      <>
                        <button 
                          onClick={startEditing}
                          className="btn-edit"
                        >
                          <Edit2 size={18} />
                          Edit Client
                        </button>
                        <button
                          onClick={handleStripeClientSync}
                          className="btn-sync"
                          disabled={stripeClientSyncing || !selectedStripeProfile?.customerId}
                        >
                          <RefreshCw size={18} />
                          {stripeClientSyncing ? 'Syncing...' : 'Sync'}
                        </button>
                        <button 
                          onClick={initiateDelete}
                          className="btn-danger"
                        >
                          <Trash2 size={18} />
                          Delete Client
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={cancelEditing}
                          className="btn-ghost"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={saveEditing}
                          className="btn-primary"
                        >
                          <Save size={18} />
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                  </>
                  )}

                  {clientDetailTab === 'activity' && (
                    <div>
                      <div className="activity-summary">
                        <div>
                          <h3 className="section-label">Recent Activity for {selectedClient.phone || 'Unknown number'}</h3>
                          <div className="login-helper">
                            {clientActivityTab === 'contact'
                              ? `Showing ${selectedActivity.items.length} Aircall interaction${selectedActivity.items.length === 1 ? '' : 's'} from the last 14 days, plus sent email history.`
                              : `Showing ${selectedBillingActivity.length} Stripe billing update${selectedBillingActivity.length === 1 ? '' : 's'} for this customer.`}
                          </div>
                        </div>
                      </div>

                      <div className="activity-tabs">
                        <button
                          className={`activity-tab ${clientActivityTab === 'contact' ? 'active' : ''}`}
                          onClick={() => setClientActivityTab('contact')}
                          type="button"
                        >
                          Contact history
                        </button>
                        <button
                          className={`activity-tab ${clientActivityTab === 'billing' ? 'active' : ''}`}
                          onClick={() => setClientActivityTab('billing')}
                          type="button"
                        >
                          Billing
                        </button>
                      </div>

                      {clientActivityTab === 'contact' && (
                        <>
                          <div className="activity-section">
                            <div className="activity-section-header">
                              <h4 className="activity-section-title">Sent emails</h4>
                              <span className="activity-section-meta">
                                {selectedSentEmails.length} sent update{selectedSentEmails.length === 1 ? '' : 's'}
                              </span>
                            </div>
                            {selectedSentEmails.length > 0 ? (
                              <div className="activity-list">
                                {selectedSentEmails.map((email) => (
                                  <div key={email.id} className="email-card">
                                    <div className="email-card-header">
                                      <div className="email-card-title">{email.subject}</div>
                                      <span className="email-status">{email.status}</span>
                                    </div>
                                    <div className="email-card-meta">
                                      <div><strong>To:</strong> {email.to}</div>
                                      <div><strong>Sent:</strong> {formatDateTime(email.sentAt)}</div>
                                      <div><strong>Preview:</strong> {email.preview}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="activity-empty">No sent emails have been logged for this client yet.</div>
                            )}
                          </div>

                          <div className="activity-section">
                            <div className="activity-section-header">
                              <h4 className="activity-section-title">Aircall contact history</h4>
                              <span className="activity-section-meta">
                                Last 14 days · {selectedActivity.items.length} call{selectedActivity.items.length === 1 ? '' : 's'}
                              </span>
                            </div>
                            {selectedActivity.error && (
                              <div className="activity-empty">
                                <strong>Aircall Error:</strong> {selectedActivity.error}
                              </div>
                            )}

                            {selectedActivity.items.length > 0 ? (
                              <div className="activity-list">
                                {selectedActivity.items.map((call, index) => (
                                  <div key={`${call.id}-${index}`} className="activity-card">
                                    <div className="activity-header">
                                      <div className="activity-title">Call #{index + 1}</div>
                                      <span className="status-indicator status-active">{call.status || call.direction || 'Call'}</span>
                                    </div>
                                    <div className="activity-meta">
                                      <div><strong>Started at:</strong> {formatDateTime(call.startedAt)}</div>
                                      <div><strong>In call time:</strong> {formatDuration(call.duration)}</div>
                                      <div><strong>Caller:</strong> {call.userName || 'Unknown'}</div>
                                      <div><strong>Status:</strong> {call.status || 'Unknown'}</div>
                                      <div><strong>Disconnected by:</strong> {call.disconnectedBy || 'Unknown'}</div>
                                      <div><strong>From:</strong> {call.fromNumber || 'Unknown'} • <strong>To:</strong> {call.toNumber || 'Unknown'}</div>
                                    </div>
                                    <div className="activity-actions">
                                      {call.transcriptionUrl && (
                                        <a className="activity-btn secondary" href={call.transcriptionUrl} target="_blank" rel="noreferrer">
                                          <Eye size={16} /> Transcription
                                        </a>
                                      )}
                                      {call.recordingUrl && (
                                        <a className="activity-btn secondary" href={call.recordingUrl} target="_blank" rel="noreferrer">
                                          <Play size={16} /> Recording
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              !selectedActivity.loading && !selectedActivity.error && (
                                <div className="activity-empty">No recent interactions were found for this number in the last 14 days.</div>
                              )
                            )}
                          </div>
                        </>
                      )}

                      {clientActivityTab === 'billing' && (
                        <div className="activity-section">
                          <div className="activity-section-header">
                            <h4 className="activity-section-title">Stripe billing activity</h4>
                            <span className="activity-section-meta">
                              {selectedBillingActivity.length} billing item{selectedBillingActivity.length === 1 ? '' : 's'} synced
                            </span>
                          </div>
                          {selectedBillingActivity.length > 0 ? (
                            <div className="activity-list">
                              {selectedBillingActivity.map((item) => (
                                <div key={item.id} className="billing-card">
                                  <div className="billing-card-header">
                                    <div className="billing-card-title">{item.title}</div>
                                    <span className="billing-status">{item.status}</span>
                                  </div>
                                  <div className="billing-card-meta">
                                    <div><strong>Type:</strong> {item.type}</div>
                                    <div><strong>Product line:</strong> {item.product || item.title}</div>
                                    <div><strong>Email billed:</strong> {item.email || '—'}</div>
                                    <div><strong>Amount:</strong> {formatCurrency(item.amount, item.currency)}{item.interval ? ` / ${item.interval}` : ''}</div>
                                    <div><strong>Date:</strong> {item.date ? formatDateTime(item.date) : 'Unknown date'}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="billing-empty">No Stripe billing activity has been synced for this customer yet.</div>
                          )}
                        </div>
                      )}

                    </div>
                  )}

                  {clientDetailTab === 'services' && (
                    <div>
                      <div className="services-header">
                        <div>
                          <h3 className="section-label">Stripe Services</h3>
                          <div className="services-meta">
                            {selectedSubscriptions.length} subscription{selectedSubscriptions.length === 1 ? '' : 's'} synced
                            {selectedStripeProfile?.customerId ? ` · Customer ID: ${selectedStripeProfile.customerId}` : ''}
                          </div>
                        </div>
                      </div>

                      {selectedSubscriptions.length > 0 ? (
                        <div className="services-grid">
                          {selectedSubscriptions.map(subscription => (
                            <div key={subscription.id} className="service-card">
                              <div className="service-card-header">
                                <div>
                                  <div className="service-name">{subscription.product}</div>
                                  <div className="service-plan">Billed {subscription.interval}</div>
                                </div>
                                <span className="service-status">{subscription.status}</span>
                              </div>
                              <div className="service-meta-grid">
                                <div>
                                  <strong>Amount:</strong> {formatCurrency(subscription.amount, subscription.currency)} / {subscription.interval}
                                </div>
                                <div>
                                  <strong>Quantity:</strong> {subscription.quantity}
                                </div>
                                <div>
                                  <strong>Started:</strong> {formatDateShort(subscription.startedAt)}
                                </div>
                                <div>
                                  <strong>Renews:</strong> {formatDateShort(subscription.currentPeriodEnd)}
                                </div>
                                {subscription.cancelAt && (
                                  <div>
                                    <strong>Cancel date:</strong> {formatDateShort(subscription.cancelAt)}
                                  </div>
                                )}
                                {subscription.canceledAt && (
                                  <div>
                                    <strong>Canceled:</strong> {formatDateShort(subscription.canceledAt)}
                                  </div>
                                )}
                                {subscription.pauseBehavior && (
                                  <div>
                                    <strong>Pause:</strong> {subscription.pauseBehavior}
                                  </div>
                                )}
                              </div>
                              <div className="service-chip-row">
                                <span className="service-chip">Status: {subscription.status}</span>
                                <span className="service-chip">Billing: {subscription.interval}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="service-empty">
                          No Stripe subscriptions have been synced for this client yet. Use Sync with Stripe to pull subscription history.
                        </div>
                      )}
                    </div>
                  )}

                  {clientDetailTab === 'meta' && (
                    <div>
                      <div className="meta-header">
                        <div className={`meta-lookup ${selectedMetaEntry?.data ? 'compact' : ''}`}>
                          <div className="meta-lookup-title-row">
                            <div>
                              <h3 className="meta-lookup-title">Meta Ads Account ID</h3>
                              {!selectedMetaEntry?.data && (
                                <p className="meta-lookup-helper">
                                  Load the Meta Ads account to review metrics, team activity, and change history.
                                </p>
                              )}
                            </div>
                            {selectedMetaEntry?.source && (
                              <span className="meta-source-pill">Source: {selectedMetaEntry.source}</span>
                            )}
                          </div>

                          <form onSubmit={handleMetaLookup}>
                            <div className="meta-lookup-form">
                              <div>
                                <input
                                  id="metaAccountIdInput"
                                  className="form-input meta-input"
                                  value={metaAccountInput}
                                  onChange={(event) => setMetaAccountInput(event.target.value)}
                                  placeholder="Enter Meta Ads account ID"
                                />
                              </div>
                              <button className="btn-primary meta-submit" type="submit" disabled={selectedMetaEntry?.status === 'loading'}>
                                {selectedMetaEntry?.status === 'loading' ? 'Loading...' : 'Load Meta'}
                              </button>
                            </div>
                          </form>

                          {selectedMetaEntry?.status === 'error' && selectedMetaEntry?.error && (
                            <div className="meta-error">
                              <strong>Error:</strong> {selectedMetaEntry.error}
                            </div>
                          )}

                          {selectedMetaEntry?.logs?.length > 0 && (
                            <div className="meta-log">
                              {selectedMetaEntry.logs.join('\n')}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="date-picker">
                            {metaDateOptions.map(option => (
                              <button
                                key={option.label}
                                type="button"
                                className={`date-btn ${metaDateRange.label === option.label ? 'active' : ''}`}
                                onClick={() => setMetaDateRange(option)}
                              >
                                {option.label}
                              </button>
                            ))}
                            <button
                              type="button"
                              className={`date-btn ${metaDateRange.days === 'custom' ? 'active' : ''}`}
                              onClick={() => setMetaDateRange({ label: 'Custom', days: 'custom' })}
                            >
                              Custom
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="tab-group meta-tab-group">
                        <button
                          className={`tab-btn ${clientMetaTab === 'overview' ? 'active' : ''}`}
                          onClick={() => setClientMetaTab('overview')}
                          type="button"
                        >
                          <TrendingUp size={16} />
                          Overview
                        </button>
                        <button
                          className={`tab-btn ${clientMetaTab === 'team' ? 'active' : ''}`}
                          onClick={() => setClientMetaTab('team')}
                          type="button"
                        >
                          <Users size={16} />
                          Team
                        </button>
                        <button
                          className={`tab-btn ${clientMetaTab === 'history' ? 'active' : ''}`}
                          onClick={() => setClientMetaTab('history')}
                          type="button"
                        >
                          <History size={16} />
                          Change History
                        </button>
                        <button
                          className={`tab-btn ${clientMetaTab === 'metrics' ? 'active' : ''}`}
                          onClick={() => setClientMetaTab('metrics')}
                          type="button"
                        >
                          <Activity size={16} />
                          Metrics
                        </button>
                      </div>

                      {!selectedMetaEntry?.data && (
                        <div className="service-empty">
                          Add a Meta Ads account ID to load the risk snapshot for this client.
                        </div>
                      )}

                      {selectedMetaEntry?.data && clientMetaTab === 'overview' && (
                        <div className="grid-stats">
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Spend</span>
                              <TrendingUp color="#4ade80" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {formatCurrency(Number(selectedMetaEntry.data.metrics?.spend), selectedMetaEntry.data.overview?.currency)}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Impressions</span>
                              <Activity color="#60a5fa" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {Number(selectedMetaEntry.data.metrics?.impressions || 0).toLocaleString()}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Clicks</span>
                              <MousePointerClick color="#a78bfa" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {Number(selectedMetaEntry.data.metrics?.clicks || 0).toLocaleString()}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">CTR</span>
                              <Percent color="#a78bfa" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {selectedMetaEntry.data.metrics?.ctr ? `${parseFloat(selectedMetaEntry.data.metrics.ctr).toFixed(2)}%` : '—'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">CPC</span>
                              <BadgeDollarSign color="#facc15" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {formatCurrency(Number(selectedMetaEntry.data.metrics?.cpc), selectedMetaEntry.data.overview?.currency)}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">CPM</span>
                              <Database color="#f97316" />
                            </div>
                            <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 900, fontFamily: 'monospace' }}>
                              {formatCurrency(Number(selectedMetaEntry.data.metrics?.cpm), selectedMetaEntry.data.overview?.currency)}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedMetaEntry?.data && clientMetaTab === 'team' && (
                        <div className="grid-stats">
                          {metaTeamRoster.length > 0 ? (
                            metaTeamRoster.map((member, index) => {
                              const accessLabels = member.accessLabels?.length ? member.accessLabels : ['Change History'];
                              const isTop = index === 0 && metaTeamRoster.length > 1;
                              return (
                                <div
                                  key={member.id || member.name}
                                  className="glass-panel"
                                  style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}
                                >
                                  <div style={{ width: '56px', height: '56px', background: '#1f2937', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, flexShrink: 0, color: '#f97316' }}>
                                    {member.name?.[0] || '?'}
                                  </div>
                                  <div style={{ overflow: 'hidden' }}>
                                    <h4 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                                      {member.name}
                                      {isTop && (
                                        <span className="badge-main">
                                          <Star size={10} fill="currentColor" /> Top
                                        </span>
                                      )}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.35rem' }}>
                                      <p className="text-small" style={{ color: '#f97316' }}>{member.role}</p>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                        {accessLabels.map(label => (
                                          <span key={`${member.id}-${label}`} className="meta-chip">{label}</span>
                                        ))}
                                      </div>
                                      {member.email && (
                                        <p className="text-small" style={{ fontSize: '0.65rem', textTransform: 'none', opacity: 0.7 }}>
                                          {member.email}
                                        </p>
                                      )}
                                      <p className="text-small" style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                                        Activity Count: <span style={{ color: '#fff' }}>{member.activityCount}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                              <p className="text-small" style={{ textTransform: 'none' }}>No team members were found for this account.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedMetaEntry?.data && clientMetaTab === 'history' && (
                        <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Change History Log</h3>
                            {selectedMetaEntry?.status === 'loading' && <RefreshCw className="animate-spin" size={16} />}
                          </div>
                          <div className="data-table-wrapper">
                            <table className="data-table">
                              <thead>
                                <tr>
                                  <th style={{ width: '180px' }}>Time</th>
                                  <th style={{ width: '220px' }}>User</th>
                                  <th style={{ width: '160px' }}>Action</th>
                                  <th>Entity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(selectedMetaEntry.data.changeHistory || []).length > 0 ? (
                                  selectedMetaEntry.data.changeHistory.map((log, index) => (
                                    <tr key={`${log.event_time || log.event_type}-${index}`}>
                                      <td style={{ whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <span style={{ fontWeight: 600, color: '#e2e8f0' }}>
                                            {log.event_time ? new Date(log.event_time).toLocaleDateString() : 'Unknown date'}
                                          </span>
                                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                            {log.event_time ? new Date(log.event_time).toLocaleTimeString() : '—'}
                                          </span>
                                        </div>
                                      </td>
                                      <td>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                          <div className="card-select-checkbox" style={{ width: '32px', height: '32px', borderRadius: '50%', fontSize: '0.75rem' }}>
                                            {log.actor_name ? log.actor_name[0] : '?'}
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: '#fff' }}>{log.actor_name || 'System'}</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <span
                                          className={`badge ${
                                            log.event_type?.toLowerCase().includes('create') ? 'badge-active' :
                                            log.event_type?.toLowerCase().includes('delete') ? 'badge-closed' :
                                            'badge-paused'
                                          }`}
                                        >
                                          {log.translated_event_type || log.event_type || 'Change'}
                                        </span>
                                      </td>
                                      <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <span style={{ fontWeight: 600, color: '#e2e8f0' }}>
                                            {log.object_name || log.object_type || 'Meta asset'}
                                          </span>
                                          {log.object_id && (
                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>ID: {log.object_id}</span>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                      No changes found for this period.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {selectedMetaEntry?.data && clientMetaTab === 'metrics' && (
                        <div className="grid-stats">
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Account Name</span>
                              <Users color="#f97316" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.name || 'Unavailable'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Status</span>
                              <Activity color="#60a5fa" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.account_status ?? 'Unavailable'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Currency</span>
                              <BadgeDollarSign color="#facc15" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.currency || 'Unavailable'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Amount Spent</span>
                              <TrendingUp color="#4ade80" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.amount_spent || 'Unavailable'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Balance</span>
                              <ShoppingBag color="#a78bfa" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.balance || 'Unavailable'}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <span className="text-small">Timezone</span>
                              <Database color="#f97316" />
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {selectedMetaEntry.data.overview?.timezone_name || 'Unavailable'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {clientDetailTab === 'google' && (
                    <div>
                      <div className="google-panel">
                        <div className="google-panel-header">
                          <div>
                            <h3 className="google-panel-title">Google Ads Snapshot</h3>
                            <div className="google-panel-helper">
                              Load the Google Ads account to view a streamlined overview, team roster, change history, and metrics.
                            </div>
                          </div>
                          {selectedGoogleEntry?.source && (
                            <span className="google-source-pill">Source: {selectedGoogleEntry.source}</span>
                          )}
                        </div>
                        <div className="google-range-pill">Date range: Last 30 days</div>

                        <form onSubmit={handleGoogleLookup}>
                          <div className="google-form">
                            <div>
                              <label className="form-label" htmlFor="googleAccountIdInput">Google Ads Customer ID</label>
                              <input
                                id="googleAccountIdInput"
                                className="form-input google-input"
                                value={googleAccountInput}
                                onChange={(event) => setGoogleAccountInput(event.target.value)}
                                placeholder="Enter Google Ads customer ID"
                              />
                            </div>
                            <button className="btn-primary google-submit" type="submit" disabled={selectedGoogleEntry?.status === 'loading'}>
                              {selectedGoogleEntry?.status === 'loading' ? 'Loading...' : 'Load Google Ads'}
                            </button>
                          </div>
                        </form>

                        {selectedGoogleEntry?.status === 'error' && selectedGoogleEntry?.error && (
                          <div className="google-error">
                            <strong>Error:</strong> {selectedGoogleEntry.error}
                          </div>
                        )}

                        {selectedGoogleEntry?.logs?.length > 0 && (
                          <div className="google-log">
                            {selectedGoogleEntry.logs.join('\n')}
                          </div>
                        )}
                      </div>

                      <div className="google-subtabs">
                        <button
                          className={`google-subtab ${clientGoogleTab === 'overview' ? 'active' : ''}`}
                          onClick={() => setClientGoogleTab('overview')}
                          type="button"
                        >
                          Overview
                        </button>
                        <button
                          className={`google-subtab ${clientGoogleTab === 'team' ? 'active' : ''}`}
                          onClick={() => setClientGoogleTab('team')}
                          type="button"
                        >
                          Team
                        </button>
                        <button
                          className={`google-subtab ${clientGoogleTab === 'history' ? 'active' : ''}`}
                          onClick={() => setClientGoogleTab('history')}
                          type="button"
                        >
                          Change History
                        </button>
                        <button
                          className={`google-subtab ${clientGoogleTab === 'metrics' ? 'active' : ''}`}
                          onClick={() => setClientGoogleTab('metrics')}
                          type="button"
                        >
                          Metrics
                        </button>
                      </div>

                      {!selectedGoogleEntry?.data && (
                        <div className="service-empty">
                          Add a Google Ads customer ID to load the ads snapshot for this client.
                        </div>
                      )}

                      {selectedGoogleEntry?.data && clientGoogleTab === 'overview' && (
                        <div className="google-grid">
                          <div className="google-card">
                            <div className="google-card-label">Account Name</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.overview?.name || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Customer ID</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.overview?.id || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Account Status</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.overview?.status || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Currency</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.overview?.currency_code || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Timezone</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.overview?.time_zone || 'Unavailable'}</div>
                          </div>
                        </div>
                      )}

                      {selectedGoogleEntry?.data && clientGoogleTab === 'team' && (
                        <div className="google-list">
                          {(selectedGoogleEntry.data.team || []).length > 0 ? (
                            selectedGoogleEntry.data.team.map(member => (
                              <div key={member.id || member.name} className="google-list-item">
                                <div className="google-list-title">{member.name}</div>
                                <div className="google-list-meta">
                                  <span>{member.role || 'Google Ads access'}</span>
                                  <span>{(member.accessLabels || []).join(' · ')}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="service-empty">No team members were found for this account.</div>
                          )}
                        </div>
                      )}

                      {selectedGoogleEntry?.data && clientGoogleTab === 'history' && (
                        <div className="google-list">
                          {(selectedGoogleEntry.data.changeHistory || []).length > 0 ? (
                            selectedGoogleEntry.data.changeHistory.slice(0, 12).map((log, index) => (
                              <div key={`${log.changeDateTime || log.changeResourceName || index}`} className="google-list-item">
                                <div className="google-list-title">{log.changeResourceType || 'Change'}</div>
                                <div className="google-list-meta">
                                  <span>{log.changeResourceName || log.resourceName || 'Google Ads asset'}</span>
                                  <span>Actor: {log.userEmail || 'Unknown'}</span>
                                  <span>{formatDateTime(log.changeDateTime)}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="service-empty">No change history was returned for this account.</div>
                          )}
                        </div>
                      )}

                      {selectedGoogleEntry?.data && clientGoogleTab === 'metrics' && (
                        <div className="google-grid">
                          <div className="google-card">
                            <div className="google-card-label">Spend (last 30d)</div>
                            <div className="google-card-value">
                              {formatGoogleMicros(
                                selectedGoogleEntry.data.metrics?.costMicros ?? selectedGoogleEntry.data.metrics?.cost_micros,
                                selectedGoogleEntry.data.overview?.currency_code
                              )}
                            </div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Impressions</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.metrics?.impressions || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Clicks</div>
                            <div className="google-card-value">{selectedGoogleEntry.data.metrics?.clicks || 'Unavailable'}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">CTR</div>
                            <div className="google-card-value">{formatGoogleRate(selectedGoogleEntry.data.metrics?.ctr)}</div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Avg. CPC</div>
                            <div className="google-card-value">
                              {formatGoogleMicros(
                                selectedGoogleEntry.data.metrics?.averageCpc ?? selectedGoogleEntry.data.metrics?.average_cpc,
                                selectedGoogleEntry.data.overview?.currency_code
                              )}
                            </div>
                          </div>
                          <div className="google-card">
                            <div className="google-card-label">Avg. CPM</div>
                            <div className="google-card-value">
                              {formatGoogleMicros(
                                selectedGoogleEntry.data.metrics?.averageCpm ?? selectedGoogleEntry.data.metrics?.average_cpm,
                                selectedGoogleEntry.data.overview?.currency_code
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </Modal>

        {/* Add Client Modal */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <div className="modal-body">
            <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Plus className="info-icon" /> Add New Client
            </h2>
            
            <form onSubmit={handleAddSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="full-width">
                  <label className="form-label">Business Name</label>
                  <input required className="form-input" 
                    value={newClient.businessName} onChange={e => setNewClient({...newClient, businessName: e.target.value})} placeholder="e.g. Purge Digital" />
                </div>
                
                <div>
                  <label className="form-label">Contact Name</label>
                  <input required className="form-input" 
                    value={newClient.contactName} onChange={e => setNewClient({...newClient, contactName: e.target.value})} placeholder="e.g. John Doe" />
                </div>

                <div>
                  <label className="form-label">Budget</label>
                  <input className="form-input" 
                    value={newClient.budget} onChange={e => setNewClient({...newClient, budget: e.target.value})} placeholder="e.g. $50/day" />
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" 
                    value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="john@example.com" />
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input className="form-input" 
                    value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} placeholder="0400..." />
                </div>
                
                <div className="full-width">
                  <label className="form-label">Service</label>
                  <input className="form-input" 
                    value={newClient.service} onChange={e => setNewClient({...newClient, service: e.target.value})} placeholder="e.g. SEO, Epoxy Flooring" />
                </div>

                 <div className="full-width">
                  <label className="form-label">Location / Targeting</label>
                  <input className="form-input" 
                    value={newClient.location} onChange={e => setNewClient({...newClient, location: e.target.value})} placeholder="e.g. Brisbane South" />
                </div>

                <div className="full-width">
                  <label className="form-label">Website Access / Logins</label>
                  <textarea className="form-input" style={{ height: '5rem', resize: 'vertical' }}
                    value={newClient.access} onChange={e => setNewClient({...newClient, access: e.target.value})} placeholder="URL, User, Pass..." />
                </div>

                 <div className="full-width">
                  <label className="form-label">Goals</label>
                  <textarea className="form-input" style={{ height: '5rem', resize: 'vertical' }}
                    value={newClient.goals} onChange={e => setNewClient({...newClient, goals: e.target.value})} placeholder="Client goals..." />
                </div>
                
                 <div className="full-width">
                  <label className="form-label">Notes</label>
                  <textarea className="form-input" style={{ height: '5rem', resize: 'vertical' }}
                    value={newClient.notes} onChange={e => setNewClient({...newClient, notes: e.target.value})} placeholder="General notes..." />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <Save size={20} /> Save Client
              </button>
            </form>
          </div>
        </Modal>

      </div>
      )}
    </>
  );
}

export default App;
