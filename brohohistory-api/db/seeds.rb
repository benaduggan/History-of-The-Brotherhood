# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def create_people
  query = "INSERT INTO person (first_name, last_name, start_class, start_semester, end_semester) VALUES ('Nathan', 'Tomcik', 'Freshman', '2012-08-01', '2016-01-01')"
  ActiveRecord::Base.connection.execute(query)

  query = "INSERT INTO person (first_name, last_name, start_class, start_semester, end_semester) VALUES ('Blake', 'Williamson', 'Freshman', '2010-08-01', '2014-01-01')"
  ActiveRecord::Base.connection.execute(query)
end

def create_positions
  query = "INSERT INTO position (title, description, recurring) VALUES ('Phubs', 'The crazy one', '1')"
  ActiveRecord::Base.connection.execute(query)
  query = "INSERT INTO position (title, description, recurring) VALUES ('Snake', 'The Introvert', '1')"
  ActiveRecord::Base.connection.execute(query)
end

def create_people_position
  [['Nathan', 'Snake'], ['Blake', 'Phubs']].each do |first_name, position_title|
    person = ActiveRecord::Base.connection.execute("SELECT * FROM person WHERE first_name = '#{first_name}'").first
    position = ActiveRecord::Base.connection.execute("SELECT * FROM position WHERE title = '#{position_title}'").first

    query = "INSERT INTO person_position (person_id, position_id, description, start_semester, end_semester) VALUES ('#{person['id']}', '#{position['id']}', 'blah', '#{person['start_semester']}', '#{person['end_semester']}')"
    ActiveRecord::Base.connection.execute(query)
  end

end

def get_or_create_floor
  floor_id = ActiveRecord::Base.connection.execute("SELECT id FROM floor WHERE name = 'The Brotherhood'")
  if floor_id.to_a.length < 1
    ActiveRecord::Base.connection.execute("INSERT INTO floor (name, description) VALUES ('The Brotherhood', 'An awesome place to live')")
    floor = ActiveRecord::Base.connection.execute("SELECT * FROM floor WHERE name = 'The Brotherhood'").to_a
    return floor.first['id']
  else
    return floor_id.first['id']
  end
end

def create_rooms
  single_rooms = [314, 315, 316, 317, 331, 332] # check that this is true
  floor_id = get_or_create_floor()
  (301...345).each do |room_number|
    if single_rooms.include? room_number
      num_occupants = 1
    else
      num_occupants = 2
    end
    query = "INSERT INTO room (floor_id, room_num, num_occupants) VALUES (#{floor_id}, #{room_number}, #{num_occupants})"
    ActiveRecord::Base.connection.execute(query)
  end
end

def create_person_rooms
  person = ActiveRecord::Base.connection.execute("SELECT * from person WHERE first_name = 'Nathan'").to_a.first
  room = ActiveRecord::Base.connection.execute("SELECT * from room WHERE room_num = '305'").to_a.first
  query = "INSERT INTO person_room (person_id, room_id, start_semester, end_semester) VALUES ('#{person['id']}', '#{room['id']}', '#{person['start_semester']}', '#{person['end_semester']}')"
  ActiveRecord::Base.connection.execute(query)


  person = ActiveRecord::Base.connection.execute("SELECT * from person WHERE first_name = 'Blake'").to_a.first
  room = ActiveRecord::Base.connection.execute("SELECT * from room WHERE room_num = '330'").to_a.first
  query = "INSERT INTO person_room (person_id, room_id, start_semester, end_semester) VALUES ('#{person['id']}', '#{room['id']}', '#{person['start_semester']}', '#{person['end_semester']}')"
  ActiveRecord::Base.connection.execute(query)
end

def create_enduser
  password = BCrypt::Password.create('password').to_s

  query = "INSERT INTO enduser (first_name, last_name, email, verified_floor_member, role, password) VALUES ('super', 'user', 'brohoadmin@mailinator.com', 1, 'admin', '#{password}')"
  ActiveRecord::Base.connection.execute(query)
end

def createTheThings
  create_rooms()
  create_people()
  create_person_rooms()
  create_positions()
  create_people_position()
  create_enduser()
end

createTheThings()
