from flask import Flask, render_template, jsonify, request
from flask.wrappers import Request
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

@app.route("/partners2")
def partners2():
  partners_list = load_partners_from_db()
  return render_template('table_partners2.html', location=partners_list)

@app.route("/partners3")
def partners3():
  partners_list = load_partners_from_db()
  return render_template('table_partners3.html', location=partners_list)

@app.route("/partners4")
def partners4():
  partners_list = load_partners_from_db()
  return render_template('table_partners4.html', location=partners_list)

@app.route("/partners5")
def partners5():
  partners_list = load_partners_from_db()
  return render_template('table_partners5.html', location=partners_list)

@app.route("/login", methods=['GET', 'POST'])  # Update to handle both GET and POST methods
def login():
  if request.method == 'POST':
    # Handle the POST request
    # Example: Validate the credentials and perform login logic
    username = request.form['username']
    password = request.form['password']
    # Do something with the username and password
    return "Login successful"  # Placeholder response
  else:
    # Handle the GET request
    return render_template('form_login.html')

@app.route("/add_location")
def add_location():
  return render_template('_add_location.html')

@app.route("/add_location/company", methods=['POST'])
def add_location_company():
  data = request.form
  save_partners_copany_to_db(data)
  return jsonify(data)

@app.route("/repairs/<id>")
def show_repairs_by_id(id):
  repairs = load_repairs_from_db(id)
  # return jsonify(job)
  if not repairs:
    return jsonify({"error": "Job not found"}), 404
  return render_template('repairs.html', repairs=repairs)

if __name__ == "__main__":
  print("i am here")
  # https://flask.palletsprojects.com/en/3.0.x/deploying/
 
  ## # Debug/Development server
  app.run(host='0.0.0.0', debug=True)

  ## Production waitress
  ##  pip install waitress
  # from waitress import serve
  # serve(app, host='0.0.0.0', port=8080)

  ## Production WSGIServer
  ## Install gevent using pip install gevent
  # http_server = WSGIServer(('', 8080), app)
  # http_server.serve_forever()

  




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