const inquirer = require('inquirer');
const fs = require('fs');

// Terminal control
const RST =  () => console.log('\033[0m'); // Reset text colors to default
const CLS = () => console.log('\033c'); // Clears terminal and resets cursor position to (0,0)
// ---------------------------------  Colors  ----------------------------------- //
// Foreground
const FRED = () => console.log('\x1B[31m');
const FGRN = () => console.log('\033[32m');
const FCYN = () => console.log('\033[36m');

// Simply a list of a bunch of licenses you can automatically apply to your repo.
const licenseArray = [
    "Academic Free License v3.0",
    "Apache License 2.0",
    "Artistic License 2.0",
    "Boost Software License 1.0",
    "BSD 2-clause \"Simplified\" license",
    "BSD 3-clause \"New\" or \"Revised\" license",
    "BSD 3-clause Clear license",
    "Creative Commons Zero v1.0 Universal",
    "Creative Commons Attribution 4.0",
    "Creative Commons Attribution Share Alike 4.0",
    "Do What The F*ck You Want To Public License",
    "Educational Community License v2.0",
    "Eclipse Public License 1.0",
    "Eclipse Public License 2.0",
    "European Union Public License 1.1",
    "GNU Affero General Public License v3.0",
    "GNU General Public License v2.0",
    "GNU General Public License v3.0",
    "GNU Lesser General Public License v2.1",
    "GNU Lesser General Public License v3.0",
    "ISC license",
    "LaTeX Project Public License v1.3c",
    "Microsoft Public License",
    "MIT license",
    "Mozilla Public License 2.0",
    "Open Software License 3.0",
    "PostgreSQL License",
    "SIL Open Font License 1.1",
    "University of Illinois/NCSA Open Source License",
    "The Unlicense",
    "zLib License"
];
// This list of links directly corresponds to the previous list. When a user adds a license, one of these links, which lead to that license, will be added to the readme.
const licenseInfo = [
    "https://opensource.org/licenses/AFL-3.0",
    "https://www.apache.org/licenses/LICENSE-2.0",
    "https://opensource.org/licenses/Artistic-2.0",
    "https://www.boost.org/LICENSE_1_0.txt",
    "https://opensource.org/licenses/BSD-2-Clause",
    "https://choosealicense.com/licenses/bsd-3-clause/",
    "https://spdx.org/licenses/BSD-3-Clause-Clear.html",
    "https://choosealicense.com/licenses/cc0-1.0/",
    "https://creativecommons.org/licenses/by/4.0/",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "http://www.wtfpl.net/about/",
    "https://opensource.org/licenses/ECL-2.0",
    "https://www.eclipse.org/legal/epl-v10.html",
    "https://www.eclipse.org/legal/epl-2.0/",
    "https://choosealicense.com/licenses/eupl-1.1/",
    "https://www.gnu.org/licenses/agpl-3.0.en.html",
    "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
    "https://www.gnu.org/licenses/gpl-3.0.en.html",
    "https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html",
    "https://www.gnu.org/licenses/lgpl-3.0.en.html",
    "https://www.isc.org/licenses/",
    "https://spdx.org/licenses/LPPL-1.3c.html",
    "https://opensource.org/licenses/MS-PL",
    "https://opensource.org/licenses/MIT",
    "https://www.mozilla.org/en-US/MPL/2.0/",
    "https://opensource.org/licenses/OSL-3.0",
    "https://opensource.org/licenses/PostgreSQL",
    "https://opensource.org/licenses/OFL-1.1",
    "https://opensource.org/licenses/NCSA",
    "https://unlicense.org/",
    "https://www.zlib.net/zlib_license.html"
];

CLS();
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your GitHub project?',
      name: 'projectTitle',
    },
    {
      type: 'input',
      message: 'What is your GitHub username?',
      name: 'username',
    },
    {
      type: 'input',
      message: 'What email should users use to contact you?',
      name: 'userEmail',
    },
    {
      type: 'input',
      message: 'Please enter a description of your project:',
      name: 'projectDesc',
    },
    {
      type: 'input',
      message: 'Please enter instructions to install your application:',
      name: 'projectInstall',
    },
    {
      type: 'input',
      message: 'Please describe what your application is intended to be used for:',
      name: 'projectUsage',
    },
    {
      type: "list",
      message: "What license is your project available under? (A link to this license will be added to your README)",
      choices: licenseArray,
      default: "Academic Free License v3.0",
      name: "licenseChoice",
    },
    {
        type: 'input',
        message: 'Please enter guidlines for contributing to your project:',
        name: 'projectContributing',
    },
    {
        type: 'input',
        message: 'Please enter guidlines for testing your project:',
        name: 'projectTesting',
    }
    
    ])
    .then((response) => {
      FCYN();
      console.log('Processing. . .');
        // If file already exists, delete it.
        if (fs.existsSync(`${__dirname}\\Generated_README.md`)) {
            FRED();
            try {
                fs.unlinkSync(`${__dirname}\\Generated_README.md`)
                console.log('Deleted old README file')
            } catch(err) {
                console.error(err);
            }
        }
        fs.appendFile(`${__dirname}\\Generated_README.md`, 
        
`# Ultimate-README-Generator
[![License](https://img.shields.io/badge/license-${response.licenseChoice.replace(/\s/g,'%20')}-blue)](./LICENSE)
#### Table of Contents
- [Ultimate-README-Generator](#ultimate-readme-generator)
        - [Table of Contents:](#table-of-contents-)
    * [Description](#description)
    * [Installation Instructions](#installation-instructions)
    * [Usage](#usage)
    * [Guidelines for Testing](#guidelines-for-testing)
    * [Guidlines for Contributing](#guidlines-for-contributing)
    * [License](#license)
## Description
${response.projectDesc}
## Installation Instructions
${response.projectInstall}
## Usage
${response.projectUsage}
## Guidelines for Testing
${response.projectTesting}
## Guidlines for Contributing
${response.projectContributing}
## Questions
This project is managed by ${response.username}
You can find me on GitHub at https://github.com/${response.username}
Additional questions? You can email me at ${response.userEmail}
### License
This software is available under the ${response.licenseChoice}. You can find more info about this particular license at ${ licenseInfo[ licenseArray.indexOf(response.licenseChoice) ] }`,

        function (err) {
            if (err) throw err;
            FGRN();
            console.log(`Saved! Path is ${__dirname}\\Generated_README.md`);
            require('child_process').exec(`start "" "${__dirname}"`);
            RST();
        })
    });