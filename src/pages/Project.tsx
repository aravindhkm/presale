import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectInfo } from 'components/ProjectInfo/ProjectInfo';
import { Breadcrumb } from 'components/Breadcrumb/Breadcrumb';
import { Grid } from 'components/Grid/Grid';
import { Page } from 'layout/Page/Page';
import { useGetProjectQuery } from 'api/gen/requests';

export const Project: React.FC = () => {
  const { pid } = useParams();
  const { loading, error, data } = useGetProjectQuery({ variables: { pid } });

  if (loading || error) return null;

  return (
    <Page>
      <Grid colGap={{ sm: 1, md: 20, lg: 40 }} rowGap={{ sm: 21, md: 48 }}>
        <Grid.Item>
          <Breadcrumb path={data?.getProject?.pid} />
        </Grid.Item>
        <Grid.Item colSpan={{ md: 12 }}>
          <ProjectInfo {...data.getProject} />
        </Grid.Item>
      </Grid>
    </Page>
  );
};
