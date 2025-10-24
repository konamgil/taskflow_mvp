
import React from 'react';
import { Person } from '../types';

interface SidebarProps {
  people: Person[];
  onAddTask: () => void;
  onGenerateImage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ people, onAddTask, onGenerateImage }) => {
  return (
    <aside className="w-72 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 p-6 flex flex-col space-y-8">
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Actions</h2>
        <div className="space-y-2">
            <button
              onClick={onAddTask}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200"
            >
              <PlusCircleIcon className="w-5 h-5" />
              <span>Add Task</span>
            </button>
            <button
              onClick={onGenerateImage}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors duration-200"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Generate Asset</span>
            </button>
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          {people.map((person) => (
            <li key={person.id} className="flex items-center space-x-3">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-10 h-10 rounded-full border-2 border-gray-600"
              />
              <div>
                <p className="font-medium text-white">{person.name}</p>
                <p className="text-xs text-gray-400">{person.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);

const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);

export default Sidebar;
