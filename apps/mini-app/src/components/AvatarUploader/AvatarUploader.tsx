import { Avatar } from '@samovar/ui/Avatar';
import { IconButton } from '@samovar/ui/IconButton';
import { CircularProgress } from '@samovar/ui/CircularProgress';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@samovar/ui/Icon';
import { useAvatarUpload } from '../../services/avatar-upload.service';

interface AvatarUploaderProps {
  src?: string;
  avatarSize?: number;
}

export function AvatarUploader({ src: _src, avatarSize = 128 }: AvatarUploaderProps) {
  const [src, setSrc] = useState<string | undefined>(_src);
  const mutation = useAvatarUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    input.onchange = () => {
      console.log('change');
      const file = input.files?.item(0);
      console.log('file', file);
      if (!file) {
        return;
      }

      mutation.mutate(file, {
        onSuccess: (result) => {
          setSrc(result.data.imageUrl);
        },
        onSettled: () => {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        },
      });
    };

    return () => {
      input.onchange = null;
    };
  }, [mutation]);

  const isUploading = mutation.isLoading;

  return (
    <IconButton sx={{ display: 'block', margin: 'auto' }}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- using an icon instead of text */}
      <label htmlFor="__image_input__">
        <input accept="image/*" hidden id="__image_input__" ref={inputRef} type="file" />
        <Avatar src={src} sx={{ width: avatarSize, height: avatarSize, cursor: 'pointer' }}>
          <Icon color="inherit" fontSize="large" sx={{ cursor: 'pointer' }}>
            cloud_upload_rounded
          </Icon>
        </Avatar>
      </label>
      {isUploading ? (
        <CircularProgress
          size="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      ) : null}
    </IconButton>
  );
}
