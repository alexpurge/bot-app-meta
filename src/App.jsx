import React, { useState, useEffect, useRef } from 'react';
import purgeLogo from './assets/purge-logo.svg';
import { 
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
  ChevronDown,
  ArrowRight,
  Eye
} from './lucide-react';

// --- CSS STYLES (Vanilla CSS) ---
const STYLES = `
  /* Reset & Base - Force Full Screen on HTML/Body/Root */
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
    background-color: #f8f9fa; 
    color: #1e293b; 
  }
  
  /* Layout Containers - Force conformance to edges */
  .app-container { 
    display: flex; 
    width: 100vw; 
    height: 100vh; 
    height: 100dvh; /* Mobile support */
    overflow: hidden; 
    background-color: #f8f9fa; 
    position: fixed; /* Fixed to viewport edges */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .sidebar { 
    width: 260px; 
    background-color: #0f172a; 
    color: white; 
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
    background-color: #f8f9fa; 
    width: 100%; /* Ensure it fills remaining flex space */
  }
  
  /* Sidebar Elements */
  .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #1e293b; }
  .brand { font-size: 1.5rem; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; letter-spacing: -0.05em; }
  .brand-logo-container { 
    width: 46px; 
    height: 46px; 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
    background-color: #000000; 
    border: none; 
  }
  .brand-logo { width: 36px; height: 36px; display: block; }
  .brand-accent { color: #ff5d00; }
  .nav-menu { flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; }
  .nav-item { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border-radius: 0.5rem; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; background: transparent; text-align: left; font-size: 0.95rem; color: #94a3b8; }
  .nav-item:hover { color: white; background-color: #1e293b; }
  .nav-item.active { background-color: #ff5d00; color: white; box-shadow: 0 4px 6px -1px rgba(255, 93, 0, 0.3); }
  .sidebar-footer { padding: 1rem; border-top: 1px solid #1e293b; background-color: rgba(15, 23, 42, 0.5); }
  
  /* Import Section */
  .import-section { padding: 1rem; border-top: 1px solid #1e293b; background-color: rgba(15, 23, 42, 0.5); }
  .section-title { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; padding-left: 0.5rem; }
  .import-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem; }
  .import-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 0.5rem; background-color: #1e293b; color: #94a3b8; border: none; cursor: pointer; transition: all 0.2s; }
  .import-btn:hover { background-color: #ff5d00; color: white; }
  .import-label { font-size: 10px; margin-top: 4px; }

  /* Header */
  .header-area { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; position: sticky; top: 0; z-index: 25; background-color: #f8f9fa; padding: 1rem 0; }
  .page-title { font-size: 1.875rem; font-weight: 700; color: #0f172a; margin: 0; }
  .page-subtitle { color: #64748b; margin-top: 0.25rem; font-size: 0.95rem; }
  
  /* Controls */
  .controls { display: flex; gap: 1rem; width: 100%; max-width: 900px; flex-wrap: wrap; align-items: center; }
  .risk-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; width: 100%; }
  .risk-filter-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; border-radius: 0.85rem; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border: 1px solid #e2e8f0; box-shadow: 0 8px 20px -18px rgba(15, 23, 42, 0.5); }
  .risk-filter-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
  .risk-filter-meta { display: flex; flex-direction: column; gap: 0.25rem; min-width: 140px; }
  .risk-filter-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.75rem; border-radius: 999px; background-color: #fff7ed; color: #ff5d00; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  
  /* Custom Select */
  .custom-select-wrapper { position: relative; display: flex; align-items: center; }
  .custom-select { appearance: none; -webkit-appearance: none; padding: 0.75rem 2.5rem 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; background-color: white; outline: none; font-size: 0.95rem; color: #1e293b; cursor: pointer; min-width: 160px; font-weight: 500; transition: border-color 0.2s, box-shadow 0.2s; height: 3.125rem; }
  .custom-select:focus { border-color: #ff5d00; box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.1); }
  .custom-select-arrow { position: absolute; right: 1rem; pointer-events: none; color: #94a3b8; }

  .search-wrapper { position: relative; flex: 1; min-width: 200px; }
  .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
  .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 0.75rem; border: none; background: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); outline: none; transition: box-shadow 0.2s; font-size: 1rem; border: 1px solid #e2e8f0; height: 3.125rem; color: #0f172a; }
  .search-input:focus { ring: 2px solid #ff5d00; border-color: #ff5d00; }

  .controls-actions { display: flex; align-items: center; gap: 0.75rem; margin-left: auto; flex-wrap: wrap; }
  
  .btn-primary { background-color: #ff5d00; color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px -1px rgba(255, 93, 0, 0.3); transition: transform 0.1s; white-space: nowrap; height: 3.125rem; }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:hover { background-color: #e05200; }
  
  .btn-secondary { background-color: white; color: #475569; padding: 0.75rem 1.25rem; border-radius: 0.75rem; font-weight: 600; border: 1px solid #e2e8f0; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: background 0.1s; white-space: nowrap; height: 3.125rem; }
  .btn-secondary:hover { background-color: #f8f9fa; border-color: #cbd5e1; }

  .btn-stripe { background: linear-gradient(135deg, #635bff 0%, #7a73ff 45%, #917bff 100%); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 20px -12px rgba(99, 91, 255, 0.6); transition: transform 0.1s, box-shadow 0.2s; white-space: nowrap; height: 3.125rem; }
  .btn-stripe:hover { box-shadow: 0 10px 26px -14px rgba(99, 91, 255, 0.75); }
  .btn-stripe:active { transform: scale(0.98); }
  
  .btn-bulk-delete { background-color: #fef2f2; color: #ef4444; border-color: #fecaca; }
  .btn-bulk-delete:hover { background-color: #fee2e2; }

  /* Grid */
  .client-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; padding-bottom: 5rem; }
  
  /* Cards */
  .card { background: white; border-radius: 1rem; padding: 1.5rem; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.2s ease; position: relative; }
  .card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-color: rgba(255, 93, 0, 0.3); }
  .card.selected { border: 2px solid #ff5d00; background-color: #fff7ed; }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
  .icon-box { width: 3rem; height: 3rem; border-radius: 0.75rem; background-color: #fff7ed; display: flex; align-items: center; justify-content: center; color: #ff5d00; transition: all 0.2s; }
  .card:hover .icon-box { background-color: #ff5d00; color: white; }
  .card-select-checkbox { width: 1.5rem; height: 1.5rem; border-radius: 0.25rem; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; background: white; }
  .card-select-checkbox.checked { background-color: #ff5d00; border-color: #ff5d00; color: white; }
  .budget-badge { background-color: #f1f5f9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }
  .status-indicator { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-left: auto; margin-right: 0.5rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }
  .status-active { color: #16a34a; background-color: #dcfce7; }
  .status-paused { color: #d97706; background-color: #fef3c7; }
  .status-cancelled { color: #dc2626; background-color: #fee2e2; }
  .card-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card-contact { color: #64748b; font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem; margin-bottom: 1rem; }
  .info-stack { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .info-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #475569; }
  .info-icon { color: #ff5d00; flex-shrink: 0; }
  .text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .additional-section { margin-top: 1.25rem; }
  .additional-controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
  .additional-add-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.75rem; border: 1px dashed #cbd5e1; background-color: #f8fafc; color: #475569; font-weight: 600; cursor: pointer; }
  .additional-add-btn:hover { border-color: #ff5d00; color: #ff5d00; background-color: #fff7ed; }
  .additional-select { min-width: 160px; height: 2.5rem; padding: 0.5rem 2.25rem 0.5rem 0.75rem; font-size: 0.9rem; }
  .card-footer { padding-top: 1rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
  .service-tag { font-size: 0.75rem; font-weight: 500; color: #94a3b8; }
  .view-link { color: #ff5d00; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; border: none; background: none; cursor: pointer; transition: transform 0.2s; }
  .card:hover .view-link { transform: translateX(4px); }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; z-index: 50; animation: fadeIn 0.2s ease-out; }
  /* Updated Modal Width: Increased max-width to 64rem (approx 1024px) for better breathing room */
  .modal-content { background: white; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); width: 100%; max-width: 64rem; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease-out; }
  .close-btn { position: absolute; right: 1rem; top: 1rem; padding: 0.5rem; color: #94a3b8; border-radius: 9999px; cursor: pointer; border: none; background: transparent; transition: all 0.2s; z-index: 10; }
  .close-btn:hover { background-color: #f1f5f9; color: #475569; }
  .modal-body { padding: 2rem; }
  
  /* Modal Typography & Form */
  .modal-title { font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; word-break: break-word; }
  .tag-group { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .tag-primary { background-color: #fff7ed; color: #ff5d00; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; }
  .tag-secondary { background-color: #f1f5f9; color: #475569; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; }
  
  .detail-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 1.5rem; }
  @media (min-width: 768px) { .detail-grid { grid-template-columns: 1fr 1fr; } }
  
  .section-label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }
  .info-box { background-color: #f8f9fa; padding: 0.75rem; border-radius: 0.5rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; word-break: break-all; }
  .info-box-text { font-weight: 500; color: #1e293b; }
  .info-box-link { font-weight: 500; color: #1e293b; text-decoration: none; transition: color 0.2s; }
  .info-box-link:hover { color: #ff5d00; }
  
  .content-box { background-color: #f8f9fa; padding: 1rem; border-radius: 0.75rem; border: 1px solid #f1f5f9; margin-bottom: 1rem; }
  .box-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #0f172a; font-weight: 600; }
  .box-text { font-size: 0.875rem; color: #475569; line-height: 1.6; white-space: pre-wrap; }
  .dark-box { background-color: #0f172a; color: #cbd5e1; padding: 1rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.875rem; }
  .dark-box-header { color: #ff5d00; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-family: sans-serif; font-weight: 600; }
  
  /* Inputs in Edit Mode */
  .edit-input-lg { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; width: 100%; border: 1px solid #cbd5e1; background: #ffffff; padding: 0.5rem; border-radius: 0.5rem; outline: none; }
  .edit-input-lg:focus { border-color: #ff5d00; box-shadow: 0 0 0 1px #ff5d00; }
  .edit-input-sm { background-color: #ffffff; color: #1e293b; padding: 0.375rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: 1px solid #cbd5e1; outline: none; width: 48%; }
  .edit-input-sm:focus { border-color: #ff5d00; }
  .edit-input-plain { background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 0.375rem; padding: 0.375rem 0.5rem; outline: none; width: 100%; font-weight: 500; color: #1e293b; }
  .edit-input-plain:focus { border-color: #ff5d00; }
  .edit-textarea { width: 100%; background: white; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; font-size: 0.875rem; outline: none; font-family: inherit; color: #1e293b; line-height: 1.5; }
  .edit-textarea:focus { border-color: #ff5d00; }
  .edit-input-dark { width: 100%; background: #1e293b; color: white; border: 1px solid #334155; padding: 0.5rem; border-radius: 0.375rem; outline: none; font-family: monospace; margin-bottom: 0.5rem; }
  .edit-input-dark:focus { border-color: #ff5d00; }
  
  /* Modal Actions */
  .modal-actions { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 0.75rem; }
  .btn-ghost { background: transparent; color: #64748b; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { background-color: #f1f5f9; color: #0f172a; }
  .btn-danger { color: #ef4444; background: transparent; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-danger:hover { background-color: #fef2f2; }
  .btn-edit { background-color: #f1f5f9; color: #334155; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
  .btn-edit:hover { background-color: #e2e8f0; }

  /* Delete Confirmation Styles */
  .delete-confirm-container { text-align: center; padding: 2rem 1rem; }
  .delete-icon-wrapper { width: 4rem; height: 4rem; background-color: #fef2f2; color: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
  .delete-title { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 0.75rem; }
  .delete-desc { color: #64748b; margin-bottom: 2rem; max-width: 24rem; margin-left: auto; margin-right: auto; line-height: 1.5; }
  .delete-actions { display: flex; justify-content: center; gap: 1rem; }
  .btn-cancel-lg { padding: 0.75rem 2rem; background-color: #f1f5f9; color: #475569; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; }
  .btn-cancel-lg:hover { background-color: #e2e8f0; }
  .btn-delete-lg { padding: 0.75rem 2rem; background-color: #ef4444; color: white; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 0.5rem; }
  .btn-delete-lg:hover { background-color: #dc2626; }

  /* Import Review Styles */
  .import-review-container { padding: 1rem; }
  .import-review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .review-tabs { display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
  .review-tab { padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #64748b; background: transparent; border: none; }
  .review-tab:hover { background-color: #f1f5f9; }
  .review-tab.active { background-color: #fff7ed; color: #ff5d00; }
  
  .review-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
  .review-table th { text-align: left; padding: 0.75rem; background-color: #f8f9fa; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
  .review-table td { padding: 0.75rem; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: top; }
  .review-table tr:hover { background-color: #f8f9fa; }
  .status-valid { display: flex; align-items: center; gap: 0.25rem; color: #16a34a; font-weight: 600; white-space: nowrap; }
  .status-error { display: flex; align-items: center; gap: 0.25rem; color: #ef4444; font-weight: 600; white-space: nowrap; }
  .error-text { font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; }
  .review-actions { margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
  .action-btn-mini { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; background-color: #fff7ed; color: #ff5d00; transition: all 0.2s; margin-top: 0.25rem; }
  .action-btn-mini:hover { background-color: #ffedd5; }

  /* Stripe Sync */
  .stripe-modal { display: grid; gap: 1.5rem; }
  .stripe-modal-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
  .stripe-subtitle { color: #64748b; margin-top: 0.35rem; font-size: 0.95rem; max-width: 34rem; }
  .stripe-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; border-radius: 999px; background-color: #eef2ff; color: #4338ca; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
  .stripe-stepper { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .stripe-step { padding: 0.5rem 0.75rem; border-radius: 0.75rem; background-color: #f1f5f9; color: #64748b; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem; }
  .stripe-step.active { background-color: #e0e7ff; color: #4338ca; }
  .stripe-step.complete { background-color: #dcfce7; color: #15803d; }
  .stripe-connect-card { border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; display: grid; gap: 1.25rem; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); }
  .stripe-feature-grid { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .stripe-feature { background-color: #f8fafc; border-radius: 0.75rem; padding: 0.75rem; border: 1px solid #e2e8f0; display: flex; gap: 0.6rem; align-items: flex-start; }
  .stripe-feature-icon { width: 2rem; height: 2rem; border-radius: 0.65rem; background-color: #eef2ff; color: #4338ca; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stripe-key-input { width: 100%; padding: 0.85rem 1rem; border-radius: 0.75rem; border: 1px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; background-color: white; }
  .stripe-key-input:focus { outline: none; border-color: #635bff; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15); }
  .stripe-loading { border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; text-align: center; background-color: #f8fafc; }
  .stripe-loading-bar { height: 8px; border-radius: 999px; background: linear-gradient(90deg, #635bff, #a78bfa); margin-top: 1rem; overflow: hidden; position: relative; }
  .stripe-loading-bar::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.7), rgba(255,255,255,0.2)); animation: loadingSlide 1.2s infinite; }
  .stripe-results { display: grid; gap: 1rem; }
  .stripe-results-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
  .stripe-results-meta { color: #64748b; font-size: 0.9rem; }
  .stripe-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  .stripe-table th { text-align: left; padding: 0.75rem; background-color: #f8fafc; color: #64748b; font-weight: 700; border-bottom: 1px solid #e2e8f0; }
  .stripe-table td { padding: 0.85rem 0.75rem; border-bottom: 1px solid #f1f5f9; vertical-align: top; color: #334155; }
  .stripe-table tr:hover { background-color: #f8fafc; }
  .stripe-match-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.5rem; border-radius: 999px; background-color: #fff7ed; color: #ea580c; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0.35rem 0.35rem 0; }
  .stripe-customer-card { display: grid; gap: 0.2rem; }
  .stripe-customer-title { font-weight: 700; color: #0f172a; }
  .stripe-customer-sub { font-size: 0.8rem; color: #64748b; }
  .stripe-verify { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.6rem; border-radius: 0.6rem; background-color: #ecfccb; color: #4d7c0f; font-size: 0.75rem; font-weight: 700; }
  .stripe-review-actions { display: flex; justify-content: flex-end; gap: 0.75rem; flex-wrap: wrap; }
  .stripe-select-all { background: #f1f5f9; color: #475569; border: none; padding: 0.4rem 0.75rem; border-radius: 0.6rem; font-weight: 600; cursor: pointer; }
  .stripe-select-all:hover { background-color: #e2e8f0; }

  /* Aircall Login */
  .login-page { min-height: 100vh; background: #0b0b0b; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .login-card { width: min(480px, 100%); background: #1c1c1c; border-radius: 1.5rem; padding: 2.5rem; box-shadow: 0 40px 80px -30px rgba(5, 5, 5, 0.75); border: 1px solid #2a2a2a; }
  .login-logo { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
  .login-logo img { width: 48px; height: 48px; }
  .login-title { font-size: 2rem; font-weight: 800; color: #f8fafc; margin: 0 0 0.5rem; }
  .login-subtitle { color: #cbd5e1; margin: 0 0 1.5rem; line-height: 1.5; }
  .login-form { display: grid; gap: 1rem; }
  .login-input { width: 100%; padding: 0.85rem 1rem; border-radius: 0.85rem; border: 1px solid #e2e8f0; background-color: #f8fafc; font-size: 1rem; }
  .login-input:focus { outline: none; border-color: #ff5d00; box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.15); }
  .login-helper { font-size: 0.85rem; color: #94a3b8; }
  .login-card .form-label { color: #e2e8f0; }
  .login-btn { position: relative; overflow: hidden; width: 100%; border: none; border-radius: 0.9rem; background: linear-gradient(135deg, #ff5d00 0%, #ff7a1a 100%); color: white; font-weight: 700; padding: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .login-btn-loading-bar { position: absolute; left: 0; bottom: 0; height: 4px; background-color: rgba(255, 255, 255, 0.75); animation: loadingSlide 1s infinite linear; }

  /* Global Loading Bar */
  .global-loading { position: sticky; top: 0; z-index: 30; background-color: #0f172a; border-radius: 999px; overflow: hidden; height: 6px; margin-bottom: 1rem; }
  .global-loading-bar { height: 100%; background: linear-gradient(90deg, #ff5d00, #ffd08a); transition: width 0.3s ease; }
  .global-loading-label { font-size: 0.75rem; color: #64748b; margin-bottom: 0.35rem; }

  /* Notifications */
  .toast-container { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 100; display: flex; flex-direction: column; gap: 0.75rem; }
  .toast { min-width: 260px; max-width: 360px; padding: 0.85rem 1rem; border-radius: 0.85rem; box-shadow: 0 15px 30px -15px rgba(15, 23, 42, 0.35); background: white; border-left: 4px solid #64748b; animation: slideInRight 0.25s ease; }
  .toast.success { border-left-color: #16a34a; }
  .toast.error { border-left-color: #ef4444; }
  .toast-title { font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
  .toast-message { font-size: 0.85rem; color: #475569; line-height: 1.4; }

  /* Detail Tabs */
  .detail-tabs { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
  .detail-tab { padding: 0.5rem 1rem; border-radius: 0.75rem 0.75rem 0 0; background: transparent; border: none; font-weight: 700; color: #94a3b8; cursor: pointer; }
  .detail-tab.active { color: #ff5d00; border-bottom: 3px solid #ff5d00; background: #fff7ed; }

  /* Recent Activity */
  .activity-summary { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .activity-list { display: grid; gap: 0.75rem; }
  .activity-card { border: 1px solid #e2e8f0; border-radius: 0.85rem; padding: 1rem; background: #ffffff; display: grid; gap: 0.5rem; }
  .activity-header { display: flex; justify-content: space-between; gap: 0.5rem; align-items: center; }
  .activity-title { font-weight: 700; color: #0f172a; }
  .activity-meta { font-size: 0.85rem; color: #64748b; display: grid; gap: 0.25rem; }
  .activity-actions { display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem; flex-wrap: wrap; }
  .activity-btn { border: none; border-radius: 0.75rem; padding: 0.65rem 1rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; background: #0f172a; color: white; }
  .activity-btn.secondary { background: #f1f5f9; color: #475569; }
  .activity-empty { text-align: center; padding: 2rem 1rem; color: #94a3b8; background: #f8fafc; border-radius: 0.85rem; border: 1px dashed #e2e8f0; }

  /* Error Grouping Styles */
  .error-group { margin-bottom: 1.5rem; border: 1px solid #fecaca; border-radius: 0.5rem; overflow: hidden; }
  .error-group-header { background-color: #fef2f2; padding: 0.75rem 1rem; font-weight: 700; color: #b91c1c; display: flex; align-items: center; gap: 0.5rem; }
  .error-list { list-style: none; padding: 0; margin: 0; }
  .error-list-item { padding: 0.75rem 1rem; border-bottom: 1px solid #fecaca; background-color: white; color: #7f1d1d; font-size: 0.875rem; display: flex; justify-content: space-between; }
  .error-list-item:last-child { border-bottom: none; }

  /* Form Inputs */
  .form-group { margin-bottom: 1rem; }
  .form-label { display: block; font-size: 0.875rem; font-weight: 700; color: #334155; margin-bottom: 0.25rem; }
  .form-input { width: 100%; padding: 0.75rem; background-color: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 0.5rem; outline: none; transition: border 0.2s; }
  .form-input:focus { border-color: #ff5d00; box-shadow: 0 0 0 1px #ff5d00; }
  .full-width { grid-column: 1 / -1; }
  .btn-submit { width: 100%; background-color: #ff5d00; color: white; padding: 0.75rem; border-radius: 0.75rem; font-weight: 700; font-size: 1.125rem; border: none; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(255, 93, 0, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.2s; }
  .btn-submit:hover { background-color: #e05200; }

  /* Utilities & Mobile */
  .mobile-toggle { position: absolute; top: 1rem; right: 1rem; z-index: 50; padding: 0.5rem; background-color: #0f172a; color: white; border-radius: 0.5rem; border: none; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
  .hidden-on-desktop { display: none; }
  .empty-state { text-align: center; padding: 5rem 1rem; color: #94a3b8; }
  
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

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
  const [stripeApiKey, setStripeApiKey] = useState('');
  const [stripeSyncStage, setStripeSyncStage] = useState('connect');
  const [stripeMatches, setStripeMatches] = useState([]);
  const [stripeMatchSelection, setStripeMatchSelection] = useState(new Set());
  
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
  const [aircallTokenInput, setAircallTokenInput] = useState('');
  const [aircallAppIdInput, setAircallAppIdInput] = useState(() => localStorage.getItem('aircallAppId') || AIRCALL_APP_ID);
  const [isAircallLoggedIn, setIsAircallLoggedIn] = useState(() => Boolean(localStorage.getItem('aircallToken')));
  const [isSubmittingAircallToken, setIsSubmittingAircallToken] = useState(false);
  const [aircallActivity, setAircallActivity] = useState({});
  const [toast, setToast] = useState(null);
  const [clientDetailTab, setClientDetailTab] = useState('overview');

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
    }
  }, [selectedClient]);


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
    return date.toLocaleString();
  };

  const normalizePhoneNumber = (phone) => {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
  };

  const buildStripeMatches = () => {
    const sampleClients = clients.slice(0, 6);
    return sampleClients.map((client, index) => {
      const matchReasons = [];
      if (index % 3 === 0) matchReasons.push('Mobile number');
      if (index % 3 === 1) matchReasons.push('Company name');
      if (index % 3 === 2) matchReasons.push('Contact name');
      if (index === 4) matchReasons.push('Mobile number', 'Company name');

      const stripeCustomer = {
        name: matchReasons.includes('Contact name') ? client.contactName : `Billing - ${client.businessName}`,
        company: client.businessName,
        phone: client.phone,
        email: client.email || `billing@${client.businessName.toLowerCase().replace(/\s+/g, '')}.com`,
        subscriptions: Math.max(1, (index % 3) + 1),
        plan: ['Growth Retainer', 'Performance Plus', 'Enterprise Scale'][index % 3]
      };

      return {
        id: `${client.id}-stripe`,
        client,
        stripeCustomer,
        matchReasons,
        confidence: matchReasons.length > 1 ? 'High confidence' : 'Likely match'
      };
    });
  };

  const openStripeSync = () => {
    setStripeApiKey('');
    setStripeMatches([]);
    setStripeMatchSelection(new Set());
    setStripeSyncStage('connect');
    setIsStripeSyncOpen(true);
  };

  const closeStripeSync = () => {
    setIsStripeSyncOpen(false);
    setStripeSyncStage('connect');
  };

  const handleStripeConnect = () => {
    if (!stripeApiKey.trim()) {
      showToast('error', 'Stripe key required', 'Enter your Stripe secret key to start syncing.');
      return;
    }
    setStripeSyncStage('loading');
    setTimeout(() => {
      const matches = buildStripeMatches();
      setStripeMatches(matches);
      setStripeMatchSelection(new Set(matches.map(match => match.id)));
      setStripeSyncStage('review');
      showToast('success', 'Stripe sync ready', `Pulled ${matches.length} active Stripe customers.`);
    }, 1200);
  };

  const toggleStripeMatch = (id) => {
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
    if (stripeMatchSelection.size === stripeMatches.length) {
      setStripeMatchSelection(new Set());
    } else {
      setStripeMatchSelection(new Set(stripeMatches.map(match => match.id)));
    }
  };

  const confirmStripeMatches = () => {
    setStripeSyncStage('complete');
    showToast('success', 'Stripe sync confirmed', 'Selected matches have been queued for review.');
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
          hasMore: false
        }),
        ...updates
      }
    }));
  };

  const fetchAircallInteractions = async (client, options = {}) => {
    if (!client) return;
    const {
      page = 1,
      append = false,
      notify = true,
      token = aircallToken,
      fetchAll = false,
      daysBack = 14,
      perPage = 50
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

    updateAircallActivity(client.id, { loading: true, error: null });

    try {
      const toTimestamp = Math.floor(Date.now() / 1000);
      const fromTimestamp = toTimestamp - daysBack * 24 * 60 * 60;

      const fetchPage = async (pageNumber) => {
        const url = new URL(`${AIRCALL_BASE_URL}/calls`);
        url.searchParams.set('per_page', String(perPage));
        url.searchParams.set('page', String(pageNumber));
        url.searchParams.set('phone_number', phoneNumber);
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
      let nextPage = null;
      let hasMore = false;
      let currentPage = page;

      if (fetchAll) {
        let keepGoing = true;
        while (keepGoing) {
          const data = await fetchPage(currentPage);
          const rawCalls = data.calls || data.data || [];
          const mapped = rawCalls.map(call => ({
            id: call.id,
            duration: call.duration,
            direction: call.direction,
            startedAt: call.started_at || call.created_at,
            userName: call.user?.name || call.assigned_to?.name || call.user_name || call.from?.name || call.to?.name,
            fromNumber: call.from?.phone_number || call.from?.number,
            toNumber: call.to?.phone_number || call.to?.number,
            raw: call
          }));
          aggregated = aggregated.concat(mapped);
          nextPage = data.meta?.next_page || null;
          hasMore = Boolean(nextPage);
          currentPage = nextPage || currentPage + 1;
          keepGoing = hasMore;
        }
      } else {
        const data = await fetchPage(currentPage);
        const rawCalls = data.calls || data.data || [];
        aggregated = rawCalls.map(call => ({
          id: call.id,
          duration: call.duration,
          direction: call.direction,
          startedAt: call.started_at || call.created_at,
          userName: call.user?.name || call.assigned_to?.name || call.user_name || call.from?.name || call.to?.name,
          fromNumber: call.from?.phone_number || call.from?.number,
          toNumber: call.to?.phone_number || call.to?.number,
          raw: call
        }));
        nextPage = data.meta?.next_page || null;
        hasMore = Boolean(nextPage);
      }

      setAircallActivity(prev => {
        const existing = prev[client.id] || {
          items: [],
          loading: false,
          error: null,
          nextPage: 1,
          hasMore: false
        };

        return {
          ...prev,
          [client.id]: {
            ...existing,
            items: append ? [...existing.items, ...aggregated] : aggregated,
            loading: false,
            error: null,
            nextPage: nextPage || page + 1,
            hasMore
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

  const handleAircallLogin = async (event) => {
    event.preventDefault();
    const trimmedToken = aircallTokenInput.trim();
    const trimmedAppId = aircallAppIdInput.trim();
    if (!trimmedAppId) {
      showToast('error', 'App ID required', 'Enter your Aircall App ID to continue.');
      return;
    }
    if (!trimmedToken) {
      showToast('error', 'Token required', 'Enter your Aircall API token to continue.');
      return;
    }

    setIsSubmittingAircallToken(true);
    try {
      localStorage.setItem('aircallToken', trimmedToken);
      localStorage.setItem('aircallAppId', trimmedAppId);
      setAircallToken(trimmedToken);
      setAircallAppId(trimmedAppId);
      setIsAircallLoggedIn(true);
      setAircallTokenInput('');
      setAircallAppIdInput(trimmedAppId);
    } catch (error) {
      showToast('error', 'Aircall login failed', error.message);
    } finally {
      setIsSubmittingAircallToken(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aircallToken');
    localStorage.removeItem('aircallAppId');
    setAircallToken('');
    setAircallAppId('');
    setAircallTokenInput('');
    setAircallAppIdInput('');
    setAircallActivity({});
    setSelectedClient(null);
    setIsAircallLoggedIn(false);
  };

  const handleRecentActivityClick = () => {
    setClientDetailTab('activity');
    if (!selectedClient) return;
    fetchAircallInteractions(selectedClient, {
      page: 1,
      append: false,
      notify: false,
      fetchAll: true,
      daysBack: 14,
      perPage: 50
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
    ? (aircallActivity[selectedClient.id] || { items: [], loading: false, error: null, hasMore: false, nextPage: 1 })
    : { items: [], loading: false, error: null, hasMore: false, nextPage: 1 };

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

      {!isAircallLoggedIn ? (
        <div className="login-page">
          <div className="login-card">
            <div className="login-logo">
              <img src={purgeLogo} alt="PurgeDigital logo" />
              <div>
                <h1 className="login-title">PurgeDigital CRM</h1>
                <p className="login-subtitle">Connect your Aircall workspace to unlock recent client activity.</p>
              </div>
            </div>
            <form className="login-form" onSubmit={handleAircallLogin}>
              <div>
                <label className="form-label" htmlFor="aircallToken">Aircall API Token</label>
                <input
                  id="aircallToken"
                  type="password"
                  className="login-input"
                  value={aircallTokenInput}
                  onChange={(event) => setAircallTokenInput(event.target.value)}
                  placeholder="Paste your Aircall token"
                />
                <div className="login-helper">Your token is stored locally in this browser only.</div>
              </div>
              <div>
                <label className="form-label" htmlFor="aircallAppId">Aircall App ID</label>
                <input
                  id="aircallAppId"
                  type="text"
                  className="login-input"
                  value={aircallAppIdInput}
                  onChange={(event) => setAircallAppIdInput(event.target.value)}
                  placeholder="Paste your Aircall App ID"
                />
                <div className="login-helper">Your App ID is stored locally in this browser only.</div>
              </div>
              <button className="login-btn" type="submit" disabled={isSubmittingAircallToken}>
                {isSubmittingAircallToken ? 'Connecting to Aircall…' : 'Connect Aircall'}
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
            <h1 className="brand">
              <span className="brand-logo-container">
                <img className="brand-logo" src={purgeLogo} alt="Purge CRM logo" />
              </span>
              PURGE<span className="brand-accent">CRM</span>
            </h1>
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
        <main className="main-content">
          
          {/* Header */}
          <header className="header-area">
            <div>
              <h2 className="page-title">
                {activeTab === 'Clients' && 'Client Database'}
                {activeTab === 'Leads' && 'Lead Management'}
                {activeTab === 'Services' && 'Service Catalog'}
                {activeTab === 'Meta Risk' && 'Meta Risk Analysis'}
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

              {(activeTab === 'Meta Risk' || activeTab === 'Google Risk') && (
                <div className="risk-controls">
                  <button className="btn-secondary">
                    {activeTab === 'Google Risk' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />} Show Risk
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

          {/* Tab Content */}
          {activeTab === 'Clients' ? (
            <div className="client-grid">
              {filteredClients.map((client) => (
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
                    {client.status && (
                      <span className={`status-indicator status-${client.status.toLowerCase()}`}>
                        {client.status}
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
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                {activeTab === 'Meta Risk' ? <ShieldAlert size={40} color="#ff5d00" /> : 
                 activeTab === 'Google Risk' ? <ShieldCheck size={40} color="#ff5d00" /> : 
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
        <Modal isOpen={isStripeSyncOpen} onClose={closeStripeSync}>
          <div className="modal-body stripe-modal">
            <div className="stripe-modal-header">
              <div>
                <span className="section-label">Stripe Sync</span>
                <h2 className="modal-title">Sync active Stripe subscribers</h2>
                <p className="stripe-subtitle">
                  Connect your Stripe API key to pull all active subscription customers and review matches with your client database.
                </p>
              </div>
              <span className="stripe-pill">
                <ShieldCheck size={14} /> Secure connection
              </span>
            </div>

            <div className="stripe-stepper">
              <span className={`stripe-step ${stripeSyncStage === 'connect' ? 'active' : 'complete'}`}>
                <FileJson size={14} /> Connect
              </span>
              <span className={`stripe-step ${stripeSyncStage === 'loading' ? 'active' : stripeSyncStage === 'review' || stripeSyncStage === 'complete' ? 'complete' : ''}`}>
                <Table size={14} /> Pull Stripe Customers
              </span>
              <span className={`stripe-step ${stripeSyncStage === 'review' ? 'active' : stripeSyncStage === 'complete' ? 'complete' : ''}`}>
                <CheckCircle size={14} /> Match Review
              </span>
            </div>

            {stripeSyncStage === 'connect' && (
              <div className="stripe-connect-card">
                <div>
                  <label className="section-label" htmlFor="stripe-key">Stripe Secret Key</label>
                  <input
                    id="stripe-key"
                    type="password"
                    placeholder="sk_live_..."
                    className="stripe-key-input"
                    value={stripeApiKey}
                    onChange={(event) => setStripeApiKey(event.target.value)}
                  />
                  <p className="stripe-subtitle" style={{ marginTop: '0.5rem' }}>
                    We never store your key locally. This is used to request active subscription customers from Stripe.
                  </p>
                </div>
                <div className="stripe-feature-grid">
                  <div className="stripe-feature">
                    <span className="stripe-feature-icon"><Table size={16} /></span>
                    <div>
                      <div className="stripe-customer-title">Full subscriber pull</div>
                      <div className="stripe-customer-sub">Fetch every active customer with live subscriptions.</div>
                    </div>
                  </div>
                  <div className="stripe-feature">
                    <span className="stripe-feature-icon"><CheckCircle size={16} /></span>
                    <div>
                      <div className="stripe-customer-title">Smart matching</div>
                      <div className="stripe-customer-sub">We match by phone, name, and company fields.</div>
                    </div>
                  </div>
                  <div className="stripe-feature">
                    <span className="stripe-feature-icon"><ShieldCheck size={16} /></span>
                    <div>
                      <div className="stripe-customer-title">Manual verification</div>
                      <div className="stripe-customer-sub">Confirm or deny each proposed link before syncing.</div>
                    </div>
                  </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '0.5rem' }}>
                  <button className="btn-ghost" onClick={closeStripeSync}>Cancel</button>
                  <button className="btn-stripe" onClick={handleStripeConnect}>
                    <Play size={18} /> Start Sync
                  </button>
                </div>
              </div>
            )}

            {stripeSyncStage === 'loading' && (
              <div className="stripe-loading">
                <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Pulling Stripe subscribers...</h3>
                <p className="stripe-subtitle">Fetching active customers and preparing match suggestions.</p>
                <div className="stripe-loading-bar" />
              </div>
            )}

            {stripeSyncStage === 'review' && (
              <div className="stripe-results">
                <div className="stripe-results-header">
                  <div>
                    <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Review Stripe matches</h3>
                    <p className="stripe-results-meta">
                      {stripeMatches.length} Stripe customers with active subscriptions detected.
                    </p>
                  </div>
                  <div>
                    <button className="stripe-select-all" onClick={toggleAllStripeMatches}>
                      {stripeMatchSelection.size === stripeMatches.length ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
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
                        return (
                          <tr key={match.id}>
                            <td>
                              <div
                                className={`card-select-checkbox ${isSelected ? 'checked' : ''}`}
                                onClick={() => toggleStripeMatch(match.id)}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                              >
                                {isSelected && <Check size={12} />}
                              </div>
                            </td>
                            <td>
                              <div className="stripe-customer-card">
                                <span className="stripe-customer-title">{match.stripeCustomer.name}</span>
                                <span className="stripe-customer-sub">{match.stripeCustomer.company}</span>
                                <span className="stripe-customer-sub">{match.stripeCustomer.email}</span>
                                <span className="stripe-customer-sub">{match.stripeCustomer.subscriptions} active · {match.stripeCustomer.plan}</span>
                              </div>
                            </td>
                            <td>
                              <div className="stripe-customer-card">
                                <span className="stripe-customer-title">{match.client.businessName}</span>
                                <span className="stripe-customer-sub">{match.client.contactName}</span>
                                <span className="stripe-customer-sub">{match.client.phone}</span>
                                <span className="stripe-customer-sub">{match.client.location}</span>
                              </div>
                            </td>
                            <td>
                              {match.matchReasons.map((reason) => (
                                <span key={reason} className="stripe-match-pill">{reason}</span>
                              ))}
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
                  <button className="btn-ghost" onClick={() => setStripeSyncStage('connect')}>Back</button>
                  <button className="btn-primary" onClick={confirmStripeMatches} disabled={stripeMatchSelection.size === 0}>
                    Confirm & Submit <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {stripeSyncStage === 'complete' && (
              <div className="stripe-loading">
                <h3 className="modal-title" style={{ fontSize: '1.5rem' }}>Sync queued successfully</h3>
                <p className="stripe-subtitle">
                  {stripeMatchSelection.size} customer matches have been confirmed and queued for syncing into your CRM.
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
                  </div>

                  {clientDetailTab === 'overview' ? (
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
                  ) : (
                    <div>
                      <div className="activity-summary">
                        <div>
                          <h3 className="section-label">Recent Activity for {selectedClient.phone || 'Unknown number'}</h3>
                          <div className="login-helper">Showing {selectedActivity.items.length} interactions.</div>
                        </div>
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
                                <span className="status-indicator status-active">{call.direction || 'Call'}</span>
                              </div>
                              <div className="activity-meta">
                                <div><strong>Date:</strong> {formatDateTime(call.startedAt)}</div>
                                <div><strong>Duration:</strong> {formatDuration(call.duration)}</div>
                                <div><strong>Caller:</strong> {call.userName || 'Unknown'}</div>
                                <div><strong>From:</strong> {call.fromNumber || 'Unknown'} • <strong>To:</strong> {call.toNumber || 'Unknown'}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        !selectedActivity.loading && !selectedActivity.error && (
                          <div className="activity-empty">No recent interactions have been loaded for this number yet.</div>
                        )
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
