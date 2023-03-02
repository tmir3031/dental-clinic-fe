/**
 * @type {RequestBE}
 */
 const REQUESTS = [
    {
       employeeId: '6',
       startDate: new Date(2022, 07, 04).toISOString().split('T')[0],
       endDate: new Date(2022, 07, 07).toISOString().split('T')[0],
       createDate: new Date(2022, 07, 04).toISOString().split('T')[0],
       editDate: new Date(2022, 07, 04).toISOString().split('T')[0],
       mentions: 'Am nevoie de cererea asta pentru ca trebuei sa merg la nunta',
       status: 'APPROVED'
    },
    {
        employeeId: '6',
        startDate: new Date(2022, 08, 09).toISOString().split('T')[0],
        endDate: new Date(2022, 08, 16).toISOString().split('T')[0],
        createDate: new Date(2022, 08, 01).toISOString().split('T')[0],
        editDate: new Date(2022, 08, 01).toISOString().split('T')[0],
        status: 'PENDING'
     },
     {
        employeeId: '6',
        startDate: new Date(2022, 09, 12).toISOString().split('T')[0],
        endDate: new Date(2022, 09, 15).toISOString().split('T')[0],
        createDate: new Date(2022, 09, 12).toISOString().split('T')[0],
        editDate: new Date(2022, 09, 12).toISOString().split('T')[0],
        status: 'REJECTED',
        refusalReason: 'Alex C. este si el in concediu iar el si-a anuntat primul concediul atunci'
     },
     {
        employeeId: '7',
        startDate: new Date(2022, 08, 12).toISOString().split('T')[0],
        endDate: new Date(2022, 08, 15).toISOString().split('T')[0],
        createDate: new Date(2022, 08, 12).toISOString().split('T')[0],
        editDate: new Date(2022, 08, 12).toISOString().split('T')[0],
        status: 'PENDING',
     },
];

module.exports = REQUESTS;