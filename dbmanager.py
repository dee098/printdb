# from sqlalchemy import  create_engine, text, select, MetaData
from sqlalchemy import *
from sqlalchemy import insert

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String

import os


db_connection = os.environ['DB_CONNECTION_STR']
engine = create_engine(db_connection)
Base = declarative_base()

# class PartnerCompany(Base):
#   __tablename__ = 'partner_company'
#   id = Column(Integer, primary_key=True)
#   company_name = Column(String(250))
#   description = Column(String(250))


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

    query = 'SELECT eqli1.serial_number, eqmo1.model, ma1.name, lo1.address, '\
    'paco1.company_name,  eqlo1.locations_id, eqlo1.equipment_id '\
    'FROM equipment_locations as eqlo1 '\
    'JOIN equipment_list AS eqli1 ON eqli1.id = eqlo1.equipment_id '\
    'JOIN equipment_model AS eqmo1 ON eqmo1.id = eqli1.model_id '\
    'JOIN manufacturers AS ma1 ON ma1.id = eqmo1.manufacturer_id '\
    'JOIN locations AS lo1 ON lo1.id = eqlo1.locations_id '\
    'JOIN partner_company AS paco1 ON paco1.id = lo1.company_id '\
    'ORDER BY address DESC LIMIT 20 OFFSET 0 '

    result = con.execute(text(query));
    equipment_locations = []
    for dict_list in result.mappings():
      equipment_locations.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return equipment_locations


def load_partners_from_db():
  with engine.connect() as con:
  
    query = 'SELECT * FROM locations AS lo1 '\
      'JOIN partner_company AS paco1 ON paco1.id = lo1.company_id '\
      'JOIN partners_employee AS paem1 ON paem1.employee_id = lo1.contact_employee_id '\
      'ORDER BY company_name DESC, address '
    result = con.execute(text(query));
    locations = []
    for dict_list in result.mappings():
      locations.append(dict_list)
    # for row in result:
    #   jobs.append(row._mapping)
    return locations


def save_partners_employee_to_db(data):
  with engine.connect() as con:

    query = text("INSERT INTO partners_employee (contact_name, mobile, email) VALUES (:contact_name)")
    query = query.bindparams(contact_name=data['contact_name'])  
    result = con.execute(query).all()


def save_partners_copany_to_db(data):
  with engine.connect() as conn:
    __tablename__ = 'partner_company'
    Base.metadata.tables['partner_company'].insert().execute(company_name=data['company_name'], description=data['description'])
    
    # stmt =insert(PartnerCompany).values(company_name=data['company_name'], address=data['address'], phone=data['phone'], email=data['email'])
    
    # stmt = insert('partner_company').values(company_name="spongebob", description="Spongebob Squarepants")
    # result = conn.execute(stmt)
    # conn.commit()
  # Base.metadata.tables['partner_company'].create(engine)
  # Session = sessionmaker(bind=engine)
  # session = Session()

  # newToner = PartnerCompany(id = 1,
  #                           company_name = 'blue',
  #                           description = '#0F85FF')

  # qry_object = session.query(PartnerCompany).where(PartnerCompany.id == newToner.id)

  # if qry_object.first() is None:
  #     session.add(newToner)
  # else:
  #     qry_object.update(newToner)
  # session.commit()


    # stmt = text("INSERT INTO partner_company (company_name, description) VALUES (:company_name, :description)")
    # stmt = stmt.bindparams(company_name=data['company_name'], description=data['description']) 
    # con.execute(stmt).all()


  # stmt = text("SELECT * FROM attendance WHERE user_id =:x")
  # stmt = stmt.bindparams(x="1")
  # res= session.execute(stmt).all()








