import React from 'react';
import { Products } from '../@unbxd-ui/react-search-sdk/';
import unbxdSearchConfig from '../unbxd-search.config.json';

const ProductsListing = ({ onProductClick }) => {
  return (
    <Products
      onProductClick={onProductClick}
      attributesMap={unbxdSearchConfig.attributesMap}
      pageSize={unbxdSearchConfig.pageSize}
      showVariants={unbxdSearchConfig.showVariants}
      variantsCount={unbxdSearchConfig.variantsCount}
      variantAttributesMap={unbxdSearchConfig.variantAttributesMap}
      showSwatches={unbxdSearchConfig.showSwatches}
      groupBy={unbxdSearchConfig.groupBy}
      swatchAttributesMap={unbxdSearchConfig.swatchAttributesMap}
      paginationType={unbxdSearchConfig.paginationType}
    />
  );
};

export default ProductsListing;
