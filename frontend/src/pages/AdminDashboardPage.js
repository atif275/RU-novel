
import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { Footer } from '../components/Footers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdminDashboard } from '../components/AdminDashboard';
import { AdminSubmissions } from '../components/AdminSubmissions';
import { Notes } from '../components/Notes';
import { Writathon } from '../components/Writathon';
import { Invitations } from '../components/Invitations';
import { Advertising } from '../components/Advertising';
import { AdminTransaction } from '../components/AdminTransaction';
import {AdminManageEmployees} from '../components/AdminManageEmployees';
import {AdminUTMTags} from '../components/AdminUTMTags';
import {AdminManageBorders} from '../components/AdminManageBorders';
function AdminDashboardPage() {
  const [selectedComponent, setSelectedComponent] = useState('Admin Dashboard');
  const [breadcrumb, setBreadcrumb] = useState(['Panel']);

  const handleSidebarItemClick = (item) => {
    if (item === 'Admin Dashboard') {
      setBreadcrumb(['Panel']);
    }else if (['Notes', 'UTM Tags', 'Manage Employees', 'Advertising','Transactions','Borders'].includes(item)) {
      setBreadcrumb([]);
    } else {
      setBreadcrumb(['Panel', item]);
    }
    setSelectedComponent(item);
};

const handleNewFictionClick = () => {
  setSelectedComponent('SubmitFiction'); // Assuming this is the case for the new form
};

  const renderContent = () => {
    switch (selectedComponent) {
      case 'Admin Dashboard':
        return <AdminDashboard />;
      case 'Submissions':
        return <AdminSubmissions onNewFiction={handleNewFictionClick} />;
      case 'Notes':
        return <Notes />;
      case 'UTM Tags':
        return <AdminUTMTags />;
      case 'Manage Employees':
        return <AdminManageEmployees />;
      case 'Advertising':
        return <Advertising />;
      
      case 'Transactions':
        return <AdminTransaction/>;
        case 'Borders':
        return <AdminManageBorders/>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar setSelectedComponent={handleSidebarItemClick} />
      <div className="flex flex-col flex-grow">
        <AdminHeader selectedComponent={selectedComponent} breadcrumb={breadcrumb} />
       
          {renderContent()}
       
        
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
