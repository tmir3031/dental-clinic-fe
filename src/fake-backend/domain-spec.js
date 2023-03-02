/**
 * @typedef EmployeeBE
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {'EMPLOYEE'|'HR'|'TEAMLEAD'} role
 * @property {string} contractStartDate
 * @property {string} teamName
 * @property {number} initialOffDays
 * @property {number} currentOffDays
 */

/**
 * @typedef RequestBE
 * @property {string} employeeId
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} createDate
 * @property {string} editDate
 * @property {string} mentions
 * @property {'PENDING'|'APPROVED'|'REJECTED'} status
 * @property {string} refusalReason
 */


/**
 * @typedef TeamBE
 * @property {string} teamId
 * @property {string} teamName
 * @property {string} teamleadId
 */


/**
 * @typedef DataBE
 * @property {Array<TeamBE>} teams
 * @property {Array<EmployeeBE>} employees
 * @property {Array<RequestBE>} requests
 */