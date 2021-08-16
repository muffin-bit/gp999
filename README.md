# gp999
Girls Planet 999

## Setup
### Updating the Data
To pull the latest information from the spreadsheet, follow these steps:

(One time) Retrieve the necessary credentials for accessing the Google Sheets API:
1. Navigate to https://console.cloud.google.com/apis/credentials?project=gp999-323121
2. Click the "Download Oauth client" button (far right) for the "CLI" client.
3. Move the downloaded file into this repository to the location private/credentials.json

(One time) Then run the following commands:
```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```
Finally you can run the script to pull the data
```
python bin/pull_spreadsheet.py
```