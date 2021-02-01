import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():

    return render_template('index.html')

@app.route("/samples")
def samples():
    
    with open('static/data/samples.json') as json_file:

        return json.load(json_file)

if __name__ == "__main__":
    app.run(debug=True)