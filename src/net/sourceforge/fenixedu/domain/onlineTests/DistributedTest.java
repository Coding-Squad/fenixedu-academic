/*
 * Created on 19/Ago/2003
 */

package net.sourceforge.fenixedu.domain.onlineTests;

import java.util.Calendar;
import java.util.Date;

import net.sourceforge.fenixedu.util.tests.CorrectionAvailability;
import net.sourceforge.fenixedu.util.tests.TestType;

/**
 * @author Susana Fernandes
 */
public class DistributedTest extends DistributedTest_Base {

    private TestType testType;

    private CorrectionAvailability correctionAvailability;

    public Calendar getBeginDate() {
        if (getBeginDateDate() != null) {
            final Calendar calendar = Calendar.getInstance();
            calendar.setTime(getBeginDateDate());
            return calendar;
        }

        return null;
    }

    public void setBeginDate(Calendar beginDate) {
        final Date date = (beginDate != null) ? beginDate.getTime() : null;
        setBeginDateDate(date);
    }

    public Calendar getBeginHour() {
        if (getBeginHourDate() != null) {
            final Calendar calendar = Calendar.getInstance();
            calendar.setTime(getBeginHourDate());
            return calendar;
        }

        return null;
    }

    public void setBeginHour(Calendar beginHour) {
        final Date date = (beginHour != null) ? beginHour.getTime() : null;
        setBeginHourDate(date);
    }

    public CorrectionAvailability getCorrectionAvailability() {
        return correctionAvailability;
    }

    public void setCorrectionAvailability(CorrectionAvailability correctionAvailability) {
        this.correctionAvailability = correctionAvailability;
    }

    public Calendar getEndDate() {
        if (getEndDateDate() != null) {
            final Calendar calendar = Calendar.getInstance();
            calendar.setTime(getEndDateDate());
            return calendar;
        }

        return null;
    }

    public void setEndDate(Calendar endDate) {
        final Date date = (endDate != null) ? endDate.getTime() : null;
        setEndDateDate(date);
    }

    public Calendar getEndHour() {
        if (getEndHour() != null) {
            final Calendar calendar = Calendar.getInstance();
            calendar.setTime(getEndHourDate());
            return calendar;
        }

        return null;
    }

    public void setEndHour(Calendar endHour) {
        final Date date = (endHour != null) ? endHour.getTime() : null;
        setEndHourDate(date);
    }

    public TestType getTestType() {
        return testType;
    }

    public void setTestType(TestType testType) {
        this.testType = testType;
    }

}
