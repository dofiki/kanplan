import React from 'react';
import { FaTasks, FaProjectDiagram, FaClipboardList } from 'react-icons/fa';
import './SideBar.css';
import { Link } from 'react-router-dom';    
function SideBar() {
  return (
    <div className="sidebar">
      <Link to="/tasks" className="sidebar__item">
        <FaTasks className="sidebar__icon" />
        <span>Add tasks</span>
        </Link>
 
      <Link to="/status" className="sidebar__item">
       <FaClipboardList className="sidebar__icon" />
        <span>Status</span>
        </Link>

       <Link to="/projects" className="sidebar__item">
      <FaProjectDiagram className="sidebar__icon" />
        <span>Switch projects</span>
        </Link>
    </div>
  );
}

export default SideBar;
