export interface Task {
    id: string;
    content: string;
    status: 'proceso' | 'realizando' | 'finalizado';
  }
  
  export interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }
  
  