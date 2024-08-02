package com.mine.application.user.ui.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetUserInfoResponse {

    private Integer id;

    String email;

    String nickname;

    String gender;

}
