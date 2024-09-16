
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Headers';
import { Footer } from '../components/Footers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthorDashboard } from '../components/AuthorDashboard';
import { Submissions } from '../components/Submissions';
import { Notes } from '../components/Notes';
import { Writathon } from '../components/Writathon';
import { Invitations } from '../components/Invitations';
// import { Advertising } from '../components/Advertising';
import { SubmitFiction } from '../components/SubmitFiction';

import {AuthorFictions} from '../components/AuthorFictions';

function AuthorDashboardPage() {
  const [selectedComponent, setSelectedComponent] = useState('Author Dashboard');
  const [breadcrumb, setBreadcrumb] = useState(['Home']);

  const handleSidebarItemClick = (item) => {
    if (item === 'Author Dashboard') {
      setBreadcrumb(['Home']);
    }else if (['Submissions','Fictions','Notes', 'Writathon'].includes(item)) {
      setBreadcrumb([]);
    } else {
      setBreadcrumb(['Home', item]);
    }
    setSelectedComponent(item);
};

const handleNewFictionClick = () => {
  setSelectedComponent('Submit Fiction'); // Assuming this is the case for the new form
};

  const renderContent = () => {
    // window.location.reload();
    switch (selectedComponent) {
      case 'Author Dashboard':
        return <AuthorDashboard onNewFiction={handleNewFictionClick} />;
      case 'Submissions':
        return <Submissions onNewFiction={handleNewFictionClick} />;
      case 'Notes':
        return <Notes />;
      case 'Writathon':
        return <Writathon />;
      case 'Invitations':
        return <Invitations />;
      // case 'Advertising':
      //   return <Advertising />;
      case 'Submit Fiction':
        return <SubmitFiction/>;

        case 'Fictions':
          return <AuthorFictions/>;
          
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar setSelectedComponent={handleSidebarItemClick} />
      <div className="flex flex-col flex-grow">
        <Header selectedComponent={selectedComponent} breadcrumb={breadcrumb} />
       
          {renderContent()}
       
        
        <Footer />
      </div>
    </div>
  );
}

export default AuthorDashboardPage;
