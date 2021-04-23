# Synthetic Testing of Device Capabilities for Certification

### Project setup

1. Clone this repository running the following command:

       git clone https://github.com/erickvneri/synthetic-testing-for-device-certification.git

2. To install the dependencies, follow the next sequence:

       cd synthetic-testing-for-device-certification/
       yarn install

### Environment Configuration

1. Create a [Personal Access Token](https://account.smartthings.com/tokens) and whitelist **Devices** and **Locations** permission scopes.

2. Create a `.env` file at the root folder of the project and paste the _personal access token_ as following:

       touch .env
       echo "PAT=<personal-access-token>" > .env

### Deploy App

1. By running the following command, the app will be automatically deployed at your default browser:

       yarn start




