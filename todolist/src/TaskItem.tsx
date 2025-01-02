'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from './types';
import { Card } from "@/components/ui/card"

interface TaskItemProps {
  task: Task;
}

const statusColors = {
  proceso: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/50',
  realizando: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/50',
  finalizado: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/50',
};

export function TaskItem({ task }: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-3 cursor-move border
        transition-colors duration-200
        ${statusColors[task.status]}
        ${isDragging ? 'shadow-lg' : ''}
        touch-none
      `}
    >
      <p className="text-sm text-purple-50">{task.content}</p>
    </Card>
  );
}

