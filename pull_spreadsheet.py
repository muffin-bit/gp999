from __future__ import print_function

import os.path
import re
import requests
import urllib.parse
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SPREADSHEET_ID = '1LaF_HQJXQeDqLCt4R38Q_ATMFekLRhob-IBLu6eXDdw'
FILE_PATH = 'data/muffin-bit.github.io_gp999 - Profile Info.csv'

def get_credentials():
    if os.path.exists('private/token.json'):
        return Credentials.from_authorized_user_file('private/token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    creds = None
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'private/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('private/token.json', 'w') as token:
            token.write(creds.to_json())
    return creds


def main():
    url = 'https://docs.google.com/spreadsheets/d/{}/export'.format(SPREADSHEET_ID)
    urlParts = urllib.parse.urlparse(url)
    creds = get_credentials()
    params = {
        'id': SPREADSHEET_ID,
        'format': 'csv',
        'gid': 0,
    }
    queryParams = urllib.parse.urlencode(params)
    urlParts = urlParts._replace(query=queryParams)
    url = urllib.parse.urlunparse(urlParts)
    response = requests.get(url, headers={'Authorization': 'Bearer ' + creds.token})
    with open(FILE_PATH, 'wb') as csvFile:
        csvFile.write(response.content)

if __name__ == '__main__':
    main()