import * as React from 'react';

import useSWR from 'swr';
import axios from '@utils/axios';
import fetcher from '@utils/swrFetcehr';
import { IUser } from '@utils/dbTypes';

import { Box, Drawer, List, Divider, ListItem } from '@mui/material';

type propsType = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export default function FriendDrawer({ isOpen, closeDrawer }: propsType) {
  const { data, error, mutate } = useSWR(`/friend`, fetcher);

  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={isOpen} onClose={closeDrawer}>
        <Box sx={{ width: '250px' }}>
          <List></List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
