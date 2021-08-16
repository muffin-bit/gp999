# gp999
Girls Planet 999

## Setup
### Updating the Data
To pull the latest information from the spreadseheet, running the following:
```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python pull_spreadsheet.py
```
Then follow these steps to get the right credentials to pull the data:
1. Navigate to https://console.cloud.google.com/apis/credentials?project=gp999-323121
2. Click the "Download Oauth client" button (far right) for the "CLI" client.
3. Move the downloaded file into this repository to the location private/credentials.json
