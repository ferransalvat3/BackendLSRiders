package com.lsriders.backend.repository;

import com.lsriders.backend.domain.User;
import com.lsriders.backend.domain.UserExt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {

    @Query("select user from UserExt user where user.student=true")
    List<UserExt> findByUserStudent();

    UserExt findByUserId(Long user);




}
