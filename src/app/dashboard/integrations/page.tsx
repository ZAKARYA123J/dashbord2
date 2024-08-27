"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { config } from '@/config';
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';
import type { Integration } from '@/components/dashboard/integrations/integrations-card';
import { CompaniesFilters } from '@/components/dashboard/integrations/integrations-filters';

// export const metadata: Metadata = {
//   title: `Integrations | Dashboard | ${config.site.name}`,
// };

const integrations: Integration[] = [
  {
    id: 'INTEG-006',
    title: 'Dropbox',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logo-dropbox.png',
    installs: 594,
    updatedAt: dayjs().subtract(12, 'minute').toDate(),
  },
  {
    id: 'INTEG-005',
    title: 'Medium Corporation',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logo-medium.png',
    installs: 625,
    updatedAt: dayjs().subtract(43, 'minute').subtract(1, 'hour').toDate(),
  },
  {
    id: 'INTEG-004',
    title: 'Slack',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logo-slack.png',
    installs: 857,
    updatedAt: dayjs().subtract(50, 'minute').subtract(3, 'hour').toDate(),
  },
  {
    id: 'INTEG-003',
    title: 'Lyft',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logo-lyft.png',
    installs: 406,
    updatedAt: dayjs().subtract(7, 'minute').subtract(4, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'INTEG-002',
    title: 'GitHub',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logo-github.png',
    installs: 835,
    updatedAt: dayjs().subtract(31, 'minute').subtract(4, 'hour').subtract(5, 'day').toDate(),
  },
  {
    id: 'INTEG-001',
    title: 'Squarespace',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logo-squarespace.png',
    installs: 435,
    updatedAt: dayjs().subtract(25, 'minute').subtract(6, 'hour').subtract(6, 'day').toDate(),
  },
];

export default function Page(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    // Logic to save the new customer can go here
    handleClose();
  };

  return (
    <Stack spacing={3}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={newCustomer.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={newCustomer.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            variant="outlined"
            value={newCustomer.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            variant="outlined"
            value={newCustomer.address}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Integrations</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleOpen}>
            Add
          </Button>
        </div>
      </Stack>
      <CompaniesFilters />
      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid key={integration.id} lg={4} md={6} xs={12}>
            <IntegrationCard integration={integration} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
