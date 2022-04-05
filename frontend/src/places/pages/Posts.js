import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import ReactPaginate from 'react-paginate';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Posts.css'

const AllPlaces = (props) => {
    const itemsPerPage = props.itemsPerPage || 3;
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const fetchPlaces = async () => {
        try {
            const responseData = await sendRequest(
            `http://localhost:5000/api/places/`
            );
            setLoadedPlaces(responseData.places);
            setCurrentItems(responseData.places.slice(0, itemsPerPage));
            setPageCount(Math.ceil(responseData.places.length / itemsPerPage));
        } catch (err) {}
        };
        fetchPlaces();
    }, [sendRequest,itemsPerPage]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(loadedPlaces.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(loadedPlaces.length / itemsPerPage));
      }, [itemOffset, itemsPerPage, loadedPlaces]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % loadedPlaces.length;
        setItemOffset(newOffset);
      };

    return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces.length>0 && (
        <div id="post_list">
            <PostList items={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="page-ul"
            />
        </div>      )}
    </React.Fragment>
    )
}

export default AllPlaces;