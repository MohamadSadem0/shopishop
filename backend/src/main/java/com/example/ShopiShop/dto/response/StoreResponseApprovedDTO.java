
package com.example.ShopiShop.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreResponseApprovedDTO {

    private Long id;
    private String name;
    private String ownerName;
    private String sectionName;

}
