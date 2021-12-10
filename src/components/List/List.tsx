import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import React from 'react';

const styles = {
  item: (theme: ThemeType) => css`
    border-radius: 24px;
    padding: 14px 16px;
    background-color: ${theme.colors.listItemBackground};
  `,
};

const ListItem: React.FC = ({ children }) => <div css={styles.item}>{children}</div>;

export const List: React.FC & { Item: typeof ListItem } = ({ children }) => <div>{children}</div>;

List.Item = ListItem;
