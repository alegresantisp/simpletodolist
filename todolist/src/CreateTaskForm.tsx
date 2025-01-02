'use client'

import { useState } from 'react';
import { Task } from './types';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreateTaskFormProps {
  onAddTask: (task: Task) => void;
}

export function CreateTaskForm({ onAddTask }: CreateTaskFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: content.trim(),
      status: 'proceso',
    };

    onAddTask(newTask);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Añade una nueva tarea..."
        className="flex-1 bg-black/20 border-purple-500/20 text-purple-50 placeholder:text-purple-300/50"
      />
      <Button 
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Añadir
      </Button>
    </form>
  );
}

