'use client'

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import { Column as ColumnType } from './types';
import { Card } from "@/components/ui/card"

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Card className="p-3 sm:p-4 bg-black/40 backdrop-blur-sm border-purple-500/20">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center text-purple-100">
        {column.title}
      </h2>
      
      <div
        ref={setNodeRef}
        className="min-h-[150px] sm:min-h-[200px] space-y-2 sm:space-y-3"
      >
        <SortableContext items={column.tasks} strategy={rectSortingStrategy}>
          {column.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

