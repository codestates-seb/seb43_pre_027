package seb43_pre_027.demo.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MultiResponseDto2<T> {
    private List<T> data;
    private TotalCount totalCount;

    public MultiResponseDto2(List<T> data, TotalCount totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }
}
