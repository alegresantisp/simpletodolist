'use client'

import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Task, Column as ColumnType } from './types';
import { Card } from "@/components/ui/card"
import { CreateTaskForm } from './CreateTaskForm';
import { Column } from './Column';

const initialColumns: ColumnType[] = [
  {
    id: 'proceso',
    title: 'Proceso',
    tasks: [],
  },
  {
    id: 'realizando',
    title: 'Realizando',
    tasks: [],
  },
  {
    id: 'finalizado',
    title: 'Finalizado',
    tasks: [],
  },
];

export default function Dashboard() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  
  // Use both MouseSensor and TouchSensor
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeId)
    );
    const overColumn = columns.find(col => col.id === overId);

    if (!activeColumn || !overColumn) return;

    const activeTask = activeColumn.tasks.find(task => task.id === activeId);
    if (!activeTask) return;

    setColumns(columns.map(col => {
      // Remove from old column
      if (col.id === activeColumn.id) {
        return {
          ...col,
          tasks: col.tasks.filter(task => task.id !== activeId)
        };
      }
      // Add to new column
      if (col.id === overColumn.id) {
        return {
          ...col,
          tasks: [...col.tasks, { ...activeTask, status: col.id as Task['status'] }]
        };
      }
      return col;
    }));
  };

  const addTask = (task: Task) => {
    setColumns(columns.map(col => {
      if (col.id === 'proceso') {
        return {
          ...col,
          tasks: [...col.tasks, task]
        };
      }
      return col;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8">
      <Card className="max-w-6xl mx-auto bg-black/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl border-purple-500/20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-purple-100">
          Dashboard de Tareas
        </h1>
        
        <CreateTaskForm onAddTask={addTask} />

        <div className="mt-6 sm:mt-8">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                />
              ))}
            </div>
          </DndContext>
        </div>
      </Card>
    </div>
  );
}

