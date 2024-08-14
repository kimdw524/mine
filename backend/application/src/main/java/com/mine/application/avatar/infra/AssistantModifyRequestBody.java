package com.mine.application.avatar.infra;

import lombok.*;

@Getter
@AllArgsConstructor
@Setter
@Builder
@ToString
public class AssistantModifyRequestBody {
    private String job;
    private String instruction;
    private String name;
    private String residence;
    private String assistant_id;
    private String thread_id;


    public AssistantModifyRequestBody() {
        job = "";
        instruction = "";
        name = "";
        residence = "";
        assistant_id = "";
        thread_id = "";
    }
}