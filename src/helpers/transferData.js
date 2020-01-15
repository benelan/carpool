const axios = require('axios');

const proxyUrl = 'http://belan2.esri.com/DotNet/proxy.ashx?';

//------------------------------------------ POINT ------------------------------------------\\
const serviceUrl = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/0/query?';

let url = proxyUrl + serviceUrl;

// query options
const data = {
    "f": "json",
    'where': "1=1",
    'outFields': "*",
    'returnGeometry': true
};

// magic to make the object a query string
const query = Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

url += query;

axios.get(url)
    .then(res => {
        res.data.features.forEach((pointF) => {
            //------------------------------------------ Line ------------------------------------------\\
            const serviceUrl2 = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/query?';
            let url2 = proxyUrl + serviceUrl2; // use proxy to authenticate for request

            // query options
            const data2 = {
                "f": "json",
                'where': "email='" + pointF.attributes.email + "'",
                'outFields': "*",
                'returnGeometry': true
            };

            // magic to make the object a query string
            const query2 = Object.keys(data2)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data2[k]))
                .join('&');

            url2 += query2;

            axios.get(url2)
                .then(res => {
                    const lineId = res.data.features[0].attributes.OBJECTID;
                    //--------------------- TRRANSFER ---------------------\\
                    // request body
                    const data3 = [{
                        'attributes': {
                            'OBJECTID': lineId,
                            'name': pointF.attributes.name,
                            'arrive_work': pointF.attributes.arrive_work,
                            'leave_work': pointF.attributes.leave_work,
                            'driver': pointF.attributes.driver,
                            'office_id': pointF.attributes.office_id,
                            'start_addr': encodeURIComponent(pointF.attributes.start_addr),
                            'success': pointF.attributes.success
                        }
                    }];

                    const serviceUrl3 = 'https://services.arcgis.com/Wl7Y1m92PbjtJs5n/arcgis/rest/services/carpoolData/FeatureServer/1/updateFeatures?f=json&features=';

                    let url3 = proxyUrl + serviceUrl3;


                    url3 += JSON.stringify(data3)

                    axios
                        .post(url3, JSON.stringify(data3))
                        .then(() => {
                            console.log('completed', lineId)
                        })
                        .catch((err) => {
                            console.log("transfer error:", err)
                        });
                })
                .catch(err => {
                    console.log("line error", err)
                });
        })
    })
    .catch(err => {
        console.log("point error:", err)
    });
