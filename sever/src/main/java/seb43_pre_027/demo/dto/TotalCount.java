package seb43_pre_027.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TotalCount {
    private long totalElements;

    public TotalCount(long totalElements) {
        this.totalElements = totalElements;
    }
}
