from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, dee!</p>"
if __name__ == "__main__":
  print("i am here")
  app.run(host='0.0.0.0', debug=True)