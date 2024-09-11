import statsapi
import json
import requests
import os

from time import sleep
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
HA_TOKEN = os.getenv('HA_TOKEN')
PHILLIES_ID = 143
IN_COMMERCIAL = False

def get_current_game_id(team_id, date):
    # This won't work with double headers
    today_games = statsapi.schedule(date=date, team=team_id)
    current_game_id = today_games[0]['game_id']

    return current_game_id


def get_important_game_data(game_id):
    game_data = statsapi.get('game', {'gamePk':game_id})

    with open("bruh.json", "w") as f:
        f.write(json.dumps(game_data))

    state = game_data['liveData']['linescore']['inningState']
    current_play = None

    if 'event' in game_data['liveData']['plays']['currentPlay']['result']:
        current_play = game_data['liveData']['plays']['currentPlay']['result']['event']

    return {
        'state': state,
        'current_play': current_play
    }


def get_muter_state():
    url = "http://192.168.0.123:8123/api/states/input_boolean.phillies_commercial_muter"

    headers = {
      'Authorization': 'Bearer ' + HA_TOKEN,
    }

    response = requests.request("GET", url, headers=headers)
    return False if response.json()['state'] == 'off' else True


def get_delay():
    url = "http://192.168.0.123:8123/api/states/input_number.phillies_stream_delay"

    headers = {
      'Authorization': 'Bearer ' + HA_TOKEN,
    }

    response = requests.request("GET", url, headers=headers)
    return float(response.json()['state'])


while True:
    curr_date = datetime.today().strftime('%Y-%m-%d')
    game_id = get_current_game_id(PHILLIES_ID, curr_date)
    data = get_important_game_data(game_id)

    print(data)

    if data['state'] in ['Middle', 'End'] or data['current_play'] == 'Pitching Substitution':
        IN_COMMERCIAL = True
        muter_state = get_muter_state()
        delay = get_delay()

        if muter_state:
            sleep(delay)
            print('Now I would mute the TV')

    else:
        IN_COMMERCIAL = False

    sleep(5)
