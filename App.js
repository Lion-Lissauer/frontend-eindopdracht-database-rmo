import React, { useState, useEffect } from 'react';
import { OaiPmh } from 'oai-pmh'
import Rmo from './components/rmo/Rmo';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PageHeader from "./components/PageHeader";
import logo from '../assets/Temple-Pyramid.svg';


function App() {
    const [rmo, setRmo] = useState([]);
    const [endpoint, setEndpoint] = useState('http://api.rmo.nl:17521/oai?');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            setError(false);

            try {
                const {data} = await axios.get(endpoint);
                setRmo(data);
            } catch(e) {
                console.error(e);
                setError(true);
            }

            toggleLoading(false);
        }

        fetchData();
    }, [endpoint]);

    return (
        <div className="rmo-results">
            <PageHeader icon={logo} title="RIJKSMUSEUM VAN OUDHEDEN" />
            <p>Database</p>

            {rmo &&
            <>
                <img alt="logo" width="400px" src={logo} />
                {/*<section className="button-bar">*/}
                {/*    <Button*/}
                {/*        disabled={!rmo.previous}*/}
                {/*        clickHandler={() => setEndpoint(rmo.previous)}*/}
                {/*    >*/}
                {/*        Vorige*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        disabled={!rmo.next}*/}
                {/*        clickHandler={() => setEndpoint(rmo.next)}*/}
                {/*    >*/}
                {/*        Volgende*/}
                {/*    </Button>*/}
                </section>

                {rmo.results && rmo.results.map((completeListSize) => {
                    return <Rmo key={completeListSize.name} endpoint={completeListSize.url} />
                })}
            </>
            }
            {loading && <p>Loading...</p>}
            {error && <p>Oeps! Geen resultaten...</p>}
        </div>
    );
}

export default App;