package com.mine.application.avatar.query;
// 세션에서 사용자 ID 를 가져와서 해당 사용자의 아바타 목록을 조회, 정렬 후 DTO로 변환하여 반환

//import com.mine.application.avatar.command.domain.Avatar;
//import com.mine.application.avatar.command.domain.AvatarModel;
//import com.mine.application.avatar.ui.dto.AvatarConverter;
//import com.mine.application.avatar.ui.dto.GetAvatarResponse;
import com.mine.application.common.domain.SessionConstants;
import com.mine.application.common.domain.SessionDao;
import com.mine.application.common.erros.errorcode.CommonErrorCode;
import com.mine.application.common.erros.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AvatarQueryService {

    private final SessionDao sessionDao;
    private final AvatarDataRepository avatarDataRepository;

//    @Transactional
//    public List<GetAvatarResponse> getAvatarResponses() {
//        Integer userId = (Integer) sessionDao.get(SessionConstants.USER_ID)
//                .orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
//
//        return avatarDataRepository.findAllByUserId(userId)
//                .stream()
//                .sorted(Comparator.comparingInt(AvatarData::getId))
//                .map(AvatarConverter::convert)
//                .collect(Collectors.toList());
//    }

}
