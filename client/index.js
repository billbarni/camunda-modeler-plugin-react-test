import {
    registerPlatformBpmnJSPlugin,
    registerClientExtension
} from 'camunda-modeler-plugin-helpers';

import palette from './propertiesPanel/';
import config from './config/config-dialog';

registerPlatformBpmnJSPlugin(palette);
//registerClientExtension(config);
