package com.mine.application.common.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@NoArgsConstructor
@SuperBuilder
@Getter
@MappedSuperclass  // ①
@EntityListeners(AuditingEntityListener.class) // ②
public abstract class BaseEntity {

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private Boolean isDeleted;

    @PrePersist
    protected void noDeleted(){
        if(isDeleted == null){
            isDeleted = false;
        }
    } //JPA 영속성 추가되면 default로 추가되게 함. 궂이 false 일일이 추가 안해도 됨.

}
