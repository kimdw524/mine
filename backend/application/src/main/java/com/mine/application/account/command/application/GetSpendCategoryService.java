package com.mine.application.account.command.application;

import com.mine.application.account.command.domain.SpendCategory;
import com.mine.application.account.command.domain.SpendCategoryRepository;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetSpendCategoryService {

    private final SpendCategoryRepository spendCategoryRepository;

    public String getSpendCategory(int id) {
        return spendCategoryRepository.findById(id)
                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND))
                .getName();
    }

}
