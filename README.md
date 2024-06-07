# Vyaas

Vyaas is a [brief description of your project]. This project is designed to [purpose and functionality]. This README will guide you through the setup and usage of the project.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/vyaas.git
    cd vyaas
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

Create a `config.env` file in the root directory of the project and add the following environment variables:

```env
NODE_ENV=development
MONGO_URL_local='mongodb://0.0.0.0:27017/vyaas'
MONGO_URL=<Your mongodb atlas url>
API_KEY=<API KEY of alpha vantage>
PORT=5000
JWT_SECRET=navin
PASS_SEC=navin
JWT_SEC=navin
UPDATE_KEY=RAIT
API_KEY_2=<API KEY of alpha vantage>
API_KEY_3=<API KEY of alpha vantage>
NEWS_API_KEY=<API KEY of alpha vantage>
