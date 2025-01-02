import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from './types';

const TaskContainer = styled.div<{ isDragging: boolean; status: string }>`
  border: 1px solid #00ffff;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'proceso':
        return '#1a1a2e';
      case 'realizando':
        return '#16213e';
      case 'finalizado':
        return '#0f3460';
      default:
        return '#1a1a2e';
    }
  }};
  color: #ffffff;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0 0 20px #00ffff' : '0 0 5px #00ffff'};
  transform: ${({ isDragging }) => (isDragging ? 'scale(1.05)' : 'scale(1)')};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px #00ffff;
  }
`;

interface Props {
  task: TaskType;
  index: number;
}

export const Task: React.FC<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          status={task.status}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
};

