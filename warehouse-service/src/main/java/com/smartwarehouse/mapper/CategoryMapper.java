package com.smartwarehouse.mapper;

import com.smartwarehouse.dto.CategoryDTO;
import com.smartwarehouse.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toDto(Category category);
    Category toEntity(CategoryDTO categoryDTO);
    List<CategoryDTO> toDtoList(List<Category> categories);
}

