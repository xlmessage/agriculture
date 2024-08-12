export function queryGeojson(adcode, isFull = true) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode + (isFull ? '_full' : '')}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                resolve(data);
            })
            .catch(async (err) => {
                if (isFull) {
                    let res = await queryGeojson(adcode, false);
                    resolve(res);
                } else {
                    reject();
                }
            });
    });
}