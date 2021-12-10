import React, { useState } from 'react';
import { Project, useGetProjectsForListQuery } from 'api/gen/requests';
import { Page } from 'layout/Page/Page';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { Flex } from 'components/Flex';
import { Paginate } from 'components/Paginate/Paginate';
import { Box } from 'components/Box/Box';
import Heading from 'UI/Typography/Heading';
import { useTraslate } from 'UI/I18n/I18n';
import { Paragraph } from 'UI/Typography/Paragraph';
import { Colors } from 'constants/colors';

const DEFAULT_PROJECTS_PER_PAGE = 8;

export const Dashboard: React.FC = () => {
  const t = useTraslate();
  // TODO: when backEnd would be updated, will shown number of USDC per day!
  const perDay = false;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState<Array<Project>>(null);

  const { data, loading, error } = useGetProjectsForListQuery({
    variables: { size: DEFAULT_PROJECTS_PER_PAGE, page: currentPage },
  });

  console.log(data?.projects.data);
  console.log(currentItems);

  if (loading) return <div style={{ minHeight: '60vh' }}>Loader will be here</div>;
  if (error) return <div style={{ minHeight: '60vh' }}>{error.message}</div>;
  return (
    <Page>
      <Box mB={19}>
        <Heading level={3}>{t('page-dashboard-title-early-access')}</Heading>
      </Box>
      <Box mB={46}>
        <Paragraph variant={'regular'}>
          {perDay ? (
            <span style={{ color: Colors.GREEN_8 }}>
              {t('page-dashboard-day')} {perDay} USDC
            </span>
          ) : null}{' '}
          {t('page-dashboard-paragraph-past')}
        </Paragraph>
      </Box>
      <Flex justifyContent={'center'} flexWrap={'wrap'} gap={22}>
        {data?.projects.data.length > 0
          ? data?.projects.data.length > 3
            ? currentItems?.map((project: Project, idx: number) => (
                <div key={idx}>
                  <DashboardCard {...project} />
                </div>
              ))
            : data?.projects.data.map((project: Project, idx: number) => (
                <div key={idx}>
                  <DashboardCard {...project} />
                </div>
              ))
          : null}
      </Flex>

      {/*Paginate*/}
      <Box mT={64}>
        {data?.projects.data.length > 3 ? (
          <Flex justifyContent={'center'}>
            <Paginate
              perPage={3}
              setCurrentPage={setCurrentPage}
              items={data?.projects.data}
              setCurrentItems={setCurrentItems}
            />
          </Flex>
        ) : null}
      </Box>
      {/*Paginate END*/}
    </Page>
  );
};
