from flask import Flask, render_template, jsonify
from dbmanager import *
import json

app = Flask(__name__)


@app.route("/")
def root():
  equipment_list = load_equipment_from_db()
  return render_template('table_equipment.html', equipment=equipment_list)

 
@app.route("/equipment")
def equipment():
  equipment_list = load_equipment_from_db()
  return render_template('table_equipment.html', equipment=equipment_list)

@app.route("/location")
def location():
  location_list = load_location_from_db()
  return render_template('table_locations.html', location=location_list)

@app.route("/partners")
def partners():
  partners_list = load_partners_from_db()
  return render_template('table_partners.html', location=partners_list)

@app.route("/repairs/<id>")
def show_repairs_by_id(id):
  repairs = load_repairs_from_db(id)
  # return jsonify(job)
  if not repairs:
    return jsonify({"error": "Job not found"}), 404
  return render_template('repairs.html', repairs=repairs)

if __name__ == "__main__":
  print("i am here")
  app.run(host='0.0.0.0', debug=True)



# from dbmanager import load_jobs_from_db, load_jobs_from_db_json, load_job_from_db
# @app.route("/")
# def hello_world():
#   jobs_list = load_jobs_from_db()
#   return render_template('home.html', jobs=jobs_list)
# 
# @app.route("/test")
# def test_world():
#   return render_template('test.html')
# 
# @app.route("/job/<id>")
# def show_jobs(id):
#   job = load_job_from_db(id)
#   # return jsonify(job)
#   if not job:
#     return jsonify({"error": "Job not found"}), 404
#   return render_template('jobpage.html', job=job)
# 
# @app.route("/api/jobs")
# def list_jobs():
#   jobs_list = load_jobs_from_db_json()
#   return jsonify(jobs_list)