import { Category } from './category';
import { SubCategory } from './subcategory';

export interface Payslip{
    PayslipId: string;
    PayslipMonth: string;
    PayslipYear: string;
    CategoryId: string;
    SubCategoryId: string;
    Category : Category;
    SubCategory: SubCategory;
}