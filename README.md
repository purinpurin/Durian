<p align="center">
  <img src="./app/images/icon_128.png" alt="Cute little Durian icon"/>
</p>
<h1 align="center">
  Durian
</h1>
<p align="center">
  <a href="https://travis-ci.org/purinpurin/Durian">
    <img src="https://img.shields.io/travis/purinpurin/Durian?style=for-the-badge" alt="Current Travis CI build status." />
  </a>
  <a href="https://github.com/purinpurin/Durian/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="Durian is released under the MIT license." />
  </a>  
  <a href="https://github.com/webpack/webpack">
    <img src="https://img.shields.io/badge/webpack-4.x-orange.svg?style=for-the-badge" alt="Durian use webpack." />
  </a>
</p>

**Durian** detects Zawgyi texts in a webpage and convert them into Unicode compatible texts so that users who do not have Zawgyi or ZawDecode fonts can read texts written with Zawgyi.


## Installation
  ### Extensions
  1. Install the extension.
      - Firefox: https://addons.mozilla.org/en-US/firefox/addon/durian-for-firefox/
      - Chrome:  https://chrome.google.com/webstore/detail/locbimfkfnbpfidkogkbfjhjlnfckmnl
  2. And... Done!

  ### Userscript
  1. Install a userscript manager. I recommend [Violentmonkey](https://violentmonkey.github.io/).

  
  2. Install `Durian`
	You can install this script via `GitHub`:
      - GitHub: https://raw.githubusercontent.com/purinpurin/Durian/master/userscript/release/durian.user.js
      - Greasy Fork: https://greasyfork.org/en/scripts/402235-durian-detect-zawgyi-and-convert-it-to-unicode

## Known bug

Please report any bugs you found [here](https://github.com/purinpurin/Durian/issues).

## Changelog
### 1.0.0
- Fix converted texts are unreadable when the page is already using Zawgyi webfont.
### 0.1.1
- Add icon.
### 0.1.0 
- Initial release.

## Credits
Durian uses [Myanmar Tools](https://github.com/google/myanmar-tools) to detect Zawgyi and for converion.
Project structure is based on [Userscript +](https://github.com/jae-jae/Userscript-Plus). 