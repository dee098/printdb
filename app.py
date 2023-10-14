from flask import Flask, render_template, jsonify
from dbmanager import load_jobs_from_db, load_jobs_from_db_json, load_job_from_db
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
  jobs_list = load_jobs_from_db()
  return render_template('home.html', jobs=jobs_list)

@app.route("/api/jobs")
def list_jobs():
  jobs_list = load_jobs_from_db_json()
  return jsonify(jobs_list)
  
@app.route("/job/<id>")
def show_jobs(id):
  job = load_job_from_db(id)
  # return jsonify(job)
  if not job:
    return jsonify({"error": "Job not found"}), 404
  return render_template('jobpage.html', job=job)


if __name__ == "__main__":
  print("i am here")
  app.run(host='0.0.0.0', debug=True)
