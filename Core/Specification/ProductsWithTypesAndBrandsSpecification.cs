using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
            : base(x =>
                    (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                    (productParams.Search)) && 
                    (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                    (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
                )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddorderBy(x => x .Name);
            ApplyPaging(productParams.pageSize * (productParams.PageIndex -1),
            productParams.pageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddorderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddorderByDescending(p => p.Price);
                        break;
                    default:
                        AddorderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(x => x.Id == id)
        {
             AddInclude(x => x.ProductType);
             AddInclude(x => x.ProductBrand);
        }
    }
}