package com.henryk.armory.service.mapper;

import com.henryk.armory.domain.*;
import com.henryk.armory.service.dto.DisciplineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Discipline and its DTO DisciplineDTO.
 */
@Mapper(componentModel = "spring", uses = {ProgramMapper.class, })
public interface DisciplineMapper extends EntityMapper <DisciplineDTO, Discipline> {
    
    @Mapping(target = "resources", ignore = true)
    Discipline toEntity(DisciplineDTO disciplineDTO); 
    default Discipline fromId(Long id) {
        if (id == null) {
            return null;
        }
        Discipline discipline = new Discipline();
        discipline.setId(id);
        return discipline;
    }
}
