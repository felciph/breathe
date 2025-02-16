from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from groq import Groq
from google import genai

app = Flask(__name__)
CORS(app)  # Enable CORS

api_key = "AIzaSyBTKX2wq5PVVMAgUpZn1mq0AFGzcekQC3I"
system_prompt = "You are an AI assistant named 'Aeolus' for an application called 'Breathe', an application that helps people relieve stress and manage tasks. Keep your answers short, simple, and somewhat informal."
api = genai.Client(api_key=api_key)
memory = ""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global memory
    user_message = request.json['message']
    print(f"Received message: {user_message}")
    memory += "User: " + user_message + ", "

    completion = api.models.generate_content(
        model="gemini-2.0-flash",
        contents= system_prompt + memory,
    )

    response = completion.text
    print(f"AI response: {response}")
    memory += "AI: " + response + ", "

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)