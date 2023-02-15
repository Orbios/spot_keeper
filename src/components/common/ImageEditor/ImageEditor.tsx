import {useState, useRef} from 'react';
import {Modal, Button} from 'components/bootstrap';
import AvatarEditor from 'react-avatar-editor';

import * as styled from './ImageEditor.styled';

interface Props {
  visible: boolean;
  originalImage: any | null;
  close: () => void;
  saveImage?: (image: any) => void;
}

function ImageEditor({visible, originalImage, close, saveImage}: Props) {
  if (!originalImage) return null;

  const [imageScale, setImageScale] = useState<number>(1);

  const editor = useRef<any>(null);

  function onSave() {
    if (!editor?.current || !saveImage) return;

    const canvasScaled = editor.current.getImageScaledToCanvas();

    canvasScaled.toBlob(blob => {
      const updatedImage = new File([blob], originalImage.name, {type: originalImage.type});
      saveImage(updatedImage);
      close();
    });
  }

  return (
    <Modal show={visible} backdrop="static" onHide={close}>
      <Modal.Body>
        <styled.container>
          <AvatarEditor
            ref={editor}
            image={originalImage}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={imageScale}
            rotate={0}
          />
        </styled.container>

        <styled.slider
          type="range"
          id="image-slider"
          min="1"
          max="6"
          step={0.5}
          value={imageScale}
          onChange={e => setImageScale(Number(e.target.value))}
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

export default ImageEditor;
