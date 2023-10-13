from flask import Flask, render_template, jsonify
from dbmanager import load_jobs_from_db, load_jobs_from_db_json
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
  jobs_list = load_jobs_from_db()
  return render_template('home.html', jobs=jobs_list)

@app.route("/api/jobs")
def list_jobs():
  jobs_list = load_jobs_from_db_json()
  return jsonify(json.dumps(jobs_list))
  
if __name__ == "__main__":
  print("i am here")
  app.run(host='0.0.0.0', debug=True)
