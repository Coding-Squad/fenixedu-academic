package net.sourceforge.fenixedu.applicationTier.Servico.space;

import net.sourceforge.fenixedu.applicationTier.FenixService;
import net.sourceforge.fenixedu.applicationTier.Filtro.spaceManager.SpaceAdministratorAuthorizationFilter;
import net.sourceforge.fenixedu.applicationTier.Servico.exceptions.NotAuthorizedException;
import net.sourceforge.fenixedu.domain.space.AllocatableSpace;
import pt.ist.fenixWebFramework.services.Service;

public class MergeRooms extends FenixService {

    protected void run(AllocatableSpace fromRoom, AllocatableSpace destinationRoom) {
        AllocatableSpace.mergeAllocatableSpaces(fromRoom, destinationRoom);
    }
    // Service Invokers migrated from Berserk

    private static final MergeRooms serviceInstance = new MergeRooms();

    @Service
    public static void runMergeRooms(AllocatableSpace fromRoom, AllocatableSpace destinationRoom) throws NotAuthorizedException {
        SpaceAdministratorAuthorizationFilter.instance.execute(fromRoom, destinationRoom);
        serviceInstance.run(fromRoom, destinationRoom);
    }

}