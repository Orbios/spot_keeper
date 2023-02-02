import {useState} from 'react';
import {Modal, Button} from 'components/bootstrap';

import validationHelper from 'helpers/validationHelper';

import TextInput from 'components/common/TextInput';
import TextAreaInput from 'components/common/TextAreaInput';

interface Props {
  visible: boolean;
  list: List;
  save: () => void;
  close: () => void;
  onChange: OnChangeHandler;
}

function EditList({visible, list, save, close, onChange}: Props) {
  const [errors, setErrors] = useState({title: '', description: ''});

  function formIsValid() {
    const formErrors = {
      title: '',
      description: ''
    };

    if (!list.title) {
      formErrors.title = 'Title field is required.';
    }

    if (!list.description) {
      formErrors.description = 'Description field is required.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  }

  function onSave() {
    if (!formIsValid()) return;

    save();
  }

  return (
    <Modal show={visible} backdrop="static" onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextInput
          name="title"
          label="Title"
          value={list.title}
          onChange={onChange}
          placeholder="Title"
          error={errors.title}
        />

        <TextAreaInput
          name="description"
          label="Description"
          value={list.description}
          onChange={onChange}
          placeholder="Description"
          error={errors.description}
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

export default EditList;
