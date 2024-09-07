import cheerio from 'cheerio';

export const printDoc = (docUrl: string) => {
    fetch(docUrl).then((r) => r.text()).then((r) => {
        const $ = cheerio.load(r);

        const rows = $('table > tbody > tr')

        let xMax = 0;
        let yMax = 0;

        const mapping = Array.from(rows).map((row, ix) => {

            const xCoord = parseInt($(`tr:nth-child(${ix + 1}) td:nth-child(1)`).text());
            const char = $(`tr:nth-child(${ix + 1}) td:nth-child(2)`).text();
            const yCoord = parseInt($(`tr:nth-child(${ix + 1}) td:nth-child(3)`).text());

            if (xCoord > xMax) xMax = xCoord;
            if (yCoord > yMax) yMax = yCoord;

            return {
                xCoord,
                char,
                yCoord
            }
        }).slice(1, rows.length).reduce<{[key: number]: any}>((prev, curr) => ({
            ...prev,
            [curr.yCoord]: { 
                ...prev[curr.yCoord], 
                [curr.xCoord]: curr.char 
            }
        }), {})

        for (var y = 0; y <= yMax; y++) {
            for (var x = 0; x <= xMax; x++) {
                if (mapping[y][x])
                    process.stdout.write(mapping[y][x])
                else
                    process.stdout.write(' ')
            }
            process.stdout.write('\n')
        }

    })

}
