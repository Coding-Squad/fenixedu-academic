package net.sourceforge.fenixedu.applicationTier.Servico.enrollment;

import java.util.List;
import java.util.Map;

import net.sourceforge.fenixedu.applicationTier.FenixService;
import net.sourceforge.fenixedu.applicationTier.IUserView;
import net.sourceforge.fenixedu.applicationTier.Filtro.enrollment.EnrollmentWithoutRulesAuthorizationFilter;
import net.sourceforge.fenixedu.applicationTier.Filtro.enrollment.MasterDegreeEnrollmentWithoutRulesAuthorizationFilter;
import net.sourceforge.fenixedu.applicationTier.Servico.exceptions.FenixServiceException;
import net.sourceforge.fenixedu.applicationTier.Servico.exceptions.NotAuthorizedException;
import net.sourceforge.fenixedu.domain.CurricularCourse;
import net.sourceforge.fenixedu.domain.Enrolment;
import net.sourceforge.fenixedu.domain.EnrolmentInOptionalCurricularCourse;
import net.sourceforge.fenixedu.domain.ExecutionSemester;
import net.sourceforge.fenixedu.domain.StudentCurricularPlan;
import net.sourceforge.fenixedu.domain.curriculum.CurricularCourseEnrollmentType;
import net.sourceforge.fenixedu.domain.curriculum.EnrollmentCondition;
import net.sourceforge.fenixedu.domain.curriculum.EnrollmentState;
import net.sourceforge.fenixedu.domain.degree.DegreeType;
import pt.ist.fenixWebFramework.services.Service;

public class WriteEnrollmentsList extends FenixService {

    protected void run(final StudentCurricularPlan studentCurricularPlan, DegreeType degreeType,
            ExecutionSemester executionSemester, List<String> curricularCourses, Map optionalEnrollments, IUserView userView)
            throws FenixServiceException {

        if (studentCurricularPlan == null) {
            throw new FenixServiceException("error.student.curriculum.noCurricularPlans");
        }

        for (final String enrolmentInfo : curricularCourses) {
            final Integer curricularCourseId = Integer.valueOf(enrolmentInfo.split("-")[0]);
            final CurricularCourse curricularCourse = readCurricularCourse(curricularCourseId);

            final Integer enrollmentclass = Integer.valueOf(optionalEnrollments.get(curricularCourseId.toString()).toString());

            createEnrollment(studentCurricularPlan, curricularCourse, executionSemester,
                    CurricularCourseEnrollmentType.VALIDATED, enrollmentclass, userView);
        }
    }

    private CurricularCourse readCurricularCourse(final Integer curricularCourseId) {
        return (CurricularCourse) rootDomainObject.readDegreeModuleByOID(curricularCourseId);
    }

    protected void createEnrollment(final StudentCurricularPlan studentCurricularPlan, final CurricularCourse curricularCourse,
            final ExecutionSemester executionSemester, final CurricularCourseEnrollmentType enrollmentType,
            final Integer enrollmentClass, final IUserView userView) {

        final Enrolment enrollment =
                studentCurricularPlan.getEnrolmentByCurricularCourseAndExecutionPeriod(curricularCourse, executionSemester);

        if (enrollment == null) {

            if (enrollmentClass == null || enrollmentClass.intValue() == 0 || enrollmentClass.intValue() == 1) {

                new Enrolment(studentCurricularPlan, curricularCourse, executionSemester, getEnrollmentCondition(enrollmentType),
                        userView.getUtilizador());

            } else if (enrollmentClass.intValue() == 2) {

                new EnrolmentInOptionalCurricularCourse(studentCurricularPlan, curricularCourse, executionSemester,
                        getEnrollmentCondition(enrollmentType), userView.getUtilizador());

            } else {
                new Enrolment(studentCurricularPlan, curricularCourse, executionSemester, getEnrollmentCondition(enrollmentType),
                        userView.getUtilizador()).markAsExtraCurricular();
            }

        } else {
            if (enrollment.getEnrolmentCondition() == EnrollmentCondition.INVISIBLE) {
                enrollment.setEnrolmentCondition(getEnrollmentCondition(enrollmentType));
            }
            if (enrollment.isAnnulled()) {
                enrollment.setEnrollmentState(EnrollmentState.ENROLLED);
            }
        }
    }

    protected EnrollmentCondition getEnrollmentCondition(CurricularCourseEnrollmentType enrollmentType) {
        switch (enrollmentType) {
        case TEMPORARY:
            return EnrollmentCondition.TEMPORARY;
        case DEFINITIVE:
            return EnrollmentCondition.FINAL;
        case NOT_ALLOWED:
            return EnrollmentCondition.IMPOSSIBLE;
        case VALIDATED:
            return EnrollmentCondition.VALIDATED;
        default:
            return null;
        }
    }

    // Service Invokers migrated from Berserk

    private static final WriteEnrollmentsList serviceInstance = new WriteEnrollmentsList();

    @Service
    public static void runWriteEnrollmentsList(StudentCurricularPlan studentCurricularPlan, DegreeType degreeType,
            ExecutionSemester executionSemester, List<String> curricularCourses, Map optionalEnrollments, IUserView userView)
            throws FenixServiceException, NotAuthorizedException {
        try {
            EnrollmentWithoutRulesAuthorizationFilter.instance.execute(studentCurricularPlan, degreeType);
            serviceInstance.run(studentCurricularPlan, degreeType, executionSemester, curricularCourses, optionalEnrollments,
                    userView);
        } catch (NotAuthorizedException ex1) {
            try {
                MasterDegreeEnrollmentWithoutRulesAuthorizationFilter.instance.execute(studentCurricularPlan, degreeType);
                serviceInstance.run(studentCurricularPlan, degreeType, executionSemester, curricularCourses, optionalEnrollments,
                        userView);
            } catch (NotAuthorizedException ex2) {
                throw ex2;
            }
        }
    }

}