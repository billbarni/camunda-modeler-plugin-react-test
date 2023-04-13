
import React, {
  Fragment,
  PureComponent
} from 'camunda-modeler-plugin-helpers/react';

import { IconContext } from "react-icons/lib";
import { IoPeopleOutline } from "react-icons/io5";

export default class CustomPaletteProvider {

  constructor(palette, create, elementFactory, bpmnFactory, injector) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
    this.injector = injector;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const iconElement = <IoPeopleOutline />;

    // how to render this to html?
    const groupWithIconHtml =
      <div class="entry" draggable="true">
        <IconContext.Provider value={{ size: '24px', style: { verticalAlign: 'middle' } }} >
          {iconElement}
        </IconContext.Provider>
      </div>
      ;

    return {
      'create.DynSkill': {
        group: 'activity',
        title: 'Create Dynamic Skill',
        html: groupWithIconHtml,
        action: {
          dragstart: (evt) => this.createTask(evt),
          click: (evt) => this.createTask(evt)
        }
      }
    };
  }

  createTask(event) {
    const businessObject = this.bpmnFactory.create('bpmn:UserTask');

    const shape = this.elementFactory.create('shape', {
      type: 'bpmn:UserTask',
      businessObject
    });

    this.create.start(event, shape);
  }
}

CustomPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'bpmnFactory',
  'injector'
];
