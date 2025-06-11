import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanBan.css';

const initialData = {
  Backlogs: {
    name: 'Backlogs',
    items: [
      { id: '1', text: 'Learn React' },
      { id: '2', text: 'Build Kanban' },
    ],
  },
  Working: {
    name: 'Working',
    items: [
      { id: '8', text: 'Deploy Adpp' },
    ],
  },
  Review: {
    name: 'Review',
    items: [
      { id: '4', text: 'Write Tests' },
    ],
  },
  Done: {
    name: 'Done',
    items: [
      { id: '3', text: 'Deploy App' },
    ],
  }
};

function KanBan() {
  const [columns, setColumns] = useState(initialData);

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    {/*array.splice(start, deleteCount, item1, item2, ...);*/}
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  return (
    <div className="kanban-container">
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-columns">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="kanban-column" key={columnId}>
              <h3>{column.name}</h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    className="task-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className="task-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                          >
                            {item.text}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanBan;
