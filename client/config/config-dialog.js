import React, {
  Fragment,
  PureComponent
} from 'react';

import {
  Fill
} from 'camunda-modeler-plugin-helpers/components';

import classNames from 'classnames';

import ConfigDialogOverlay from './config-dialog-overlay';

import OpenIcon from '../../resources/file-excel.svg';

const defaultState = {
  configOpen: false
};

export default class ConfigDialog extends PureComponent {

  constructor(props) {
    super(props);

    this.state = defaultState;
    this._buttonRef = React.createRef();
  }

  handleConfigClosed(closeDetails) {
    this.setState({ modalOpen: false });

    if (!closeDetails) {
      return;
    }

    this.props.config.set('ndgroupCamundaPluginEndpoints', closeDetails.url);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    const urlPromise = this.props.config.get('ndgroupCamundaPluginEndpoints', '');

    const initValues = {
      urlPromise
    };

    return <Fragment>
      <Fill slot="tab-actions" group="xx_ndgroup">
        <button
          ref={ this._buttonRef }
          title="Open excel sheet"
          className={ classNames('btn btn--tab-action', { 'btn--active': this.state.modalOpen }) }
          onClick={ this.openModal.bind(this) }
        >
          <OpenIcon />
        </button>
      </Fill>

      {this.state.modalOpen && (
        <ConfigDialogOverlay
          anchor={ this._buttonRef.current }
          onClose={ this.handleConfigClosed.bind(this) }
          initValues={ initValues }
        />
      )}
    </Fragment>;
  }
}

