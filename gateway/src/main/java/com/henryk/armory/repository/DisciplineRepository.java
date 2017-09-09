package com.henryk.armory.repository;

import com.henryk.armory.domain.Discipline;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Discipline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    @Query("select distinct discipline from Discipline discipline left join fetch discipline.programs")
    List<Discipline> findAllWithEagerRelationships();

    @Query("select discipline from Discipline discipline left join fetch discipline.programs where discipline.id =:id")
    Discipline findOneWithEagerRelationships(@Param("id") Long id);

}
