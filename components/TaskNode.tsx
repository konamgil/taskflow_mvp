
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Task } from '../types';
import { STATUS_CONFIG, PEOPLE } from '../constants';

const TaskNode: React.FC<NodeProps<Task>> = ({ data }) => {
  const { name, status, assigneeId, memo } = data;
  const statusConfig = STATUS_CONFIG[status];
  const assignee = PEOPLE.find(p => p.id === assigneeId);

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg shadow-lg w-64 text-white hover:border-indigo-500 transition-colors duration-200">
      <Handle type="target" position={Position.Left} className="!bg-gray-500" />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${statusConfig.color}`}></span>
                <span className="text-xs font-semibold">{status}</span>
            </div>
            {assignee && (
                <img src={assignee.avatar} alt={assignee.name} className="w-8 h-8 rounded-full border-2 border-gray-600" title={assignee.name} />
            )}
        </div>

        <h3 className="font-bold text-base mb-1">{name}</h3>
        {memo && <p className="text-sm text-gray-400">{memo}</p>}
      </div>
      
      <Handle type="source" position={Position.Right} className="!bg-gray-500" />
    </div>
  );
};

export default memo(TaskNode);
