import styles from '@/ui/search/pagination/pagination.module.css';
import type { PaginationProps } from '@/ui/search/pagination/pagination.types';

export const Pagination = ({totalPage}: PaginationProps) => {

    const pageNumberList = Array.from({length: totalPage}, (_, index) => index + 1);

    return(
        <div>
          <nav>
            <ul className={styles.PaginationUl}>
            {pageNumberList.map((pageNum) => (
              <li className={styles.PaginationLi} key={pageNum}>
                <span className={styles.PaginationSpan}>{pageNum}</span>
              </li>
            ))}
            </ul> 
          </nav>
        </div>
    )
}