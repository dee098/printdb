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
    query = 'SELECT eqli1.id, eqlo1.sorter_id as sorter, eqmo1.model, eqli1.serial_number, '\
    'ma1.name, eqlo1.locations_id, lo1.address, paco1.company_name '\
    'FROM equipment_list AS eqli1 '\
    'JOIN equipment_model AS eqmo1 ON eqli1.model_id = eqmo1.id '\
    'JOIN manufacturers AS ma1 ON eqmo1.manufacturer_id = ma1.id '\
    'JOIN equipment_locations AS eqlo1 ON eqli1.model_id = eqlo1.equipment_id '\
    'JOIN locations AS lo1 ON lo1.id = eqlo1.locations_id '\
    'JOIN partner_company AS paco1 ON paco1.id = lo1.company_id '\
    'ORDER BY serial_number DESC LIMIT 20 OFFSET 0 '
    
    result = con.execute(text(query));
    equipment_list = []
    for dict_list in result.mappings():
      equipment_list.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return equipment_list

def load_location_from_db():
  with engine.connect() as con:

    query = 'select eqli1.serial_number, eqmo1.model, ma1.name, lo1.address, '\
    'paco1.company_name '\
    'FROM equipment_locations as eqlo1 '\
    'JOIN equipment_list AS eqli1 ON eqli1.id = eqlo1.equipment_id '\
    'JOIN equipment_model AS eqmo1 ON eqmo1.id = eqli1.model_id '\
    'JOIN manufacturers AS ma1 ON ma1.id = eqmo1.manufacturer_id '\
    'JOIN locations as lo1 ON lo1.id = eqlo1.locations_id '\
    'JOIN partner_company AS paco1 ON paco1.id = lo1.company_id '\
    'ORDER BY address DESC LIMIT 20 OFFSET 0 '

    result = con.execute(text(query));
    equipment_locations = []
    for dict_list in result.mappings():
      equipment_locations.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return equipment_locations
