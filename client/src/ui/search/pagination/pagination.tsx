interface PaginationProps {
    totalPage: number
}

export const Pagination = ({totalPage}: PaginationProps) => {

    const pageNumberList = Array.from({length: totalPage}, (_, index) => index + 1);

    return(
        <div>
          <nav>
            {pageNumberList.map((pageNum) => (
                pageNum
            ))} 
          </nav>
        </div>
    )
}