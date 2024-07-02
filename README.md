# Scraper

> Copy a website's HTML files locally and crawl them looking for a regular expression match.
> 

-----

## Contents

- [Scraper](#scraper)
  - [Contents](#contents)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Usage](#usage)
    - [`scraper copy`](#scraper-copy)
      - [Options](#options)
    - [`scraper crawl`](#scraper-crawl)
      - [Options](#options-1)
    - [`scraper clean`](#scraper-clean)

## Prerequisites

* Node.js version specified in `.nvmrc`
* Working `wget` command

-----

## Dependencies

The only npm package used is `yargs`.

-----

## Installation

```bash
git clone <repo-url>
cd scraper
npm i -g # Installs global `scraper` command
```

-----

## Usage

**Warning:** It's best to use the `scraper` command while in this project's folder. Otherwise, you run the risk of accidentally overwriting a folder of the same name.

### `scraper copy`

Use the `copy` command to copy a website's HTML files locally. Basically a Node.js wrapper for running your systems `wget` command.

By default, the command will clean the `./copy/` folder if present, then copy the website there. The `-u` (or `--url`) option is required and specifies the website to copy.

```bash
scraper copy -u www.example.com
# long form:
scraper copy -url=www.example.com
```

It will only copy HTML files from the website you specify.

It will not traverse any higher than the directory you specify with the `-u` option. For example, `scraper copy -u www.example.com/foo/bar` will copy everything in `/foo/bar/` and it's sub directories, but not go up to `/foo/`.

#### Options

| option | description | type | required | default |
|--------|-------------|------------|------------|-------|
| `-u`, `--url` | the url to fetch with wget | [string] | yes | |
| `-v`, `--verbose` | make wget output verbose (use `-q` to silence output) | [boolean] | no | `false` |
| `-q`, `--quiet` | silence output for wget command | [boolean] | no |  |
| `-o`, `--output` | the folder to copy the website to (and clean if enabled) | [string] | no | `"./copy/"` |
| `-c`, `--clean` | clean the output folder first | [boolean] | no | `true` |
| `-w`, `--wait` | adjust the wait time between requests for wget (used with `--random-wait`) | [number] | no | `1` |

To specify a different folder to clean (and copy), use the `-o` (or `--output`) option.

```bash
scraper copy -u www.example.com -o ./website-copy/
```

***Note:** the `wget` command will overwrite files and folders of the same name.*

To prevent cleaning the output folder, set the `-c` (or `--clean`) option to false.

```bash
scraper copy -u www.example.com -c false
```

Use `-v` (or `--verbose`) to show the verbose output of `wget`. Use `-q` (or `--quiet`) to silence the `wget` output. Defaults to `wget`'s `--no-verbose` output.

The `wget` command uses the `--random-wait` option. The wait time can be adjusted using the `scraper copy` `-w` (or `--wait`) option. Wget will use a random value that is 0.5 to 1.5 times the value you provide. The default is `1` (second).

```bash
# will wait from 2.5 to 7.5 seconds between requests:
scraper copy -u www.example.com -w 5
```

### `scraper crawl`

The `crawl` command is used to scan each HTML file line-by-line looking for a match against a regular expression pattern. The results are logged back to your terminal.

Use `-r` (or `--regex`) to specify the regular expression pattern. It uses Node.js's JavaScript flavored regular expressions.

```bash
scraper crawl -r "https:\/\/www\.example\.com(\/about\/?)?"
# long form:
scraper crawl --regex="https:\/\/www\.example\.com(\/about\/?)?"
```

Remember you must escape backslashes in bash so it's easiest to wrap the regex pattern in quotes.

```bash
scraper crawl -r "https:\/\/www\.example\.com"
# without quotes:
scraper crawl -r https:\\/\\/www\\.example\\.com
```

#### Options

|option | description | type | required | default |
|-------|-------------|------|----------|---------|
| `-r`, `--regex`, `--regexp` | the regex pattern to search against | [string] | yes | |
| `-f`, `--flags` | the regex flags to use | [string] | no | `"g"` |
| `-o`, `--output` | output folder where website was copied to | [string] | no | `"./copy/"` |

Optionally, the regular expression flags can be set using the `-f` (or `--flags`) option. If omitted the `g` flag is used as a default.

```bash
scraper crawl -r "Hello(, World\!)?" -f gi
```

Use the `-o` (or `--output` file) to specify the folder to crawl. Defaults to the `./copy/` folder.

### `scraper clean`

The `clean` command cleans the folder where websites are copied locally (and crawled). The `-o` (or `--output`) option is required to ensure you are deleting the folder you intend.

```bash
scraper clean -o ./copy/
# long form:
scraper clean --output=./copy/
```

-----

