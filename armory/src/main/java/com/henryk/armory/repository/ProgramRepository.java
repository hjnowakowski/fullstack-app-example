package com.henryk.armory.repository;

import com.henryk.armory.domain.Program;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Program entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    @Query("select distinct program from Program program left join fetch program.courses")
    List<Program> findAllWithEagerRelationships();

    @Query("select program from Program program left join fetch program.courses where program.id =:id")
    Program findOneWithEagerRelationships(@Param("id") Long id);

}
