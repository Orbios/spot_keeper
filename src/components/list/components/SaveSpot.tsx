import {useState} from 'react';
import {Modal, Button} from 'components/bootstrap';

import validationHelper from 'helpers/validationHelper';

import TextInput from 'components/common/TextInput';
import TextAreaInput from 'components/common/TextAreaInput';

interface Props {
  spot: Spot;
  save: () => void;
  close: () => void;
  onChange: OnChangeHandler;
  visible?: boolean;
}

function SaveSpot({spot, save, close, onChange, visible}: Props) {
  const [errors, setErrors] = useState({title: '', mapLink: ''});

  function formIsValid() {
    const formErrors = {
      title: '',
      mapLink: ''
    };

    if (!spot.title) {
      formErrors.title = 'Title field is required.';
    }

    if (!spot.mapLink) {
      formErrors.mapLink = 'Map link is required.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  }

  function onSave() {
    if (!formIsValid()) return;

    save();
  }

  function render() {
    const title = spot.id ? 'Edit Spot' : 'Add New Spot';

    return (
      <Modal show={visible} backdrop="static" onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            name="title"
            label="Title"
            value={spot.title}
            onChange={onChange}
            placeholder="Title"
            error={errors.title}
          />

          <TextInput
            name="mapLink"
            label="Map Link"
            value={spot.mapLink}
            onChange={onChange}
            placeholder="Map Link"
            error={errors.mapLink}
          />

          <TextAreaInput
            name="description"
            label="Description"
            value={spot.description}
            onChange={onChange}
            placeholder="Description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return render();
}

export default SaveSpot;
