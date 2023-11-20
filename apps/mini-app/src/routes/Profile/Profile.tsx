import { Button } from '@samovar/ui/Button';
import { Dialog, DialogContent, DialogTitle } from '@samovar/ui/Dialog';
import { Suspense, lazy, useState } from 'react';
import { IconButton } from '@samovar/ui/IconButton';
import { Icon } from '@samovar/ui/Icon';
import { Box } from '@samovar/ui/Box';
import { PersonalDataForm } from '../../features/PersonalDataForm';

const LazyProfileForm = lazy(() => import('../../features/ProfileForm'));

export function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box p={1}>
      <PersonalDataForm />
      <div>
        <h4>Profiles:</h4>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Dialog fullScreen open={isDialogOpen}>
          <DialogTitle>
            Create profile
            <IconButton
              onClick={() => {
                setIsDialogOpen(false);
              }}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Icon>close</Icon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <LazyProfileForm />
          </DialogContent>
        </Dialog>
      </Suspense>
    </Box>
  );
}

Component.displayName = 'Profile';
