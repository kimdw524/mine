package com.mine.application.avatar.query;
// AvatarData 엔티티를 위한 JPA 리포지토리, 아바타 데이터를 조회, 아바타 목록을 조회
import org.springframework.data.repository.Repository;

import java.util.List;

//import org.springframework.data.jpa.repository.JpaRepository;

//public interface AvatarDataRepository extends JpaRepository<AvatarData, Integer> {
public interface AvatarDataRepository extends Repository<AvatarData, Integer> {

    List<AvatarData> findAllByUserId(Integer userId);

}
