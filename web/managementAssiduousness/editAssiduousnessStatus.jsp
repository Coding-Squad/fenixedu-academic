<%@ page language="java"%>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<html:xhtml />
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/fenix-renderers.tld" prefix="fr"%>

<em class="invisible"><bean:message key="title.assiduousness" /></em>

<logic:present name="assiduousnessStatus">
	<h2><bean:message key="link.editAssiduousnessStatus" /></h2>
	<bean:define id="employee" name="<%= pt.ist.fenixWebFramework.servlets.filters.SetUserViewFilter.USER_SESSION_ATTRIBUTE %>" property="person.employee" />

	<p>
		<span class="error0">
			<html:messages id="message" message="true">
				<bean:write name="message" />
			</html:messages>
		</span>
	</p>

	<fr:edit id="editAssiduousnessStatus" name="assiduousnessStatus"
		type="net.sourceforge.fenixedu.domain.assiduousness.AssiduousnessStatus"
		schema="assiduousnessStatusSchema"
		action="assiduousnessParametrization.do?method=showAssiduousnessStatus">
		<fr:hidden slot="modifiedBy" name="<%= pt.ist.fenixWebFramework.servlets.filters.SetUserViewFilter.USER_SESSION_ATTRIBUTE %>" property="person.employee" />
		<fr:destination name="invalid" path="/assiduousnessParametrization.do?method=sendErrorToEditAssiduousnessStatus" />
		<fr:layout>
			<fr:property name="classes" value="tstyle5 thlight thright thmiddle"/>
			<fr:property name="columnClasses" value=",,tdclear tderror1"/>
		</fr:layout>
	</fr:edit>
</logic:present>
<logic:notPresent name="assiduousnessStatus">
	<h2><bean:message key="link.createAssiduousnessStatus" /></h2>
	<bean:define id="employee" name="<%= pt.ist.fenixWebFramework.servlets.filters.SetUserViewFilter.USER_SESSION_ATTRIBUTE %>" property="person.employee" />

	<p>
	<span class="error0 mtop0">
		<html:messages id="message" message="true">
			<bean:write name="message" />
		</html:messages>
	</span>
	</p>

	<fr:create id="createAssiduousnessStatus"
		type="net.sourceforge.fenixedu.domain.assiduousness.AssiduousnessStatus"
		schema="assiduousnessStatusSchema"
		action="assiduousnessParametrization.do?method=showAssiduousnessStatus">
		<fr:hidden slot="modifiedBy" name="<%= pt.ist.fenixWebFramework.servlets.filters.SetUserViewFilter.USER_SESSION_ATTRIBUTE %>" property="person.employee" />
		<fr:destination name="invalid" path="/assiduousnessParametrization.do?method=sendErrorToEditAssiduousnessStatus" />
		<fr:layout>
			<fr:property name="classes" value="tstyle5 thlight thright thmiddle"/>
			<fr:property name="columnClasses" value=",,tdclear tderror1"/>
		</fr:layout>
	</fr:create>
</logic:notPresent>
