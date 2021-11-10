import {OaiPmh} from 'oai-pmh2'

async function main () {
    const oaiPmh = new OaiPmh('http://api.rmo.nl:17521/oai')
    const identifierIterator = oaiPmh.listIdentifiers({
        metadataPrefix: 'oai_dc'
    })
    for await (const identifier of identifierIterator) {
        console.log(identifier)
    }
}

main().catch(console.error)
