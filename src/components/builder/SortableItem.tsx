import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  gripClassName?: string;
}

const SortableItem = ({ id, children, className = '', gripClassName = '' }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative group ${className}`} {...attributes}>
      <button
        type="button"
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground ${gripClassName}`}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
};

export default SortableItem;
