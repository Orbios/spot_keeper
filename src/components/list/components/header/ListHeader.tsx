import {useRef, useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaMapMarkedAlt} from 'react-icons/fa';

import config from 'config';
import uiHelper from 'helpers/uiHelper';
import navigationHelper from 'helpers/navigationHelper';

import AppIcon from 'components/common/AppIcon';
import ImageEditor from 'components/common/ImageEditor';

import * as styled from './ListHeader.styled';

import {listImageSize} from 'styles/shared';

interface Props {
  list: List;
  editMode: boolean;
  onEditList?: () => void;
  onDeleteList?: () => void;
  onMakePublic?: () => void;
  onImageUpdateHandler?: (image: any) => void;
}

function ListHeader({list, editMode, onEditList, onDeleteList, onMakePublic, onImageUpdateHandler}: Props) {
  const inputRef = useRef<any>(null);

  const [isShown, setIsShown] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setIsShown(false);
    };
  }, []);

  function onMouseEnter() {
    if (!editMode) return;
    setIsShown(true);
  }

  function onMouseLeave() {
    if (!editMode) return;
    setIsShown(false);
  }

  async function copyToClipboard() {
    if (!onMakePublic) return;
    await onMakePublic();
    uiHelper.showMessage('List was successfully shared! Link copied to clipboard.');
  }

  function onEditImage() {
    if (!editMode || !inputRef?.current) return;
    inputRef.current.click();
  }

  async function handleFileChange(e) {
    if (!editMode || !onImageUpdateHandler) return;

    const image = e.target.files[0];
    setOriginalImage(image);
  }

  function renderImage() {
    const imageUrl = list.imageUrl;

    let imageToRender: any = null;

    if (imageUrl) {
      const imagePath = `${config.supabase.storageUrl}${imageUrl}`;

      imageToRender = <styled.image src={imagePath} alt={list.title} width={listImageSize} height={listImageSize} />;
    } else {
      imageToRender = <FaMapMarkedAlt size="60" />;
    }

    return (
      <styled.imageContainer
        isEditMode={editMode}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onEditImage}>
        {!isShown && imageToRender}

        {isShown && (
          <styled.hoverContainer>
            <AppIcon icon="edit" size="3x" />
          </styled.hoverContainer>
        )}

        <styled.uploadInput type="file" ref={inputRef} accept="image/png, image/jpeg" onChange={handleFileChange} />
      </styled.imageContainer>
    );
  }

  function render() {
    const publicUrl = navigationHelper.getSharedListUrl(list.id);
    const isImageEditorVisible = originalImage ? true : false;

    return (
      <styled.container>
        {editMode && (
          <styled.actionContainer>
            <CopyToClipboard text={publicUrl} onCopy={copyToClipboard}>
              <styled.actionWrapper>
                <AppIcon icon="share" size="lg" />
              </styled.actionWrapper>
            </CopyToClipboard>
            <styled.actionWrapper onClick={onEditList}>
              <AppIcon icon="edit" size="lg" />
            </styled.actionWrapper>
            <styled.actionWrapper onClick={onDeleteList}>
              <AppIcon icon="delete" size="lg" />
            </styled.actionWrapper>
          </styled.actionContainer>
        )}

        {renderImage()}

        <div>
          <styled.title editMode={editMode} onClick={onEditList}>
            {list.title}
          </styled.title>

          <div>{list.description}</div>
        </div>

        {isImageEditorVisible && (
          <ImageEditor
            visible={isImageEditorVisible}
            originalImage={originalImage}
            close={() => setOriginalImage(null)}
            saveImage={onImageUpdateHandler}
          />
        )}
      </styled.container>
    );
  }

  return render();
}

export default ListHeader;
