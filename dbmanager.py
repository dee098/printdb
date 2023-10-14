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
    query = 'SELECT eloc1.sorter_id as sorter, e1.model, el1.serial_number, m1.name, eloc1.locations_id, '\
    'lo1.address, pc1.company_name '\
    'FROM equipment_list AS el1 '\
    'JOIN equipment AS e1 ON el1.equipment_id = e1.id '\
    'JOIN manufacturers AS m1 ON e1.manufacturer_id = m1.id '\
    'JOIN equipment_locations AS eloc1 ON el1.equipment_id = eloc1.equipment_id '\
    'JOIN locations AS lo1 ON lo1.id = eloc1.locations_id '\
    'JOIN partner_company AS pc1 ON pc1.id = lo1.company_id '\
    'ORDER BY sorter DESC LIMIT 20 OFFSET 0 '
    
    result = con.execute(text(query));
    equipment_list = []
    for dict_list in result.mappings():
      equipment_list.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return equipment_list

