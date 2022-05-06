import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context.js';
import categoryMap from '../constants/categoryMap.js';

import CircularProgress from '@mui/material/CircularProgress';
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
const getCategoryId = () => {
  if (window.UnbxdAnalyticsConf && window.UnbxdAnalyticsConf['page']) {
    return encodeURIComponent(window.UnbxdAnalyticsConf['page']);
  }
};
export default function Category(props) {
  const { state, dispatch } = useContext(AppContext);
  const routeHistory = useNavigate();
  const [refreshId, setRefreshId] = useState(0);
  let params = useParams();
  useEffect(() => {
    if (!refreshId) {
      window.UnbxdAnalyticsConf = {};
      window.UnbxdAnalyticsConf['page'] = categoryMap[params.categoryType];
      window.UnbxdAnalyticsConf['page_type'] = 'BOOLEAN';
      setRefreshId((previousId) => previousId + 1);
    }
  }, [params, state]);
  const searchConfigurations = {
    updateUrls: false,
    searchQueryParam: 'q',
    hashMode: false,
  };
  const onProductClick = (product) => {
    routeHistory(`/product/${product.uniqueId}`);
  };
  return (
    <div>
      {refreshId && (
        <UnbxdSearchWrapper
          loaderComponent={<CircularProgress />}
          siteKey={unbxdSearchConfig.siteKey}
          apiKey={unbxdSearchConfig.apiKey}
          productType={'CATEGORY'}
          refreshId={refreshId}
          getCategoryId={getCategoryId}
          searchConfigurations={searchConfigurations}
        >
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

                <ProductsListing onProductClick={onProductClick} />

                <Paginator />
              </div>
            </div>
          </div>
        </UnbxdSearchWrapper>
      )}
    </div>
  );
}
