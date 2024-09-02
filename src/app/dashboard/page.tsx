"use client"
import  React,{useState} from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { OrderModal } from './model';
import { InfoModal } from '../infomodel';
// import { Traffic } from '@/components/dashboard/overview/traffic';

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleCardClick = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalContent(null);
  };
  return (
    <Grid container spacing={3}>
       <Grid lg={3} sm={6} xs={12} onClick={() => handleCardClick('Budget Details', <p>Budget: $24k<br />Trend: Up 12%</p>)}>
          <Budget diff={12} trend="up" sx={{ height: '100%', cursor: 'pointer' }} value="$24k" />
        </Grid>
        <Grid lg={3} sm={6} xs={12} onClick={() => handleCardClick('Total Customers Details', <p>Total Customers: 1.6k<br />Trend: Down 16%</p>)}>
          <TotalCustomers diff={16} trend="down" sx={{ height: '100%', cursor: 'pointer' }} value="1.6k" />
        </Grid>
        <Grid lg={3} sm={6} xs={12} onClick={() => handleCardClick('Tasks Progress Details', <p>Tasks Progress: 75.5%</p>)}>
          <TasksProgress sx={{ height: '100%', cursor: 'pointer' }} value={75.5} />
        </Grid>
        <Grid lg={3} sm={6} xs={12} onClick={() => handleCardClick('Total Profit Details', <p>Total Profit: $15k</p>)}>
          <TotalProfit sx={{ height: '100%', cursor: 'pointer' }} value="$15k" />
        </Grid>
        <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
      />
  
      <Grid lg={12} md={12} xs={12}>
        <LatestOrders
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
