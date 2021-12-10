import React, { SetStateAction, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import ReactPaginate from 'react-paginate';
import { Colors } from 'constants/colors';
import { Project } from 'api/gen/requests';

type TSelected = {
  selected: number;
};

type TProps = {
  perPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setCurrentItems: React.Dispatch<SetStateAction<Array<Project>>>;
  items: Array<any>; // except <Project>
};

const styles = {
  main: () =>
    css`
      .pagination-container {
        display: flex;
        justify-content: space-between;
        max-width: 500px;
        width: 300px;
        list-style-type: none;
      }
      .active-link {
        color: ${Colors.GRAY_8};
        width: 100%;
      }
      .page {
        width: 30px;
        height: 30px;
        background: ${Colors.GRAY_18};
        color: ${Colors.GRAY_8};
        padding: 3px;
        border-radius: 4px;
        text-align: center;
        color: ${Colors.WHITE};
      }
      .previous {
        width: 30px;
        height: 30px;
        background: ${Colors.GRAY_18};
        color: ${Colors.WHITE};
        padding: 3px;
        border-radius: 4px;
        text-align: center;
      }
      .next {
        width: 30px;
        height: 30px;
        background: ${Colors.GRAY_18};
        color: ${Colors.WHITE};
        padding: 3px;
        border-radius: 4px;
        text-align: center;
      }
      .page-link {
        display: block;
        width: 100%;
      }
    `,
};

export const Paginate: React.FC<TProps> = ({ perPage = 3, setCurrentPage, items, setCurrentItems }) => {
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + perPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / perPage));
  }, [itemOffset, perPage]);

  const handlePageClick = ({ selected }: TSelected): void => {
    setCurrentPage(selected);
    const newOffset = (selected * perPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div css={styles.main}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        marginPagesDisplayed={Number(5)}
        containerClassName={'pagination-container'}
        activeLinkClassName={'active-link'}
        pageClassName={'page'}
        previousClassName={'previous'}
        nextClassName={'next'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
      />
    </div>
  );
};
