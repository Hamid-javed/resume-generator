import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableBulletItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableBulletItem = ({ id, children }: SortableBulletItemProps) => {
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
    <div ref={setNodeRef} style={style} className="relative group/bullet" {...attributes}>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="opacity-0 group-hover/bullet:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
          {...listeners}
        >
          <GripVertical className="w-3 h-3" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SortableBulletItem;
