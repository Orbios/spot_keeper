import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import AppIcon from 'components/common/AppIcon';
import ImageEditor from 'components/common/ImageEditor';
import LocationImage from './components/LocationImage';

import * as styled from './Locationtem.styled';

interface Props {
  item: Spot | List;
  isEditMode?: boolean;
  onEditItem?: (spot: Spot) => void;
  onDeleteItem?: (id: number, imageUrl?: string) => void;
  onImageUpdate?: (spot: Spot, image: any) => void;
}

function Locationtem({item, isEditMode = false, onEditItem, onDeleteItem, onImageUpdate}: Props) {
  const navigate = useNavigate();

  const isSpot = item.hasOwnProperty('mapLink');

  const [originalImage, setOriginalImage] = useState<string | null>(null);

  function handleClick() {
    if (isSpot) {
      const spot = item as Spot;
      window.open(spot.mapLink, '_blank');
    } else {
      navigate(`/list/${item.id}`);
    }
  }

  function onEditHandler() {
    if (!onEditItem) return;
    onEditItem(item as Spot);
  }

  function onDeleteHandler() {
    if (!onDeleteItem) return;
    onDeleteItem(item.id, item.imageUrl);
  }

  function onImageUpdateHandler(image) {
    if (!onImageUpdate) return;
    onImageUpdate(item as Spot, image);
  }

  function render() {
    const actionsVisible = isSpot && isEditMode;
    const isImageEditorVisible = originalImage ? true : false;

    return (
      <styled.wrapper>
        <LocationImage
          title={item.title}
          url={item.imageUrl}
          isSpot={isSpot}
          isEditMode={isEditMode}
          onSelectImage={image => setOriginalImage(image)}
        />

        <styled.contentContainer>
          <styled.titleWrapper>
            <styled.title onClick={handleClick}>{item.title}</styled.title>

            {actionsVisible && (
              <styled.actionsContainer>
                <styled.actionLink onClick={onEditHandler}>
                  <AppIcon icon="edit" />
                </styled.actionLink>
                <styled.actionLink onClick={onDeleteHandler}>
                  <AppIcon icon="delete" />
                </styled.actionLink>
              </styled.actionsContainer>
            )}
          </styled.titleWrapper>

          <div>{item.description || item.title}</div>
        </styled.contentContainer>

        {isImageEditorVisible && (
          <ImageEditor
            visible={isImageEditorVisible}
            originalImage={originalImage}
            close={() => setOriginalImage(null)}
            saveImage={onImageUpdateHandler}
          />
        )}
      </styled.wrapper>
    );
  }

  return render();
}

export default Locationtem;
