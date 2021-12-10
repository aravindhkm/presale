import React from 'react';
import { ThemeType } from 'constants/themes';
import { css } from '@emotion/react';

type BreadcrumbProps = {
  path: string;
};

const style = {
  breadcrumb: (theme: ThemeType) =>
    css({
      color: theme.colors.text,
      fontSize: 13,
    }),
};

export const Breadcrumb: React.VFC<BreadcrumbProps> = ({ path }) => {
  return (
    <div>
      <p css={style.breadcrumb}>{path}</p>
    </div>
  );
};
