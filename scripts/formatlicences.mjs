import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import sanitize from 'sanitize-html';

const readStdin = async () => {
    const result = [];
    for await (const chunk of process.stdin) {
        result.push(chunk);
    }
    return Buffer.concat(result);
};

const extractLicenceMarkdown = markdown => {
    // Some packages have the licence text as part of the README - extract those
    const lines = markdown.split('\n');
    const licenceLines = [];
    let inLicence = false;
    let prevLine = undefined;
    for (const line of lines) {
        if (inLicence) {
            licenceLines.push(line);
        } else if (/^#+\s*(Licence|License)/i.test(line)) {
            inLicence = true;
        } else if (/^-+$/.test(line) && /^(Licence|License)$/i.test(prevLine)) {
            inLicence = true;
        }
        prevLine = line;
    }

    if (licenceLines.length > 0) {
        return licenceLines.join('\n');
    } else {
        return markdown;
    }
};

const getLicenceTextHTML = licenceFilePath => {
    if (licenceFilePath.toLowerCase().endsWith('.md')) {
        const markdown = fs.readFileSync(licenceFilePath, { encoding: 'utf8' });
        const licenceMarkdown = extractLicenceMarkdown(markdown);
        const licenceHTML = sanitize(marked.parse(licenceMarkdown));
        return `<div>${licenceHTML}</div>`;
    } else {
        const licenceHTML = _.escape(
            fs.readFileSync(licenceFilePath, { encoding: 'utf8' })
        );
        return `<div class="plainTextLicence">${licenceHTML}</div>`;
    }
};

const getPackageAnchorName = _.memoize(_packageID => _.uniqueId('p'));

const getPackageHTML = ({ packageID, licenseFile, url, repository }) => {
    const licenceTextHTML =
        licenseFile === undefined ? '' : getLicenceTextHTML(licenseFile);
    const anchorName = getPackageAnchorName(packageID);
    const urlOrRepo = repository ?? url;
    const heading =
        urlOrRepo === undefined
            ? `<h2>${_.escape(packageID)}</h2>`
            : `<h2><a href="${urlOrRepo}" target="_blank">${_.escape(
                  packageID
              )}</a></h2>`;
    return `\
        <a name="${anchorName}">${heading}</a>
        ${licenceTextHTML}
`;
};

const getPackageListEntryHTML = ({ packageID }) =>
    `        <li><a href="#${getPackageAnchorName(packageID)}">${_.escape(
        packageID
    )}</a>`;

const filterPackages = packages => {
    const sortedKeys = Object.keys(packages).sort((a, b) => {
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();
        if (lowerA < lowerB) {
            return -1;
        } else if (lowerA > lowerB) {
            return 1;
        } else {
            return 0;
        }
    });
    const filteredPackages = [];
    for (const packageID of sortedKeys) {
        if (!packageID.startsWith('notesalad-editor@')) {
            filteredPackages.push({ ...packages[packageID], packageID });
        }
    }
    return filteredPackages;
};

const readExtraPackages = filePath => {
    const fileDir = path.dirname(fs.realpathSync(filePath));
    const packages = JSON.parse(
        fs.readFileSync(filePath, { encoding: 'utf8' })
    );
    for (const packageInfo of Object.values(packages)) {
        packageInfo.licenseFile = path.join(fileDir, packageInfo.licenseFile);
    }

    return packages;
};

marked.use({
    walkTokens: token => {
        if (token.type === 'heading') {
            token.depth += 2;
        }
    },
});

const extraPackageFilePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../resources/licences/non-npm-licences.json'
);
const packages = filterPackages({
    ...JSON.parse((await readStdin()).toString('utf-8')),
    ...readExtraPackages(extraPackageFilePath),
});
const packageListHTML = packages.map(getPackageListEntryHTML).join('\n');
const licencesHTML = packages.map(getPackageHTML).join('\n');

const docHTML = `<!DOCTYPE html>
<html>
    <head>
        <title>Third-Party Licences</title>
    </head>
    <body>
    <style>
        body {
            font-family: sans-serif;
        }
        .plainTextLicence {
            font-family: monospace;
            white-space: pre-wrap;
        }
    </style>
    <h1>Third-Party Licences</h1>
    <p>This project incorporates code from a number of third-party software packages. The licences for those packages are reproduced below.</p>
    <ul>
${packageListHTML}
    </ul>
    <hr>
${licencesHTML}
    </body>
</html>`;

console.log(docHTML);
