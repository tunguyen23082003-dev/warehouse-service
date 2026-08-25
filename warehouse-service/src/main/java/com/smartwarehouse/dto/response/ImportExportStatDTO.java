package com.smartwarehouse.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImportExportStatDTO {
    @com.fasterxml.jackson.annotation.JsonProperty("name")
    private String name;
    
    @com.fasterxml.jackson.annotation.JsonProperty("import")
    private Long importQty;
    
    @com.fasterxml.jackson.annotation.JsonProperty("export")
    private Long exportQty;
}
