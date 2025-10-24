import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import { PEOPLE, TASKS } from './constants';
import { Task, Person, TaskStatus } from './types';
import TaskNode from './components/TaskNode';
import Sidebar from './components/Sidebar';
import ImageGenerator from './components/ImageGenerator';
import ContextMenu from './components/ContextMenu';
import EditTaskModal from './components/EditTaskModal';

const initialNodes: Node<Task>[] = TASKS.map((task, i) => ({
  id: task.id,
  type: 'taskNode',
  position: { x: 250 * i, y: 100 + (i % 2) * 200 },
  data: task,
}));

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'task-1', target: 'task-2', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e2-3', source: 'task-2', target: 'task-3', style: { stroke: '#8b5cf6' } },
  { id: 'e4-5', source: 'task-4', target: 'task-5', style: { stroke: '#8b5cf6' } },
];

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Task>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [people] = useState<Person[]>(PEOPLE);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: Node<Task> } | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const nodeTypes = useMemo(() => ({ taskNode: TaskNode }), []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addTask = () => {
    const id = `task-${tasks.length + 1}`;
    const newTask: Task = {
      id: id,
      name: `New Task ${tasks.length + 1}`,
      assigneeId: null,
      status: TaskStatus.Todo,
    };
    const newNode: Node<Task> = {
      id: id,
      type: 'taskNode',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: newTask,
    };
    setTasks((ts) => [...ts, newTask]);
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node<Task>) => {
      event.preventDefault();
      setContextMenu({ x: event.clientX, y: event.clientY, node });
    },
    [setContextMenu]
  );

  const onPaneClick = useCallback(() => setContextMenu(null), [setContextMenu]);

  const handleDeleteTask = useCallback((nodeId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== nodeId));
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setContextMenu(null);
  }, [setTasks, setNodes, setEdges]);
  
  const handleStartEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setContextMenu(null);
  }, [setEditingTask]);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setNodes(nodes.map(n => {
        if (n.id === updatedTask.id) {
            return { ...n, data: updatedTask };
        }
        return n;
    }));
    setEditingTask(null);
  }, [tasks, nodes, setTasks, setNodes]);


  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white font-sans">
      <ReactFlowProvider>
        <Sidebar people={people} onAddTask={addTask} onGenerateImage={() => setIsImageGeneratorOpen(true)} />
        <main className="flex-1 h-full" onClick={onPaneClick}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              fitView
              className="bg-gray-800"
              style={{ background: '#1f2937' }}
            >
                <div className="absolute top-0 left-0 p-4 z-10">
                    <h1 className="text-2xl font-bold tracking-wider">HumanFlow</h1>
                    <p className="text-gray-400">Visual Workflow Builder</p>
                </div>
            </ReactFlow>
        </main>
      </ReactFlowProvider>

      {isImageGeneratorOpen && <ImageGenerator onClose={() => setIsImageGeneratorOpen(false)} />}
      
      {contextMenu && (
        <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onEdit={() => handleStartEditTask(contextMenu.node.data)}
            onDelete={() => handleDeleteTask(contextMenu.node.id)}
            onClose={() => setContextMenu(null)}
        />
      )}

      {editingTask && (
        <EditTaskModal
            task={editingTask}
            people={people}
            onSave={handleUpdateTask}
            onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default App;