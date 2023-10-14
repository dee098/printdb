# from sqlalchemy import  create_engine, text, select, MetaData
from sqlalchemy import *
import os


db_connection = os.environ['DB_CONNECTION_STR']
engine = create_engine(db_connection)


def load_jobs_from_db():
  with engine.connect() as con:
    result = con.execute(text("SELECT * FROM jobs"))
    jobs = []
    for dict_list in result.mappings():
      jobs.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return jobs


def load_jobs_from_db_json():
  with engine.connect() as con:
    result = con.execute(text("SELECT * FROM jobs"))
    jobs = []
    for dict_list in result.mappings():
      jobs.append(dict(dict_list))
    # for row in result:
    #   jobs.append(row._mapping)
    return jobs

def load_job_from_db(job_id):
  with engine.connect() as con:
    result = con.execute(text("SELECT * FROM jobs WHERE id = :id"), {"id": job_id})
    for dict_list in result.mappings():
      if len(dict_list) == 0:
        return None
      return dict(dict_list)

      #result.fetchall()

