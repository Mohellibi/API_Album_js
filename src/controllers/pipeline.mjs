import axios from 'axios';

class Pipeline {
    constructor(app) {
        this.app = app;
        this.run();
    }

    run() {
        this.getData();
    }

    getData() {
        this.app.get('/pipeline', async (req, res) => {
            try {
                const headers = {
                    'X-Api-Key': 'da8d1f8a1b224f6c92acecea34405e94'
                };
                const Userrandom = await axios.get('https://randomuser.me/api', { headers });
                const phonerandom = await axios.get('https://randommer.io/Phone/Generate?CountryCode=FR&Quantity=1', { headers });
                const ibanrandom = await axios.get('https://randommer.io/api/Finance/Iban/fr', { headers });
                const carterandom = await axios.get('https://randommer.io/api/Card?type=visa', { headers });
                const namerandom = await axios.get('https://randommer.io/api/Name?nameType=firstname&quantity=1', { headers });
                //const animalrandom = await axios.get('https://randommer.io/animal?count=1', { headers });

                res.status(200).json({
                    user: Userrandom.data,
                    phone: phonerandom.data,
                    iban: ibanrandom.data,
                    card: carterandom.data,
                    name: namerandom.data,
                    //animal: animalrandom.data
                });
            } catch (err) {
                console.error('[error] PIPELINE', err);
                res.status(400).json({
                    code: 400,
                    message: 'error',
                });
            }
        });
    }
}

export default Pipeline;