import React, { useState, useContext } from 'react';
import {
  Route,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import isEqual from 'lodash.isequal';
import { AppContext } from '../context/context.js';
import unbxdSearchConfig from '../unbxd-search.config.json';
import UnbxdSearchWrapper from '../@unbxd-ui/react-search-sdk/';
import SearchBar from '../components/SearchBar';
import ProductsListing from '../components/ProductsListing';

import SpellChecker from '../components/SpellChecker';
import Paginator from '../components/Paginator';
import Sorter from '../components/Sorter';
import MerchandizingBanner from '../components/MerchandizingBanner';
import TextFilters from '../components/TextFilters';
import RangeFilters from '../components/RangeFilters';
import MultilevelFilters from '../components/MultilevelFilters';
import ActiveFilters from '../components/ActiveFilters';
import Crumbs from '../components/Crumbs';
import SearchDescription from '../components/SearchDescription';
import ProductViewTypes from '../components/ProductViewTypes';
import ProductsSize from '../components/ProductsSize';
import FacetApplyClear from '../components/FacetApplyClear';
import MobileModal from '../components/MobileModal';
import MobileMenu from '../components/MobileMenu';

const getUrlParamsMapped = (urlObj) => {
  const urlMap = ['q', 'rows', 'start', 'viewType', 'filter', 'sort'];
  let newObj = {};
  urlMap.forEach((key) => {
    if (urlObj[key]) {
      newObj[key] = urlObj[key];
    }
  });
  return newObj;
};

export default function Search() {
  const { state, dispatch } = useContext(AppContext);
  const routeHistory = useNavigate();
  const routeLocation = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const [showFilters, setShowFilters] = useState(false);
  const handleClose = () => setShowFilters(false);
  const handleShow = () => setShowFilters(true);
  const searchConfigurations = {
    updateUrls: false,
    searchQueryParam: 'q',
    hashMode: false,
  };

  const handleRouteChange = (searchObj, hash, refreshId) => {
    const { state = {} } = searchObj;
    const { responseObj = {} } = state;
    const { redirect = {} } = responseObj;
    const { type = '', value } = redirect;
    let urlParams = getUrlParamsMapped(searchObj.getQueryParams());
    let newParams = getUrlParamsMapped(searchObj.getQueryParams(hash));
    if (!isEqual(urlParams, newParams)) {
      if (routeHistory.action === 'POP') {
        console.log('back');
      } else {
        console.log('new');
        setSearchParams(newParams);
      }
    }
    return false;
  };
  return (
    <div>
      <UnbxdSearchWrapper
        siteKey={unbxdSearchConfig.siteKey}
        apiKey={unbxdSearchConfig.apiKey}
        searchConfigurations={searchConfigurations}
        onRouteChange={handleRouteChange}
      >
        <MobileModal showFilters={showFilters} handleClose={handleClose} />

        <MobileMenu handleShow={handleShow} />

        <div className="UNX-search__container">
          <div className="UNX-searchMeta__container">
            <Crumbs />
            <div className="UNX-searchMeta__more">
              <ActiveFilters />
              <ProductViewTypes />
            </div>
          </div>
          <div className="UNX-searchResults__container">
            <div className="UNX-searchFacet__container">
              <MultilevelFilters />
              <RangeFilters />
              <TextFilters />
            </div>

            <div className="UNX-searchResult__container">
              <MerchandizingBanner />
              <SearchDescription />
              <SpellChecker />

              <div className="UNX-searchHeader__container">
                <Sorter />
                <ProductsSize />
                <Paginator />
              </div>

              <ProductsListing />

              <Paginator />
            </div>
          </div>
        </div>
      </UnbxdSearchWrapper>
    </div>
  );
}
