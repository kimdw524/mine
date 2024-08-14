package com.mine.application.avatar.command;

import com.mine.application.avatar.command.application.ModifyQuestionResRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModifyQuestionResRequestListWrapper {
    private List<ModifyQuestionResRequest> list;
}
