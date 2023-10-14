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

def load_equipment_from_db():
  with engine.connect() as con:
    # result = con.execute(text("SELECT * FROM equipment_list"))
    result = con.execute(text("SELECT e1.model, pe1.serial_number, m1.name FROM equipment_list AS pe1 JOIN equipment AS e1 ON pe1.equipment_id = e1.id JOIN manufacturers AS m1 ON e1.manufacturer_id = m1.id"));
    equipment_list = []
    for dict_list in result.mappings():
      equipment_list.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return equipment_list

