
#--Add begin_date and end_date to the table EXECUTION_PERIOD
ALTER TABLE `EXECUTION_PERIOD` ADD `BEGIN_DATE` DATE NOT NULL AFTER `SEMESTER`;
ALTER TABLE `EXECUTION_PERIOD` ADD `END_DATE` DATE NOT NULL AFTER `BEGIN_DATE`;
