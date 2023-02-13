import {useState, useRef, useEffect} from 'react';
import {SiGooglemaps} from 'react-icons/si';
import {FaMapMarkedAlt} from 'react-icons/fa';

import config from 'config';

import AppIcon from 'components/common/AppIcon';

import {spotImageSize} from 'styles/shared';

import * as styled from './LocationImage.styled';

interface Props {
  title: string;
  url?: string;
  isSpot: boolean;
  isEditMode: boolean;
  onImageUpdateHandler?: (image: any) => void;
}

function LocationImage({title, url, isSpot, isEditMode, onImageUpdateHandler}: Props) {
  const inputRef = useRef<any>(null);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    return () => {
      setIsShown(false);
    };
  }, []);

  function onMouseEnter() {
    if (!isEditMode) return;
    setIsShown(true);
  }

  function onMouseLeave() {
    if (!isEditMode) return;
    setIsShown(false);
  }

  function onEditImage() {
    if (!isEditMode || !inputRef?.current) return;
    inputRef.current.click();
  }

  async function handleFileChange(e) {
    if (!isEditMode || !onImageUpdateHandler) return;

    const image = e.target.files[0];
    onImageUpdateHandler(image);
  }

  function render() {
    let imageToRender: any = null;

    if (url) {
      const imagePath = `${config.supabase.storageUrl}${url}`;

      imageToRender = <styled.image src={imagePath} alt={title} width={spotImageSize} height={spotImageSize} />;
    } else {
      imageToRender = isSpot ? <SiGooglemaps size="46" /> : <FaMapMarkedAlt size="46" />;
    }

    return (
      <styled.imageContainer
        isEditMode={isEditMode}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onEditImage}>
        {!isShown && imageToRender}

        {isShown && (
          <styled.hoverContainer>
            <AppIcon icon="edit" size="2x" />
          </styled.hoverContainer>
        )}

        <styled.uploadInput type="file" ref={inputRef} accept="image/png, image/jpeg" onChange={handleFileChange} />
      </styled.imageContainer>
    );
  }

  return render();
}

export default LocationImage;
