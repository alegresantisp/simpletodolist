'use client'

import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import styled from 'styled-components';
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
  const sensors = useSensors(useSensor(PointerSensor));

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Card className="max-w-6xl mx-auto bg-black/20 backdrop-blur-sm p-6 rounded-xl border-purple-500/20">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-100">
          Dashboard de Tareas
        </h1>
        
        <CreateTaskForm onAddTask={addTask} />

        <div className="mt-8">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

