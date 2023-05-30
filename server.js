import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search', (req, res) => {
    // check.query('q')
    let q = req?.query?.q ? req.query.q : res.send(" Please provide a query parameter.");
    const data = {
        queryText: `${q}`,
        entityParameters: [
            {
                name: "msdyn_workorder"
            }
        ]
    };
    let token = `Bearer ${process.env.DV_API_TOKEN}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'aurorabapenvc1989.crm10.dynamics.com',
            'User-Agent': 'PostmanRuntime/7.26.8',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Authorization': token
        },
        body: JSON.stringify(data),
    };
    fetch('https://aurorabapenvc1989.crm10.dynamics.com/api/copilot/v1.0/QueryStructuredData', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        })
        .then(response => {
            res.send(response?.queryResult?.summary);
        })
        .catch(e => {
            console.log(e);
        });
});
app.listen(800, () => {
    console.log('Knowledge Search App listening on port 8000!')
});

//https://stackoverflow.com/questions/51924864/express-validator-how-to-check-queries