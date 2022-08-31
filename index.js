const inquirer = require('inquirer');
const fs = require('fs');

const red = () => console.log('\x1B[31m');
const green = () => console.log('\033[32m');

const reset =  () => console.log('\033[0m');
const clear = () => console.log('\033c');

const licenses = [
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
clear()
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your github project?',
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your github username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What email should we use to contact you?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description of your project',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter instructions needed to install your applicatiopn',
    },
    {
        type: 'input',
        name: 'use',
        message: 'Please describe what your application is to be used for',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license is your project available under? (A link to this license will be added to your README)',
        choices: licenses,
        default: "MIT",
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please enter guidlines for contributing to your project',
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Please enter guidlines for test to your project',
    },
  ])
  .then((response) => {
      console.log("EXECUTING...")
      if(fs.existsSync(`${__dirname}\\Generated_README.md`)){
        red();
      try {
        fs.unlinkSync(`${__dirname}\\Generated_README.md`)
        console.log("Old README has been Deleted")
      } catch(err){
            console.error(err)
      }
    }
      const readME = `# ${response.title}
[![License](https://img.shields.io/badge/License-${response.license.replace(/\s/g,'%20')}-green.svg)](./LICENSE)
#### Table of Contents
- [All=Pro-README-Generator](#all-pro-readme-generator)
- [Table of Contents:](#table-of-contents-)
  * [Description](#description)
  * [Installation](#installation) 
  * [Use](#use)
  * [License](#license)
  * [Contribution](#contribution)
  * [Testing](#testing)

## Description
${response.description}
## Installation
${response.installation}
## Use
${response.use}
## License
${response.license}
## Contribution
${response.contribution}
## Testing
${response.testing}
## Questions
This project is managed by ${response.username}
You can find me on github at https://github.com/${response.github}
Additional Questions you can email me at ${response.email}
### License
The software is available to all under the ${response.license}. You can learn more about this license at ${ licenseInfo[ licenses.indexOf(response.license) ] }`

      fs.writeFile(`${__dirname}\\Generated_README.md`, readME,  function (err) {
            if (err) throw err;
            green();
            console.log(`The file has been saved. Path is ${__dirname}\\Generated_README.md`);
            require('child_process').exec(`start "" "${__dirname}"`);
            reset()
        });
     } );

