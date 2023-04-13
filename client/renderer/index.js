import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append as svgAppend, create as svgCreate, attr as svgAttr } from 'tiny-svg';

import IoBodyOutline from '../../resources/body-outline.svg';
import IoPeopleOutline from '../../resources/people-outline.svg';
import IoCloudOffline from '../../resources/cloud-offline.svg';
import IoPersonCircleSharp from '../../resources/person-circle-sharp.svg';
import IoCalendarOutline from '../../resources/calendar-outline.svg';

import { getElementNDGroupType } from '../util/extensions-helper';
import { is } from 'bpmn-js/lib/util/ModelUtil';

import React, {
  Fragment,
  PureComponent
} from 'camunda-modeler-plugin-helpers/react';

const PLUGIN_LOADER_PRIORITY = 1500; // 1500 = HIGH

const iconMap = {
  '': {
    'icon': <IoCloudOffline />
  },
  'skill': {
    'icon': <IoBodyOutline />
  },
  'dynskill': {
    'icon': <IoPeopleOutline />
  },  
  'user': {
    'icon': <IoPersonCircleSharp />
  },
  'scheduler': {
    'icon': <IoCalendarOutline />
  },
};

class CustomRenderer extends BaseRenderer {

  constructor(bpmnRenderer, eventBus, injector) {
    super(eventBus, PLUGIN_LOADER_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
    this._injector = injector;
  }

  canRender(element) {
    if (is(element, "bpmn:UserTask") && getElementNDGroupType(element)) {
      return true;
    }

    return;
  }

  drawShape(parent, element) {
    var renderer = this.bpmnRenderer.handlers['bpmn:Task'];

    var gfx = renderer(parent, element);

    var icon = svgCreate('image');

    // TODO make dynamic
    const iconElement = iconMap[getElementNDGroupType(element)].icon;

    const elementSvgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(iconElement);

    svgAttr(icon, {
      href: elementSvgUrl,
      x: 5,
      y: 5,
      width: 18,
      height: 18
    });

    svgAppend(parent, icon);

    return gfx;
  }

}

CustomRenderer.$inject = [
  'bpmnRenderer',
  'eventBus',
  'injector'
];

export default {
  __init__: [
    'customRenderer'
  ],
  customRenderer: ['type', CustomRenderer]
};