import statsapi
import json
import requests
import os

from time import sleep
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
HA_TOKEN = os.getenv('HA_TOKEN')
# 143
PHILLIES_ID = 143
COMMERCIAL_DATA = {
    "in_commercial": False,
    "reason": None
}

def get_current_game_id(team_id, date):
    # This won't work with double headers
    today_games = statsapi.schedule(date=date, team=team_id)
    current_game_id = today_games[0]['game_id']

    return current_game_id


def get_important_game_data(game_id):
    game_data = statsapi.get('game', {'gamePk':game_id})

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


def mute_unmute_tv(should_mute):
    url = "http://192.168.0.123:8123/api/services/media_player/volume_mute"

    payload = json.dumps({
      "entity_id": "media_player.den_tv",
      "is_volume_muted": should_mute
    })
    headers = {
      'Authorization': 'Bearer ' + HA_TOKEN,
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)


while True:
    # Only do any of this if the muter is even active
    muter_state = get_muter_state()
    if muter_state:
        curr_date = datetime.today().strftime('%Y-%m-%d')
        game_id = get_current_game_id(PHILLIES_ID, curr_date)
        data = get_important_game_data(game_id)
    
        print(data)

        if data['state'] in ['Middle', 'End']:
            # If the state changes to middle or end and we aren't already in commercial, always perform the mute
            if not COMMERCIAL_DATA['in_commercial']:
                delay = get_delay()
                sleep(delay)

                print('Now I would mute the TV')
                mute_unmute_tv(True)

                COMMERCIAL_DATA['in_commercial'] = True
                COMMERCIAL_DATA['reason'] = 'inning'

        elif data['current_play'] == 'Pitching Substitution':
            # If we aren't in commercial and the play changes to pitching substitution, perform the mute
            if not COMMERCIAL_DATA['in_commercial']:
                delay = get_delay()
                sleep(delay)

                print('Now I would mute the TV')
                mute_unmute_tv(True)

                COMMERCIAL_DATA['in_commercial'] = True
                COMMERCIAL_DATA['reason'] = 'substitution'

            # HOWEVER, if we change to pitching substitution and we are ALREADY IN COMMERCIAL BECAUSE OF INNING STATE,
            # that means that we came back from commercial directly to a pitching change. We want to unmute.
            elif COMMERCIAL_DATA['reason'] != 'substitution':
                delay = get_delay()
                sleep(delay)

                print('Now I would unmute the TV')
                mute_unmute_tv(False)

                COMMERCIAL_DATA['in_commercial'] = False
                COMMERCIAL_DATA['reason'] = None

        else:
            # If none of these states are active and we're already in commercial, unmute
            if COMMERCIAL_DATA['in_commercial']:
                delay = get_delay()
                sleep(max(0, delay - 10))

                print('Now I would unmute the TV')
                mute_unmute_tv(False)

                COMMERCIAL_DATA['in_commercial'] = False
                COMMERCIAL_DATA['reason'] = None

    sleep(5)
