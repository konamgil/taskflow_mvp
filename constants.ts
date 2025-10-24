// FIX: Import React to enable JSX syntax for SVG icons.
import React from 'react';
import { Person, Task, TaskStatus } from './types';

export const PEOPLE: Person[] = [
  { id: '1', name: 'Alex Johnson', title: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: '2', name: 'Maria Garcia', title: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?u=maria' },
  { id: '3', name: 'James Smith', title: 'Lead Engineer', avatar: 'https://i.pravatar.cc/150?u=james' },
  { id: '4', name: 'Patricia Williams', title: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=patricia' },
];

export const TASKS: Task[] = [
  { id: 'task-1', name: 'Draft Project Brief', assigneeId: '1', status: TaskStatus.Done, memo: 'Initial draft for Q3 feature.' },
  { id: 'task-2', name: 'Design Wireframes', assigneeId: '2', status: TaskStatus.Doing, memo: 'Focus on mobile-first approach.' },
  { id: 'task-3', name: 'Create High-Fidelity Mockups', assigneeId: '2', status: TaskStatus.Todo, memo: 'Based on approved wireframes.' },
  { id: 'task-4', name: 'Setup Project Repository', assigneeId: '3', status: TaskStatus.Done, memo: 'Includes CI/CD pipeline.' },
  { id: 'task-5', name: 'Develop UI Components', assigneeId: '4', status: TaskStatus.Todo, memo: 'Build out the component library.' },
];

// FIX: Replaced JSX with React.createElement to be compatible with .ts file extension.
export const STATUS_CONFIG: Record<TaskStatus, { color: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  [TaskStatus.Todo]: {
    color: 'bg-gray-500',
    icon: (props) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('circle', { cx: "12", cy: "12", r: "10" })
    ),
  },
  [TaskStatus.Doing]: {
    color: 'bg-blue-500',
    icon: (props) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('path', { d: "M12 2v4" }),
      React.createElement('path', { d: "m16.2 7.8 2.9-2.9" }),
      React.createElement('path', { d: "M18 12h4" }),
      React.createElement('path', { d: "m16.2 16.2 2.9 2.9" }),
      React.createElement('path', { d: "M12 18v4" }),
      React.createElement('path', { d: "m7.8 16.2-2.9 2.9" }),
      React.createElement('path', { d: "M6 12H2" }),
      React.createElement('path', { d: "m7.8 7.8-2.9-2.9" })
    ),
  },
  [TaskStatus.Done]: {
    color: 'bg-green-500',
    icon: (props) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('path', { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      React.createElement('polyline', { points: "22 4 12 14.01 9 11.01" })
    ),
  },
};
