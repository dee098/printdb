from flask import Flask, render_template, jsonify

app = Flask(__name__)

JOBS = [
  {
    'id': 1,
    'title': 'Data Scientist',  
    'location': 'New York',
    'salary': 50000,
    'currency': 'USD'
  },
  {
  'id': 2,
  'title': 'Python Developer',  
  'location': 'New Yodryhrk',
  'salary': 50000,
  'currency': 'USD'
  },
  {
  'id': 3,
  'title': 'Frontend Engineer',  
  'location': 'Remote',
  'salary': 30000,
  'currency': 'MDL'
  }
]
@app.route("/")
def hello_world():
    return render_template('home.html', jobs=JOBS)

@app.route("/api/jobs")
def list_jobs():
    return jsonify(JOBS)
  
if __name__ == "__main__":
  print("i am here")
  app.run(host='0.0.0.0', debug=True)

#https://getbootstrap.com/docs/5.3/getting-started/introduction/
#https://htmldog.com/guides/css/
#https://unsplash.com/s/photos
#https://flask.palletsprojects.com/en/3.0.x/quickstart/
#poetry install