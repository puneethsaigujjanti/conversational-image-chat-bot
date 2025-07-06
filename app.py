from flask import Flask, send_from_directory,request,jsonify
from PIL import Image
import io
import google.generativeai as genai

app = Flask(__name__)
genai.configure(api_key="api key")
vision_model=genai.GenerativeModel("gemini-2.0-flash")

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/index.css")
def css():
    return send_from_directory(".", "index.css")

@app.route("/script.js")
def js():
    return send_from_directory(".", "script.js")
@app.route("/upload",methods=["POST"])
def upload():
    image_file=request.files.get("image")
    global storedimg
    if image_file:
        image_bytes = image_file.read()
        storedimg = Image.open(io.BytesIO(image_bytes))

        response = vision_model.generate_content([storedimg, "Describe this image"])
        return jsonify({"reply": response.text})
    return "no image"
@app.route("/chat",methods=["POST"])
def chat():
    global storedimg
    if storedimg is None:
        return jsonify({"reply":"please upload image first"})
    data=request.get_json()
    question=data.get("question","")
    if not question.strip():
        return jsonify({"reply":"you must give valid input"})
    
    respose=vision_model.generate_content([storedimg,question])
    return jsonify({"reply":respose.text})
if __name__ == "__main__":
    app.run(debug=True)
