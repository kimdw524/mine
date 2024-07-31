package com.mine.application.user.query;


import org.springframework.data.repository.Repository;

public interface UserDataRepository extends Repository<UserData, Integer> {

    boolean existsByEmail(String email);
    UserData findByEmail(String email);
    UserData findById(Integer id);
}
