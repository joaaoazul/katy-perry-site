import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import lyricsgenius
import json
import random

# 🔹 Configurar credenciais do Spotify
SPOTIPY_CLIENT_ID = "O_TEU_CLIENT_ID"
SPOTIPY_CLIENT_SECRET = "O_TEU_CLIENT_SECRET"

# 🔹 Configurar credenciais do Genius
GENIUS_ACCESS_TOKEN = "O_TEU_ACCESS_TOKEN"

# 🔹 Inicializar APIs
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIPY_CLIENT_ID,
    client_secret=SPOTIPY_CLIENT_SECRET
))

genius = lyricsgenius.Genius(GENIUS_ACCESS_TOKEN)

def get_lyrics(song_title, artist_name):
    """Busca a letra da música no Genius."""
    try:
        song = genius.search_song(song_title, artist_name)
        if song:
            return song.lyrics.split("\n")
    except Exception as e:
        print(f"Erro ao buscar letra para {song_title}: {e}")
    return []

def generate_quiz_questions(tracks):
    """Gera 20 perguntas criativas com base nas músicas e letras."""
    quiz_questions = []
    
    for track in tracks:
        song_title = track["title"]
        album = track["album"]
        artist = track["artist"]
        lyrics = track["lyrics"]

        # 🔹 Pergunta sobre o álbum
        quiz_questions.append({
            "question": f"Qual álbum tem a música '{song_title}'?",
            "options": random.sample([album, "Teenage Dream", "Witness", "Smile"], 4),
            "answer": album
        })

        # 🔹 Pergunta sobre a letra (se existir)
        if len(lyrics) > 2:
            chosen_line = random.choice(lyrics).strip()
            if len(chosen_line) > 5 and "[" not in chosen_line:  # Evita seções como [Chorus]
                words = chosen_line.split()
                if len(words) > 2:
                    missing_word = words[-1]
                    question_text = f"Complete a frase: '{' '.join(words[:-1])} ...'"
                    wrong_answers = random.sample(["love", "dream", "fire", "star"], 3)
                    options = wrong_answers + [missing_word]
                    random.shuffle(options)

                    quiz_questions.append({
                        "question": question_text,
                        "options": options,
                        "answer": missing_word
                    })

        # 🔹 Pergunta sobre título da música
        quiz_questions.append({
            "question": f"Qual dessas músicas foi lançada por {artist}?",
            "options": random.sample([song_title, "E.T.", "California Gurls", "The One That Got Away"], 4),
            "answer": song_title
        })

        # 🔹 Pergunta sobre o ano (exemplo fictício)
        release_year = random.choice(["2010", "2013", "2017", "2020"])
        quiz_questions.append({
            "question": f"Em que ano a música '{song_title}' foi lançada?",
            "options": random.sample([release_year, "2012", "2015", "2019"], 4),
            "answer": release_year
        })

    # 🔹 Retorna apenas 20 perguntas
    return random.sample(quiz_questions, min(20, len(quiz_questions)))

def get_playlist_data(playlist_id):
    """Busca músicas da playlist no Spotify e adiciona letras e perguntas."""
    
    # 🔹 Obtém informações da playlist
    playlist_info = sp.playlist(playlist_id)
    playlist_name = playlist_info["name"]

    tracks = []
    
    for item in playlist_info['tracks']['items']:
        track = item['track']
        song_title = track['name']
        artist_name = track['artists'][0]['name']

        print(f"Buscando letra para: {song_title} - {artist_name}")
        
        lyrics = get_lyrics(song_title, artist_name)

        track_data = {
            "title": song_title,
            "album": track['album']['name'],
            "artist": artist_name,
            "lyrics": lyrics
        }
        tracks.append(track_data)

    # 🔹 Gerar 20 perguntas para o quiz
    quiz_questions = generate_quiz_questions(tracks)

    return {
        "playlist_name": playlist_name,
        "quiz_questions": quiz_questions
    }

# 🔹 ID da playlist (pega da URL)
PLAYLIST_ID = "0ptLofOUzKvtSMruEGpkTl"

# 🔹 Obtém os dados e salva em JSON
playlist_data = get_playlist_data(PLAYLIST_ID)

with open("playlist_quiz.json", "w", encoding="utf-8") as f:
    json.dump(playlist_data, f, indent=2, ensure_ascii=False)

print("✅ Dados exportados para playlist_quiz.json")
