import statsapi
import json
from datetime import datetime

curr_date = datetime.today().strftime('%Y-%m-%d')
phillies_id = 119

today_games = statsapi.schedule(date=curr_date, team=phillies_id)
# This won't work with double headers
current_game_id = today_games[0]['game_id']

game_data = statsapi.get('game', {'gamePk':current_game_id})
state = game_data['liveData']['linescore']['inningState']
current_play = None
if 'event' in game_data['liveData']['plays']['currentPlay']['result']:
    current_play = game_data['liveData']['plays']['currentPlay']['result']['event']

print(state)
print(current_play)

if state in ['Middle', 'End']:
    print('ok')

with open("bruh.json", "w") as f:
    f.write(json.dumps(game_data))
