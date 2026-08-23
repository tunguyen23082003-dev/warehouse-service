package com.smartwarehouse.service;

import com.smartwarehouse.entity.Category;
import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(Integer id);
    Category createCategory(Category category);
}
