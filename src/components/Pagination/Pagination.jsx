import React from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
  const { gamesPerPage, totalVideogames, 
    paginate, currentPage } = props;
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalVideogames / gamesPerPage);
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <div className={styles.item}>
        <button onClick={() => paginate(currentPage-1)}
                disabled={currentPage === 1}
        >
          Previous
        </button>
      </div>

      {
        pageNumbers.map((pgNum) => (
          <div key={pgNum} className={styles.item}>
            <button id={pgNum == currentPage ? styles.current : ''} 
                    onClick={() => paginate(pgNum)}
            >
              {pgNum}
            </button>
          </div>
        ))
      }

      <div className={styles.item}>
        <button onClick={() => paginate(currentPage+1)}
                disabled={currentPage === numOfPages}
        >
          Next 
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
