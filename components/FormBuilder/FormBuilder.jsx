// components/FormBuilder.js
"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([
    { id: '1', type: 'text', label: 'Text Input' },
    { id: '2', type: 'textarea', label: 'Textarea' },
    { id: '3', type: 'select', label: 'Select Box' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formElements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormElements(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="formElements">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {formElements.map((element, index) => (
              <Draggable key={element.id} draggableId={element.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>{element.label}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FormBuilder;
