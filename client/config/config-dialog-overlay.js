import React, { useEffect, useState } from 'react';
import { Overlay, Section } from 'camunda-modeler-plugin-helpers/components';

const OVERLAY_OFFSET = { top: 0, right: 0 };

export default function ConfigDialogOverlay(props) {
  const {
    anchor,
    onClose,
    initValues
  } = props;

  const [ url, setUrl ] = useState('');

  const handleInputFileChange = async (event) => {
    const url = event.target.value;

    if (!url) {
      return;
    }

    setUrl(url);
  };

  const fetchData = async () => {
    const response = await props.initValues.urlPromise;
    return response;
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setUrl(result);
    };

    getData();
  }, []);

  const isValid = () => {
    return !!initValues;
  };

  const handleSubmit = async () => onClose({
    url
  });

  return <Overlay offset={ OVERLAY_OFFSET } anchor={ anchor } onClose={ onClose }>
    <Section>
      <Section.Header>
        N&D Group Plugin Parameters
      </Section.Header>
      <Section.Body>
        <form id="import-form" className="import-form" onSubmit={ handleSubmit }>
          <Section>

            <Section.Header>
              API Details
            </Section.Header>

            <Section.Body>
              <fieldset>
                <div className="fields">
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      id={ 'tableName' }
                      className="form-control"
                      name={ 'tableName' }
                      placeholder="Endpoint URL"
                      value={ url }
                      onChange={ handleInputFileChange }
                    />
                  </div>
                </div>
              </fieldset>
            </Section.Body>
          </Section>

          <Section>

          </Section>
        </form>
        <Section.Actions>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ !isValid() }
            form="import-form">Save</button>
        </Section.Actions>

      </Section.Body>

    </Section>
  </Overlay>;
}