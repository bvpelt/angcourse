# Step 07

To use PDOK location server there are two services
- suggest, to search for possible matches
- lookup, to find details based on a pdok-id

## Example suggest query

query: https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=%22Spanjaardsgoed%20Veenendaal%22

This query gives:
- possible matches
- the number of matches found
- the id of a match which can be used in the lookup service
- an highlighted suggestion string in html

response:
```json
{
    response: {
    numFound: 1,
    start: 0,
    maxScore: 21.784004,
    docs: [
            {
    type: "weg",
    weergavenaam: "Spanjaardsgoed, Veenendaal",
    id: "weg-e171a7a221cc1c505ca5491ffcb69bae",
    score: 21.784004
            }
        ]
    },
    highlighting: {
    weg-e171a7a221cc1c505ca5491ffcb69bae: {
    suggest: [
                "<b>Spanjaardsgoed</b>, <b>Veenendaal</b>"
            ]
        }
    },
    spellcheck: {
    suggestions: [
            "spanjaardsgoed",
            {
    numFound: 2,
    startOffset: 1,
    endOffset: 15,
    suggestion: [
                    "spanjaardsgoe",
                    "spanjaardsgo"
                ]
            },
            "veenendaal",
            {
    numFound: 4,
    startOffset: 16,
    endOffset: 26,
    suggestion: [
                    "veenendaalk",
                    "veenendaals",
                    "veenendaa",
                    "voerendaal"
                ]
            }
        ],
    collations: [
            "collation",
            {
    collationQuery: ""spanjaardsgoe veenendaal"",
    hits: 1,
    misspellingsAndCorrections: [
                    "spanjaardsgoed",
                    "spanjaardsgoe",
                    "veenendaal",
                    "veenendaal"
                ]
            },
            "collation",
            {
    collationQuery: ""spanjaardsgo veenendaal"",
    hits: 1,
    misspellingsAndCorrections: [
                    "spanjaardsgoed",
                    "spanjaardsgo",
                    "veenendaal",
                    "veenendaal"
                ]
            }
        ]
    }
}
```

## Example lookup query

query: https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=weg-e171a7a221cc1c505ca5491ffcb69bae

This query gives:
- the requested object
- the type of object
- the location of the centerpoint of the object

response:
```json
{
    response: {
    numFound: 1,
    start: 0,
    maxScore: 15.732299,
    docs: [
            {
    bron: "BAG/NWB",
    woonplaatscode: "2048",
    type: "weg",
    woonplaatsnaam: "Veenendaal",
    openbareruimtetype: "Weg",
    gemeentecode: "0345",
    rdf_seealso: "http://bag.basisregistraties.overheid.nl/bag/id/openbare-ruimte/0345300001989453",
    weergavenaam: "Spanjaardsgoed, Veenendaal",
    straatnaam_verkort: "Spanjaardsgoed",
    id: "weg-e171a7a221cc1c505ca5491ffcb69bae",
    gemeentenaam: "Veenendaal",
    identificatie: "0345300001989453",
    openbareruimte_id: "0345300001989453",
    provinciecode: "PV26",
    provincienaam: "Utrecht",
    centroide_ll: "POINT(5.55440779 52.01946272)",
    provincieafkorting: "UT",
    centroide_rd: "POINT(166477.295 447914.31)",
    straatnaam: "Spanjaardsgoed"
            }
        ]
    }
}
```