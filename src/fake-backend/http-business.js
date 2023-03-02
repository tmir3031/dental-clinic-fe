const express = require('express');
const DATA = require('./data');
const app = express();
const port = 8080;

app.use(express.json());

const authenticatedUser = DATA.employees[6];

app.get('/core/public/api/requests/review', (req, res) => {
    const startDate = req.query['startDate'];
    const endDate = req.query['endDate'];
    const searchText = req.query['search'];
    const status = req.query['status'];

    const requests = DATA.requests.filter(request => {
        if (startDate && new Date(request.startDate).getTime() < new Date(startDate).getTime()) {
            return false;
        }
        if (endDate && new Date(request.endDate) > new Date(endDate)) {
            return false;
        }
        if (searchText) {
            const employee = DATA.employees.find(empl => empl.id === request.employeeId);
            if (!(employee.firstName.startsWith(searchText) || employee.lastName.startsWith(searchText))) {
                return false;
            }
        }
        if (status && request.status !== status) {
            return false;
        }

        return true;
    })

    console.log(requests);
    res.status(200)
        .contentType('application/json')
        .send(JSON.stringify(requests));
});


app.post('/core/public/api/employees', (req, res) => {
    const reqBody = req.body;

    console.log(req.body);
    if (
        !reqBody.firstName ||
        !reqBody.lastName ||
        !reqBody.teamName ||
        !reqBody.email ||
        !reqBody.initialOffDays ||
        !reqBody.currentOffDays ||
        !reqBody.role ||
        !reqBody.contractStartDate) {
        res.status(400)
            .contentType('application/json')
            .send({
                errors: [
                    {
                        errorCode: 'E0001C400',
                        devMessage: 'Something is not valid in the request',
                    }
                ]
            })
    }
   const newEmpIndex = DATA.employees.push({
        ...reqBody,
        id: `${DATA.employees.length}`
    }) - 1;

    console.error(DATA.employees);

    res.status(200)
        .contentType('application/json').send(DATA.employees[newEmpIndex]);
})

app.listen(port, () => {
    console.log(`Fake backend app listening on port ${port}`)
})